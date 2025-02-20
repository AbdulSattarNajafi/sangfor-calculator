"use client";

import { useUserInputContext } from "@/contexts/UserInputContext";
import { formatCompactCurrency } from "@/utils/helpers";
import FinancialChart from "@/pdf/charts/FinancialChart";
import BenefitsCard from "./BenefitsCard";
import { useEffect, useState } from "react";
import { calculationResult } from "@/pdf/calculation/calculationResult";
import { FormulaType } from "@/utils/types";
import useWindowWidth from "@/hooks/useWindowWidth";
import Spinner from "./Spinner";

function CalculatorResult() {
  const [isLoading, setIsLoading] = useState(false);
  const [formula, setFormula] = useState<FormulaType | null>(null);
  const { state, error } = useUserInputContext();
  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );
  const width = useWindowWidth();

  useEffect(() => {
    if (formula) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/formula");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setFormula(json);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [formula]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!selectedCountry) {
    return (
      <div className="p-4 text-center">
        <p>Country not found.</p>
      </div>
    );
  }
  if (!formula) {
    return (
      <div className="p-4 text-center">
        <p>Formula data missing.</p>
      </div>
    );
  }

  const hasError = Object.values(error).some((msg) => msg !== "");
  const { roiPercentages, benefits, paybackPeriod, avgYearlyBenefits, cost } =
    calculationResult(formula, state, selectedCountry);

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

      <div className="mx-auto w-full max-w-6xl">
        <FinancialChart
          height={width < 576 ? 280 : width >= 576 && width < 992 ? 180 : 220}
          titleFontSize={width > 576 ? 16 : 14}
          costs={[cost.year1, cost.year2, cost.year3]}
          benefits={[
            benefits.year1 - cost.year1,
            benefits.year2 - cost.year2,
            benefits.year3 - cost.year3,
          ]}
        />
      </div>
    </div>
  );
}

export default CalculatorResult;
