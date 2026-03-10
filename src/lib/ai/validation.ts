import { z } from "zod";

const ExampleSchema = z.object({
  indo: z.string(),
  english: z.string(),
});

const FormSchema = z.object({
  form: z.string(),
  affix: z.string(),
  affixSurface: z.string(),
  role: z.string(),
  meaning: z.string(),
  note: z.string().nullable(),
  examples: z.array(ExampleSchema).min(1),
});

export const RootWordSchema = z.object({
  root: z.string(),
  meaning: z.string(),
  partOfSpeech: z.string(),
  etymology: z.string().nullable(),
  forms: z.array(FormSchema).min(1),
});

export type FormEntry = z.infer<typeof FormSchema>;
export type ExampleEntry = z.infer<typeof ExampleSchema>;
export type RootWordEntry = z.infer<typeof RootWordSchema>;
