"use client";

import { useUserInputContext } from "@/contexts/UserInputContext";
import { formatCompactCurrency } from "@/utils/helpers";
import BenefitsCard from "./BenefitsCard";
import { calculationResult } from "@/pdf/calculation/calculationResult";
import useWindowWidth from "@/hooks/useWindowWidth";
import Spinner from "./Spinner";
import useFormula from "@/hooks/useFormula";
import useRegions from "@/hooks/useRegions";
import FincanceChart from "./FinanceChart";

function CalculatorResult() {
  const { regions, regionsIsLoading } = useRegions();
  const { formula, formulaIsLoading } = useFormula();
  const width = useWindowWidth();
  const { state, error } = useUserInputContext();

  if (formulaIsLoading || regionsIsLoading) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!formula || !regions) {
    return (
      <div className="p-4 text-center">
        <p>Formula and regions data are not found!</p>
      </div>
    );
  }

  const selectedCountry = regions?.find(
    (region) => region.country === state.region,
  );

  if (!selectedCountry) {
    return (
      <div className="p-4 text-center">
        <p>Country not found!</p>
      </div>
    );
  }

  if (
    state.region === "" ||
    state.totalEmployees === 0 ||
    state.hostingSites === 0 ||
    state.locations === 0
  ) {
    return (
      <div className="p-4 text-center">
        <p>Please fill the input fields</p>
      </div>
    );
  }

  const hasError = Object.values(error).some((msg) => msg !== "");

  const { roiPercentages, benefits, otherCalculation, cost } =
    calculationResult(
      formula,
      { ...state, created_at: new Date().toISOString() },
      selectedCountry,
    );

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-2.5 pb-2 pt-5">
        <BenefitsCard title="3-Year ROI">
          <span>{hasError ? "0" : Math.round(roiPercentages.total)}%</span>
        </BenefitsCard>
        <BenefitsCard title="Payback Period">
          <span>
            {hasError ? "" : Math.round(otherCalculation.paybackPeriod)}
            &nbsp;Months
          </span>
        </BenefitsCard>
        <BenefitsCard title="3-Year NPV">
          <span>{hasError ? "0" : formatCompactCurrency(benefits.npv)}</span>
        </BenefitsCard>
        <BenefitsCard title="Avg Yearly Benefit">
          <span>
            {hasError
              ? "0"
              : formatCompactCurrency(otherCalculation.avgYearlyBenefits)}
          </span>
        </BenefitsCard>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <FincanceChart
          height={width < 576 ? 280 : width >= 576 && width < 992 ? 180 : 220}
          titleFontSize={width > 576 ? 16 : 14}
          costs={cost}
          benefits={benefits}
        />
      </div>
    </div>
  );
}

export default CalculatorResult;
