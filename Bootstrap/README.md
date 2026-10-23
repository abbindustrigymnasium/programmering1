# Bootstrap

Bootstrap är ett **CSS-bibliotek**, dvs en stor samling färdigskriven CSS (och lite JavaScript) som man kan använda på sin egen webbsida. Istället för att skriva all CSS själv lägger man till färdiga **klasser** på sina HTML-element.

## Varför använda ett CSS-bibliotek?

Du kan redan CSS och skulle kunna göra allt som Bootstrap gör själv. Men det tar lång tid att få en sida att se snygg ut, fungera i alla webbläsare och anpassa sig till både mobil och dator. Ett CSS-bibliotek ger dig:

- **Snabbhet** - knappar, menyer, formulär och kort är redan designade
- **Responsiv design** - sidan anpassar sig efter skärmstorleken nästan automatiskt
- **Enhetligt utseende** - samma färger, marginaler och typsnitt på hela sidan
- **Mindre egen CSS** - du skriver bara CSS för det som ska vara unikt för din sida

Bootstrap är ett av de mest använda CSS-biblioteken. Andra exempel är **Tailwind CSS** och **Bulma**. Vue-biblioteket **Quasar** som vi använder senare i kursen fungerar på ett liknande sätt.

### Huvudresurs

[Bootstrap 5 dokumentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

[W3Schools Bootstrap 5](https://www.w3schools.com/bootstrap5/)

---

## Innehåll

1. [Kom igång](#1-kom-igång)
2. [Hur Bootstrap fungerar](#2-hur-bootstrap-fungerar)
3. [Utility-klasser](#3-utility-klasser)
4. [Grid-systemet](#4-grid-systemet)
5. [Komponenter](#5-komponenter)
6. [Egen CSS tillsammans med Bootstrap](#6-egen-css-tillsammans-med-bootstrap)

---

## 1. Kom igång

Det enklaste sättet att använda Bootstrap är att länka in det från ett **CDN** (en server på internet som delar ut filerna). Du behöver inte ladda ner något.

```html
<!DOCTYPE html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Min Bootstrap-sida</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <h1>Hej Bootstrap!</h1>
      <button class="btn btn-primary">Klicka på mig</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

- `<link>` i `<head>` hämtar CSS-filen
- `<script>` längst ner i `<body>` hämtar JavaScript-filen. Den behövs bara för komponenter som gör något när man klickar, t.ex. menyer som fälls ut
- `<meta name="viewport">` behövs för att sidan ska se rätt ut på mobilen

### Resurser

- [Bootstrap Get Started](https://www.w3schools.com/bootstrap5/bootstrap_get_started.php)

---

## 2. Hur Bootstrap fungerar

Bootstrap är bara en vanlig CSS-fil med väldigt många **klass-selectorer**. När du skriver `class="btn btn-primary"` använder du klasserna `.btn` och `.btn-primary` som redan finns i Bootstrap.

Jämför att göra en knapp själv med att använda Bootstrap:

**Egen CSS:**

```html
<style>
  .min-knapp {
    background-color: #0d6efd;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .min-knapp:hover {
    background-color: #0b5ed7;
  }
</style>

<button class="min-knapp">Spara</button>
```

**Med Bootstrap:**

```html
<button class="btn btn-primary">Spara</button>
```

Resultatet blir nästan detsamma, men med Bootstrap behöver du inte skriva någon CSS alls.

Ett element har ofta **flera klasser** samtidigt, separerade med mellanslag. Varje klass gör en liten sak:

```html
<div class="card shadow p-3 mb-4 text-center">...</div>
```

**Tips:** Högerklicka på ett element i webbläsaren och välj **Inspektera**. Där ser du exakt vilken CSS som Bootstrap-klasserna lägger till.

---

## 3. Utility-klasser

Utility-klasser är små klasser som gör **en** sak, t.ex. lägger till marginal eller ändrar färg. Med dem kan du styla nästan allt direkt i HTML.

### Marginal och utfyllnad (spacing)

Formatet är `{egenskap}{sida}-{storlek}`:

| Del | Värden |
|-----|--------|
| Egenskap | `m` = margin, `p` = padding |
| Sida | `t` = top, `b` = bottom, `s` = start (vänster), `e` = end (höger), `x` = vänster + höger, `y` = topp + botten, ingenting = alla sidor |
| Storlek | `0`, `1`, `2`, `3`, `4`, `5` och `auto` (från ingen marginal till stor marginal) |

Exempel: `mt-3` = margin-top, `px-4` = padding vänster och höger, `p-0` = ingen padding, `mx-auto` = centrera horisontellt.

### Färger

Bootstrap har färdiga färgnamn som används överallt:

`primary` (blå), `secondary` (grå), `success` (grön), `danger` (röd), `warning` (gul), `info` (ljusblå), `light`, `dark`

- `text-danger` - röd text
- `bg-success` - grön bakgrund
- `btn-warning` - gul knapp
- `alert-info` - ljusblå meddelanderuta

### Text

- `text-center`, `text-start`, `text-end` - textjustering
- `fw-bold` - fet text
- `fs-1` till `fs-6` - textstorlek
- `text-uppercase` - versaler

### Flexbox

Du kan redan Flexbox från CSS. I Bootstrap finns det som klasser:

- `d-flex` - `display: flex`
- `justify-content-center`, `justify-content-between` - placering på huvudaxeln
- `align-items-center` - placering på tväraxeln
- `flex-column` - lägg elementen under varandra
- `gap-3` - mellanrum mellan elementen

```html
<div class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
  <span>Logga</span>
  <button class="btn btn-light">Logga in</button>
</div>
```

### Resurser

- [Bootstrap Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/)
- [Bootstrap Colors](https://getbootstrap.com/docs/5.3/utilities/colors/)
- [Bootstrap Flex](https://getbootstrap.com/docs/5.3/utilities/flex/)

---

## 4. Grid-systemet

Grid-systemet är det som gör Bootstrap responsivt. Det bygger på Flexbox och delar upp sidan i **12 kolumner**.

```html
<div class="container">
  <div class="row">
    <div class="col-4">Vänster</div>
    <div class="col-8">Höger</div>
  </div>
</div>
```

- `container` - centrerar innehållet och ger marginal på sidorna
- `row` - en rad
- `col-4` - tar 4 av 12 kolumner (en tredjedel), `col-8` tar 8 av 12 (två tredjedelar)
- `col` utan siffra - delar lika på platsen som finns kvar

### Olika skärmstorlekar (breakpoints)

Genom att lägga till en **breakpoint** i klassnamnet kan en kolumn ha olika bredd på olika skärmar:

| Breakpoint | Skärmbredd | Exempel |
|------------|------------|---------|
| (ingen) | alla skärmar | `col-12` |
| `sm` | ≥ 576px | `col-sm-6` |
| `md` | ≥ 768px | `col-md-4` |
| `lg` | ≥ 992px | `col-lg-3` |
| `xl` | ≥ 1200px | `col-xl-2` |

```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Kort 1</div>
  <div class="col-12 col-md-6 col-lg-4">Kort 2</div>
  <div class="col-12 col-md-6 col-lg-4">Kort 3</div>
</div>
```

Här tar varje kort hela bredden på mobilen (`col-12`), halva bredden på surfplatta (`col-md-6`) och en tredjedel på dator (`col-lg-4`).

**Tips:** Öppna utvecklarverktygen (F12) och klicka på mobil-ikonen för att testa olika skärmstorlekar.

### Resurser

- [Bootstrap Grid](https://getbootstrap.com/docs/5.3/layout/grid/)
- [W3Schools Bootstrap Grid](https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php)

---

## 5. Komponenter

Komponenter är färdiga delar av en webbsida. Det enklaste är att **kopiera exemplet från dokumentationen** och sedan ändra texten och klasserna.

| Komponent | Används till | Dokumentation |
|-----------|--------------|---------------|
| Buttons | Knappar | [Buttons](https://getbootstrap.com/docs/5.3/components/buttons/) |
| Alerts | Meddelanderutor | [Alerts](https://getbootstrap.com/docs/5.3/components/alerts/) |
| Card | Rutor med rubrik, text och bild | [Card](https://getbootstrap.com/docs/5.3/components/card/) |
| Navbar | Meny högst upp på sidan | [Navbar](https://getbootstrap.com/docs/5.3/components/navbar/) |
| Forms | Snygga inmatningsfält | [Forms](https://getbootstrap.com/docs/5.3/forms/overview/) |
| Tables | Tabeller | [Tables](https://getbootstrap.com/docs/5.3/content/tables/) |
| Badge | Små etiketter, t.ex. "Ny" | [Badge](https://getbootstrap.com/docs/5.3/components/badge/) |

Exempel på ett kort:

```html
<div class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">Temperatur</h5>
    <p class="card-text fs-1">21.5 °C</p>
    <a href="#" class="btn btn-primary">Uppdatera</a>
  </div>
</div>
```

Exempel på ett formulärfält:

```html
<div class="mb-3">
  <label for="namn" class="form-label">Namn</label>
  <input type="text" class="form-control" id="namn" placeholder="Skriv ditt namn" />
</div>
```

---

## 6. Egen CSS tillsammans med Bootstrap

Du kan fortfarande skriva egen CSS. Länka in din egen CSS-fil **efter** Bootstrap, då vinner dina regler om de krockar (kom ihåg *cascading* från CSS-avsnittet).

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<link href="style.css" rel="stylesheet" />
```

**Tumregel:** Använd Bootstrap-klasser för layout, marginaler och vanliga komponenter. Skriv egen CSS för det som ska vara unikt, t.ex. egna färger, bilder eller animationer.

---

## Övningar

- [Bootstrap Övningar](./Övningar/README.md)
