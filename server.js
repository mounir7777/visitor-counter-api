import express from "express";
import fs from "fs";

const app = express();
const FILE = "visitors.json";

// Besucherzahl laden oder 0 setzen
let count = 0;
if (fs.existsSync(FILE)) {
  try {
    count = JSON.parse(fs.readFileSync(FILE)).count || 0;
  } catch {
    count = 0;
  }
}

// Besucher +1
app.get("/count", (req, res) => {
  count++;
  fs.writeFileSync(FILE, JSON.stringify({ count }));
  res.json({ count });
});

// Hauptseite
app.get("/", (req, res) => {
  res.send(`<h1>👀 Besucher: ${count}</h1>`);
});

// Starten
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("✅ Besucherzähler läuft auf Port " + PORT)
);
