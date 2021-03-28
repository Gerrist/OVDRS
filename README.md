# OVDRS
(OpenbaarVervoerDataRepresentatieSpecificatie)

Het doel van OVDRS is om data op een compacte en flexibele manier op te slaan. Dit word onder andere gedaan door de gebruiker zelf te laten kiezen welke data er bij elkaar geraapt moet worden om zo een dataset te creëren die niet groter dan nodig is. Mis je features of wil je een bug melden? Maak dan een issue aan.

## Hoe genereer je een dataset?

**Voor je begint, zorg ervoor dat je voldoende werkgeheugen/swap geheugen hebt. Heb je dit niet? Dan zal het script waarschijnlijk crashen. Draai het script eventueel op een goedkope VPS met veel SWAP geheugen. Om je swapgeheugen te vergroten op Linux kan je het beste deze handleiding gebruiken: https://www.vultr.com/docs/setup-swap-file-on-linux**

1. Zorg ervoor dat je NodeJS en NPM geïnstalleerd en werkend hebt. 
   Gebruik je geen Mac OS/Linux? Installeer git bash en voer de instructies daar uit.
2. Clone deze repository naar je favoriete mapje.
3. Open een terminal in deze map en installeer alles met `npm install`
4. Voer `npm i typescript -g && npm i ts-node -g` uit.
5. Zorg ervoor dat je het `unzip` command kan uitvoeren.
6. Genereer je dataset met `sh compile.sh <YYYY-MM-DD>`. Zorg ervoor dat de data van deze datum in het huidige GTFS bestand van OpenOV/OVApi zit.
7. Na ongeveer twee minuten stampen krijg je een JSON bestandje (`<YYYY-MM-DD>.json`). Hierin zit alle data nodig die je nodig hebt om de dienstregeling van de door jouw gespecificeerde datum te verwerken.

Eventueel kun je testen in de browser door `ts-node web.ts` uit te voeren en naar `http://localhost:8888` gaan om de data in een gebruiksvriendelijke vorm te bekijken (zorg ervoor dat je in `web.ts` boven aan de juiste datum invult. Deze webserver en OVDRS verwerker draait volledig vanuit het geheugen maar heeft geen database systeem. Het verwerken van bestanden gaat dus niet optimaal. Het `web.ts` bestand kun je ook gebruiken als voorbeelden voor hoe je de data kan verwerken. Echte voorbeelden en documentatie volgt nog.


## Special thanks to:
### Jurian
For his automated CHB downloader script (https://github.com/jurb/NDOV-CHB-to-JSON)

## Disclaimer
Ook al zorg ik ervoor dat alles zo min mogelijk bugs bevat kan er altijd wat doorheen glippen. Daarom draai je alle scripts op eigen risico en kan ik niet verantwoordelijk gesteld worden voor eventuele schade die mijn scripts of deze handleiding aanrichten. Alle scripts zijn gratis te gebruiken. Ben je van plan om dit project in production te gaan gebruiken? Neem dan contact op met mij op Discord: `Pascal#4650`. Ook kan je hier terecht voor vragen over dit OVDRS. Bugs meld je echter niet via Discord maar via GitHub door een issue aan te maken.
