"use client";

import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { pdf } from "@react-pdf/renderer";

import FinancialChart from "./charts/FinancialChart";
import {
  captureChartAsImage,
  formatCompactCurrency,
  formatDate,
  getUserInputData,
} from "@/utils/helpers";
import { FormulaType, UserInputDataType } from "@/utils/types";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { calculationResult } from "./calculation/calculationResult";
import DonutChart from "./charts/DonutChart";
import PDFPages from "./components/PDFPages";
import useWindowWidth from "@/hooks/useWindowWidth";

function PdfGenerator() {
  const [formula, setFormula] = useState<FormulaType | null>(null);
  const [data, setData] = useState<UserInputDataType | null>(null);
  const width = useWindowWidth();

  const chartTitleFontSize = width < 1200 ? (width / 1000) * 24 : 32;
  const chartHeight =
    width < 1200 ? Math.min(220, 145 + (1200 - width) / 7) : 145;

  useEffect(() => {
    const storedData = getUserInputData();
    if (!storedData) {
      redirect("/");
    }
    setData(storedData);
  }, []);

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
  const npvChartRef = useRef<HTMLDivElement>(null);
  const breachRiskChartRef = useRef<HTMLDivElement>(null);
  const paybackChartRef = useRef<HTMLDivElement>(null);

  const financialChartRef = useRef<HTMLDivElement>(null);

  const fteChartRef = useRef<HTMLDivElement>(null);
  const businessChartRef = useRef<HTMLDivElement>(null);
  const productivityChartRef = useRef<HTMLDivElement>(null);

  const reducedChartRef = useRef<HTMLDivElement>(null);
  const securityChartRef = useRef<HTMLDivElement>(null);
  const riskChartRef = useRef<HTMLDivElement>(null);

  const secOpsChartRef = useRef<HTMLDivElement>(null);
  const strategicChartRef = useRef<HTMLDivElement>(null);
  const savingChartRef = useRef<HTMLDivElement>(null);

  const consolidationChartRef = useRef<HTMLDivElement>(null);
  const infrastructureChartRef = useRef<HTMLDivElement>(null);
  const mplsChartRef = useRef<HTMLDivElement>(null);

  const { state } = useUserInputContext();

  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );
  if (!selectedCountry || !formula || !data) {
    return null;
  }

  const financeSummary = calculationResult(formula, data, selectedCountry);

  const userInputData = [
    { label: "Organization Name", value: data.company },
    { label: "Total Number of Employees", value: data.employeeCount },
    {
      label: "Percentage of Remote/Hybrid Employees",
      value: data.hybridPercentage + "%",
    },
    {
      label: "Number of Locations/Sites",
      value: data.locations,
    },
    {
      label: "Number of Countries",
      value: data.countries,
    },
    {
      label: "Number of Application Hosting Sites",
      value: data.hostingSites,
    },
    { label: "Country/Region", value: data.countryName },
    {
      label: "Replace MPLS With SASE Traffic Acceleration?",
      value: data.acceleration === 1 ? "Yes" : "No",
    },
  ];

  const userDetailData = [
    { label: "Name", value: data.firstName },
    { label: "Email Address", value: data.email },
    { label: "Business Phone", value: data.phone },
    { label: "Job Title", value: data.jobTitle },
    { label: "Country/Region ", value: data.country },
    {
      label: "Submission Date & Time",
      value: formatDate(new Date(data.date)),
    },
  ];

  const inputTableResult = [
    {
      label: "Return of Investment (ROI)",
      value: Math.round(financeSummary.roiPercentages.total) + "%",
    },
    {
      label: "Payback Period",
      value: `Less than ${Math.round(financeSummary.paybackPeriod.value)} months`,
    },
    {
      label: "Total Benefits (measure by Net Present Value)",
      value: `${formatCompactCurrency(financeSummary.benefits.npv)} USD`,
    },
    {
      label: "Average Yearly Benefit",
      value: `${formatCompactCurrency(financeSummary.avgYearlyBenefits.value)} USD`,
    },
  ];

  const financeTableData = [
    {
      label: "Workforce Productivity Gains",
      year1: Math.round(financeSummary.productivity.year1),
      year2: Math.round(financeSummary.productivity.year2),
      year3: Math.round(financeSummary.productivity.year3),
      total: Math.round(financeSummary.productivity.total),
      presentValue: Math.round(financeSummary.productivity.npv),
    },
    {
      label: "Security and Data Breach Risk Reduction Cost Savings",
      year1: Math.round(financeSummary.breachRisk.year1),
      year2: Math.round(financeSummary.breachRisk.year2),
      year3: Math.round(financeSummary.breachRisk.year3),
      total: Math.round(financeSummary.breachRisk.total),
      presentValue: Math.round(financeSummary.breachRisk.npv),
    },
    {
      label: "Security & Networking Operational Efficiency Gains",
      year1: Math.round(financeSummary.orgEfficiencyGain.year1),
      year2: Math.round(financeSummary.orgEfficiencyGain.year2),
      year3: Math.round(financeSummary.orgEfficiencyGain.year3),
      total: Math.round(financeSummary.orgEfficiencyGain.total),
      presentValue: Math.round(financeSummary.orgEfficiencyGain.npv),
    },
    {
      label: "Security and Networking Infrastructure Cost Savings",
      year1: Math.round(financeSummary.networking.year1),
      year2: Math.round(financeSummary.networking.year2),
      year3: Math.round(financeSummary.networking.year3),
      total: Math.round(financeSummary.networking.total),
      presentValue: Math.round(financeSummary.networking.npv),
    },
    {
      label: "Total Benefits (Risk-Adjusted)",
      year1: Math.round(financeSummary.benefits.year1),
      year2: Math.round(financeSummary.benefits.year2),
      year3: Math.round(financeSummary.benefits.year3),
      total: Math.round(financeSummary.benefits.total),
      presentValue: Math.round(financeSummary.benefits.npv),
    },
  ];

  const generatePDF = async () => {
    setIsLoading(true);

    const roiChart = await captureChartAsImage(roiChartRef);
    const npvChart = await captureChartAsImage(npvChartRef);
    const breachRiskChart = await captureChartAsImage(breachRiskChartRef);
    const paybackChart = await captureChartAsImage(paybackChartRef);

    const financialChart = await captureChartAsImage(financialChartRef);

    const fteChart = await captureChartAsImage(fteChartRef);
    const businessChart = await captureChartAsImage(businessChartRef);
    const productivityChart = await captureChartAsImage(productivityChartRef);

    const reducedChart = await captureChartAsImage(reducedChartRef);
    const securityChart = await captureChartAsImage(securityChartRef);
    const riskChart = await captureChartAsImage(riskChartRef);

    const secOpsChart = await captureChartAsImage(secOpsChartRef);
    const strategicChart = await captureChartAsImage(strategicChartRef);
    const savingChart = await captureChartAsImage(savingChartRef);

    const consolidationChart = await captureChartAsImage(consolidationChartRef);
    const infrastructureChart = await captureChartAsImage(
      infrastructureChartRef,
    );
    const mplsChart = await captureChartAsImage(mplsChartRef);

    const chartImages = {
      roiChart,
      npvChart,
      breachRiskChart,
      paybackChart,
      financialChart,
      fteChart,
      businessChart,
      productivityChart,
      reducedChart,
      securityChart,
      riskChart,
      secOpsChart,
      strategicChart,
      savingChart,
      consolidationChart,
      infrastructureChart,
      mplsChart,
    };

    const pdfBlob = await pdf(
      <PDFPages
        images={chartImages}
        userInput={data}
        userInputTableData={userInputData}
        inputTableResult={inputTableResult}
        financeTableData={financeTableData}
        userDetailData={userDetailData}
        totalProductivityRecover={financeSummary.totalProductivityRecover.year3}
        additionalBusinessValue={financeSummary.productivity.total}
        lostProductivityRecovered={
          formula.endUserProductivityGains.productivityImprovement[0].year1 *
          100
        }
        reduceLikelihoodOfDataBreach={
          formula.securityAndDataBreachRiskReduction
            .reducedLikelihoodOfABreach[0].year1 * 100
        }
        totalCostOfSecurityAndDataRisk={
          financeSummary.totalCostOfSecurityAndDataRisk.value
        }
        riskAdjustedCostReduction={financeSummary.breachRisk.total}
        netOps={
          formula.securityAndNetworkingOrgEfficiencyGain
            .efficiencyGainsDueToAccessSecure[2].year3 * 100
        }
        additionalFTE={financeSummary.additionalFte.value}
        administrativeOverheadSavings={financeSummary.security.total}
        savingsFromVendor={
          formula.securityAndNetworkingInfraCostReduction
            .percentageOfSavingsFromVendor[2].year3 * 100
        }
        totalInfrastructureCost={financeSummary.networking.total}
        sdwan={financeSummary.sdwan.value}
      />,
    ).toBlob();

    setIsLoading(false);

    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <div className="absolute left-1/2 top-[220px] z-10 flex -translate-x-1/2 justify-center xs:top-[200px] sm:top-[180px]">
        <button
          onClick={generatePDF}
          disabled={isLoading}
          className="whitespace-nowrap rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
        >
          {isLoading ? "Preparing Your Report..." : "View My Report"}
        </button>
      </div>
      <div className="mb-6 flex w-full flex-col gap-4 bg-white p-6">
        {/* --------- Page 2 Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={roiChartRef}>
            <DonutChart
              background="#58c13d"
              color="#b9e5ae"
              label="3 Year ROI"
              value={financeSummary.roiPercentages.total}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#58c13d]">
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
              <h5 className="-mt-8 text-center text-4xl font-bold leading-tight text-[#0070c0]">
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
              value={financeSummary.paybackPeriod.value}
              totalValue={36}
            >
              <h5 className="-mt-5 text-center text-4xl font-bold leading-none text-[#d26e2a]">
                &lt; {financeSummary.paybackPeriod.value} <br />
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
              costs={[
                financeSummary.cost.year1,
                financeSummary.cost.year2,
                financeSummary.cost.year3,
              ]}
              benefits={[
                financeSummary.benefits.year1 - financeSummary.cost.year1,
                financeSummary.benefits.year2 - financeSummary.cost.year2,
                financeSummary.benefits.year3 - financeSummary.cost.year3,
              ]}
            />
          </div>
        </div>

        {/* --------- Page 3 Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={fteChartRef}>
            <DonutChart
              background="#58c13d"
              color="#b9e5ae"
              label="Number of FTEs Savings"
              value={10}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#58c13d]">40</h5>
            </DonutChart>
          </div>

          <div ref={businessChartRef}>
            <DonutChart
              background="#0070c0"
              color="#c7e0f1"
              label="Additional Business Value"
              value={20}
              totalValue={100}
            >
              <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#0070c0]">
                $ 3.32 <br /> million
              </h5>
            </DonutChart>
          </div>

          <div ref={productivityChartRef}>
            <DonutChart
              background="#00b0f0"
              color="#c5edfc"
              label="Lost Productivity Recovered"
              value={30}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#00b0f0]">8%</h5>
            </DonutChart>
          </div>
        </div>

        {/* --------- Risk Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={reducedChartRef}>
            <DonutChart
              background="#61993e"
              color="#a1c490"
              label="Reduced Likelihood of Data Breach"
              value={10}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#61993e]">75%</h5>
            </DonutChart>
          </div>
          <div ref={securityChartRef}>
            <DonutChart
              background="#ed7d32"
              color="#ffc100"
              label="Cost of Securtiy"
              value={20}
              totalValue={100}
            >
              <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#ed7d32]">
                $ 1.2 <br /> million
              </h5>
            </DonutChart>
          </div>
          <div ref={riskChartRef}>
            <DonutChart
              background="#5b9bd5"
              color="#a5a5a5"
              label="Risk adjust cost reduction"
              value={30}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#5b9bd5]">715K</h5>
            </DonutChart>
          </div>
        </div>

        {/* --------- Efficiency Gain Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={secOpsChartRef}>
            <DonutChart
              background="#71ad47"
              color="#4472c4"
              label="NetOps and SecOps Efficiency Gains"
              value={10}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#71ad47]">75%</h5>
            </DonutChart>
          </div>
          <div ref={strategicChartRef}>
            <DonutChart
              background="#ffd184"
              color="#e2aa01"
              label="Additional FTEs on strategic projects"
              value={20}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#ffd184]">03</h5>
            </DonutChart>
          </div>
          <div ref={savingChartRef}>
            <DonutChart
              background="#97b9df"
              color="#4f89bc"
              label="Administrative Overhead Savings"
              value={30}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#97b9df]">452K</h5>
            </DonutChart>
          </div>
        </div>

        {/* --------- Cost Reduction Charts ---------- */}
        <div className="flex flex-col items-center gap-4">
          <div ref={consolidationChartRef}>
            <DonutChart
              background="#61993e"
              color="#a1c490"
              label="Savings from Vendor Consolidation"
              value={10}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#61993e]">30%</h5>
            </DonutChart>
          </div>
          <div ref={infrastructureChartRef}>
            <DonutChart
              background="#3a64ad"
              color="#90a2d4"
              label="Total Infrastructure cost savings"
              value={20}
              totalValue={100}
            >
              <h5 className="-mt-8 text-center text-4xl font-bold text-[#3a64ad]">
                336K
              </h5>
            </DonutChart>
          </div>
          <div ref={mplsChartRef}>
            <DonutChart
              background="#5f5f5f"
              color="#b3b3b3"
              label="SD-WAN and MPLS Cost Savings"
              value={30}
              totalValue={100}
            >
              <h5 className="-mt-8 text-4xl font-bold text-[#5f5f5f]">
                ~ 200K
              </h5>
            </DonutChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfGenerator;
