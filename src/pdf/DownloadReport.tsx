"use client";

import { useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";

import FinancialChart from "./charts/FinancialChart";
import {
  captureChartAsImage,
  downloadFile,
  formatCompactCurrency,
} from "@/utils/helpers";
import { calculationResult } from "./calculation/calculationResult";
import DonutChart from "./charts/DonutChart";
import PDFPages from "./components/PDFPages";
import useWindowWidth from "@/hooks/useWindowWidth";
import useFormula from "@/hooks/useFormula";
import Spinner from "@/components/Spinner";
import useRegions from "@/hooks/useRegions";
import { redirect } from "next/navigation";
import { CustomerDataType } from "@/utils/types";

function DownloadReport({ customer }: { customer: CustomerDataType }) {
  const [isLoading, setIsLoading] = useState(false);
  const { formula, formulaIsLoading } = useFormula();
  const { regions, regionsIsLoading } = useRegions();
  const width = useWindowWidth();

  const roiChartRef = useRef<HTMLDivElement>(null);
  const npvChartRef = useRef<HTMLDivElement>(null);
  const breachRiskChartRef = useRef<HTMLDivElement>(null);
  const paybackChartRef = useRef<HTMLDivElement>(null);
  const financialChartRef = useRef<HTMLDivElement>(null);

  if (!customer) {
    redirect("/");
  }

  const selectedCountry = regions?.find(
    (region) => region.country === customer.region,
  );

  if (regionsIsLoading || formulaIsLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!selectedCountry || !formula) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-center">Something Went wrong!</p>
      </div>
    );
  }

  const chartTitleFontSize = width < 1200 ? (width / 1000) * 24 : 32;
  const chartHeight =
    width < 1200 ? Math.min(220, 145 + (1200 - width) / 7) : 145;

  const financeSummary = calculationResult(formula, customer, selectedCountry);
  const { otherCalculation } = financeSummary;
  const operationalSavings = {
    lostProductivityRecovered:
      formula.endUserProductivityGains.productivityImprovement[0].year1 * 100,
    reduceLikelihoodOfDataBreach:
      formula.securityAndDataBreachRiskReduction.reducedLikelihoodOfABreach[0]
        .year1 * 100,
    netOps:
      formula.securityAndNetworkingOrgEfficiencyGain
        .efficiencyGainsDueToAccessSecure[2].year3 * 100,
    savingsFromVendor:
      formula.securityAndNetworkingInfraCostReduction
        .percentageOfSavingsFromVendor[2].year3 * 100,
  };

  const generatePDF = async () => {
    setIsLoading(true);

    const roiChart = await captureChartAsImage(roiChartRef);
    const npvChart = await captureChartAsImage(npvChartRef);
    const breachRiskChart = await captureChartAsImage(breachRiskChartRef);
    const paybackChart = await captureChartAsImage(paybackChartRef);
    const financialChart = await captureChartAsImage(financialChartRef);

    const chartImages = {
      roiChart,
      npvChart,
      breachRiskChart,
      paybackChart,
      financialChart,
    };

    const pdfBlob = await pdf(
      <PDFPages
        images={chartImages}
        userInput={customer}
        calculationData={financeSummary}
        operationalSavings={operationalSavings}
      />,
    ).toBlob();

    setIsLoading(false);

    const pdfUrl = URL.createObjectURL(pdfBlob);
    downloadFile(pdfUrl, "Sangfor-TCO-ROI-Report.pdf");
  };

  return (
    <>
      <div className="absolute inset-0 z-10 bg-[#f7f7f7] py-14 md:py-16 lg:py-20">
        <div className="wrapper">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
              Thanks! You’re One Step Closer to Savings.
            </h2>
            <p className="mb-8 lg:text-lg">
              Here is your FREE detailed report on how you can reduce TCO by
              deploying Sangfor SASE.
            </p>
            <button
              onClick={generatePDF}
              disabled={isLoading}
              className="whitespace-nowrap rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
            >
              {isLoading ? "Downloading..." : "Download My Report"}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex w-full flex-col gap-4 bg-white p-6">
        {/* --------- Donut Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={roiChartRef}>
            <DonutChart
              background="#58c13d"
              color="#b9e5ae"
              label="3 Year ROI"
              value={financeSummary.roiPercentages.total}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-semibold text-[#58c13d]">
                {financeSummary.roiPercentages.total}%
              </h5>
            </DonutChart>
          </div>
          <div ref={npvChartRef}>
            <DonutChart
              background="#0070c0"
              color="#c7e0f1"
              label="Net Present Value (NPV)"
              value={financeSummary.benefits.npv}
              totalValue={financeSummary.benefits.npv * 2}
            >
              <h5 className="-mt-8 text-center text-4xl font-semibold leading-tight text-[#0070c0]">
                <span className="break-words">
                  {formatCompactCurrency(financeSummary.benefits.npv)}
                </span>
              </h5>
            </DonutChart>
          </div>
          <div ref={breachRiskChartRef}>
            <DonutChart
              background="#00b0f0"
              color="#c5edfc"
              label="Security Breach Risk Reduction"
              value={financeSummary.breachRisk.total}
              totalValue={100000}
            >
              <h5 className="-mt-8 text-4xl font-semibold text-[#00b0f0]">
                {formatCompactCurrency(financeSummary.breachRisk.total)}
              </h5>
            </DonutChart>
          </div>
          <div ref={paybackChartRef}>
            <DonutChart
              background="#d26e2a"
              color="#f1a78a"
              label="Payback Period"
              value={otherCalculation.paybackPeriod}
              totalValue={36}
            >
              <h5 className="-mt-5 text-center text-4xl font-semibold leading-none text-[#d26e2a]">
                {otherCalculation.paybackPeriod > 0 ? "<" : ""}{" "}
                {otherCalculation.paybackPeriod}
                <br />
                <span className="text-2xl">months</span>
              </h5>
            </DonutChart>
          </div>
        </div>

        {/* --------- Financial Chart ---------- */}
        <div className="mx-auto w-full max-w-6xl">
          <div ref={financialChartRef}>
            <FinancialChart
              titleFontSize={chartTitleFontSize}
              height={chartHeight}
              costs={financeSummary.cost}
              benefits={financeSummary.benefits}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadReport;
