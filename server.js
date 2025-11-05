import express from "express";
import fs from "fs";

const app = express();
const file = "./visitors.json";

if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ count: 0 }));

app.get("/count", (req, res) => {
  let data = JSON.parse(fs.readFileSync(file));
  data.count++;
  fs.writeFileSync(file, JSON.stringify(data));
  res.json({ count: data.count });
});

app.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync(file));
  res.send(`<h1>👀 Besucher: ${data.count}</h1>`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Counter läuft auf Port " + PORT));
