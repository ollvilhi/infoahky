# InfoAHKY - Organisaation Teksti-TV

Minimalistinen tiedotusnäyttö ja uutissivu organisaatiokäyttöön. Suunniteltu infonäytöille ja mobiiliselaimille.

## Kuvaus

InfoAHKY on moderni teksti-TV-tyylinen tiedotussovellus, joka on inspiroitu suomalaisesta YLE Teksti-TV:stä ja muista teletext-järjestelmistä. Sovellus on tarkoitettu organisaatioiden sisäiseen viestintään.

## Ominaisuudet

- 📺 **Klassinen teksti-TV-ulkoasu** - Tumma tausta, selkeät värit, monospace-fontti
- 📝 **Viestien hallinta** - Käyttäjät voivat lisätä, muokata ja poistaa viestejä
- 📂 **Kategoriat** - Uutiset ja tiedotteet omilla sivuillaan
- ⌨️ **Näppäinohjaus** - Numeronäppäimillä 1-4 voi navigoida
- 📱 **Responsiivinen** - Toimii infonäytöillä ja mobiililaitteilla
- 💾 **Paikallinen tallennus** - Viestit tallentuvat selaimen localStorage:en

## Käyttö

1. Avaa `index.html` selaimessa
2. Navigoi sivujen välillä:
   - **100 ETUSIVU** - Yhteenveto ja viimeisimmät viestit
   - **200 UUTISET** - Uutisviestit
   - **300 TIEDOTTEET** - Tiedoteviestit
   - **400 LISÄÄ VIESTI** - Uuden viestin lisääminen

### Näppäinkomennot

| Näppäin | Toiminto |
|---------|----------|
| 1 | Etusivu (100) |
| 2 | Uutiset (200) |
| 3 | Tiedotteet (300) |
| 4 | Lisää viesti (400) |
| ESC | Sulje lomake |

## Teknologia

- HTML5
- CSS3 (ei ulkoisia riippuvuuksia)
- Vanilla JavaScript
- localStorage viestien tallennukseen

## Kehitys

Tämä on yksinkertainen staattinen verkkosovellus, joka ei vaadi palvelinta tai build-prosessia. Avaa vain `index.html` selaimessa.

```bash
# Esimerkki: Käynnistä yksinkertainen HTTP-palvelin (valinnainen)
python -m http.server 8000
# Avaa selaimessa: http://localhost:8000
```

## Lisenssi

Teknologiajohtamisen projektikurssit.
