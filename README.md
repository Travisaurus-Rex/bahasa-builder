# Bahasa Builder

An AI-powered Indonesian morphology dictionary built with Next.js, MongoDB, and the Anthropic Claude API. Enter any word form and the app resolves it to its root, breaks down the affixes, and returns structured grammatical data with example sentences.

---

## Overview

Indonesian is an agglutinative language. A single root word like **ubah** (change) can surface as **berubah**, **mengubah**, **diubah**, **perubahan**, **pengubahan**, or **terubah** depending on grammatical context. Standard dictionaries require you to already know the root. This app does not.

Type any form of a word. The Claude API identifies the root, strips the affixes, classifies each derived form by grammatical role, and returns the full morphological breakdown as structured JSON. That response is cached in MongoDB so repeat lookups are instant.

---

## Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Frontend   | Next.js 16 (App Router)  |
| Styling    | Tailwind CSS + shadcn/ui |
| Database   | MongoDB Atlas            |
| ODM        | Mongoose                 |
| AI         | Anthropic Claude API     |
| Deployment | Vercel                   |

---

## Features

- **Affix-aware lookup** - Resolves any inflected form to its root before fetching results
- **Morphological breakdown** - Returns all grammatically valid affix forms for a given root
- **Structured AI output** - Claude returns strict JSON; no post-processing or mapping layer required
- **Cache-first architecture** - MongoDB stores every lookup; the AI is only called on a miss
- **Affix color system** - Each affix type (ber-, meng-, di-, ter-, per-...-an, peng-...-an) has a dedicated color applied consistently across card borders, pill badges, and sentence highlights
- **Collapsible form cards** - Each derived form is a collapsible card showing grammatical role, meaning, usage note, and 2-3 example sentences
- **Shareable word URLs** - Every root word has a dedicated route at `/dictionary/[root]`
- **Demo / AI mode toggle** - Switch between static demo data and live API calls

---

## Data Architecture

Each root word is stored as a single embedded MongoDB document containing all its derived forms and example sentences. This eliminates the multi-table joins that a relational schema would require for this data shape.

```json
{
  "root": "ubah",
  "meaning": "change, alter, transform",
  "partOfSpeech": "verb root",
  "etymology": "From Old Malay, related to shifting or altering state",
  "forms": [
    {
      "form": "berubah",
      "affix": "ber-",
      "role": "Intransitive verb",
      "meaning": "To change by itself, to undergo change",
      "note": "No object. The subject changes on its own.",
      "examples": [
        {
          "indo": "Cuaca berubah dengan cepat.",
          "english": "The weather changed quickly."
        }
      ]
    }
  ]
}
```

The multikey index on `forms.form` means a lookup by any inflected form is a direct index hit, not a collection scan.

---

## API Route Logic

```
POST /api/dictionary
  1. Normalize input (trim, lowercase)
  2. Query MongoDB by forms.form (any inflected form)
  3. Query MongoDB by root (direct root match)
  4. On miss — call Claude API, parse JSON response
  5. Persist to MongoDB (AI shape matches document shape directly)
  6. Return result
```

---

## Project Structure

```
bahasa-builder/
├── app/
│   ├── dictionary/
│   │   ├── page.tsx               # Search UI
│   │   └── [word]/page.tsx        # Word detail page
│   └── api/
│       └── dictionary/
│           └── route.ts           # POST /api/dictionary
├── components/
│   └── dictionary/
│       ├── SearchBar.tsx
│       ├── RootCard.tsx
│       ├── FormCard.tsx
│       ├── AffixPill.tsx
│       └── ExampleBlock.tsx
├── lib/
│   ├── ai/
│   │   ├── prompt.ts              # Claude system prompt
│   │   └── dictionary-agent.ts   # API call + JSON parse
│   └── db/
│       ├── mongoose.ts            # Connection singleton
│       ├── models/RootWord.ts     # Mongoose model + indexes
│       └── queries.ts
└── types/
    └── index.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (free tier works)
- Anthropic API key

### Installation

```bash
git clone https://github.com/Travisaurus-Rex/bahasa-builder.git
cd bahasa-builder
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/bahasa-builder
ANTHROPIC_API_KEY=sk-ant-...
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

- **Sentence Decomposer** - Paste any Indonesian text; Claude tokenizes and annotates each word inline with root and affix data. Every word is clickable.
- **Search History** - Recent lookups surfaced as quick-search pills
- **Related Words** - Suggestions based on shared root
- **Audio** - Web Speech API pronunciation (Indonesian is phonetically regular)
- **Corpus Mode** - Upload Indonesian text and bulk-extract unknown words for lookup
- **Mobile** - Capacitor wrapper or React Native with shared types

---

## Background

Built as part of the [CodedByTravis](https://github.com/Travisaurus-Rex) personal project portfolio. The app is designed for serious Indonesian language learners who want to understand word structure, not just definitions. The UI is intentionally information-dense and developer-adjacent in aesthetic - dark, minimal, and color-coded by grammatical function.

---

## License

MIT
