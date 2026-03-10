import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./prompt";
import { RootWordEntry } from "@/types";

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

  const parsed = JSON.parse(text);
  return parsed as RootWordEntry;
}
