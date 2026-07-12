#!/usr/bin/env python3
"""Recover imgur-hosted media from the Wayback Machine into per-post folders."""
import glob, os, re, subprocess, time, hashlib

PLACEHOLDER_MD5 = "f953f499c9824953791551bfef65fe61"
LOG = open("recover_imgur.log", "w")

def log(msg):
    print(msg); LOG.write(msg + "\n"); LOG.flush()

def slug_of(path):
    return re.sub(r'^\d{4}-\d{2}-\d{2}-', '', os.path.basename(path)[:-3])

def year_of(path):
    m = re.match(r'(\d{4})', os.path.basename(path))
    return m.group(1) if m else "2019"

def md5(p):
    return hashlib.md5(open(p, 'rb').read()).hexdigest()

def wayback_download(hash_ext, year, dest, is_video=False):
    """Try to fetch original from wayback. Returns True on real file."""
    host = "i.imgur.com"
    for ts in (year, "2020", "2019", "2"):
        url = f"https://web.archive.org/web/{ts}id_/https://{host}/{hash_ext}"
        for attempt in range(3):
            r = subprocess.run(["curl", "-sS", "-L", "-A", "Mozilla/5.0",
                                "-o", dest, "-w", "%{http_code}", url],
                               capture_output=True, text=True)
            code = r.stdout.strip()[-3:]
            size = os.path.getsize(dest) if os.path.exists(dest) else 0
            if code == "200" and size > 2000 and md5(dest) != PLACEHOLDER_MD5:
                return True
            time.sleep(6)
    return False

# --- Image refs already rewritten to /assets/images/imgur/HASH.ext ---
img_posts = subprocess.run(["grep", "-rl", "/assets/images/imgur/"] +
                           glob.glob("*/_posts/*.md"),
                           capture_output=True, text=True).stdout.split()
ok, fail = 0, 0
for post in img_posts:
    slug, year = slug_of(post), year_of(post)
    os.makedirs(f"assets/images/{slug}", exist_ok=True)
    content = open(post).read()
    hashes = sorted(set(re.findall(r'/assets/images/imgur/([A-Za-z0-9]+\.(?:png|jpg|jpeg|gif))', content)))
    for he in hashes:
        dest = f"assets/images/{slug}/{he}"
        if wayback_download(he, year, dest):
            content = content.replace(f"/assets/images/imgur/{he}", f"/assets/images/{slug}/{he}")
            log(f"OK   {slug}/{he}"); ok += 1
        else:
            if os.path.exists(dest): os.remove(dest)
            content = content.replace(f"/assets/images/imgur/{he}", f"https://i.imgur.com/{he}")
            log(f"FAIL {slug}/{he} -> restored imgur url"); fail += 1
    open(post, "w").write(content)

# --- mp4 videos in generating-ph-myths (still raw imgur.com URLs) ---
vid_post = "notebook/_posts/2021-10-23-generating-ph-myths.md"
if os.path.exists(vid_post):
    slug, year = slug_of(vid_post), year_of(vid_post)
    os.makedirs(f"assets/images/{slug}", exist_ok=True)
    content = open(vid_post).read()
    for he in sorted(set(re.findall(r'https?://(?:i\.)?imgur\.com/([A-Za-z0-9]+\.mp4)', content))):
        dest = f"assets/images/{slug}/{he}"
        if wayback_download(he, year, dest, is_video=True):
            content = re.sub(rf'https?://(?:i\.)?imgur\.com/{he}', f"/assets/images/{slug}/{he}", content)
            log(f"OK   {slug}/{he}"); ok += 1
        else:
            if os.path.exists(dest): os.remove(dest)
            log(f"FAIL {slug}/{he} (video, left as-is)"); fail += 1
    open(vid_post, "w").write(content)

log(f"\nDONE. recovered={ok}, failed={fail}")
LOG.close()
