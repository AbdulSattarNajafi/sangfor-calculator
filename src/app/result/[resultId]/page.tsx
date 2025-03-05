import Report from "@/pdf/Report";

async function ResultPage({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const id = (await params).resultId;

  const data = await fetch(
    `https://event.sangfor.com/sase-roi-calculator/public/api/customer/${id}/info`,
  );
  const customer = await data.json();

  return (
    <section className="relative h-dvh overflow-hidden">
      {id && <Report customer={customer} />}
    </section>
  );
}

export default ResultPage;
