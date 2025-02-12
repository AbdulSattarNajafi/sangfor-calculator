"use client";

import { useEffect, useRef, useState } from "react";

import { pdf } from "@react-pdf/renderer";
import RoiCharts from "./charts/RoiCharts";
import FinancialChart from "./charts/FinancialChart";
import {
  captureChartAsImage,
  downloadFile,
  formatCompactCurrency,
} from "@/utils/helpers";
import FincanceDonutCharts from "./charts/FincanceDonutCharts";
import RiskCharts from "./charts/RiskCharts";
import SavingCharts from "./charts/SavingCharts";
import TotalSavingCharts from "./charts/TotalSavingCharts";
import { FormulaType, UserInputDataType } from "@/utils/types";
import { useUserInputContext } from "@/contexts/UserInputContext";
import PDFDocument from "./components/PDFDocument";
import { caclulationResult } from "./calculation/calculationResult";

function ReportGenerators({ data }: { data: UserInputDataType }) {
  const [formula, setFormula] = useState<FormulaType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/formula");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setFormula(json);
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Failed to fetch formula",
        );
      }
    }

    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const roiChartRef = useRef<HTMLDivElement>(null);
  const financialChartRef = useRef<HTMLDivElement>(null);
  const financeDonutChartsRef = useRef<HTMLDivElement>(null);
  const riskChartsRef = useRef<HTMLDivElement>(null);
  const savingChartsRef = useRef<HTMLDivElement>(null);
  const totalSavingChartsRef = useRef<HTMLDivElement>(null);

  const { state } = useUserInputContext();

  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );
  if (!selectedCountry || formula === null) return null;

  const financeSummary = caclulationResult(formula, data, selectedCountry);

  const userInputData = [
    { label: "Total Number of Employees", value: data.employeeCount },
    {
      label: "Percentage of Remote/Hybrid Employees ",
      value: data.hybridPercentage + "%",
    },
    {
      label:
        "Number of locations/sites (Inclu des HQ, Datacentres, Cloud, Branch, Retail, Manufacturing Plants) ",
      value: data.locations,
    },
    {
      label:
        "Number of countries (if multiple sites are in one country, count them as one) ",
      value: data.countries,
    },
    {
      label:
        "Number of Application Hosting Sites. Number of locations where applications servers are hosted. Please include public/private cloud locations as well. ",
      value: data.hostingSites,
    },
    { label: "Region (Country)", value: data.countryName },
    {
      label: "Replace existing MPLS with SASE Traffic Acceleration",
      value: data.acceleration === 1 ? "Yes" : "No",
    },
  ];

  const inputTableResult = [
    {
      label: "ROI ",
      value: Math.round(financeSummary.roiPercentages.total) + "%",
    },
    {
      label: "Payback Period  ",
      value: `Less than ${Math.round(financeSummary.paybackPeriod.value)} months`,
    },
    {
      label: "Total Benefits (NPV) ",
      value: `${formatCompactCurrency(financeSummary.benefits.npv)} USD`,
    },
    {
      label: "Average Yearly Benefit ",
      value: `${formatCompactCurrency(financeSummary.avgYearlyBenefits.value)} USD`,
    },
  ];

  const financeTableData = [
    {
      label: "Workforce Productivity Gains",
      year1: financeSummary.productivity.year1,
      year2: financeSummary.productivity.year2,
      year3: financeSummary.productivity.year3,
      total: financeSummary.productivity.total,
      presentValue: financeSummary.productivity.npv,
    },
    {
      label: "Security and Data Breach Risk Reduction",
      year1: financeSummary.breachRisk.year1,
      year2: financeSummary.breachRisk.year2,
      year3: financeSummary.breachRisk.year3,
      total: financeSummary.breachRisk.total,
      presentValue: financeSummary.breachRisk.npv,
    },
    {
      label: "Security & Networking Org Efficiency Gain",
      year1: financeSummary.orgEfficiencyGain.year1,
      year2: financeSummary.orgEfficiencyGain.year2,
      year3: financeSummary.orgEfficiencyGain.year3,
      total: financeSummary.orgEfficiencyGain.total,
      presentValue: financeSummary.orgEfficiencyGain.npv,
    },
    {
      label: "Security & Networking Infra Cost Reduction",
      year1: financeSummary.networking.year1,
      year2: financeSummary.networking.year2,
      year3: financeSummary.networking.year3,
      total: financeSummary.networking.total,
      presentValue: financeSummary.networking.npv,
    },
    {
      label: "Total Benefits (Risk Adjusted)",
      year1: financeSummary.benefits.year1,
      year2: financeSummary.benefits.year2,
      year3: financeSummary.benefits.year3,
      total: financeSummary.benefits.total,
      presentValue: financeSummary.benefits.npv,
    },
  ];

  const generatePDF = async () => {
    setIsLoading(true);

    const roiChart = await captureChartAsImage(roiChartRef);
    const financialChart = await captureChartAsImage(financialChartRef);
    const financeDonutCharts = await captureChartAsImage(financeDonutChartsRef);
    const riskCharts = await captureChartAsImage(riskChartsRef);
    const savingCharts = await captureChartAsImage(savingChartsRef);
    const totalSavingCharts = await captureChartAsImage(totalSavingChartsRef);

    const chartImages = {
      roiChart,
      financialChart,
      financeDonutCharts,
      riskCharts,
      savingCharts,
      totalSavingCharts,
    };

    // Generate the PDF as a blob
    const pdfBlob = await pdf(
      <PDFDocument
        images={chartImages}
        firstName={data.firstName}
        userInputData={userInputData}
        inputTableResult={inputTableResult}
        financeTableData={financeTableData}
      />,
    ).toBlob();

    setIsLoading(false);

    // Create a Blob URL
    const pdfUrl = URL.createObjectURL(pdfBlob);
    downloadFile(pdfUrl, "sangfor-sase-roi-report.pdf");
    // const link = document.createElement("a");
    // link.href = pdfUrl;
    // link.download = "sangfor-sase-roi-report.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(pdfUrl);
  };

  return (
    <>
      <div className="">
        <button
          id="generate-pdf-btn"
          onClick={generatePDF}
          disabled={isLoading}
          className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
        >
          {isLoading ? "Downloading..." : "Download Report"}
        </button>
      </div>
      <div className="mb-6 w-full bg-white p-6">
        <div ref={roiChartRef}>
          <RoiCharts
            roi={Math.round(financeSummary.roiPercentages.total)}
            npv={financeSummary.benefits.npv / 1000000}
            breachRisk={financeSummary.breachRisk.total}
            paybackPeriod={Math.round(financeSummary.paybackPeriod.value)}
          />
        </div>
        <div ref={financeDonutChartsRef}>
          <FincanceDonutCharts />
        </div>
        <div ref={riskChartsRef}>
          <RiskCharts />
        </div>
        <div ref={savingChartsRef}>
          <SavingCharts />
        </div>
        <div ref={totalSavingChartsRef}>
          <TotalSavingCharts />
        </div>
        <div ref={financialChartRef}>
          <FinancialChart
            titleFontSize={24}
            benefits={[
              financeSummary.cost.year1,
              financeSummary.cost.year2,
              financeSummary.cost.year3,
            ]}
            costs={[
              financeSummary.benefits.year1 - financeSummary.cost.year1,
              financeSummary.benefits.year2 - financeSummary.cost.year2,
              financeSummary.benefits.year3 - financeSummary.cost.year3,
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default ReportGenerators;
