"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { StepWelcome } from "./step-welcome";
import { StepSelfAssess } from "./step-self-assess";
import { StepGoals } from "./step-goals";
import { StepBackground } from "./step-background";
import { StepAnalyzing } from "./step-analyzing";
import { StepResults } from "./step-results";

export type OnboardingData = {
  name: string;
  selfScore: number; // 0-10 slider
  aiUsage: string;
  usedTools: string[];
  goals: string[];
  background: string;
  specificInterest: string;
};

export type AssessResult = {
  level: "beginner" | "intermediate" | "advanced";
  levelLabel: string;
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendedModules: string[];
  weeklyPlan: Array<{ week: number; focus: string; tasks: string[] }>;
  firstStep: string;
  motivationalMessage: string;
};

const TOTAL_STEPS = 4;

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0=welcome, 1=self-assess, 2=goals, 3=background, 4=analyzing, 5=results
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [result, setResult] = useState<AssessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const analyze = async () => {
    setStep(4); // analyzing
    setError(null);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: data, name: data.name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setResult(json);
      setStep(5); // results
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Błąd analizy");
      setStep(3);
    }
  };

  const goToDashboard = () => {
    if (result) {
      localStorage.setItem("learnai_assessment", JSON.stringify({ data, result }));
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
      {/* Progress bar (steps 1-3) */}
      {step >= 1 && step <= 3 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--border)]">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <StepWelcome onNext={(name) => { updateData({ name }); next(); }} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="self-assess" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <StepSelfAssess
                name={data.name || ""}
                onNext={(d) => { updateData(d); next(); }}
                onBack={back}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="goals" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <StepGoals
                onNext={(d) => { updateData(d); next(); }}
                onBack={back}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="background" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <StepBackground
                onNext={(d) => { updateData(d); analyze(); }}
                onBack={back}
                error={error}
              />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StepAnalyzing name={data.name || ""} />
            </motion.div>
          )}
          {step === 5 && result && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <StepResults result={result} name={data.name || ""} onStart={goToDashboard} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
