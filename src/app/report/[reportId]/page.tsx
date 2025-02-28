import DownloadPdfReport from "@/pdf/DownloadPdfReport";

async function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const id = (await params).reportId;
  const data = await fetch(
    `https://event.sangfor.com/sase-roi-calculator/public/api/customer/${id}/info`,
  );
  const customer = await data.json();

  return (
    <section className="relative h-dvh overflow-hidden">
      {id && <DownloadPdfReport customer={customer} />}
    </section>
  );
}

export default ReportPage;
