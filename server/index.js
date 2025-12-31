import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json({ limit: "1mb" }));

// CORS simple, ajuste via ALLOWED_ORIGINS (séparés par virgule)
const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  "https://kds.kelensitech.cloud,http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/health", (req, res) => res.json({ ok: true }));

function buildDemoReply(lang, message) {
  if (lang === "en") {
    return `Demo mode.
1) What is your main goal (automation, website, AI assistant)?
2) What tool do you use today (email, Google Sheets, CRM, none)?

3-step plan:
1) Define the scope and success metric
2) Build a small prototype and validate in 48h
3) Deploy and add tracking

Next action: reply with your goal and your current tool.`;
  }
  return `Mode démo.
1) Quel est ton objectif principal (automatisation, site web, assistant IA) ?
2) Quel outil utilises-tu aujourd’hui (email, Google Sheets, CRM, aucun) ?

Plan en 3 étapes :
1) Définir le périmètre et un indicateur de succès
2) Faire un petit prototype et valider en 48h
3) Déployer et ajouter le suivi

Prochaine action : réponds avec ton objectif et ton outil actuel.`;
}

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body?.message || "").toString().trim();
    const lang = (req.body?.lang || "fr").toString().toLowerCase() === "en" ? "en" : "fr";

    if (!message) return res.status(400).json({ error: "Missing message" });

    const apiKey = process.env.GEMINI_API_KEY;

    // Si la clé n'est pas encore mise, on renvoie une réponse démo pour ne pas bloquer le site
    if (!apiKey) {
      return res.json({
        mode: "demo",
        reply: buildDemoReply(lang, message),
      });
    }

    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

    const system =
      lang === "en"
        ? "You are the Kelensi Digital Solutions assistant. Ask 2 short clarifying questions, then propose a simple plan with 3 steps and a clear next action."
        : "Tu es l’assistant de Kelensi Digital Solutions. Pose 2 questions courtes de clarification, puis propose un plan simple en 3 étapes et une prochaine action claire.";

    const prompt = `${system}\n\nClient message:\n${message}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "";

    return res.json({
      mode: "gemini",
      reply: text,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Gemini call failed",
      details: String(e?.message || e),
    });
  }
});

// 404 propre
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log("KDS API listening on", port);
});
