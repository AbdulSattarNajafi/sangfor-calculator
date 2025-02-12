import CalculatorForm from "@/components/CalculatorForm";
import ContactForm from "@/components/ContactForm";
import CalculatorResult from "@/components/CalculatorResult";

export default function Home() {
  return (
    <section className="bg-section-bg bg-cover bg-center py-20">
      <div className="wrapper">
        <div className="mb-12 text-white">
          <h3 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h3>
          <p className="text-lg">
            Sangfor Access Secure is a comprehensive Secure Access Service Edge
            (SASE) solution that combines SD-WAN and Secure Service Edge (SSE)
            capabilities, including Zero Trust Network Access (ZTNA), Secure Web
            Gateway (SWG), Firewall as a Service (FWaaS), Endpoint Detection and
            Response (EDR), and Data Loss Prevention (DLP), delivered through a
            unified cloud platform.
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex w-3/5 flex-col gap-4">
            <div className="rounded-md bg-blue-tertiary px-5 py-6 shadow-md">
              <CalculatorForm />
              <ContactForm />
            </div>
          </div>

          <div className="w-2/5">
            <div className="flex h-full flex-col rounded-md bg-white px-5 py-6 shadow-md">
              <div className="border-b border-gray-200 pb-5">
                <h4 className="mb-1 text-2xl font-bold leading-none">
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
        </div>
      </div>
    </section>
  );
}
