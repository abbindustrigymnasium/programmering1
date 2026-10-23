# Firebase Övningar

**Instruktion:** Övningarna bygger vidare på exempelkoden i mappen [Exempel](../) (`index.html`, `index.js` och `led_firebase_communication.ino`). Börja med att få exemplet att fungera med **ditt eget** Firebase-projekt, dvs byt ut `firebaseConfig` i `index.js` och `FIREBASE_HOST`/`FIREBASE_AUTH` i Arduino-koden. Gör sedan övningarna i ordning och ladda upp ändringarna till Github efter varje övning.

---

## Hur fungerar Firebase Realtime Database?

Firebase Realtime Database är en databas i molnet där all data sparas som **ett enda stort JSON-träd**. Det finns inga tabeller som i en SQL-databas, utan bara nycklar och värden som kan ligga i varandra, precis som ett JavaScript-objekt.

```json
{
  "led": {
    "led": true
  },
  "counter": 5,
  "sensor": {
    "temperatur": 21.5,
    "luftfuktighet": 40
  }
}
```

Man pekar ut var i trädet man vill läsa eller skriva med en **sökväg** (path), ungefär som mappar på datorn. Sökvägen `/sensor/temperatur` ger värdet `21.5` och sökvägen `/sensor` ger hela objektet `{ temperatur: 21.5, luftfuktighet: 40 }`.

Det som gör databasen speciell är att den är **realtid**. En webbsida kan *lyssna* på en sökväg och får direkt ett meddelande när värdet ändras, utan att man behöver ladda om sidan. Så här hänger delarna ihop i vårt projekt:

```
 ESP8266  ── skriver/läser ──►  Firebase Realtime Database  ◄── skriver/lyssnar ──  Webbsida
 (Arduino)                       (JSON-träd i molnet)                               (JavaScript)
```

ESP8266 och webbsidan pratar alltså aldrig direkt med varandra. Båda läser och skriver till samma ställe i databasen.

### De viktigaste funktionerna

**På webbsidan (JavaScript):**

| Kod | Vad den gör |
|-----|-------------|
| `db.ref("sensor")` | Skapar en referens (pekare) till sökvägen `/sensor`. |
| `ref.set(värde)` | Skriver över allt som finns på sökvägen med det nya värdet. |
| `ref.update({ nyckel: värde })` | Ändrar bara de nycklar du skickar med, resten lämnas orört. |
| `ref.push(värde)` | Lägger till ett nytt barn med en unik, automatisk nyckel (bra för listor/historik). |
| `ref.once("value").then(...)` | Hämtar värdet **en gång**. |
| `ref.on("value", (snapshot) => ...)` | Lyssnar och körs **varje gång** värdet ändras. |
| `snapshot.val()` | Ger själva datan från en snapshot. |

**På ESP8266 (Arduino, biblioteket Firebase-ESP8266):**

| Kod | Vad den gör |
|-----|-------------|
| `Firebase.setInt(firebaseData, "/sökväg", 5)` | Skriver ett heltal. Finns även `setFloat`, `setBool` och `setString`. |
| `Firebase.getInt(firebaseData, "/sökväg")` | Hämtar ett heltal. Finns även `getFloat`, `getBool` och `getString`. Returnerar `true` om det gick bra. |
| `firebaseData.intData()` | Värdet som hämtades. Finns även `floatData()`, `boolData()` och `stringData()`. |
| `firebaseData.dataType()` | Vilken typ värdet i databasen har, t.ex. `"int"`, `"boolean"` eller `"string"`. |
| `firebaseData.errorReason()` | Felmeddelande om något gick fel. Skriv ut det i Serial Monitor när du felsöker! |

### Regler (Rules)

Under fliken **Rules** i Firebase-konsolen bestämmer man vem som får läsa och skriva. Om du skapade databasen i *test mode* är den öppen för alla i 30 dagar och sedan slutar den fungera. Får du felet `Permission denied` behöver du uppdatera reglerna.

### Tips

Ha alltid Firebase-konsolen öppen (fliken **Data** under Realtime Database) när du jobbar. Där ser du live vad som händer i databasen, och du kan själv ändra värden för att testa din kod.

---

## Övning 1 - Uppdatera lampan i realtid

**Mål:** Förstå skillnaden mellan `once` och `on`.

**Uppgift:**

- Öppna webbsidan och Firebase-konsolen bredvid varandra
- Ändra värdet för `/led/led` manuellt i Firebase-konsolen från `true` till `false`. Vad händer på webbsidan?
- Just nu läser sidan bara lampans värde **en gång** när den laddas (`ledRef.once`). Det finns redan en lyssnare (`ledRef.on`) i `index.js` men den gör ingenting med datan
- Flytta koden som sätter checkboxen och bilden till `ledRef.on` så att sidan uppdateras direkt när värdet ändras i databasen
- Testa med två webbläsarfönster samtidigt. Om du slår på lampan i det ena ska den tändas i det andra också

**Frågor att besvara:**

- Vad är skillnaden mellan `once` och `on`?
- Behövs `ledRef.once` längre när du har `ledRef.on`? Varför/varför inte?

---

## Övning 2 - Laga räknaren hela vägen

**Mål:** Förstå sökvägar och datatyper i databasen.

**Uppgift:**

- Skriv in ett tal i fältet och klicka på **Change Counter**. Titta i Firebase-konsolen var värdet hamnar och vilken typ det har (tal eller text?)
- Titta i Arduino-koden. Vilken sökväg läser ESP8266 från, och vilken typ förväntar den sig?
- Ändra webbsidan så att räknaren sparas som ett **tal** på den sökväg som Arduino-koden läser från
- Kontrollera i Serial Monitor att ESP8266 skriver ut rätt värde
- ESP8266 sätter räknaren till `60` efter att den läst den. Lägg till en lyssnare på webbsidan som visar räknarens nuvarande värde i ett element, t.ex. `<p id="counterValue">`, så att du ser när ESP8266 ändrar det

**Tips:**

- `input.value` ger alltid en sträng. Använd `Number()` för att göra om den till ett tal
- Fundera på skillnaden mellan `counterRef.update({ counter: ... })` och `counterRef.set(...)`

**Frågor att besvara:**

- Varför fungerade inte räknaren från början?
- Vad blir sökvägen när man gör `update({ counter: 5 })` på referensen `db.ref("counter")`?

---

## Övning 3 - Skicka temperatur från ESP8266

**Mål:** Skicka sensorvärden från ESP8266 till Firebase och visa dem på webbsidan.

**Uppgift:**

- Koppla in DHT11-sensorn enligt [ESP8266 Övning 2](../../../ESP8266/övningar/övning2-luftfuktighet.md) och lägg till sensorkoden i `led_firebase_communication.ino`
- Ta bort raden som skriver till `/Room/2022-10-25/Temp/1210`, den behövs inte längre
- Skicka temperatur och luftfuktighet till Firebase var 5:e sekund, till sökvägarna `/sensor/temperatur` och `/sensor/luftfuktighet`
- Kontrollera i Firebase-konsolen att värdena uppdateras
- Visa temperatur och luftfuktighet på webbsidan. Värdena ska uppdateras automatiskt utan att man laddar om sidan

**Tips:**

- Använd `Firebase.setFloat(firebaseData, "/sensor/temperatur", temperatur);`
- Kolla om `setFloat` returnerar `false`, i så fall kan du skriva ut `firebaseData.errorReason()` i Serial Monitor
- På webbsidan räcker det med **en** lyssnare på `db.ref("sensor")`, då får du både temperatur och luftfuktighet i samma `snapshot.val()`

**Frågor att besvara:**

- Vad händer i databasen om sensorn inte går att läsa av (värdet blir `NaN`)? Hur kan du undvika att skicka felaktiga värden?

---

## Övning 4 - Styr ESP8266 med ett gränsvärde från webben

**Mål:** Hämta inställningar från Firebase till ESP8266.

**Uppgift:**

- Lägg till ett `<input type="number">` och en knapp på webbsidan där man kan ange en **maxtemperatur**
- Spara värdet som ett heltal på sökvägen `/installningar/maxTemp`
- Låt ESP8266 hämta `maxTemp` från Firebase i varje varv i `loop()`
- Om temperaturen är högre än `maxTemp` ska lysdioden tändas, annars ska den vara släckt
- Visa på webbsidan om temperaturen är över gränsen, t.ex. med röd text eller en varningsruta
- Testa genom att sätta gränsvärdet strax under rumstemperaturen och värm sensorn med handen

**Tips:**

- Använd `Firebase.getInt(...)` och `firebaseData.intData()` för att hämta värdet
- Kom ihåg att lysdioden redan styrs av `/led/led` i exemplet. Bestäm vad som ska gälla. Ska webbsidans knapp eller gränsvärdet bestämma, eller vill du ha en knapp för att växla mellan *manuellt* och *automatiskt* läge?

---

## Övning 5 - Mätintervall från webben

**Mål:** Göra ESP8266 mer flexibel genom att styra den från databasen.

**Uppgift:**

- Just nu skickar ESP8266 ett nytt värde var 5:e sekund (`delay(5000)`)
- Lägg till ett fält på webbsidan där man kan välja mätintervall i sekunder och spara det på `/installningar/intervall`
- Låt ESP8266 hämta intervallet från Firebase och använda det istället för `5000`
- Om värdet saknas eller är orimligt (t.ex. `0` eller negativt) ska ESP8266 använda 5 sekunder som standard

**Frågor att besvara:**

- Varför kan det vara en dålig idé att låta användaren välja ett intervall på 0,1 sekunder?

---

## Övning 6 - Spara historik

**Mål:** Använda `push` för att spara en lista med mätvärden och visa de senaste på webbsidan.

**Uppgift:**

- Förutom att uppdatera `/sensor/temperatur` ska ESP8266 också spara varje mätning i en lista under `/historik`, så att gamla värden inte skrivs över
- Varje mätning ska innehålla temperatur, luftfuktighet och en tidsstämpel
- Visa de **10 senaste** mätningarna i en tabell eller lista på webbsidan
- Visa även lägsta, högsta och medeltemperatur för de mätningar som visas

**Tips:**

- I Arduino-biblioteket finns `Firebase.pushJSON(firebaseData, "/historik", json)` där `json` är ett `FirebaseJson`-objekt. Läs i [dokumentationen för biblioteket](https://github.com/mobizt/Firebase-ESP8266) hur man skapar ett sådant och hur man lägger till en tidsstämpel från servern (`timestamp`)
- På webbsidan kan du använda `db.ref("historik").limitToLast(10).on("value", ...)`
- Använd `snapshot.forEach((child) => { ... })` för att gå igenom varje mätning i ordning
- `new Date(tidsstampel).toLocaleString()` gör om en tidsstämpel till läsbar tid

**Frågor att besvara:**

- Vad är skillnaden mellan `set` och `push`?
- Hur ser nycklarna ut som `push` skapar? Varför tror du att de ser ut så?

---

## Extrauppgifter

- **Diagram:** Visa historiken som ett linjediagram med t.ex. [Chart.js](https://www.chartjs.org/)
- **Online-status:** Låt ESP8266 skriva när den senast skickade ett värde. Visa på webbsidan "Senast uppdaterad för X sekunder sedan" och en varning om ESP8266 inte har hört av sig på över en minut
- **Flera rum:** Bygg om databasstrukturen så att flera ESP8266 kan skicka till samma databas, t.ex. `/rum/klassrum1/temperatur` och `/rum/klassrum2/temperatur`, och visa alla rum på webbsidan
