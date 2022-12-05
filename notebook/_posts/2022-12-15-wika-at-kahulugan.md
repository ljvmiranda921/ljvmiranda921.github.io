---
layout: post
type: post
title: "Pagmumuni ukol sa wika at kahulugan"
date: 2022-12-15
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, linguistics, semantics, pragmatics]
description: |
    Nakapaloob sa sanaysay na ito ang aking mga pagmumuni patungkol sa relasyon
    ng wika at kahulugan. Bunga na rin ito ng paglaganap ng mga large language
    models (LLM) ngayon. May konsepto ba ng pag-unawa ang mga LLMs?  Susubukan
    kong gumawa ng balangkas upang siyasatin ang tanong na ito.
excerpt: |
    Nakapaloob sa sanaysay na ito ang aking mga pagmumuni patungkol sa relasyon
    ng wika at kahulugan. Bunga na rin ito ng paglaganap ng mga large language
    models (LLM) ngayon. May konsepto ba ng pag-unawa ang mga LLMs?  Susubukan
    kong gumawa ng balangkas upang siyasatin ang tanong na ito.
---

<span class="firstcharacter">H</span>abang nagbabasa ako ng librong *The Way of
Kings* ni Brandon Sanderson, napansin ko na may isang tauhan, si Shallan
Davar, na mahilig gumamit ng **panunuya** sa kanyang wika. Madalas sasabihin
niya yung salungat sa kanyang pakay. May mga pagkakataon na hindi siya
naiintindihan ng kanyang kausap lalo na kung ang panunuyang ito ay nakasulat
lamang sa papel. Siguro kasi wala na yung konteksto&mdash; tono, postura,
ekspresyon&mdash; kung binabasa lang yung nais niya.

![](/assets/png/wika/shallan.jpg){:width="500px" style="padding:10px"}  
__Fig__: Si Shallan Davar sa seryeng *Stormlight Archives* ni Brandon Sanderson.
{:style="text-align: center;"}

May mga ganito rin akong karanasan. Halimbawa, sa Reddit, kailangan kong
maglagay ng "/s" upang linawin na hindi literal ang aking kumento. Pag may
di-pagkakaunawaan sa magkakaibigan, mas mainam sa akin na tumawag kaysa
mag-*text* para malinaw ang usapan.

**"Nauunawan mo ba ako?"** Kung tinanong kita ng ganyan, marahil ang pakay ko ay
siyasatin kung naiintindihan mo ba yung **kahulugan** ng sinasabi ko. Hindi lang
yung literal na pagkakaayos ng mga salita o simbolo, ngunit pati yung konteksto
at karanasan ng bawat salitang sinambit ko. 

Dito naisip ko na baka may dalawang uri ng kahulugan: isang (1) **kahulugang
tekstuwal** na base lamang sa kung ano ang literal na nakasulat, at isang (2)
**kahulugang kumakatawan** na may pagtatangi sa konteksto at intensyon.
Interesado ako dito dahil sa kasulukuyan, may mga diskusyon kung may konsepto ba ng 
pag-unawa ang mga *large language models* (LLMs) at hindi lamang ito bunga ng numero at
tsansa.

Uunahan ko na: wala pa akong sagot. Ngunit gusto kong bumuo ng isang balangkas
para makipag-buno sa mga tanong na ito. Sa unang parte, susubukan kong bigyang hugis ang
isang modelo ng komunikasyon na inaangkop itong dalawang uri ng kahulugan.
Sa ikalawa, gagamitin ko ang balangkas na ito upang siyasatin ang iba't ibang diskurso
ukol sa LLMs.

## Tao po! 

Kung pupunta ako ngayon sa bahay mo at hindi ko alam kung nandiyan ka, ang
gagawin ko siguro ay kakatok sa iyong pinto at sisigaw ng: "tao po!" Kakatok
ulit. Sisigaw: tao po! 

Kapag sinuri lang natin ang tekstuwal na kahulugan ng ekspresyong ito, hindi
ba kakaiba na dinedeklara natin ang ating pagkatao sa bawat katok? (O hindi
kaya tinatanong natin ang pagkatao ng nasa loob?) Hindi mo ito basta maisasalin
sa ibang wika. Kung nasa Amerika tayo ngayon, hindi tayo kakatok sa isang pinto at
sisigaw ng: *"I'm human!"* 

Ngunit tulad ng nabanggit ko, may isa pang nibel ng kahulugan. Dahil nasa
Pilipinas tayo, at alam mo ang **intensyon** ko, nakalugar ang "tao po!" sa isang
gawi na naiintidihan nating dalawa. Hindi na iba sa'yo kung may sumisigaw ng
kanyang pagkatao habang kumakatok dahil alam mo na isa itong paraan ng pagtawag.
Karaniwan lamang ito dahil umiiral sa lugar, panahon, at tradisyon ang wika
natin. Intensyon ang mahalagang sangkap ng kahulugang kumakatawan. Madalas ang
intensyong ito ay lagpas pa sa wika.

![](/assets/png/wika/actor_interlocutor_model.png){:width="600px" style="padding:10px"}  
__Fig:__ Modelo ng komunikasyon.
{:style="text-align: center;"}

Kung hihimayin natin ang interaksyong ito, ganito ang nangyayari *(A - Aktor,  K - Kausap)*:
1. **(A) Intensyon:** may intensyon akong nagsasalita&mdash;malaman kung nasa loob ka ng bahay.
2. **(A) Ekspresyon:** gamit ang kaalaman ko sa wika, pipili ako ng ekspresyon
    na tumpak sa aking intensyon. Hahanguin ko ang mga simbolong alam ko upang
    gumawa ng pangungusap. Dahil dito, ang sasabihin ko ay: "tao po!"
3. **(K) Pag-unawa:** gagamitin mo ang iyong karanasan at modelo ng mundo upang unawain ang aking intensyon. Nasasa-iyo kung ikaw ay tutugon.
4. **(A) Pag-pasya:** depende sa iyong tugon, maaari kong isipin kung naunawaan mo ba o hindi ang aking pagtawag.

Sa itaas, gumuhit ako ng isang modelo ng komunikasyon. Bawat aktor ay may
sariling modelo ng mundo na dumadaloy sa kanilang indibidwal na konteksto,
karanasan at kasaysayan.  Dito nanggagaling ang kumakatawang kahulugan. Gamit
ang salita at wika, nagagawa nating ihayag ang ating pananaw at intensyon. Dito
naman nanggagaling ang tekstuwal na kahulugan.

Sa kasulukuyan, karamihan ng mga istatistikang modelo sa wika ay base sa
tekstuwal na kahulugan. Binubuo sila sa pamamagitan ng paglikha ng mga ugnayan sa
pagitan ng mga salita o simbolo (c.f., [*Study notes on making word vectors from
scratch*](/notebook/2021/12/11/word-vectors/)). Mas maraming ugnayan ang mabubuo
kung mas maraming teksto ang ipapakita sa modelo. Kadalasan ang mga tekstong ito ay
nanggagaling sa *internet*, libro, diyaryo, *Wikipedia*, at iba pa.  Mula rito,
nakabubuo ang modelo ng isang semantikong kahulugan na maihahalintulad natin sa
pansariling kaalaman sa wika.

Para sa mga dalubwika, ang kontekstong natututunan ng isang istatistikang modelo
ay base lamang sa mga salitang nakapaligid dito&mdash;isang semantikang bunga ng
probabilidad at distribusyon. Kapag pinakita natin sa modelo ang pangungusap na,
*"Binaba ako ng jeepney sa Espa&ntilde;a,"* alam nito na ang simbolong
`España` ay isang lugar sa Pilipinas dahil sa pang-ukol na `sa` (na kadalasa'y
ginagamit sa lugar) at sa kalapit na salitang `jeepney` na konektado sa
`Pilipinas`. Marahil sabay na lumalabas ang mga salitang ito sa tekstong
ginamit para likhain ang modelo. Probabilidad at distribusyon. Isang sayaw
ng matematika. Maaari mong palitan ang simbolong `España` ng kung ano man,
`PeePeePooPoo`, at magkakaroon pa rin ito ng tekstuwal na kahulugan. 

Taliwas ito sa isang teorya kung saan ginagamit ang wika bilang pantukoy sa mga
bagay na nagmemeron. Dito, ang simbolong `España` ay tumutukoy sa Espa&ntilde;a,
isang lugar na mahahanap mo, mapupuntahan mo, at mararanasan mo. Para sa akin,
hindi yung pang-ukol na `sa` at salitang `jeepney` ang nagbibigay kahulugan sa
`España`.  Ito yung mga karanasan ko nung binisita ang mga kaibigan sa UST, 
muntik nang ma-*stranded* sa baha, at nagpatila sa loob ng isang *fastfood
joint*. Kapag sinabi mo sa akin na binaba ka ng *jeepney* sa PeePeePooPoo, hindi
kita maiintindihan. Dahil ang kahulugan ng salita ay kumakatawan sa mga
parte ng meron. 

![](/assets/png/wika/espana.jpg){:width="500px" style="padding:10px"}  
{:style="text-align: center;"}

Sana kahit papaano, nabigyan ko ng linaw ang dalawang uri ng kahulugan. Ang
tekstuwal na kahulugan ay nakabase sa mga interaksyon at relasyon ng mga
simbolo. Bilang isang dalubwika, gumagamit tayo ng mga istatistikang modelo
upang mapa-igting ang pagbuo ng mga ugnayang ito. Sa kabilang banda, may
kahulugan na kumakatawan sa mga bagay na may konteksto, karanasan, at
kasaysayan. Dito, ginagamit ang mga salita at simbolo para tukuyin ang mga
bagay na ito. 

Aaminin ko na nilililok ko pa ang balangkas na ito. May mga parte na gusto ko
pang pakinisin at bigyang hugis. Ngunit masaya na ko sa aking progreso.  Sa
susunod na seksyon, susuriin ko ang iba't ibang diskurso patungkol sa mga
*large language models* (LLMs) gamit ang ating balangkas.

## Ang dalawang kalabisan sa diskurso ng LLMs

Malaking bahagi sa paglikha ng mga *large language models* (LLMs) ang pagpapakita ng
maraming teksto upang makabuo ito ng iba't ibang ugnayan sa pagitan ng mga
simbolo. Sa kasulukuyan, palaki ng palaki ang sukat ng *data* na ginagamit 
sa paglikha ng mga LLMs. Halimbawa, binuo ang GPT-3 gamit ang 45 TB na teksto mula sa
*internet* ([*CommonCrawl*](https://commoncrawl.org/)), mga kumento sa *Reddit*, mga libro,
at mga pahina ng *Wikipedia*. Isipin mo, nilikom natin
ang isang piraso ng kolektibong kaalaman ng mundo at gumawa ng mga ugnayang
higit pa sa isang indibidwal. 

<!-- Ngunit katumbas ba nitong 45 TB na "kolektibong kaalaman" mula sa *Internet* ang
karanasan, konteksto, at kasaysayan ng tao? Dumadaloy ba sa parehong nibel ng
pag-unawa ang dalawa? Marahil mas maraming alam sa Espa&ntilde;a ang GPT-3 kaysa
sa akin ngunit, nauunawaan ba niya talaga ang lugar na ito?  -->

Nag-iiba ang daloy ng diskusyon sa oras na sinama natin ang laki ng *data* at
ang kakayahan ng mga LLMs ngayon. Kamakailan lang, nilabas ng
[OpenAI](https://openai.com) ang [ChatGPT](https://openai.com/blog/chatgpt),
isang LLM na [maaari mong makausap](https://chat.openai.com/auth/login).  Hindi
maipagkakaila ang husay ng modelong ito. Aaminin ko: parang tao nga ang kausap
ko. Nasasagot niya ang aking mga tanong at nakakapagdagdag pa ng konteksto. 
Dito lumilitaw muli ang tanong: may konsepto ba ng pag-unawa ang mga LLMs? 

Sa palagay ko, may dalawang kalabisang lumalabas sa diskurso ng mga LLMs: labis
na pagkamangha at labis na katigasan. 

### Pagkabulag ang labis na pagkamangha

### Pagkapilay ang labis na katigasan


<!--
1. too much wonder. Ang labis na pagkamangha ay pagkabulag
2. too much rigor. Ang labis na kahigpitan ay skeptisismo
    - think of a better word than skepticism. 
    - pagkapilay kasi isinasantabi mo na yung isang paa without considering it

-->

<!-- Sisiyasatin natin
ang mga tanong na ito sa susunod na seksiyon. -->


<!--

### "May konsepto ng pag-unawa ang LLMs. Tingnan mo ang ChatGPT!"

Kamakailan lang, nilabas ng [OpenAI](https://openai.com/) ang
[ChatGPT](https://openai.com/blog/chatgpt/), isang *language model* na [maaari
mong makausap](https://chat.openai.com/auth/login). Hindi maipagkakaila ang
husay ng modelong ito. Maraming nagsasabi na parang tao raw ang kausap nila. 
Minsan ginagamit siya upang sumulat ng mga tula, sumagot ng mga tanong sa
*StackOverflow*, o maghanap ng impormasyon. 

Sa palagay ko ganito ang nangyayari:

-->


<!-- ### "Walang konsepto ng pag-unawa ang LLMs. Ito ay bunga ng tsansa." -->

<!-- Things we still don't know about: how does scale help? implicit notions? -->
<!-- what's happening now is that we're making math work for us -->



<!--
## Konklusyon: may posibilidad ba ng pag-unawa ang mga LLMs?

> *Why are you writing in Filipino?* I realized that there are some nuances
> and examples that only the richness of Filipino can capture. I might write a translation in the 
> future, but for now I think Google Translate should give you a decent one.
-->


<!--
Wala pa ring makapagsasabi kung magkatumbas ang pag-unawa ng isang *NLP model* at
ng tao. May pansariling konteksto, karanasan, at kasaysayan rin ba ang mga *NLP models*?
Tingnan ang susunod na pangungusap: "Binaba ako ng jeepney malapit sa Espa&ntilde;a"

![](/assets/png/wika/espana.jpg){:width="600px" style="padding:10px"}  
{:style="text-align: center;"}

Kung ipapakita mo ito sa isang modelo at tinanong mo kung anong klaseng salita
ang Espa&ntilde;a, marahil sasabihin nito na ang salitang Espa&ntilde;a ay isang
lugar. Alam natin na tama ang kanyang sagot ngunit naunawaan ba niya talaga ang 
pangungusap? Tinawag ba niya itong lugar dahil alam niya na ito'y kalsada sa
Maynila (at hindi ang bansang Espa&ntilde;a)? O tinawag niya itong lugar dahil
sa natutunan niyang balarila at estruktura ng pangungusap? 


Kapag sinuri natin ang mga teksto na ginagamit upang gumawa ng mga *NLP models*
ngayon, mapapansin na malaki ang agwat sa pagitan ng tekstuwal at kumakatawang
kahulugan.
-->

<!-- Ngunit hanggang sa ngayon, hindi pa rin natin alam kung ang  -->

<!--
Masasabi ba natin na itong semantikong kahulugan ay katumbas ng konteksto,
karanasan, at kasaysayan ng tao (at bagkus, kaalaman sa mundo)? Tingnan ang
susunod na pangungusap: "Binaba ako ng jeepney malapit sa Espa&ntilde;a."

Kung ipapakita mo ito sa isang modelo at tinanong mo kung anong klaseng salita
ang Espa&ntilde;a, marahil sasabihin nito na ang salitang Espa&ntilde;a ay isang
lugar. Alam natin na tama ang kanyang sagot ngunit naunawaan ba niya talaga ang 
pangungusap? Tinawag ba niya itong lugar dahil alam niya na ito'y kalsada sa
Maynila (at hindi isang bansa)? O tinawag niya itong lugar dahil sa natutunan
niyang balarila at estruktura ng pangungusap?
-->

## References

- <a id="firth1957distrib">Firth, J.R.</a> (1957). "A synopsis of linguistic theory 1930-1955". Studies in Linguistic Analysis: 1–32. Reprinted in F.R. Palmer, ed. (1968). Selected Papers of J.R. Firth 1952-1959. London: Longman.
- <a id="bender2020nlu">Emily M. Bender and Alexander Koller.</a> 2020. Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data. In *Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics*, pages 5185–5198, Online. Association for Computational Linguistics.
- <a id="manning2022human">Manning, Christopher D.</a>2022. Human Language Understanding & Reasoning. In *Daedalus, the Journal of the American Academy of Arts & Sciences*