import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = express()
app.use(express.json({ limit: "1mb" }))

app.get("/health", (req, res) => res.json({ ok: true }))

app.post("/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" })

    const message = (req.body?.message || "").toString().trim()
    const lang = (req.body?.lang || "fr").toString()

    if (!message) return res.status(400).json({ error: "Missing message" })

    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash"
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: modelName })

    const system =
      lang === "en"
        ? "You are the Kelensi Digital Solutions assistant. Ask 2 short clarifying questions, then propose a simple plan with 3 steps and a clear next action."
        : "Tu es l’assistant de Kelensi Digital Solutions. Pose 2 questions courtes de clarification, puis propose un plan simple en 3 étapes et une prochaine action claire."

    const prompt = `${system}\n\nClient message:\n${message}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    res.json({ reply: text })
  } catch (e) {
    res.status(500).json({ error: "Gemini call failed", details: String(e?.message || e) })
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log("KDS API listening on", port)
})
