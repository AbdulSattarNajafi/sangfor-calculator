// 2- End User Productivity Gains
import { extractYearlyData } from "@/utils/helpers";
import {
  ProductivityGainType,
  SelectedCountryType,
  UserInputDataType,
  YearlyData,
} from "@/utils/types";

export class UserProductivityGain {
  private endUsersProductivityImpacted: YearlyData;
  private productivityImprovement: YearlyData;
  private productivityRecapture: YearlyData;
  private riskAdjustment: YearlyData;

  private numEmployees: number;
  private hybridEmployeePercentage: number;
  private avgNationalSalary: number;

  constructor(
    formula: ProductivityGainType,
    unserInput: UserInputDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.endUsersProductivityImpacted = extractYearlyData(
      formula.endUsersProductivityImpacted,
    );
    this.productivityImprovement = extractYearlyData(
      formula.productivityImprovement,
    );
    this.productivityRecapture = extractYearlyData(
      formula.productivityRecapture,
    );
    this.riskAdjustment = extractYearlyData(formula.riskAdjustment);

    this.numEmployees = unserInput.employeeCount;
    this.hybridEmployeePercentage = unserInput.hybridPercentage / 100;
    this.avgNationalSalary = selectedCountry.avgNationalSalary;
  }

  // Calculate total impacted user productivity
  private getTotalEndUserProductivity() {
    return {
      year1:
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.endUsersProductivityImpacted.year1,
      year2:
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.endUsersProductivityImpacted.year2,
      year3:
        this.numEmployees *
        this.hybridEmployeePercentage *
        this.endUsersProductivityImpacted.year3,
    };
  }

  // Calculate total productivity recovery
  public getTotalProductivityRecover() {
    const totalEndUserProductivity = this.getTotalEndUserProductivity();

    return {
      year1: Math.ceil(
        totalEndUserProductivity.year1 * this.productivityImprovement.year1,
      ),
      year2: Math.ceil(
        totalEndUserProductivity.year2 * this.productivityImprovement.year2,
      ),
      year3: Math.ceil(
        totalEndUserProductivity.year3 * this.productivityImprovement.year3,
      ),
    };
  }

  // Calculate total productivity gains
  private getTotalEndUserProductivityGains() {
    const totalProductivityRecover = this.getTotalProductivityRecover();

    return {
      year1: totalProductivityRecover.year1 * this.avgNationalSalary,
      year2: totalProductivityRecover.year2 * this.avgNationalSalary,
      year3: totalProductivityRecover.year3 * this.avgNationalSalary,
    };
  }

  // Final productivity gain calculation
  public getProductivityGain() {
    const totalEndUserProductivityGains =
      this.getTotalEndUserProductivityGains();

    return {
      year1: Math.round(
        totalEndUserProductivityGains.year1 *
          (1 - this.productivityRecapture.year1) *
          (1 - this.riskAdjustment.year1),
      ),
      year2: Math.round(
        totalEndUserProductivityGains.year2 *
          (1 - this.productivityRecapture.year2) *
          (1 - this.riskAdjustment.year2),
      ),
      year3: Math.round(
        totalEndUserProductivityGains.year3 *
          (1 - this.productivityRecapture.year3) *
          (1 - this.riskAdjustment.year3),
      ),
    };
  }
}
