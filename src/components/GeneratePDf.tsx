"use client";

import PdfGenerator from "@/pdf/PdfGenerator";
import { getUserInputData } from "@/utils/helpers";
import { UserInputDataType } from "@/utils/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function GeneratePDf() {
  const [data, setData] = useState<UserInputDataType | null>(null);

  useEffect(() => {
    const storedData = getUserInputData();
    if (!storedData) {
      redirect("/");
    }
    setData(storedData);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-10 bg-[#f7f7f7] py-20">
        <div className="wrapper">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Thanks! You’re One Step Closer to Savings.
            </h2>
            <p className="mb-8 text-lg">
              Here is your FREE detailed report on how you can reduce TCO by
              deploying Versa SASE.
            </p>
          </div>
        </div>
      </div>
      {data && <PdfGenerator data={data} />}
    </>
  );
}

export default GeneratePDf;
