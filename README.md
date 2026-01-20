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

## Cloud Agent -toiminnon käyttö

Cloud Agent on GitHub Copilotin ominaisuus, joka tarjoaa tekoälypohjaista apua koodaukseen ja projektinhallintaan suoraan VS Codesta tai GitHub Copilotista.

### Käyttöönotto

1. **Varmista, että sinulla on GitHub Copilot käytössä**
   - Tarvitset GitHub Copilot -tilauksen (Personal, Business tai Enterprise)
   - Asenna GitHub Copilot -laajennus VS Codeen

2. **Avaa projekti VS Codessa**
   ```bash
   cd infoahky
   code .
   ```

3. **Käynnistä Cloud Agent -istunto**
   - Paina `Ctrl+Shift+P` (tai `Cmd+Shift+P` Macissa)
   - Kirjoita "GitHub Copilot: Start Cloud Agent Session"
   - Tai käytä GitHub Copilot Chat -ikkunaa ja kysy apua

### Käyttöesimerkkejä InfoAHKY-projektin kanssa

#### 1. Uuden ominaisuuden lisääminen
```
Kysymys Cloud Agentille:
"Lisää uusi kategoria 'Talous' viesteihin ja päivitä käyttöliittymä"
```

Cloud Agent voi:
- Muokata `app-minimal.js` tiedostoa lisäten uuden kategorian
- Päivittää CSS-tyylit uudelle kategorialle
- Päivittää HTML-lomakkeen valinnat

#### 2. Koodin refaktorointi
```
Kysymys Cloud Agentille:
"Refaktoroi viestien tallennus käyttämään IndexedDB:tä localStorage:n sijaan"
```

Cloud Agent voi:
- Analysoida nykyisen localStorage-toteutuksen
- Ehdottaa IndexedDB-toteutusta
- Luoda migraatio-skriptin vanhoille viesteille

#### 3. Virheiden korjaus
```
Kysymys Cloud Agentille:
"Korjaa ongelma, jossa viestien päivämäärät eivät näy oikein Safarissa"
```

Cloud Agent voi:
- Tunnistaa selainyhteensopivuusongelmat
- Ehdottaa korjauksia
- Testata ratkaisun eri selaimilla

#### 4. Dokumentaation luominen
```
Kysymys Cloud Agentille:
"Luo JSDoc-dokumentaatio kaikille funktioille app-minimal.js-tiedostossa"
```

#### 5. Testien kirjoittaminen
```
Kysymys Cloud Agentille:
"Kirjoita yksikkötestit viestien CRUD-toiminnoille"
```

### Vinkkejä Cloud Agentin tehokkaaseen käyttöön

1. **Ole spesifinen**: Mitä tarkemmin kuvaat ongelman, sitä paremman ratkaisun saat
   - Huono: "Korjaa tämä"
   - Hyvä: "Muokkaa formatDate-funktiota näyttämään kellonajat 24h-muodossa"

2. **Kontekstin antaminen**: Kerro Cloud Agentille projektin rakenteesta
   - "Tämä on vanilla JavaScript -projekti ilman build-työkaluja"
   - "Käytämme localStorage-pohjaista tallennusta"

3. **Iteratiivinen kehitys**: Aloita pienistä muutoksista
   - Pyydä ensin yksinkertaista toteutusta
   - Pyydä sitten parannuksia ja optimointeja

4. **Koodikatselmukset**: Pyydä Cloud Agentilta arvioimaan koodiasi
   - "Katselmoikaa tämä funktio ja ehdottakaa parannuksia"
   - "Onko tässä koodissa tietoturvaongelmia?"

### Rajoitukset ja huomioitavaa

- Cloud Agent tarvitsee internet-yhteyden toimiakseen
- Vastaukset perustuvat julkiseen tietoon eikä yksityisiin repositorioihin (ellei erikseen sallittu)
- Tarkista aina generoitu koodi ennen käyttöönottoa
- Cloud Agent ei korvaa hyvää ohjelmointikäytäntöä ja testaamista

### Lisätietoja

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

## Lisenssi

Teknologiajohtamisen projektikurssit.
