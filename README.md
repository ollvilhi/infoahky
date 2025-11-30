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

## Git-työnkulku

### Commit-editorin käyttö

Kun suoritat `git commit` tai `git merge` -komentoja ilman `-m`-parametria, Git avaa oletuseditorin viestin kirjoittamista varten. Tässä ohjeita yleisimpien editorien käyttöön:

#### Vim-editori (oletus monissa järjestelmissä)

1. **Kirjoita viesti**: Paina `i` siirtyäksesi insert-tilaan
2. **Tallenna ja poistu**: Paina `Esc`, kirjoita `:wq` ja paina `Enter`
3. **Poistu tallentamatta**: Paina `Esc`, kirjoita `:q!` ja paina `Enter`

#### Nano-editori

1. **Kirjoita viesti**: Kirjoita suoraan
2. **Tallenna ja poistu**: Paina `Ctrl+O` (tallenna), `Enter`, sitten `Ctrl+X` (poistu)

#### Editorin vaihtaminen

Voit vaihtaa Git-editorin helpommin käytettäväksi:

```bash
# Vaihda Nanoon (helpompi käyttää)
git config --global core.editor "nano"

# Vaihda VS Codeen (odottaa kunnes suljet tiedoston)
git config --global core.editor "code --wait"

# Vaihda Notepad++:aan (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

### Merge-konfliktien ratkaiseminen

1. **Konfliktin tunnistaminen**: `git status` näyttää konfliktitiedostot
2. **Konfliktin korjaaminen**: Avaa konfliktitiedostot ja poista `<<<<<<<`, `=======` ja `>>>>>>>` -merkinnät
3. **Merkitse ratkaistuksi**: `git add <tiedosto>`
4. **Viimeistele merge**: `git commit` (tai käytä `-m "viesti"` välttääksesi editorin)

## Lisenssi

Teknologiajohtamisen projektikurssit.
