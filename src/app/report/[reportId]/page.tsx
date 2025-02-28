import DownloadPdfReport from "@/pdf/DownloadPdfReport";

async function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const id = (await params).reportId;

  return (
    <section className="relative h-dvh overflow-hidden">
      {id && <DownloadPdfReport id={id} />}
    </section>
  );
}

export default ReportPage;
