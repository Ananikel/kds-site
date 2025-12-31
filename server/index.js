import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = express()
app.use(express.json({ limit: "1mb" }))

app.get("/health", (req, res) => res.json({ ok: true }))

// Optionnel: aide quand tu ouvres /chat dans le navigateur
app.get("/chat", (req, res) => {
  res.status(405).json({
    error: "Method not allowed",
    hint: "Use POST /chat with JSON body: { message: 'Bonjour', lang: 'fr' }",
  })
})

app.post("/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" })

    const message = (req.body?.message || "").toString().trim()
    const lang = (req.body?.lang || "fr").toString()

    if (!message) return res.status(400).json({ error: "Missing message" })

    // Modèle par défaut mis à jour
    const modelName = (process.env.GEMINI_MODEL || "gemini-2.5-flash").toString()

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: modelName })

    const system =
      lang === "en"
        ? "You are the Kelensi Digital Solutions assistant. Ask 2 short clarifying questions, then propose a simple plan with 3 steps and a clear next action."
        : "Tu es l’assistant de Kelensi Digital Solutions. Pose 2 questions courtes de clarification, puis propose un plan simple en 3 étapes et une prochaine action claire."

    const prompt = `${system}\n\nClient message:\n${message}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    res.json({ reply: text, model: modelName })
  } catch (e) {
    const details = String(e?.message || e)
    res.status(500).json({
      error: "Gemini call failed",
      details,
      tip: "Vérifie GEMINI_MODEL. Exemple: gemini-2.5-flash",
    })
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log("KDS API listening on", port)
})
