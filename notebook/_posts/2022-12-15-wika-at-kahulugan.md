---
layout: post
type: post
title: "Pagmumuni ukol sa wika at kahulugan"
date: 2022-12-02
category: notebook
comments: true
author: "LJ MIRANDA"
published: true
tags: [nlp, linguistics, semantics, pragmatics]
description: |
excerpt: |
---

<span class="firstcharacter">H</span>abang nagbabasa ako ng librong *The Way of
Kings* ni Brandon Sanderson, napansin ko na may isang tauhan doon, si Shallan
Davar, na mahilig gumamit ng **panunuya** sa kanyang wika. Madalas sasabihin
yung salungat sa kanyang pakay. May mga pagkakataon na hindi siya
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
ulit. Sisigaw. Tao po! 

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
intensyong ito ay **lagpas** pa sa wika.

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

Sa itaas, gumuhit ako ng isang **modelo ng komunikasyon**. Bawat aktor ay may
sariling modelo ng mundo na dumadaloy sa kanilang indibidwal na konteksto,
karanasan at kasaysayan.  Dito nanggagaling ang kumakatawang kahulugan. Gamit
ang salita at wika, nagagawa nating ihayag ang ating pananaw at intensyon. Dito
naman nanggagaling ang tekstuwal na kahulugan.

<!-- talk about how most NLP models were trained on textual meaning -->
Sa kasulukuyan, karamihan ng mga istatistikang modelo sa wika ay base sa
tekstuwal na kahulugan. Binubuo sila sa pamamagitan ng paglikha ng mga ugnayan sa
pagitan ng mga salita o simbolo (c.f., [*Study notes on making word vectors from
scratch*](/notebook/2021/12/11/word-vectors/)). Mas maraming ugnayan ang mabubuo
kung mas maraming teksto ang ipapakita sa modelo. Kadalasan ang mga tekstong ito ay
nanggagaling sa *internet*, libro, diyaryo, *Wikipedia*, at iba pa.  Mula rito,
nakabubuo ang modelo ng isang semantikong kahulugan na maihahalintulad natin sa
pansariling kaalaman sa wika.

Para sa mga dalubwika, ang kontekstong natututunan ng isang modelo ay base
lamang sa mga salitang nakapaligid dito&mdash;isang semantikang bunga ng
probabilidad at distribusyon. Kapag pinakita natin sa modelo ang pangungusap na,
*"Binaba ako ng jeepney sa Espa&ntilde;a,"* alam nito na ang simbolong
`España` ay isang lugar sa Pilipinas dahil sa pang-ukol na `sa` (na
kadalasa'y ginagamit sa lugar) at sa kalapit na salitang `jeepney` na konektado
sa `Pilipinas`. Marahil sabay na lumalabas ang mga salitang ito sa teksto na
ginamit upang sanayin ang mga modelo. Probabilidad at distribusyon. Isang sayaw
ng matematika. Maaari mong palitan ang simbolong `España` ng
kung ano man, `PeePeePooPoo`, at magkakaroon pa rin ito ng tekstuwal na kahulugan. 

Taliwas ito sa isang teorya kung saan ginagamit ang wika bilang pantukoy sa mga
bagay na nagmemeron. Dito, ang simbolong `España` ay tumutukoy sa Espa&ntilde;a,
isang lugar na mahahanap mo, mapupuntahan mo, at mararanasan mo. Para sa akin,
hindi yung pang-ukol na `sa` at salitang `jeepney` ang nagbibigay kahulugan sa
`España`.  Ito yung mga karanasan ko nung binisita ang mga kaibigan sa UST, 
muntik nang ma-*stranded* sa baha, at nagpatila sa loob ng isang *fastfood
joint*. Kapag sinabi mo sa akin na binaba ka ng *jeepney* sa PeePeePooPoo, hindi
kita maiintindihan. Muli, ang kahulugan ng isang salita ay kumakatawan sa mga
parte ng meron. 

![](/assets/png/wika/espana.jpg){:width="500px" style="padding:10px"}  
{:style="text-align: center;"}

Sana kahit papaano, nabigyan ko ng linaw ang dalawang uri ng kahulugan. Ang
tekstuwal na kahulugan ay nakabase sa mga interaksyon at relasyon ng mga
simbolo. Bilang isang dalubwika, gumagamit tayo ng mga modelo upang mapa-igting
ang pagbuo ng mga ugnayang ito. Sa kabilang banda, may kahulugan na kumakatawan
sa mga bagay na may konteksto, karanasan, at kasaysayan. Dito, ginagamit lamang
ang salita (o simbolo) para tukuyin ang mga bagay na ito. 

Aaminin ko na nilililok ko pa ang balangkas na ito. May mga parte pa na gusto ko
pang pakinisin at bigyang ganap na hugis. Ngunit masaya na ko sa progresong ito.
Sa susunod na seksiyon, susuriin ko ang iba't ibang diskurso patungkol sa mga
*(large language models)* LLMs gamit ang ating balangkas.

## Mga diskurso sa LLMs

<!-- talk about LLMs, the scale of the data, give enough examples -->




> *Why are you writing in Filipino?* I realized that there are some nuances
> and examples that only the richness of Filipino can capture. I might write a translation in the 
> future, but for now I think Google Translate should give you a decent one.


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

## Sanggunian

- <a id="pickering2012alignment">Menenti L, Pickering MJ, Garrod SC.</a> Toward a neural basis of interactive alignment in conversation. Front Hum Neurosci. 2012 Jun 27;6:185. doi: 10.3389/fnhum.2012.00185. PMID: 22754517; PMCID: PMC3384290.
- <a id="firth1957distrib">Firth, J.R.</a> (1957). "A synopsis of linguistic theory 1930-1955". Studies in Linguistic Analysis: 1–32. Reprinted in F.R. Palmer, ed. (1968). Selected Papers of J.R. Firth 1952-1959. London: Longman.