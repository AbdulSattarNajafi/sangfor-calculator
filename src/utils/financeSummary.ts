import { TotalCost } from "./costs";
import { BreachRisk } from "./breachRisk";
import { SecurityGain } from "./securityGain";
import { ProductivityGain } from "./productivityGain";
import { NetworkCost } from "./networkCost";
import { SelectedCountryType, UserInputDataType } from "./types";

function calculateNPV(cashFlows: number[]) {
  const npv = cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + 0.05, index + 1);
  }, 0);

  return npv;
}

const generateYearlyData = (label: string, value: number) => ({
  label,
  year1: value,
  year2: value,
  year3: value,
  total: value * 3,
  npv: calculateNPV([value, value, value]),
});

const costsPercentages = [
  {
    saseTimeSpentPerMember: 15,
    saseTimeSpentMigration: 50,
    ongoingManagementTime: 10,
  },
  {
    saseTimeSpentPerMember: 10,
    saseTimeSpentMigration: 30,
    ongoingManagementTime: 5,
  },
  {
    saseTimeSpentPerMember: 7,
    saseTimeSpentMigration: 5,
    ongoingManagementTime: 2,
  },
];

const securityGainPercentage = [
  {
    efficiencyGains: 55,
  },
  {
    efficiencyGains: 60,
  },
  {
    efficiencyGains: 65,
  },
];

export const costSavingBenefits = (
  userInput: UserInputDataType,
  selectedCountry: SelectedCountryType,
) => {
  const securityGain = securityGainPercentage.map((efficiency) => {
    return new SecurityGain(
      efficiency.efficiencyGains,
      userInput,
      selectedCountry,
    ).getSecurityGain();
  });
  const totalSecurity = securityGain.reduce((sum, cost) => sum + cost, 0);

  const orgEfficiencyGain = securityGainPercentage.map((efficiency) => {
    return new SecurityGain(
      efficiency.efficiencyGains,
      userInput,
      selectedCountry,
    ).getOrgEfficiencyGain();
  });
  const totalorgEfficiencyGain = securityGain.reduce(
    (sum, cost) => sum + cost,
    0,
  );

  const productivityGain = new ProductivityGain(userInput, selectedCountry);

  const breachRisk = new BreachRisk(userInput);

  const networkCost = new NetworkCost(userInput);

  const benefitsYear =
    securityGain[0] +
    productivityGain.getProductivityGain() +
    breachRisk.getBreachRisck() +
    networkCost.getNetworkCost();

  // Compute costs for each year
  const totalCosts = costsPercentages.map((cost) =>
    new TotalCost(cost, userInput, selectedCountry).getTotalCost(),
  );

  const totalBenefits = benefitsYear * 3;
  const totalCostSum = totalCosts.reduce((sum, cost) => sum + cost, 0);

  return {
    security: {
      label: "Security & Networking Org Efficiency Gain",
      year1: securityGain[0],
      year2: securityGain[1],
      year3: securityGain[2],
      total: totalSecurity,
      npv: calculateNPV([securityGain[0], securityGain[1], securityGain[2]]),
    },
    orgEfficiency: {
      label: "Security & Networking Org Efficiency Gain",
      year1: orgEfficiencyGain[0],
      year2: orgEfficiencyGain[1],
      year3: orgEfficiencyGain[2],
      total: totalorgEfficiencyGain,
      npv: calculateNPV([
        orgEfficiencyGain[0],
        orgEfficiencyGain[1],
        orgEfficiencyGain[2],
      ]),
    },
    productivity: generateYearlyData(
      "End User Productivity Gains",
      productivityGain.getProductivityGain(),
    ),
    breachRisk: generateYearlyData(
      "Security and Data Breach Risk Reduction",
      breachRisk.getBreachRisck(),
    ),
    networking: generateYearlyData(
      "Security & Networking Infra Cost Reduction",
      networkCost.getNetworkCost(),
    ),
    benefits: generateYearlyData("Total Benefits", benefitsYear),
    cost: {
      label: "Total Cost",
      year1: totalCosts[0],
      year2: totalCosts[1],
      year3: totalCosts[2],
      total: totalCostSum,
    },
    roiPercentages: {
      label: "ROI",
      year1: ((benefitsYear - totalCosts[0]) / totalCosts[0]) * 100,
      year2: ((benefitsYear - totalCosts[1]) / totalCosts[1]) * 100,
      year3: ((benefitsYear - totalCosts[2]) / totalCosts[2]) * 100,
      total: ((totalBenefits - totalCostSum) / totalCostSum) * 100,
    },
    paybackPeriod: {
      label: "Payback Period (In Months)",
      value: (totalCosts[0] / (benefitsYear - totalCosts[0])) * 12,
    },
    avgYearlyBenefits: {
      label: "Avg Yearly Benefit",
      value: (benefitsYear * 3 - totalCostSum) / 3,
    },
  };
};
