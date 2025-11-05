import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const file = path.resolve("/tmp/visitors.json");

// Wenn Datei fehlt, mit 0 starten
function loadCount() {
  try {
    return JSON.parse(fs.readFileSync(file)).count;
  } catch {
    return 0;
  }
}

function saveCount(count) {
  fs.writeFileSync(file, JSON.stringify({ count }));
}

// Route für Zähler
app.get("/count", (req, res) => {
  let count = loadCount() + 1;
  saveCount(count);
  res.json({ count });
});

// Route für Anzeige
app.get("/", (req, res) => {
  res.send(`<h1>👀 Besucher: ${loadCount()}</h1>`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("✅ Besucherzähler läuft auf Port " + PORT));
