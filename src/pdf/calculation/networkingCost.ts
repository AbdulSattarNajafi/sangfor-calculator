// 4- Security and Networking Infra Cost Reduction
import { extractYearlyData } from "@/utils/helpers";
import { CustomerDataType, NerworkCostType, YearlyData } from "@/utils/types";

export class NetworkingCost {
  private numberOfEmployeeCost: YearlyData;
  private numberOfRemoteSites: YearlyData;
  private dcs: YearlyData;
  private percentageOfSavingsFromVendor: YearlyData;
  private replacingExistingMPLSConnectivityCost: YearlyData;
  private riskAdjustment: YearlyData;

  private numEmployees: number;
  private numLocations: number;
  private applicationSites: number;
  private trafficAcceleration: boolean;
  private numCountries: number;

  constructor(formula: NerworkCostType, userInput: CustomerDataType) {
    this.numberOfEmployeeCost = extractYearlyData(formula.numberOfEmployeeCost);
    this.numberOfRemoteSites = extractYearlyData(formula.numberOfRemoteSites);
    this.dcs = extractYearlyData(formula.dCs);
    this.percentageOfSavingsFromVendor = extractYearlyData(
      formula.percentageOfSavingsFromVendor,
    );
    this.replacingExistingMPLSConnectivityCost = extractYearlyData(
      formula.replacingExistingMPLSConnectivityCost,
    );
    this.riskAdjustment = extractYearlyData(formula.riskAdjustment);

    this.numEmployees = userInput.totalEmployees;
    this.numLocations = userInput.locations;
    this.applicationSites = userInput.hostingSites;
    this.trafficAcceleration = Boolean(userInput.acceleration);
    this.numCountries = userInput.countries;
  }

  // Calculate annual security tech spending
  private getAnnualSecurityTechSpending() {
    return {
      year1:
        this.numEmployees * this.numberOfEmployeeCost.year1 +
        this.numLocations * this.numberOfRemoteSites.year1 +
        this.applicationSites * this.dcs.year1,
      year2:
        this.numEmployees * this.numberOfEmployeeCost.year2 +
        this.numLocations * this.numberOfRemoteSites.year2 +
        this.applicationSites * this.dcs.year2,
      year3:
        this.numEmployees * this.numberOfEmployeeCost.year3 +
        this.numLocations * this.numberOfRemoteSites.year3 +
        this.applicationSites * this.dcs.year3,
    };
  }

  // Calculate connectivity cost
  public getConnectivityCost() {
    return {
      year1: this.trafficAcceleration
        ? this.numCountries * this.replacingExistingMPLSConnectivityCost.year1
        : this.replacingExistingMPLSConnectivityCost.year1,
      year2: this.trafficAcceleration
        ? this.numCountries * this.replacingExistingMPLSConnectivityCost.year2
        : this.replacingExistingMPLSConnectivityCost.year2,
      year3: this.trafficAcceleration
        ? this.numCountries * this.replacingExistingMPLSConnectivityCost.year3
        : this.replacingExistingMPLSConnectivityCost.year3,
    };
  }

  // Calculate total security networking cost
  private getSecurityNetworkingCost() {
    const annualSecurityTechSpending = this.getAnnualSecurityTechSpending();
    const connectivityCost = this.getConnectivityCost();

    return {
      year1:
        annualSecurityTechSpending.year1 *
          this.percentageOfSavingsFromVendor.year1 +
        connectivityCost.year1,
      year2:
        annualSecurityTechSpending.year2 *
          this.percentageOfSavingsFromVendor.year2 +
        connectivityCost.year2,
      year3:
        annualSecurityTechSpending.year3 *
          this.percentageOfSavingsFromVendor.year3 +
        connectivityCost.year3,
    };
  }

  // Final security networking cost reduction calculation
  public getNetworkCost() {
    const securityNetworkingCost = this.getSecurityNetworkingCost();
    return {
      year1: Math.round(
        securityNetworkingCost.year1 * (1 - this.riskAdjustment.year1),
      ),
      year2: Math.round(
        securityNetworkingCost.year2 * (1 - this.riskAdjustment.year2),
      ),
      year3: Math.round(
        securityNetworkingCost.year3 * (1 - this.riskAdjustment.year3),
      ),
    };
  }
}
