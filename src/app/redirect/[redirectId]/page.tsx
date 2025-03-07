import Redirect from "@/components/Redirect";

async function ResultPage({
  params,
}: {
  params: Promise<{ redirectId: string }>;
}) {
  const id = (await params).redirectId;

  return (
    <section className="relative h-[360px] overflow-hidden">
      <Redirect id={id} />
    </section>
  );
}

export default ResultPage;
