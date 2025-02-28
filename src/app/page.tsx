import CalculatorForm from "@/components/CalculatorForm";
import ContactForm from "@/components/ContactForm";
import CalculatorResult from "@/components/CalculatorResult";

export default function Home() {
  return (
    <section className="bg-section-bg bg-cover bg-center py-14 md:py-16 lg:py-20">
      <div className="wrapper">
        <div className="mb-10 text-white lg:mb-12">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
            Sangfor ROI Calculator
          </h2>
          <p className="xl:text-lg">
            Sangfor Access Secure is a comprehensive Secure Access Service Edge
            (SASE) solution that combines SD-WAN and Secure Service Edge (SSE)
            capabilities, including Zero Trust Network Access (ZTNA), Secure Web
            Gateway (SWG), Firewall as a Service (FWaaS), Endpoint Detection and
            Response (EDR), and Data Loss Prevention (DLP), delivered through a
            unified cloud platform.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-4">
          <div className="flex w-full flex-col gap-4 lg:w-3/5">
            <div className="rounded-md bg-blue-tertiary px-4 py-6 shadow-md sm:px-5">
              <CalculatorForm />
              <div className="hidden lg:block">
                <div className="mb-7 border-b border-slate-700 pt-7"></div>
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="flex h-full flex-col rounded-md bg-white px-4 py-6 shadow-md sm:px-5">
              <div className="border-b border-gray-200 pb-5">
                <h4 className="mb-1 text-xl font-bold leading-none md:text-2xl">
                  Your Quick Results
                </h4>
                <p className="text-gray-600">
                  Based on the inputs you provided the following numbers
                  indicates a high level view of the benefits, costs, and
                  savings associated with the Access Secure investment, Sangfor
                  has developed this customized report specific to your business
                  environment. It is meant to help you determine high-level
                  estimates of the costs, benefits, flexibility, and risk
                  factors associated with your Access Secure Investment.
                </p>
              </div>
              <CalculatorResult />
            </div>
          </div>

          <div className="rounded-md bg-blue-tertiary px-4 py-6 shadow-md sm:px-5 lg:hidden">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
