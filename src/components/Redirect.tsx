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
    <div>
      <a
        ref={buttonRef}
        target="_blank"
        href={`https://www.sangfor.com/cybersecurity/products/sangfor-access-sase/sase-roi-calculator-submission-success-download-report?result=${id}`}
        className="flex h-20 w-36 px-4 py-2 text-center"
      ></a>
    </div>
  );
}

export default Redirect;
