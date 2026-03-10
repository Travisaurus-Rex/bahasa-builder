import mongoose, { Schema } from "mongoose";

const ExampleSchema = new Schema(
  {
    indo: { type: String, required: true },
    english: { type: String, required: true },
  },
  { _id: false },
);

const FormSchema = new Schema(
  {
    form: { type: String, required: true },
    affix: { type: String, required: true },
    affixSurface: { type: String, required: true },
    role: { type: String, required: true },
    meaning: { type: String, required: true },
    note: { type: String, default: null },
    examples: [ExampleSchema],
  },
  { _id: false },
);

const RootWordSchema = new Schema(
  {
    root: { type: String, required: true, unique: true },
    meaning: { type: String, required: true },
    partOfSpeech: { type: String, required: true },
    etymology: { type: String, default: null },
    forms: [FormSchema],
  },
  { timestamps: true },
);

RootWordSchema.index({ "forms.form": 1 });

export const RootWord =
  mongoose.models.RootWord || mongoose.model("RootWord", RootWordSchema);
