---
layout: post
type: post
title: "Pagmumuni ukol sa wika at kahulugan"
date: 2022-12-01
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

> *Why are you writing in Filipino?* I realized that there are some nuances and
examples that only the richness of Filipino can capture. These are also 
semi-public thoughts that aren't fully-formed yet, but I already want to put them out
there.  I might write a translation in the future, but for now, Google Translate
should give you a decent version.

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
basta yung literal na pagkakaayos ng mga salita o simbolo, ngunit pati yung
konteksto at karanasan ng bawat salitang sinambit ko. 

Dito naisip ko na baka may dalawang uri ng kahulugan: (1) **kahulugang
tekstuwal** na base lamang sa kung ano ang literal na nakasulat, at (2)
**kahulugang kumakatawan** na may pagtatangi sa konteksto at intensyon.
Interesado ako dito dahil sa kasulukuyan, may mga diskusyon kung may konsepto
nga ba ng pag-unawa ang mga *large language models* (LLMs) at hindi lamang ito
bunga ng numero at tsansa. 

Uunahan ko na: wala pa akong sagot. Ngunit gusto kong bumuo ng isang balangkas
para makipag-buno sa mga tanong na ito. Sa unang parte, susubukan kong bigyang hugis ang
isang modelo ng komunikasyon na inaangkop itong dalawang uri ng kahulugan.
Sa ikalawa, gagamitin ko ang balangkas na ito upang siyasatin ang iba't ibang diskurso
ukol sa LLMs.

## Part I: Tao po! 

Kung pupunta ako ngayon sa bahay mo pero hindi ko alam kung nasa loob ka, ang
gagawin ko siguro ay kakatok sa iyong pinto at sisigaw ng: "tao po!" Kakatok
ulit. Sisigaw: tao po! 

Kapag sinuri lang natin ang tekstuwal na kahulugan ng ekspresyong ito, hindi
ba kakaiba na dinedeklara natin ang ating pagkatao sa bawat katok? (O hindi
kaya tinatanong natin ang pagkatao ng nasa loob?) Hindi mo ito basta maisasalin
sa ibang wika. Kung nasa Amerika tayo ngayon, hindi tayo kakatok sa pinto at
sisigaw ng: *"I'm human!"* 

Ngunit tulad ng nabanggit ko, may isa pang nibel ng kahulugan. Dahil nasa
Pilipinas tayo, at alam mo ang **intensyon** ko, nakalugar ang "tao po!" sa
gawi na naiintidihan nating dalawa. Hindi na iba sa'yo kung may sumisigaw ng
kanyang pagkatao habang kumakatok dahil alam mo na isa itong paraan ng pagtawag.
Karaniwan lamang ito dahil umiiral sa lugar, panahon, at tradisyon ang wika
natin. Intensyon ang mahalagang sangkap ng kahulugang kumakatawan. Madalas ang
intensyong ito ay lagpas pa sa wika.

![](/assets/png/wika/actor_interlocutor_model.png){:width="600px" style="padding:10px"}  
__Fig:__ Proseso ng komunikasyon.
{:style="text-align: center;"}

<!--
Kung hihimayin natin ang interaksyong ito, ganito ang nangyayari *(A - Aktor,  K - Kausap)*:
1. **(A) Intensyon:** may intensyon akong nagsasalita&mdash;malaman kung nasa loob ka ng bahay.
2. **(A) Ekspresyon:** gamit ang kaalaman ko sa wika, pipili ako ng ekspresyon
    na tumpak sa aking intensyon. Hahanguin ko ang mga simbolong alam ko upang
    gumawa ng pangungusap. Dahil dito, ang sasabihin ko ay: "tao po!"
3. **(K) Pag-unawa:** gagamitin mo ang iyong karanasan at modelo ng mundo upang unawain ang aking intensyon. Nasasa-iyo kung ikaw ay tutugon.
4. **(A) Pag-pasya:** depende sa iyong tugon, maaari kong isipin kung naunawaan mo ba o hindi ang aking pagtawag.

-->

<!-- Bawat aktor ay may sariling pagtingin sa mundo na dumadaloy sa kanilang
indibidwal na konteksto, karanasan, at kasaysayan. Nagsisilbi itong sisidlan ng
kumakatawang kahulugan. Gamit ang salita at wika, nagagawa nating ihayag ang
ating pananaw at intensyon.  Nagiging batayan ng tekstuwal na kahulugan ang
literal na pagsambit nito. -->

Sa kasulukuyan, base sa tekstuwal na kahulugan ang karamihan sa mga
istatistikang modelo ng wika.  [Lumilikha sila ng mga ugnayan sa pagitan ng mga
salita o simbolo](/notebook/2021/12/11/word-vectors/). Mas maraming ugnayan ang
mabubuo kung mas marami ang uri at bilang ng tekstong ipinakita sa modelo.
Kadalasan ang mga tekstong ito ay inungkat mula sa *internet*, libro, diyaryo,
o *Wikipedia*.  Mula rito, natututunan ng modelo ang semantiko at gramatikong
estruktura ng wika.

Halimbawa, kung madalas magkasama ang mga salitang `jeepney` at `Pilipinas` sa
mga tekstong pinanglikha sa'ting modelo, magkakaroon ng malakas na
ugnayan ang dalawang ito. Para sa mga dalubwika, ang "pag-unawa" ng isang
istatistikang modelo ay bunga lamang ng semantikang probabilidad at
distribusyon. Kapag pinakita natin sa modelo ang pangungusap na, *"Binaba ako ng
jeepney sa Espa&ntilde;a,"* alam nito na ang simbolong `España` ay lugar sa
Pilipinas dahil sa pang-ukol na `sa` at sa kalapit na salitang `jeepney` na may
kaugnayan sa `Pilipinas`. Isang sayaw ng matematika. Maaari mong palitan ang
simbolong `España` ng kung ano man, `PeePeePooPoo`, at magkakaroon pa rin ito ng
tekstuwal na kahulugan. 

Taliwas ito sa teorya kung saan ginagamit ang wika bilang pantukoy sa mga
bagay na nagmemeron. Dito, ang simbolong `España` ay tumutukoy sa Espa&ntilde;a,
isang lugar na mahahanap mo, mapupuntahan mo, at mararanasan mo. Ayon sa teoryang ito,
hindi yung pang-ukol na `sa` at salitang `jeepney` ang nagbibigay kahulugan sa
`España`.  Ito yung mga karanasan ko nung binisita ang mga kaibigan sa UST, 
muntik nang ma-*stranded* sa baha, at nagpatila sa loob ng isang *fastfood
joint*. Kapag sinabi mo sa akin na binaba ka ng dyip sa *PeePeePooPoo*, hindi
kita maiintindihan, dahil ang kahulugan ng salita ay kumakatawan sa mga
parte ng meron. 

![](/assets/png/wika/espana.jpg){:width="500px" style="padding:10px"}  
{:style="text-align: center;"}

Muli, mayroon tayong (1) kahulugang tekstuwal na galing sa semantikang ugnayan
ng mga salita o simbolo at (2) kahulugang kumakatawan kung saan ginagamit ang 
salita bilang panturo sa meron. Walang
nakalalamang sa dalawa. Ginagamit natin pareho kapag natututo tayo ng wika.
Marahil hinango natin mula sa ating karanasan ang mga salitang `España`,
`jeepney` at `tao`, ngunit ginamit natin ang mga ugnayan nila para intindihin
ang iba pang salita tulad ng `at`, `sa`, `ng` at `ang`. Nagkataon lang na 
depende sa tekstuwal na kahulugan ang karamihan sa mga naglaganap na istatistikang
modelo ngayon.

![](/assets/png/wika/theory.png){:width="500px" style="padding:10px"}  
{:style="text-align: center;"}

Sana kahit papaano, nabigyang linaw ko ang dalawang uri ng kahulugan. May
tekstuwal na kahulugang nakabase sa mga interaksyon at relasyon ng mga simbolo.
Ginagamit ng mga dalubwika ang mga istatistikang modelo para paigtingin ang mga
ugnayang ito. Sa kabilang banda, may kahulugan na kumakatawan sa mga bagay na
may konteksto, karanasan, at kasaysayan. Dito, ginagamit ang mga salita at
simbolo bilang panturo sa mga konsepto at karanasang ito.

Aaminin ko na nilililok ko pa ang balangkas na ito. May mga parte na gusto ko
pang pakinisin at bigyang hugis. Ngunit masaya na ko sa aking progreso.  Sa
susunod na seksyon, susuriin ko ang iba't ibang diskurso patungkol sa mga
*large language models* (LLMs) gamit ang ating balangkas.

## Part II: May dalawang ugali sa diskurso ng Large Language Models

Malaking bahagi sa paglikha ng mga *large language models* (LLMs) ang pagpapakita ng
maraming teksto upang makabuo ng iba't ibang ugnayan sa pagitan ng mga
simbolo. Sa kasulukuyan, palaki ng palaki ang sukat ng *data* na ginagamit 
sa paglikha ng mga LLMs. Halimbawa, binuo ang GPT-3 gamit ang 45 TB na teksto mula sa
*internet* ([*CommonCrawl*](https://commoncrawl.org/)), mga kumento sa *Reddit*, mga libro,
at mga pahina ng *Wikipedia*. Isipin mo, nilikom natin
ang piraso ng kolektibong kaalaman ng mundo at gumawa ng mga ugnayang
higit pa sa tao. 

<!-- Ngunit katumbas ba nitong 45 TB na "kolektibong kaalaman" mula sa *Internet* ang
karanasan, konteksto, at kasaysayan ng tao? Dumadaloy ba sa parehong nibel ng
pag-unawa ang dalawa? Marahil mas maraming alam sa Espa&ntilde;a ang GPT-3 kaysa
sa akin ngunit, nauunawaan ba niya talaga ang lugar na ito?  -->

Nag-iiba ang daloy ng diskusyon sa oras na sinama natin ang laki ng *data* at
ang kakayahan ng mga LLMs ngayon. Kamakailan lang, nilabas ng
[OpenAI](https://openai.com) ang [ChatGPT](https://openai.com/blog/chatgpt),
isang LLM na [maaari mong makausap](https://chat.openai.com/auth/login).  Hindi
maipagkakaila ang husay ng modelong ito. Aaminin ko: parang tao nga ang kausap
ko. Nasasagot niya ang aking mga tanong at nakadaragdag pa ng konteksto. Parang
*magic*!

Naalala ko dati, pumunta ako sa *birthday party* ng isang kaibigan.  May payaso
na gumagawa ng *magic tricks*: yung baton nagiging bulaklak, tapos yung apoy
nagiging baraha! Ang galing! Ngunit klarong-klaro rin sa'king alalaala yung kuya
ng kaibigan ko. Sa bawat *magic trick*, pilit niyang pinapaliwanag ang mekanismo
nito:

"Ah, kasi yung bulaklak nasa loob talaga yan ng *stick*..."  
"Ah, yung baraha nasa manggas niya nakatago..."

Patalo. Bagaman may kabulagan ang paniniwala na naging bulaklak nga ang baton at
naging baraha ang apoy, mayroon ring katigasan sa pilit na pagtanggi sa
kakayahang gawin ito. May dalawang ugali sa panonood ng *magic show*, at sa
palagay ko katumbas nito ang mga ugali sa diskurso ng LLMs: **pagkamangha** at
**takot**. Gusto ko silang pag-usapan sa konteksto ng *kalabisan*. Napapansin ko
ngayon na may labis na pagkamangha at labis na katigasan kapag pinag-uusapan ang mga
LLMs.



### Labis na pagkamangha

May grupo ng mga dalubhasang nagsasabi na may konsepto *na* ng pag-unawa ang mga
LLMs: "Tingnan mo! Para siyang tao, nauunawaan niya ang sinasabi ko!" Ganito ang
nangyayari: tinuturing nating ebidensiya ng pag-unawa ang mahusay na paglikha ng
kahulugang tekstuwal. 

Dahil kaya ng LLM na bumuo ng mga pangungusap, iniisip na natin na may konteksto
at karanasan ito at bagkus, may konsepto na ng pag-unawa. Ngunit may panganib ng
pagkabulag dito:

- Nakalilimutan natin na ang kakayahan ng mga LLMs ay limitado sa uri at klase ng teksto
    na ginamit para likhain ito. Ang mga ugnayang nakapaloob sa modelo ay base lamang
    sa mga simbolo at salita na mayroon sa bawat teksto.
- Minsan tinutumbas natin ang kabuuan ng impormasyon sa *Internet* bilang
    kabuuang kaalaman ng mundo. Bale kung may kakulangan sa kakayahan ng mga LLMs,
    ang soluyson ay dagdagan ang uri ng *data*. Ika nga, *scale is all you need*. Sa
    palagay ko may katamaran rin dito.  Mas madaling maglikom ng *data* upang ibato sa
    modelo kaysa saliksikin kung ano nga ba ang pag-unawa. 
- Ano kayang modelo ng mundo ang nabubuo kung nalipon natin ang lahat ng teksto
    sa *Internet* ngayon? Patas ba ito sa bawat grupo, wika, at nasyon? Bagaman
    parang tao, may malamig at kalkuladong mekanismo pa rin ang mga LLMs batay
    sa numero. Ngayon, may pananaliksik tungkol sa *low-resource languages*, o
    mga wika na kulang sa *data*. Karamihan ng mga LLMs ay may pagkiling sa mga
    wikang maraming *data* tulad ng Ingles at Aleman. Hindi ito gumagana kapag hinarap mo sa
    wikang Filipino o Indonesian.

Sa larangang ito, gusto ko ang paraan ng pagtatanong nina [Yejin
Choi](https://homes.cs.washington.edu/~yejin/): papaano natin mabibigyan ng
sentido komun (*common sense*) ang mga LLMs? Ihinahalintulad niya ang mga modelo
gaya ng GPT-3 sa batang pinalaki sa loob ng silid-aklatan. Mababasa niya lahat
ng libro doon, ngunit, handa ba siyang lumabas at makihalubilo sa mundo? 

<!-- conclusion -->
May lugar ang pagkamangha. Tinutulak tayo nito upang palawigin pa ang pag-unawa
sa bagay na hinahangaan. Ngunit kung aasa lamang tayo sa pagkamangha, sa ibang
direksyon tayo tatahakin ng ating mga paa. Para tayong mga bulag na naglalakad
patungo sa liwanag, ngunit di natin alam na apoy pala iyon.


### Labis na pagkatakot

May grupo rin ng mga dalubhasang nagsasabi na walang pag-unawa ang mga
LLMs&mdash;lahat ay hango lamang sa numero at tsansa. Bagaman may bahid ng
katotohanan dito, inuunahan na kaagad natin na wala; hindi na tinitingnan ang
posibilidad na baka may maituro ang mga modelong ito sa'tin.

Hinahalintulad ko ang ugaling ito sa takot. Hindi yung takot na nakikita mo sa
mga *horror flicks*: yung may sumisigaw at tumatakbo. Sa palagay ko ito yung
takot na nagbubunga ng katigasan ng ulo. Isang takot na tumatalikod sa mga bagay
na hindi naiintindihan. Pinipilit ipagkasya ang *phenomena* sa mga konseptong
alam na. Mala-*Eldritch* kumabaga. May panganib rin dito:

- *The kraken is loose!* Hindi maitatanggi ang realidad na laganap na ang mga
    LLMs sa ating lipunan. May pag-unawa man o wala, nakaaapekto na ito sa buhay ng
    tao. Hindi na epektibo ang patuloy na pagpapaaalala na istatistika lamang ang
    mga ito. Sa ngayon, pahirap na ng pahirap ang pagtukoy kung ang teksto ay
    isinulat ng isang modelo o ng isang tao. 
- May natatanging karunungan pa rin ang mga istatistikang modelo. Bagaman kaya
    nating ipaliwanag ang kanilang mekanismo bilang ugnayan ng mga simbolo, *black
    box* pa ring maituturing ang mismong mga ugnayang ito. Sa palagay ko, isang
    klase ng reduksiyon ang paggigiit na numero at tsansa lamang ang kabuuan ng mga
    LLMs.
    
Aaminin ko na mas kumikiling ako sa ugaling ito. May parte pa rin sa aking
nagpupumilit na dulot lamang ng probabilidad ang resulta ng mga LLMs ngayon.
Naiintindihan ko ang maingat na paraan nina [Emily
Bender](https://faculty.washington.edu/ebender/) sa pagsiyasat sa mga tanong na
ito. Dahil na rin siguro sa kanyang pagsasanay bilang dalubwika, hindi maiiwasan
na sa lenteng ito niya nahuhusgahan ang mga LLMs.

May lugar ang pagkatakot. Ngunit maaari rin tayong manigas dahil sa labis na
pangamba&mdash;ni hindi na tayo makagalaw o makausad. Para tayong mga pilay na
hindi makalakad at sumisigaw lang sa liwanag.


## Konklusyon: banayad na paglapit



Sa sanaysay na ito sinubukang kong makipagbuno sa tanong na: nakauunawa ba ang
mga *large language models?* Una, pinalalim ko ang depinisyon ng pag-unawa sa
pamamagitan ng pagtukoy sa dalawang uri ng kahulugan: tekstuwal at kumakatawan.
Ang kahulugang tekstuwal ay base sa literal na teksto at sa ugnayan ng mga
simbolo. Sa kabilang banda, ang kahulugang kumakatawan ay base sa salita bilang
pantukoy sa meron. Karamihan ng mga istatistikang modelo ng wika ay base sa tekstuwal
na kahulugan.

Pagkatapos, ginamit ko ang balangkas na ito upang siyasatin ang dalawang
kalabisan sa diskurso ng mga LLMs: pagkamangha at pagkatakot. Parehong may
panganib na dulot ang dalawa. Inamin ko rin na mas nakakiling ako sa emosyon ng
pagkatakot.

Sa huli, naniniwala ako na ang tamang asta pagdating sa diskurso ng pag-unawa ay
isang **banayad na paglapit**. Hindi napupuno ng pagkamangha o pagkatakot.
Saktong mangha na makakagalaw ka at saktong pangamba na hindi ka nasisilaw
patungo sa liwanag. Anong ibig sabihin nito? Sa palagay ko:

- Kapag nakikipag-diskurso, kailangang linawin kung anong klaseng kahulugan ang
    tinutukoy mo. Tekstuwal ba o kumakatawan? Malaking bahagi sa alitan ng mga
    akademiko ang kakulangan ng *working definition* o maayos na balangkas.
- Tanggapin na baka, hindi lang sa larangan ng wika (*linguistics*) mahahanap ang sagot
    patungkol sa kahulugan. Maaaring may sikolohikal at *neuroscientific* na paraan
    para siyasatin ito. Huwag makulong sa isa o dalawang lente ng pananaliksik; at
- Mas bigyang pansin ang pagsisiyasat sa kakayahan ng mga LLMs rumason at
    magpaliwanag. Bilang mga *black boxes*, hirap pa rin tayong ipaliwanag kung
    papaano binubuo ang mga ugnayan sa pagitan ng mga simbolo. 

Muli, isang banayad na paglapit. Aaminin kong nakapupukaw ng imahinasyon ang mga
LLMs ngayon. Ngunit, mahalaga pa ring tiyakin na nilalapit tayo ng teknolohiyang
ito sa Meron.







## References

- <a id="firth1957distrib">Firth, J.R.</a> (1957). "A synopsis of linguistic theory 1930-1955". Studies in Linguistic Analysis: 1–32. Reprinted in F.R. Palmer, ed. (1968). Selected Papers of J.R. Firth 1952-1959. London: Longman.
- <a id="bender2020nlu">Emily M. Bender and Alexander Koller.</a> 2020. Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data. In *Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics*, pages 5185–5198, Online. Association for Computational Linguistics.
- <a id="manning2022human">Manning, Christopher D.</a>2022. Human Language Understanding & Reasoning. In *Daedalus, the Journal of the American Academy of Arts & Sciences*

