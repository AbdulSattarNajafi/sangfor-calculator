import { UserInputDataType } from "./types";

export class BreachRisk {
  private numEmployees: number;
  private hybridEmployeePercentage: number;

  // Constants
  private readonly securityBreach = 3.2;
  private readonly securityRiskCost = 53;
  private readonly reducedBreach = 0.75; // 75%
  private readonly riskAdjustment = 0.25; // 25%

  constructor(userInput: UserInputDataType) {
    this.numEmployees = userInput.employeeCount;
    this.hybridEmployeePercentage = userInput.hybridPercentage / 100;
  }

  // Calculate total cost of security risk
  private getTotalCostOfSecurityRisk(): number {
    return (
      this.securityBreach *
      this.numEmployees *
      this.hybridEmployeePercentage *
      this.securityRiskCost
    );
  }

  // Calculate security data breach risk reduction
  private getSecurityDataBreachRiskReduction(): number {
    return this.getTotalCostOfSecurityRisk() * this.reducedBreach;
  }

  // Final data breach risk reduction calculation
  public getBreachRisck(): number {
    return Math.round(
      this.getSecurityDataBreachRiskReduction() * (1 - this.riskAdjustment),
    );
  }
}
