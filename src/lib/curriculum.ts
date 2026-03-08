export type Level = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "8 min"
  type: "article" | "video" | "exercise" | "quiz";
  content: string; // markdown
  keyPoints: string[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  icon: string;
  color: string;
  duration: string;
  description: string;
  lessons: Lesson[];
  forLevels: Level[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const MODULES: Module[] = [
  {
    id: "ai-basics",
    title: "Co to jest AI?",
    subtitle: "Techniczne podstawy bez bólu głowy",
    level: "beginner",
    icon: "🧠",
    color: "from-blue-500 to-cyan-500",
    duration: "45 min",
    description: "Rozumiesz jak działa AI od środka — transformery, tokeny, LLM. Bez matematyki, z analogiami z życia.",
    forLevels: ["beginner", "intermediate", "advanced"],
    lessons: [
      {
        id: "what-is-ai",
        title: "AI, ML, DL — czym to się różni?",
        duration: "7 min",
        type: "article",
        keyPoints: [
          "AI to szeroka kategoria — wszystko co symuluje ludzkie myślenie",
          "ML to podkategoria — maszyny uczące się z danych",
          "DL (deep learning) to ML z sieciami neuronowymi",
          "LLM (jak Claude czy GPT) to deep learning na tekście",
        ],
        content: `# AI, ML, DL — czym to się różni?

Słyszysz te skróty wszędzie. Ale co one naprawdę znaczą?

## Sztuczna Inteligencja (AI)

**AI** to najszerszy termin — oznacza każdy system komputerowy który naśladuje ludzkie zdolności poznawcze: rozumienie języka, rozpoznawanie obrazów, podejmowanie decyzji.

Wyobraź sobie to jak zbiory:

\`\`\`
┌─────────────────────────────────┐
│  AI (Sztuczna Inteligencja)     │
│  ┌──────────────────────────┐   │
│  │  ML (Machine Learning)   │   │
│  │  ┌───────────────────┐   │   │
│  │  │  DL (Deep Learning)│   │   │
│  │  │  ┌─────────────┐  │   │   │
│  │  │  │    LLM      │  │   │   │
│  │  │  │(GPT, Claude)│  │   │   │
│  │  │  └─────────────┘  │   │   │
│  │  └───────────────────┘   │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
\`\`\`

## Machine Learning (ML)

Tradycyjne programowanie: **programista pisze zasady** → komputer je wykonuje.

Machine Learning: **komputer uczy się zasad sam** z przykładów.

**Przykład:** Chcesz system który wykrywa spam.
- Tradycyjnie: piszesz tysiąc zasad ("jeśli zawiera 'kliknij tutaj' i '100% za darmo' to spam")
- ML: pokazujesz mu milion maili z etykietą spam/nie-spam i on sam odkrywa wzorce

## Deep Learning (DL)

Deep Learning to ML z sieciami neuronowymi — strukturami inspirowanymi mózgiem. "Deep" oznacza wiele warstw neuronów.

To właśnie deep learning sprawia że AI rozumie obrazy, mowę i tekst.

## LLM — Large Language Models

**LLM** to deep learning wytrenowany na ogromnej ilości tekstu. Claude, GPT-4, Gemini — to wszystko LLM-y.

Kluczowa rzecz do zrozumienia: **LLM nie "myśli" jak człowiek**. On przewiduje kolejne słowo na podstawie wzorców z miliardów dokumentów.

Brzmi prosto? To dlatego że jest proste w koncepcji — ale niesamowita siła tej prostej idei to właśnie to co sprawia że AI jest tak potężne.`,
        quiz: [
          {
            question: "Który termin jest najszerszy?",
            options: ["Machine Learning", "Deep Learning", "AI", "LLM"],
            correct: 2,
            explanation: "AI to najszerszy termin — ML i DL to jego podkategorie.",
          },
          {
            question: "Co robi LLM (jak Claude czy GPT) 'pod maską'?",
            options: [
              "Wyszukuje odpowiedzi w internecie",
              "Przewiduje kolejne słowo/token na podstawie wzorców",
              "Kopiuje odpowiedzi z bazy danych",
              "Rozumuje jak człowiek",
            ],
            correct: 1,
            explanation: "LLM przewiduje kolejne tokeny. Nie 'myśli' — rozpoznaje wzorce statystyczne z danych treningowych.",
          },
        ],
      },
      {
        id: "how-llm-works",
        title: "Jak działa ChatGPT/Claude 'pod maską'",
        duration: "10 min",
        type: "article",
        keyPoints: [
          "Trening = czytanie miliardów tekstów i uczenie się wzorców",
          "Inference = generowanie odpowiedzi token po tokenie",
          "Kontekst okna = ile 'pamięta' w jednej rozmowie",
          "Temperature = jak przewidywalny/kreatywny jest model",
        ],
        content: `# Jak działa ChatGPT/Claude 'pod maską'

## Dwa etapy: trening i inference

### 1. Trening (dzieje się raz, trwa miesiące)

Wyobraź sobie że czytasz całą Wikipedia, wszystkie książki, artykuły, kod na GitHubie, posty na Reddit... i po każdym zdaniu próbujesz przewidzieć następne słowo.

Jeśli się mylisz, poprawiasz swoją "teorię". Powtarzasz to **setki miliardów razy**.

To właśnie trening LLM. Model uczy się sieci połączeń między słowami, koncepcjami, faktami — wszystko zakodowane w miliardach parametrów (liczb).

Claude 3 Opus ma ok. **200 miliardów parametrów**. GPT-4 — szacunkowo 1 bilion.

### 2. Inference (dzieje się przy każdym pytaniu)

Kiedy piszesz do Claude, model:
1. Zamienia Twój tekst na **tokeny** (fragmenty słów)
2. Przetwarza je przez wszystkie warstwy neuronów
3. Generuje następny token (fragment słowa)
4. Powtarza to aż do końca odpowiedzi

\`\`\`
Ty piszesz: "Stolica Polski to"
Model:       P(Warszawa) = 0.94
             P(Kraków)   = 0.03
             P(Gdańsk)   = 0.01
             ...
Wybiera:     "Warszawa"
\`\`\`

## Co to są tokeny?

Token ≈ ok. 3/4 słowa. "Warszawa" to 1 token. "Niepodległości" to 2-3 tokeny.

Dlaczego to ważne? Bo modele mają **limit kontekstu** — max ilość tokenów którą mogą "widzieć" jednocześnie.

- GPT-3.5: 16,000 tokenów (~12,000 słów)
- Claude 3.5 Sonnet: 200,000 tokenów (~150,000 słów)
- Gemini 1.5 Pro: 1,000,000 tokenów

## Temperature — kreatywność vs precyzja

\`\`\`
Temperature 0.0:  Zawsze najbardziej prawdopodobna odpowiedź
                  → Idealne do kodu, faktów, danych

Temperature 0.7:  Balans kreatywności i spójności
                  → Domyślne dla większości zastosowań

Temperature 1.5+: Bardzo kreatywny/losowy
                  → Może generować bzdury ale też zaskakujące pomysły
\`\`\`

## Kluczowy wniosek

LLM **nie rozumie** tekstu jak człowiek. On jest fantastyczną maszyną do rozpoznawania i generowania wzorców.

Dlatego właśnie **jak piszesz prompt ma ogromne znaczenie** — dajesz modelowi wzorzec do naśladowania.`,
        quiz: [
          {
            question: "Co to jest 'kontekst okna' (context window)?",
            options: [
              "Okno przeglądarki gdzie wpisujesz prompt",
              "Maksymalna ilość tokenów którą model widzi w jednej rozmowie",
              "Czas oczekiwania na odpowiedź",
              "Liczba parametrów modelu",
            ],
            correct: 1,
            explanation: "Context window to limit tokenów w jednej sesji. Większy kontekst = model 'pamięta' więcej z rozmowy.",
          },
        ],
      },
      {
        id: "models-comparison",
        title: "Claude vs GPT vs Gemini — co kiedy?",
        duration: "8 min",
        type: "article",
        keyPoints: [
          "Claude — najlepszy do długich dokumentów, analizy, pisania",
          "GPT-4o — najlepszy ekosystem, wtyczki, DALL-E",
          "Gemini — integracja z Google, najdłuższy kontekst",
          "Mistral — open source, tańszy, dobry do kodu",
        ],
        content: `# Claude vs GPT vs Gemini — co kiedy?

## Szybkie porównanie

| Model | Mocna strona | Słaba strona | Kiedy używać |
|-------|-------------|-------------|--------------|
| **Claude 3.5 Sonnet** | Analiza, pisanie, kod, długi kontekst | Brak internetu w podstawowej wersji | Dokumenty, kod, złożone zadania |
| **GPT-4o** | Ekosystem, wtyczki, obrazy (DALL-E) | Droższy | Kiedy potrzebujesz narzędzi/wtyczek |
| **Gemini 1.5 Pro** | Najdłuższy kontekst (1M tokenów), Google Suite | Czasem halucynuje | Długie dokumenty, integracja z Google |
| **Mistral** | Open source, szybki, tani | Słabszy na polskim | Programowanie, API, projekty budżetowe |

## Claude — kiedy jest królem

Claude (Anthropic) błyszczy przy:
- **Długich dokumentach** — daj mu 200 stron PDF i zadaj pytania
- **Pisaniu** — eseje, maile, raporty — brzmią bardziej ludzko
- **Analizie kodu** — rozumie duże codebases
- **Bezpieczeństwie** — ma wbudowane silniejsze guardrails

> **Ciekawostka:** Claude jest zbudowany na "Constitutional AI" — uczy się z zasad etycznych, nie tylko z ludzkich ocen.

## GPT-4o — kiedy ekosystem wygrywa

OpenAI ma największy ekosystem:
- **ChatGPT Plus** — dostęp do wszystkich wtyczek
- **DALL-E 3** — generowanie obrazów wprost z chatu
- **Code Interpreter** — analiza danych, wykresy, pliki Excel
- **Assistants API** — budowanie własnych asystentów z pamięcią

## Praktyczna zasada

\`\`\`
Piszesz długi tekst?          → Claude
Analizujesz dokumenty?         → Claude
Potrzebujesz obrazów?          → GPT-4o (DALL-E)
Masz plik Excel do analizy?    → GPT-4o (Code Interpreter)
Wszystko z Google?             → Gemini
Budujesz produkt/API?          → Claude API lub GPT-4o API
\`\`\``,
        quiz: [
          {
            question: "Który model ma największy context window?",
            options: ["GPT-4o (128k tokenów)", "Claude 3.5 Sonnet (200k tokenów)", "Gemini 1.5 Pro (1M tokenów)", "Mistral Large (32k tokenów)"],
            correct: 2,
            explanation: "Gemini 1.5 Pro ma context window 1 miliona tokenów — to ok. 750,000 słów lub kilkaset stron.",
          },
        ],
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    subtitle: "Pisz prompty które działają",
    level: "beginner",
    icon: "✍️",
    color: "from-violet-500 to-purple-600",
    duration: "60 min",
    description: "Naucz się pisać prompty które dają konkretne, przewidywalne wyniki. Techniki od zero-shot do chain-of-thought.",
    forLevels: ["beginner", "intermediate", "advanced"],
    lessons: [
      {
        id: "prompt-anatomy",
        title: "Anatomia dobrego promptu",
        duration: "10 min",
        type: "article",
        keyPoints: [
          "Rola: mów AI kim ma być",
          "Kontekst: daj wszystkie potrzebne informacje",
          "Zadanie: precyzyjnie opisz co chcesz",
          "Format: określ jak ma wyglądać odpowiedź",
          "Ograniczenia: co ma, a czego nie ma robić",
        ],
        content: `# Anatomia dobrego promptu

Większość ludzi pisze do AI jak do Google — krótkie hasła bez kontekstu. To jak dzwonić do specjalisty i mówić "napraw". Co naprawić? Gdzie? Jak?

## Formuła RKTFO

Dobry prompt zawiera 5 elementów:

**R — Rola** (kim jest AI)
**K — Kontekst** (co AI musi wiedzieć)
**T — Zadanie** (co dokładnie zrobić)
**F — Format** (jak ma wyglądać odpowiedź)
**O — Ograniczenia** (czego unikać)

## Przykład: email do klienta

### ❌ Słaby prompt
\`\`\`
napisz email do klienta
\`\`\`
Wynik: generyczny, bezużyteczny email który trzeba w całości przepisać.

### ✓ Dobry prompt
\`\`\`
R: Jesteś customer success managerem w SaaS firmie (narzędzie do zarządzania projektami).

K: Klient Jan Kowalski (firma 50 osób) używa naszego produktu od 3 miesięcy.
   Jego subskrypcja kończy się za 2 tygodnie.
   Używa tylko 20% funkcji (brakuje mu onboardingu na funkcję raportów).

T: Napisz email proaktywnie oferujący bezpłatną sesję 30-min demo funkcji raportów
   + propozycję przedłużenia subskrypcji z 15% zniżką.

F: Email formalny ale ciepły. 3 akapity. Maks 150 słów.
   Zakończ konkretnym CTA (link do kalendarza).

O: Nie wspominaj że subskrypcja wygasa. Skup się na wartości dla nich.
\`\`\`

Widzisz różnicę? Drugi prompt daje AI wszystko czego potrzebuje.

## Kiedy każdy element jest niezbędny

### Rola
Bez roli AI odpowiada "domyślnie" — często ogólnikowo.
Z rolą dostaje kontekst: jakim językiem mówić, jaki poziom fachowości, czyją perspektywę przyjąć.

\`\`\`
Bez roli: "Wyjaśnij mi kwantowe splątanie"
Z rolą:  "Jesteś nauczycielem fizyki dla 14-latków. Wyjaśnij kwantowe splątanie używając analogii z życia codziennego."
\`\`\`

### Format
AI domyślnie pisze eseje. Jeśli chcesz tabelę — powiedz to. Lista punktów? Powiedz. JSON? Powiedz.

\`\`\`
"Odpowiedz w formacie tabeli markdown z kolumnami: Zaleta | Wada | Kiedy stosować"
"Zwróć odpowiedź jako JSON: {title, summary, tags[]}"
"Odpowiedz w maksymalnie 3 zdaniach"
\`\`\``,
        quiz: [
          {
            question: "Co oznacza 'R' w formule RKTFO?",
            options: ["Rezultat", "Rola", "Rozmiar", "Rozwiązanie"],
            correct: 1,
            explanation: "R = Rola. Mówisz AI kim ma być — to daje mu kontekst perspektywy i stylu odpowiedzi.",
          },
          {
            question: "Masz napisać raport dla zarządu. Który element promptu jest tu kluczowy?",
            options: ["Rola", "Format wyjścia", "Ograniczenia", "Wszystkie trzy"],
            correct: 3,
            explanation: "Do raportu dla zarządu potrzebujesz: roli (ekspert biznesowy), formatu (executive summary, sekcje), ograniczeń (bez technicznego żargonu, maks 1 strona).",
          },
        ],
      },
      {
        id: "advanced-techniques",
        title: "Chain-of-thought, Few-shot, Zero-shot",
        duration: "12 min",
        type: "article",
        keyPoints: [
          "Zero-shot: bez przykładów — po prostu pytasz",
          "Few-shot: dajesz 2-3 przykłady formatu/stylu",
          "Chain-of-thought: 'myśl krok po kroku' — lepsze dla logiki",
          "Meta-prompting: mówisz AI jak ma podejść do zadania",
        ],
        content: `# Zaawansowane techniki promptowania

## Zero-shot prompting

Dajesz zadanie bez żadnych przykładów. Działa gdy zadanie jest jasne.

\`\`\`
Sklasyfikuj sentiment tego tweeta jako pozytywny/negatywny/neutralny:
"Nowy iPhone jest ok, bateria mogłaby być lepsza ale aparat spoko"
\`\`\`

## Few-shot prompting

Dajesz 2-5 przykładów wejście→wyjście. Model uczy się wzorca.

\`\`\`
Klasyfikuj opinie klientów:

Opinia: "Produkt super, dostawa ekspresowa!" → Pozytywna
Opinia: "Zepsuło się po tygodniu, nie polecam" → Negatywna
Opinia: "W porządku, nic specjalnego" → Neutralna

Teraz sklasyfikuj:
Opinia: "Wygląda ładnie ale instrukcja jest po chińsku"
\`\`\`

Few-shot jest szczególnie potężny dla formatowania odpowiedzi i stylu pisania.

## Chain-of-thought (CoT)

Magiczne słowa: **"Myśl krok po kroku"** lub **"Let's think step by step"**.

Badania Google pokazały że to proste zdanie poprawia wyniki na zadaniach logicznych o 40-80%.

\`\`\`
❌ Bez CoT:
"Jeśli mam 3 pudełka po 12 jabłek i dam 1/4 wszystkich jabłek,
ile mi zostanie?"
→ Często błędna odpowiedź

✓ Z CoT:
"Jeśli mam 3 pudełka po 12 jabłek i dam 1/4 wszystkich jabłek,
ile mi zostanie? Myśl krok po kroku."
→ Model liczy: 3×12=36, 1/4 z 36=9, 36-9=27 ✓
\`\`\`

## Self-consistency

Zamiast pytać raz, pytaj kilka razy i wybierz najczęstszą odpowiedź. Przydatne dla ważnych decyzji.

\`\`\`
"Odpowiedz na to pytanie na trzy różne sposoby i
wskaż które rozwiązanie jest najlepsze i dlaczego:"
\`\`\`

## Meta-prompting

Mówisz AI jak ma podejść do zadania zanim zacznie.

\`\`\`
"Zanim odpiszesz, najpierw:
1. Zidentyfikuj co dokładnie pytam
2. Zastanów się jakich informacji Ci brakuje
3. Odpowiedz na pytanie
4. Podaj 2-3 zastrzeżenia do swojej odpowiedzi"
\`\`\``,
        quiz: [
          {
            question: "Kiedy szczególnie warto użyć chain-of-thought?",
            options: [
              "Przy pisaniu emaili",
              "Przy zadaniach matematycznych i logicznych",
              "Przy tłumaczeniu tekstów",
              "Przy generowaniu list",
            ],
            correct: 1,
            explanation: "CoT ('myśl krok po kroku') najbardziej pomaga przy logice, matematyce i wieloetapowym rozumowaniu — AI nie 'zgaduje' odpowiedzi ale dochodzi do niej metodycznie.",
          },
        ],
      },
      {
        id: "prompt-simulator-exercise",
        title: "Ćwiczenie: Prompt Simulator",
        duration: "15 min",
        type: "exercise",
        keyPoints: [
          "Praktyka czyni mistrza",
          "Użyj Prompt Simulatora na własnych promptach",
          "Porównaj wyniki przed i po",
        ],
        content: `# Ćwiczenie: Optymalizacja promptów

Czas na praktykę. Masz 3 zadania — dla każdego napisz swój prompt i przepuść przez Prompt Simulator.

## Zadanie 1: Email

Napisz prompt żeby AI napisało email do szefa z prośbą o podwyżkę.

Twój obecny prompt → Simulator → Poprawiony prompt → porównaj wyniki.

**Na co zwróć uwagę:** Czy dodałeś kontekst (jak długo pracujesz, jakie osiągnięcia)? Czy określiłeś ton?

## Zadanie 2: Analiza danych

Napisz prompt żeby AI przeanalizowało dane sprzedażowe (wyobraź sobie tabelę z wynikami miesięcznymi).

**Na co zwróć uwagę:** Czy określiłeś format wyjścia? Czy powiedziałeś co chcesz wykryć (trend, anomalie)?

## Zadanie 3: Twoje własne

Weź prompt który faktycznie użyłeś ostatnio w pracy lub życiu. Przepuść przez Simulator i zastosuj sugestie.

## Jak mierzyć poprawę?

Dobry prompt powinien dawać wynik 75%+. Jeśli Twoje prompty wychodzą 80%+ bez poprawek — jesteś już na poziomie intermediate! 🎉`,
      },
    ],
  },
  {
    id: "ai-workflows",
    title: "AI w pracy",
    subtitle: "Automatyzacje i workflow",
    level: "intermediate",
    icon: "⚡",
    color: "from-orange-500 to-amber-500",
    duration: "50 min",
    description: "AI do prawdziwej pracy — maile, dokumenty, analizy, automatyzacje z Zapier/Make. Oszczędzaj 2h dziennie.",
    forLevels: ["intermediate", "advanced"],
    lessons: [
      {
        id: "ai-for-work",
        title: "AI do codziennej pracy — 20 use cases",
        duration: "12 min",
        type: "article",
        keyPoints: [
          "Maile — drafty, odpowiedzi, tłumaczenia",
          "Dokumenty — streszczenia, raporty, notatki ze spotkań",
          "Research — syntezy, porównania, fact-checking",
          "Kod — debugowanie, dokumentacja, refactor",
        ],
        content: `# AI do codziennej pracy

## Maile i komunikacja

**Napisz draft maila:**
\`\`\`
Jestem project managerem. Napisz email do klienta (duża korporacja)
informujący o 2-tygodniowym opóźnieniu projektu.
Powód: choroba kluczowego developera.
Zaproponuj: tygodniowe update calle, częściowe deliverables wcześniej.
Ton: profesjonalny, transparentny, proaktywny.
\`\`\`

**Odpowiedz na trudny email:**
\`\`\`
Dostałem ten email: [wklej email]
Pomóż mi napisać profesjonalną odpowiedź która:
- Przyznaje błąd bez nadmiernych przeprosin
- Proponuje konkretne rozwiązanie
- Utrzymuje pozytywną relację
\`\`\`

## Dokumenty i raporty

**Streszczenie długiego dokumentu:**
\`\`\`
Oto 50-stronicowy raport: [treść]
Stwórz executive summary (max 1 strona) z:
- Kluczowe wnioski (5 punktów)
- Rekomendacje (3 punkty)
- Ryzyka (2 punkty)
Format dla zarządu — zero jargonu technicznego.
\`\`\`

**Notatki ze spotkania → Action items:**
\`\`\`
Mam surowe notatki ze spotkania: [notatki]
Wyciągnij:
1. Decyzje podjęte (kto + co)
2. Action items (osoba odpowiedzialna + deadline)
3. Otwarte pytania wymagające follow-up
Format: tabela markdown
\`\`\`

## Research i analiza

**Porównanie opcji:**
\`\`\`
Analizuję zakup oprogramowania CRM dla firmy 30 osób.
Opcje: Salesforce, HubSpot, Pipedrive.
Stwórz porównanie w tabeli: cena/użytkownik, krzywa uczenia, integracje,
dla kogo najlepszy.
Zakończ rekomendacją dla small business B2B SaaS.
\`\`\`

## Kod (dla semi-techniczych)

**Formuła Excel/Google Sheets:**
\`\`\`
Mam tabelę Google Sheets: kolumna A = daty, kolumna B = sprzedaż.
Napisz formułę która liczy średnią sprzedaż z ostatnich 30 dni
i porównuje ją z poprzednim 30-dniowym okresem (% zmiana).
\`\`\``,
      },
    ],
  },
  {
    id: "building-with-ai",
    title: "Budowanie z AI",
    subtitle: "API, Agenci, RAG — dla developerów",
    level: "advanced",
    icon: "🚀",
    color: "from-violet-600 to-pink-600",
    duration: "90 min",
    description: "Anthropic/OpenAI API, streaming, function calling, budowanie agentów, RAG z własnymi danymi.",
    forLevels: ["advanced"],
    lessons: [
      {
        id: "anthropic-api",
        title: "Anthropic API od zera",
        duration: "20 min",
        type: "article",
        keyPoints: [
          "Klucze API i autentykacja",
          "Podstawowe zapytanie — messages.create",
          "Streaming — token po tokenie",
          "System prompts w API",
          "Obsługa błędów i rate limiting",
        ],
        content: `# Anthropic API od zera

## Setup

\`\`\`bash
npm install @anthropic-ai/sdk
\`\`\`

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
\`\`\`

## Podstawowe zapytanie

\`\`\`typescript
const message = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Wyjaśnij mi czym są tokeny w LLM w 3 zdaniach.',
    },
  ],
});

console.log(message.content[0].text);
\`\`\`

## System prompt

\`\`\`typescript
const message = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 1024,
  system: 'Jesteś ekspertem od finansów osobistych. Odpowiadaj konkretnie i krótko. Zawsze podawaj liczby.',
  messages: [{ role: 'user', content: 'Jak oszczędzać na emeryturę?' }],
});
\`\`\`

## Streaming

\`\`\`typescript
const stream = await client.messages.stream({
  model: 'claude-opus-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Napisz mi opowiadanie.' }],
});

for await (const chunk of stream) {
  if (chunk.type === 'content_block_delta') {
    process.stdout.write(chunk.delta.text);
  }
}
\`\`\`

## Multi-turn conversation (historia rozmowy)

\`\`\`typescript
const history: Array<{role: 'user' | 'assistant', content: string}> = [];

async function chat(userMessage: string) {
  history.push({ role: 'user', content: userMessage });

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: history,
  });

  const assistantMessage = response.content[0].text;
  history.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}
\`\`\`

## Rate limiting i obsługa błędów

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

async function callWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
    } catch (error) {
      if (error instanceof Anthropic.RateLimitError) {
        await new Promise(r => setTimeout(r, 2000 * (i + 1))); // exponential backoff
        continue;
      }
      throw error;
    }
  }
}
\`\`\``,
      },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getLessonById(moduleId: string, lessonId: string): Lesson | undefined {
  const module = getModuleById(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}

export function getModulesForLevel(level: Level): Module[] {
  return MODULES.filter((m) => m.forLevels.includes(level));
}
