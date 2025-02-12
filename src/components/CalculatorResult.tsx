"use client";

import { useUserInputContext } from "@/contexts/UserInputContext";
import { formatCompactCurrency } from "@/utils/helpers";
import FinancialChart from "@/pdf/charts/FinancialChart";
import BenefitsCard from "./BenefitsCard";
import { useEffect, useState } from "react";
import { caclulationResult } from "@/pdf/calculation/calculationResult";
import { FormulaType } from "@/utils/types";

function CalculatorResult() {
  const [formula, setFormula] = useState<FormulaType | null>(null);
  const { state, error } = useUserInputContext();
  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );

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

  if (!selectedCountry || !formula) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const hasError = Object.values(error).some((msg) => msg !== "");
  const { roiPercentages, benefits, paybackPeriod, avgYearlyBenefits, cost } =
    caclulationResult(formula, state, selectedCountry);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-2.5 pb-2 pt-5">
        <BenefitsCard title="3-Year ROI">
          <span>{hasError ? "0" : Math.round(roiPercentages.total)}%</span>
        </BenefitsCard>
        <BenefitsCard title="Payback Period">
          <span>
            {hasError ? "" : Math.round(paybackPeriod.value)}
            &nbsp;Months
          </span>
        </BenefitsCard>
        <BenefitsCard title="3-Year NPV">
          <span>{hasError ? "0" : formatCompactCurrency(benefits.npv)}</span>
        </BenefitsCard>
        <BenefitsCard title="Avg Yearly Benefit">
          <span>
            {hasError ? "0" : formatCompactCurrency(avgYearlyBenefits.value)}
          </span>
        </BenefitsCard>
      </div>

      <FinancialChart
        height={220}
        titleFontSize={16}
        costs={[cost.year1, cost.year2, cost.year3]}
        benefits={[
          benefits.year1 - cost.year1,
          benefits.year2 - cost.year2,
          benefits.year3 - cost.year3,
        ]}
      />
    </div>
  );
}

export default CalculatorResult;
