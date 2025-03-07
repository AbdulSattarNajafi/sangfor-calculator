import DownloadReport from "@/pdf/DownloadReport";

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
    <section className="relative h-[360px] overflow-hidden">
      {id && <DownloadReport customer={customer} />}
    </section>
  );
}

export default ReportPage;
