export interface ExampleEntry {
  indo: string;
  english: string;
}

export interface FormEntry {
  form: string;
  affix: string;
  role: string;
  meaning: string;
  note: string | null;
  examples: ExampleEntry[];
}

export interface RootWordEntry {
  root: string;
  meaning: string;
  partOfSpeech: string;
  etymology: string | null;
  forms: FormEntry[];
}
