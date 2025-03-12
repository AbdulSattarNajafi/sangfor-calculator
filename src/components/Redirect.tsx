"use client";

import { useEffect, useRef } from "react";

function Redirect({ id }: { id: string }) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  return (
    <section>
      <div className="wrapper min-h-[300px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
            Thanks! You’re One Step Closer to Savings.
          </h2>
          <p className="mb-8 lg:text-lg">
            Here is your FREE detailed report on how you can reduce TCO by
            deploying Sangfor SASE.
          </p>
          <a
            ref={buttonRef}
            target="_blank"
            href={`https://www.sangfor.com/cybersecurity/products/sangfor-access-sase/sase-roi-calculator-submission-success-download-report?result=${id}`}
            className="whitespace-nowrap rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
          >
            View My Report
          </a>
        </div>
      </div>
    </section>
  );
}

export default Redirect;
