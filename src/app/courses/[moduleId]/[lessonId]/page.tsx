import { Navbar } from "@/components/layout/navbar";
import { LessonClient } from "@/components/courses/lesson-client";
import { getModuleById, getLessonById, MODULES } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: { moduleId: string; lessonId: string }[] = [];
  MODULES.forEach((m) => m.lessons.forEach((l) => params.push({ moduleId: m.id, lessonId: l.id })));
  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  const module = getModuleById(moduleId);
  const lesson = getLessonById(moduleId, lessonId);
  if (!module || !lesson) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4">
        <LessonClient module={module} lesson={lesson} />
      </main>
    </>
  );
}
