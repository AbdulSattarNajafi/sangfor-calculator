import {
  CostsPercentageType,
  SelectedCountryType,
  UserInputDataType,
} from "./types";

export class TotalCost {
  private numEmployees: number;
  private applicationSites: number;
  private trafficAcceleration: boolean;
  private numCountries: number;
  private securityEmployeeSalary: number;
  private saseCostPerUserPerYear: number;
  private saseTimeSpentPerMember: number;
  private saseTimeSpentMigration: number;
  private ongoingManagementTime: number;

  // Constants
  private readonly riskAdjustment = 0.05; // 5%

  constructor(
    costsPercentages: CostsPercentageType,
    userInput: UserInputDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.numEmployees = userInput.employeeCount;
    this.applicationSites = userInput.hostingSites;
    this.trafficAcceleration = Boolean(userInput.acceleration);
    this.numCountries = userInput.countries;
    this.securityEmployeeSalary = selectedCountry.securityEmployeeSalary;
    this.saseCostPerUserPerYear = selectedCountry.saseCostPerUserPerYear;
    this.saseTimeSpentPerMember = costsPercentages.saseTimeSpentPerMember / 100;
    this.saseTimeSpentMigration = costsPercentages.saseTimeSpentMigration / 100;
    this.ongoingManagementTime = costsPercentages.ongoingManagementTime / 100;
  }

  // Calculate required FTE
  private getRequiredFTE(): number {
    return Math.ceil(this.numEmployees / 2000);
  }

  // Calculate installation and development cost
  private getInstallationAndDevelopmentCost(): number {
    return (
      this.getRequiredFTE() *
      (this.saseTimeSpentPerMember + this.saseTimeSpentMigration) *
      this.securityEmployeeSalary
    );
  }

  // Calculate training and maintenance cost
  private getTrainingMaintenanceCost(): number {
    return (
      this.getRequiredFTE() *
      this.securityEmployeeSalary *
      this.ongoingManagementTime
    );
  }

  // Calculate user licenses cost
  private getUserLicensesCost(): number {
    return this.saseCostPerUserPerYear * this.numEmployees;
  }

  // Calculate SASE connector cost
  private getSaseConnectorCost(): number {
    return this.applicationSites * 2 * 600;
  }

  // Calculate traffic acceleration cost
  private getTrafficAccelerationCost(): number {
    return this.trafficAcceleration ? this.numCountries * 4500 : 4500;
  }

  // Calculate total solution cost
  private getSolutionTotalCost(): number {
    return (
      this.getInstallationAndDevelopmentCost() +
      this.getTrainingMaintenanceCost() +
      this.getTrafficAccelerationCost() +
      this.getUserLicensesCost() +
      this.getSaseConnectorCost()
    );
  }

  // Final total cost calculation with risk adjustment
  public getTotalCost(): number {
    return Math.round(this.getSolutionTotalCost() * (1 + this.riskAdjustment));
  }
}
