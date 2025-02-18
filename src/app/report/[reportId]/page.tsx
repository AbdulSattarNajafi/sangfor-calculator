import { notFound } from "next/navigation";
// import { getReportById } from "@/lib/reports";

async function ReportDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const id = (await params).reportId;

  // const report = events.find((event) => event.id === id);

  if (!id) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Your ROI Report/ {id}</h1>

      <button className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75">
        Download PDF
      </button>
    </div>
  );
}

export default ReportDetailPage;
