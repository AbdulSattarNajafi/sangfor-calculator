import PdfGenerator from "@/pdf/PdfGenerator";

async function ResultPage({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const id = (await params).resultId;

  return (
    <section className="relative h-dvh overflow-hidden">
      {id && <PdfGenerator id={id} />}
    </section>
  );
}

export default ResultPage;
