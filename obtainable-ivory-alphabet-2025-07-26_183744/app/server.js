const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const query = req.query.q || "";
  res.send(`
    <!DOCTYPE html>
    <html lang="cs">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Obtainable Search</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
        }

        h1 {
          font-size: 2.5em;
          color: #202124;
          margin-bottom: 20px;
        }

        form {
          width: 100%;
          max-width: 500px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        input[type="text"] {
          flex-grow: 1;
          padding: 12px 15px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 12px 20px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #1669c1;
        }

        .results {
          margin-top: 40px;
          max-width: 600px;
          width: 100%;
        }

        .results h2 {
          font-size: 1.2em;
          margin-bottom: 10px;
          color: #444;
        }

        .results p {
          font-size: 16px;
          background-color: #fff;
          padding: 12px;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <h1>Vyhledávání</h1>
      <form method="GET" action="/">
        <input type="text" name="q" placeholder="Hledat něco..." value="${query}" required>
        <button type="submit">Hledat</button>
      </form>

      ${
        query
          ? `<div class="results">
              <h2>Výsledky hledání:</h2>
              <p>${query}</p>
            </div>`
          : ""
      }

    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Zranitelná stránka oběti běží na portu", port);
});