import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./prompt";
import { RootWordSchema, RootWordEntry } from "./validation";

const client = new Anthropic();

export async function analyzeWord(word: string): Promise<RootWordEntry> {
  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: word }],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Claude returned invalid JSON: ${text.slice(0, 200)}`);
  }

  const result = RootWordSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Claude response failed validation: ${result.error.message}`,
    );
  }

  return result.data;
}
