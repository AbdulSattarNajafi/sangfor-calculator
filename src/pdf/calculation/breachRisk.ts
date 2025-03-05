// SECTION 3  Security and Data Breach Risk Reduction
import { extractYearlyData } from "@/utils/helpers";
import { BreachRiskType, CustomerDataType, YearlyData } from "@/utils/types";

export class BreachRisk {
  private averageNumberOfSecurity: YearlyData;
  private averageCostOfDataBreach: YearlyData;
  private reducedLikelihoodOfABreach: YearlyData;
  private riskAdjustment: YearlyData;

  private numEmployees: number;
  private hybridEmployeePercentage: number;

  constructor(formula: BreachRiskType, userInput: CustomerDataType) {
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

    this.numEmployees = userInput.totalEmployees;
    this.hybridEmployeePercentage = userInput.hybridPercentage / 100;
  }

  // C 63
  public getTotalCostOfSecurityRisk() {
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

  // C 65
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

  // C 68
  public getBreachRisck() {
    const securityDataBreachRiskReduction =
      this.getSecurityDataBreachRiskReduction();

    return {
      year1:
        securityDataBreachRiskReduction.year1 * (1 - this.riskAdjustment.year1),
      year2:
        securityDataBreachRiskReduction.year2 * (1 - this.riskAdjustment.year2),
      year3:
        securityDataBreachRiskReduction.year3 * (1 - this.riskAdjustment.year3),
    };
  }
}
