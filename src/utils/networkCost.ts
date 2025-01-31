import { UserInputDataType } from "./types";

export class NetworkCost {
  private numEmployees: number;
  private numLocations: number;
  private applicationSites: number;
  private trafficAcceleration: boolean;
  private numCountries: number;

  // private userInput: UserInputDataType;

  // Constants
  private readonly riskAdjustment = 0.1;
  private readonly vendorSaving = 0.3; // 30%

  constructor(userInput: UserInputDataType) {
    this.numEmployees = userInput.employeeCount;
    this.numLocations = userInput.locations;
    this.applicationSites = userInput.hostingSites;
    this.trafficAcceleration = Boolean(userInput.acceleration);
    this.numCountries = userInput.countries;
  }

  // Calculate annual security tech spending
  private getAnnualSecurityTechSpending(): number {
    return (
      this.numEmployees * 20 +
      this.numLocations * 5000 +
      this.applicationSites * 50000
    );
  }

  // Calculate connectivity cost
  private getConnectivityCost(): number {
    return this.trafficAcceleration ? this.numCountries * 36000 : 36000;
  }

  // Calculate total security networking cost
  private getSecurityNetworkingCost(): number {
    return (
      this.getAnnualSecurityTechSpending() * this.vendorSaving +
      this.getConnectivityCost()
    );
  }

  // Final security networking cost reduction calculation
  public getNetworkCost(): number {
    return Math.round(
      this.getSecurityNetworkingCost() * (1 - this.riskAdjustment),
    );
  }
}
