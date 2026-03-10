import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./prompt";
import { RootWordSchema, RootWordEntry } from "./validation";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeWord(word: string): Promise<RootWordEntry> {
  const model = client.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const response = await model.generateContent(word);
  const text = response.response.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Gemini returned invalid JSON: ${text.slice(0, 200)}`);
  }

  const result = RootWordSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Gemini response failed validation: ${result.error.message}`,
    );
  }

  return result.data;
}
