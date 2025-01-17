import PdfGenerator from '@/components/pdf/PdfGenerator';

function ResultPage() {
  return (
    <section className='relative h-dvh overflow-hidden'>
      <div className='absolute inset-0 z-10 py-20 bg-[#f7f7f7]'>
        <div className='wrapper'>
          {/* //1- If no report show not Found */}
          {/* //2- If no report redirect the usets */}
          <div className='flex flex-col items-center text-center'>
            <h2 className='text-3xl font-bold mb-2'>Thanks! You’re One Step Closer to Savings. </h2>
            <p className='text-lg mb-8'>
              Here is your FREE detailed report on how you can reduce TCO by deploying Versa SASE.
            </p>
          </div>
        </div>
      </div>
      <PdfGenerator />
    </section>
  );
}

export default ResultPage;
