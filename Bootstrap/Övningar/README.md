# Bootstrap Övningar

## Instruktioner

**Filstruktur:**

1. Skapa en HTML-fil för varje övning: `bootstrap-övning1.html`, `bootstrap-övning2.html`, etc.
2. Länka in Bootstrap via CDN enligt avsnittet [Kom igång](../README.md#1-kom-igång)
3. Försök använda Bootstrap-klasser istället för egen CSS så långt det går
4. Testa dina lösningar i webbläsaren, både i full storlek och i mobilläge (F12 → mobil-ikonen)
5. Ladda upp alla filer till GitHub när du är klar

**Extra träning:**
[W3Schools Bootstrap 5 Exercises](https://www.w3schools.com/bootstrap5/bootstrap_exercises.php)

---

## Övning 1 - Kom igång med Bootstrap

**Mål:** Länka in Bootstrap och se skillnaden mot vanlig HTML.

**Uppgift:**

1. Skapa en HTML-fil med koden nedan **utan** Bootstrap och öppna den i webbläsaren
2. Länka in Bootstrap och ladda om sidan. Vad ändrades?
3. Lägg allt innehåll i en `<div class="container">`
4. Gör om knapparna till Bootstrap-knappar med olika färger (`btn btn-primary`, `btn btn-danger` osv.)
5. Gör om tabellen till en Bootstrap-tabell med randiga rader (`table table-striped`)

**HTML-kod att använda:**

```html
<h1>Min första Bootstrap-sida</h1>
<p>Det här är en helt vanlig HTML-sida som vi ska göra snyggare.</p>

<button>Spara</button>
<button>Ta bort</button>
<button>Avbryt</button>

<table>
  <tr>
    <th>Rum</th>
    <th>Temperatur</th>
  </tr>
  <tr>
    <td>Klassrum 1</td>
    <td>21.5 °C</td>
  </tr>
  <tr>
    <td>Klassrum 2</td>
    <td>19.8 °C</td>
  </tr>
  <tr>
    <td>Labbet</td>
    <td>23.1 °C</td>
  </tr>
</table>
```

**Frågor att besvara:**

- Vad hände med texten och typsnittet när du bara länkade in Bootstrap?
- Inspektera en knapp i webbläsaren. Vilka CSS-egenskaper lägger klassen `btn` till?

---

## Övning 2 - Styla med utility-klasser

**Mål:** Använda utility-klasser för marginal, färger, text och Flexbox utan att skriva egen CSS.

**Uppgift:**

Bygg en profilsida med HTML-koden nedan. Du får **inte** skriva någon egen CSS, bara lägga till Bootstrap-klasser.

1. Ge sidhuvudet (`<header>`) mörk bakgrund, vit text och padding
2. Använd Flexbox-klasser så att namnet hamnar till vänster och knappen till höger i sidhuvudet
3. Centrera profilrutan på sidan och ge den en maxbredd, ramar, rundade hörn och skugga (sök på *Borders* och *Shadows* i dokumentationen)
4. Centrera texten i profilrutan och gör namnet fetstilt
5. Lägg knapparna längst ner bredvid varandra med mellanrum (`gap`) och centrera dem
6. Ge alla delar lagom med marginal och padding

**HTML-kod att använda:**

```html
<header>
  <span>Min profil</span>
  <button>Logga ut</button>
</header>

<div>
  <h2>Kim Andersson</h2>
  <p>Teknikprogrammet, årskurs 1</p>
  <p>Gillar programmering, elektronik och fotboll.</p>
  <div>
    <button>Följ</button>
    <button>Skicka meddelande</button>
  </div>
</div>
```

**Tips:**

- `mx-auto` centrerar ett element som har en bredd
- `style="max-width: 400px"` är okej att använda för maxbredden

---

## Övning 3 - Responsiv layout med grid

**Mål:** Förstå grid-systemet och breakpoints.

**Uppgift:**

Skapa en sida som visar **sex kort** med olika sensorer (t.ex. Temperatur, Luftfuktighet, Ljus, Ljud, Rörelse, Luftkvalitet). Varje kort ska ha en rubrik, ett värde och en knapp.

Kortens layout ska ändras beroende på skärmens bredd:

```
Mobil (< 768px)        Surfplatta (≥ 768px)      Dator (≥ 992px)

┌──────────────┐       ┌──────┐ ┌──────┐         ┌────┐ ┌────┐ ┌────┐
│    Kort 1    │       │  1   │ │  2   │         │ 1  │ │ 2  │ │ 3  │
└──────────────┘       └──────┘ └──────┘         └────┘ └────┘ └────┘
┌──────────────┐       ┌──────┐ ┌──────┐         ┌────┐ ┌────┐ ┌────┐
│    Kort 2    │       │  3   │ │  4   │         │ 4  │ │ 5  │ │ 6  │
└──────────────┘       └──────┘ └──────┘         └────┘ └────┘ └────┘
      ...              ┌──────┐ ┌──────┐
                       │  5   │ │  6   │
                       └──────┘ └──────┘
```

1. Använd `container`, `row` och `col-*` med rätt breakpoints
2. Använd komponenten `card` för varje kort
3. Se till att det finns mellanrum mellan korten, både i sidled och höjdled (`g-3` på `row` eller `mb-3` på korten)
4. Testa i mobilläge i utvecklarverktygen att layouten ändras

**Frågor att besvara:**

- Varför är det 12 kolumner i grid-systemet och inte t.ex. 10? (Tips: vilka tal går 12 att dela med?)
- Hur hade du gjort samma layout med vanlig CSS? Vilket sätt är enklast?

---

## Övning 4 - Dashboard till temperaturprojektet

**Mål:** Använda Bootstrap i ett riktigt projekt.

**Uppgift:**

Gör om webbsidan i [Projekt-Temperatur-Sensor/Exempel](../../Projekt-Temperatur-Sensor/Exempel/) till en snygg dashboard med Bootstrap. Funktionen ska vara densamma, bara utseendet ska ändras.

1. Kopiera `index.html`, `index.js` och bilderna till en egen mapp
2. Länka in Bootstrap och ta bort `index.css`
3. Lägg till en `navbar` högst upp med projektets namn
4. Lägg lampan och strömbrytaren i ett `card`. Använd Bootstraps strömbrytare (`form-check form-switch`) istället för den egna
5. Lägg räknaren i ett eget `card` och använd `form-control` för fältet och `btn` för knappen (sök på *Input group* i dokumentationen)
6. Använd grid så att korten ligger bredvid varandra på dator och under varandra på mobilen
7. Kontrollera att lampan och räknaren fortfarande fungerar mot Firebase

**Tips:**

- Behåll samma `id` på elementen, annars hittar inte `index.js` dem
- Strömbrytaren i Bootstrap ser ut så här:

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="checkbox" onclick="turnOnOffLight()" />
  <label class="form-check-label" for="checkbox">Lampa</label>
</div>
```

**Extra:** Har du gjort [Firebase-övningarna](../../Projekt-Temperatur-Sensor/Exempel/Övningar/README.md)? Lägg då till kort för temperatur och luftfuktighet, och visa historiken i en Bootstrap-tabell.
