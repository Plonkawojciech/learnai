import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { answers, name } = await req.json();

    const prompt = `Jesteś ekspertem od edukacji AI. Na podstawie odpowiedzi użytkownika oceń jego poziom wiedzy o AI i stwórz spersonalizowany plan nauki.

Odpowiedzi użytkownika:
${JSON.stringify(answers, null, 2)}

Zwróć JSON w dokładnie tym formacie:
{
  "level": "beginner" | "intermediate" | "advanced",
  "levelLabel": "Laik" | "Power User" | "Builder",
  "score": <liczba 0-100 reprezentująca poziom wiedzy>,
  "summary": "<2-3 zdania oceny — co już umie, czego mu brakuje. Mów do użytkownika bezpośrednio (Ty).>",
  "strengths": ["<mocna strona 1>", "<mocna strona 2>"],
  "gaps": ["<luka 1>", "<luka 2>", "<luka 3>"],
  "recommendedModules": ["ai-basics", "prompt-engineering"],
  "weeklyPlan": [
    {
      "week": 1,
      "focus": "<tytuł tygodnia>",
      "tasks": ["<zadanie 1>", "<zadanie 2>", "<zadanie 3>"]
    }
  ],
  "firstStep": "<konkretna jedna rzecz którą użytkownik powinien zrobić DZIŚ — maks 1 zdanie>",
  "motivationalMessage": "<krótka, szczera motywacja nawiązująca do ich odpowiedzi — bez ściemy, bez 'Wspaniałe pytanie!'>'"
}

Dostępne moduły: ai-basics, prompt-engineering, ai-workflows, building-with-ai

Zasady:
- beginner (0-30): nigdy/rzadko używa AI, nie rozumie jak działa
- intermediate (31-70): używa regularnie, zna podstawy, chce robić więcej
- advanced (71-100): buduje z AI, rozumie API, chce agentów/RAG

Odpowiedz TYLKO JSONem, bez dodatkowego tekstu.`;

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else throw new Error("Invalid JSON");
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Assess error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
