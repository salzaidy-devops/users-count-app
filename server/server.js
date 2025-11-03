import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "db.json");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

function readDB() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users: [] }, null, 2));
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}
function writeDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

app.get("/api/users", (req, res) => {
  const { users } = readDB();
  res.json(users);
});

app.get("/api/users/count", (req, res) => {
  const { users } = readDB();
  res.json({ count: users.length });
});

app.post("/api/users", (req, res) => {
  const { firstName, lastName, email } = req.body || {};
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "firstName, lastName, email are required" });
  }
  const db = readDB();
  const user = {
    id: Date.now().toString(36),
    firstName,
    lastName,
    email,
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  writeDB(db);
  res.status(201).json(user);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
