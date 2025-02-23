import { SecurityGain } from "@/pdf/calculation/securityGain";
import {
  CustomerDataType,
  FormulaType,
  SelectedCountryType,
} from "@/utils/types";
import { UserProductivityGain } from "./userProductivityGain";
import { BreachRisk } from "./breachRisk";
import { NetworkingCost } from "./networkingCost";
import { CostAnalysis } from "./costAnalysis";

function calculateNPV(cashFlows: number[]) {
  const npv = cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + 0.05, index + 1);
  }, 0);

  return npv;
}

export const calculationResult = (
  formula: FormulaType,
  userInput: CustomerDataType,
  selectedCountry: SelectedCountryType,
) => {
  const securityGain = new SecurityGain(
    formula.securityAndNetworkingOrgEfficiencyGain,
    userInput,
    selectedCountry,
  ).getSecurityGain();

  const orgEfficiencyGain = new SecurityGain(
    formula.securityAndNetworkingOrgEfficiencyGain,
    userInput,
    selectedCountry,
  ).getOrgEfficiencyGain();

  const additionalFte = new SecurityGain(
    formula.securityAndNetworkingOrgEfficiencyGain,
    userInput,
    selectedCountry,
  ).getAdditionalFte();

  const productivityGain = new UserProductivityGain(
    formula.endUserProductivityGains,
    userInput,
    selectedCountry,
  ).getProductivityGain();

  const totalProductivityRecover = new UserProductivityGain(
    formula.endUserProductivityGains,
    userInput,
    selectedCountry,
  ).getTotalProductivityRecover();

  const breachRisk = new BreachRisk(
    formula.securityAndDataBreachRiskReduction,
    userInput,
  ).getBreachRisck();

  const costOfSecurityRisk = new BreachRisk(
    formula.securityAndDataBreachRiskReduction,
    userInput,
  ).getTotalCostOfSecurityRisk();

  const networkCost = new NetworkingCost(
    formula.securityAndNetworkingInfraCostReduction,
    userInput,
  ).getNetworkCost();

  const connectivityCost = new NetworkingCost(
    formula.securityAndNetworkingInfraCostReduction,
    userInput,
  ).getConnectivityCost();

  const totalCost = new CostAnalysis(
    formula.analysisOfCosts,
    userInput,
    selectedCountry,
  ).getTotalCost();

  const benefitsYear1 =
    securityGain.year1 +
    productivityGain.year1 +
    breachRisk.year1 +
    networkCost.year1;
  const benefitsYear2 =
    securityGain.year2 +
    productivityGain.year2 +
    breachRisk.year2 +
    networkCost.year2;
  const benefitsYear3 =
    securityGain.year3 +
    productivityGain.year3 +
    breachRisk.year3 +
    networkCost.year3;
  const benefitsTotal = benefitsYear1 + benefitsYear2 + benefitsYear3;

  const costsTotal = totalCost.year1 + totalCost.year2 + totalCost.year3;

  return {
    // Security & Networking Org Efficiency Gain
    security: {
      year1: securityGain.year1,
      year2: securityGain.year2,
      year3: securityGain.year3,
      total: securityGain.year1 + securityGain.year2 + securityGain.year3,
      npv: calculateNPV([
        securityGain.year1,
        securityGain.year2,
        securityGain.year3,
      ]),
    },
    // Total value of Security organization efficiency gain
    orgEfficiencyGain: {
      year1: orgEfficiencyGain.year1,
      year2: orgEfficiencyGain.year2,
      year3: orgEfficiencyGain.year3,
      total:
        orgEfficiencyGain.year1 +
        orgEfficiencyGain.year2 +
        orgEfficiencyGain.year3,
      npv: calculateNPV([
        orgEfficiencyGain.year1,
        orgEfficiencyGain.year2,
        orgEfficiencyGain.year3,
      ]),
    },
    // End User Productivity Gains
    productivity: {
      year1: productivityGain.year1,
      year2: productivityGain.year2,
      year3: productivityGain.year3,
      total:
        productivityGain.year1 +
        productivityGain.year2 +
        productivityGain.year3,
      npv: calculateNPV([
        productivityGain.year1,
        productivityGain.year2,
        productivityGain.year3,
      ]),
    },
    // Security and Data Breach Risk Reduction
    breachRisk: {
      year1: breachRisk.year1,
      year2: breachRisk.year2,
      year3: breachRisk.year3,
      total: breachRisk.year1 + breachRisk.year2 + breachRisk.year3,
      npv: calculateNPV([breachRisk.year1, breachRisk.year2, breachRisk.year3]),
    },
    // Security & Networking Infra Cost Reduction
    networking: {
      year1: networkCost.year1,
      year2: networkCost.year2,
      year3: networkCost.year3,
      total: networkCost.year1 + networkCost.year2 + networkCost.year3,
      npv: calculateNPV([
        networkCost.year1,
        networkCost.year2,
        networkCost.year3,
      ]),
    },
    // Total Benefits
    benefits: {
      year1: benefitsYear1,
      year2: benefitsYear2,
      year3: benefitsYear3,
      total: benefitsTotal,
      npv: calculateNPV([benefitsYear1, benefitsYear2, benefitsYear3]),
    },
    // Total Cost
    cost: {
      year1: totalCost.year1,
      year2: totalCost.year2,
      year3: totalCost.year3,
      total: costsTotal,
      npv: calculateNPV([totalCost.year1, totalCost.year2, totalCost.year3]),
    },
    // ROI
    roiPercentages: {
      year1: Math.round(
        ((benefitsYear1 - totalCost.year1) / totalCost.year1) * 100,
      ),
      year2: Math.round(
        ((benefitsYear2 - totalCost.year2) / totalCost.year2) * 100,
      ),
      year3: Math.round(
        ((benefitsYear3 - totalCost.year3) / totalCost.year3) * 100,
      ),
      total: Math.round(((benefitsTotal - costsTotal) / costsTotal) * 100),
      npv: 0,
    },
    // Total Productivity Recover
    totalProductivityRecover: {
      year1: totalProductivityRecover.year1,
      year2: totalProductivityRecover.year2,
      year3: totalProductivityRecover.year3,
      total:
        totalProductivityRecover.year1 +
        totalProductivityRecover.year2 +
        totalProductivityRecover.year3,
      npv: 0,
    },
    otherCalculation: {
      paybackPeriod: Math.round(
        (totalCost.year1 / (benefitsYear1 - totalCost.year1)) * 12,
      ),
      avgYearlyBenefits: (benefitsTotal - costsTotal) / 3,
      totalCostOfSecurityAndDataRisk:
        costOfSecurityRisk.year1 +
        costOfSecurityRisk.year2 +
        costOfSecurityRisk.year3,
      sdwan:
        connectivityCost.year1 +
        connectivityCost.year2 +
        connectivityCost.year3,
      additionalFte,
    },
  };
};
