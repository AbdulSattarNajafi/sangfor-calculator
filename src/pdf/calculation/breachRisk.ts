// 3- Security and Data Breach Risk Reduction

import { extractYearlyData } from "@/utils/helpers";
import { BreachRiskType, UserInputDataType, YearlyData } from "@/utils/types";

export class BreachRisk {
  private averageNumberOfSecurity: YearlyData;
  private averageCostOfDataBreach: YearlyData;
  private reducedLikelihoodOfABreach: YearlyData;
  private riskAdjustment: YearlyData;

  private numEmployees: number;
  private hybridEmployeePercentage: number;

  constructor(formula: BreachRiskType, userInput: UserInputDataType) {
    this.averageNumberOfSecurity = extractYearlyData(
      formula.averageNumberOfSecurity,
    );
    this.averageCostOfDataBreach = extractYearlyData(
      formula.averageCostOfDataBreach,
    );
    this.reducedLikelihoodOfABreach = extractYearlyData(
      formula.reducedLikelihoodOfABreach,
    );
    this.riskAdjustment = extractYearlyData(formula.riskAdjustment);

    this.numEmployees = userInput.employeeCount;
    this.hybridEmployeePercentage = userInput.hybridPercentage / 100;
  }

  // Calculate total cost of security risk
  private getTotalCostOfSecurityRisk() {
    return {
      year1:
        this.averageNumberOfSecurity.year1 *
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.averageCostOfDataBreach.year1,
      year2:
        this.averageNumberOfSecurity.year2 *
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.averageCostOfDataBreach.year2,
      year3:
        this.averageNumberOfSecurity.year3 *
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.averageCostOfDataBreach.year3,
    };
  }

  // Calculate security data breach risk reduction
  private getSecurityDataBreachRiskReduction() {
    const totalCostOfSecurityRisk = this.getTotalCostOfSecurityRisk();

    return {
      year1:
        totalCostOfSecurityRisk.year1 * this.reducedLikelihoodOfABreach.year1,
      year2:
        totalCostOfSecurityRisk.year2 * this.reducedLikelihoodOfABreach.year2,
      year3:
        totalCostOfSecurityRisk.year3 * this.reducedLikelihoodOfABreach.year3,
    };
  }

  // Final data breach risk reduction calculation
  public getBreachRisck() {
    const securityDataBreachRiskReduction =
      this.getSecurityDataBreachRiskReduction();

    return {
      year1: Math.round(
        securityDataBreachRiskReduction.year1 * (1 - this.riskAdjustment.year1),
      ),
      year2: Math.round(
        securityDataBreachRiskReduction.year2 * (1 - this.riskAdjustment.year2),
      ),
      year3: Math.round(
        securityDataBreachRiskReduction.year3 * (1 - this.riskAdjustment.year3),
      ),
    };
  }
}
