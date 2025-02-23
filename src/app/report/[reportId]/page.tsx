import DownloadPdfReport from "@/pdf/DownloadPdfReport";

async function ReportDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const id = (await params).reportId;

  return (
    <section className="relative h-dvh overflow-hidden">
      <DownloadPdfReport id={id} />
    </section>
  );
}

export default ReportDetailPage;
