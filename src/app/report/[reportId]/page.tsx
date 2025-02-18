import Link from "next/link";
import { notFound } from "next/navigation";
// import { getReportById } from "@/lib/reports";

export default async function ReportPage({
  params,
}: {
  params: { reportId: string };
}) {
  // const report = await getReportById(params.reportId);

  const report = params.reportId;

  if (!report) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Your ROI Report</h1>
      {/* <iframe
        src={report.pdfUrl}
        className="h-[80vh] w-full rounded-lg border"
      /> */}
      <Link
        // href={report.pdfUrl}
        href="/"
        download
        className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
      >
        Download PDF
      </Link>
    </div>
  );
}
