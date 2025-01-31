import { SelectedCountryType, UserInputDataType } from "./types";

export class ProductivityGain {
  private numEmployees: number;
  private hybridEmployeePercentage: number;
  private avgNationalSalary: number;

  // Constants
  private readonly usersProductivityImpacted = 0.2;
  private readonly productivityLoss = 0.08;
  private readonly productivityRecapture = 0.25;
  private readonly riskAdjustment = 0.1;

  constructor(
    unserInput: UserInputDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.numEmployees = unserInput.employeeCount;
    this.hybridEmployeePercentage = unserInput.hybridPercentage / 100;
    this.avgNationalSalary = selectedCountry.avgNationalSalary2024;
  }

  // Calculate total impacted user productivity
  private getTotalEndUserProductivity(): number {
    return (
      this.numEmployees *
      this.hybridEmployeePercentage *
      this.usersProductivityImpacted
    );
  }

  // Calculate total productivity recovery
  private getTotalProductivityRecover(): number {
    return Math.ceil(
      this.getTotalEndUserProductivity() * this.productivityLoss,
    );
  }

  // Calculate total productivity gains
  private getTotalEndUserProductivityGains(): number {
    return this.getTotalProductivityRecover() * this.avgNationalSalary;
  }

  // Final productivity gain calculation
  public getProductivityGain(): number {
    return Math.round(
      this.getTotalEndUserProductivityGains() *
        (1 - this.productivityRecapture) *
        (1 - this.riskAdjustment),
    );
  }
}
