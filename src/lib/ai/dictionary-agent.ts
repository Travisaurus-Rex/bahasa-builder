import Groq from "groq-sdk";
import { systemPrompt } from "./prompt";
import { RootWordSchema, RootWordEntry } from "./validation";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Read the model name from .env.local. If AI_MODEL is missing, fall back to the current default.
const MODEL = process.env.AI_MODEL ?? "openai/gpt-oss-120b";

export async function analyzeWord(word: string): Promise<RootWordEntry> {
  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: word },
    ],
  });

  const text = response.choices[0]?.message?.content ?? "";

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Groq returned invalid JSON: ${text.slice(0, 200)}`);
  }

  const result = RootWordSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Groq response failed validation: ${result.error.message}`);
  }

  return result.data;
}
