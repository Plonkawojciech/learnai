import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Jesteś ekspertem od prompt engineeringu. Twoim zadaniem jest analiza i optymalizacja promptów użytkownika.

Dla każdego promptu który dostaniesz, zwróć JSON w dokładnie tym formacie:
{
  "score_before": <liczba 0-100, ocena oryginalnego promptu>,
  "score_after": <liczba 0-100, ocena zoptymalizowanego promptu>,
  "improved_prompt": "<zoptymalizowany prompt — kompletny, gotowy do użycia>",
  "improvements": [
    {
      "category": "<kategoria poprawki: Rola/Persona | Kontekst | Format wyjścia | Ograniczenia | Przykłady | Cel | Ton>",
      "description": "<co zostało dodane/poprawione i dlaczego to ważne>"
    }
  ],
  "explanation": "<1-2 zdania ogólnego wyjaśnienia co było głównym problemem i jak to naprawiono>",
  "example_result_before": "<krótki przykład jak by wyglądał wynik dla oryginalnego promptu — 1-3 zdania>",
  "example_result_after": "<krótki przykład jak by wyglądał wynik dla zoptymalizowanego promptu — 2-4 zdania, wyraźnie lepszy>"
}

Zasady oceniania (score):
- 0-30: brak kontekstu, niejasny cel, AI nie wie co robić
- 31-60: jest podstawowa intencja ale brakuje ważnych elementów
- 61-80: dobry prompt ale można go poprawić
- 81-100: profesjonalny, precyzyjny, gotowy do produkcji

Zawsze odpowiadaj tylko i wyłącznie JSON — bez żadnego tekstu przed ani po.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json({ error: "Prompt jest za krótki." }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return NextResponse.json({ error: "Prompt jest za długi (max 2000 znaków)." }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Przeanalizuj i zoptymalizuj ten prompt:\n\n"${prompt.trim()}"`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      // Try to extract JSON from response
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else throw new Error("Invalid JSON response");
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Prompt simulator error:", err);
    return NextResponse.json({ error: "Błąd serwera. Spróbuj ponownie." }, { status: 500 });
  }
}
