import { Navbar } from "@/components/layout/navbar";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata = { title: "Dashboard — LearnAI" };

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4">
        <DashboardClient />
      </main>
    </>
  );
}
