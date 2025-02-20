// 5- Analysis Of Costs
import { extractYearlyData } from "@/utils/helpers";
import {
  SelectedCountryType,
  TotalCostType,
  UserInputDataType,
  YearlyData,
} from "@/utils/types";

export class CostAnalysis {
  private numberOfFTEsRequired: YearlyData;
  private timeSpentOnSangforSASEPerTeamMember: YearlyData;
  private timeSpentOnMigrationOfLegacyInfraToSASE: YearlyData;
  private percentageOfTimeSpentForOngoingManagement: YearlyData;
  private costOfSASEConnector: YearlyData;
  private costOfCrossBorderTrafficAcceleration: YearlyData;
  private riskAdjustment: YearlyData;

  private numEmployees: number;
  private applicationSites: number;
  private trafficAcceleration: boolean;
  private numCountries: number;
  private securityEmployeeSalary: number;
  private saseCostPerUserPerYear: number;

  constructor(
    formula: TotalCostType,
    userInput: UserInputDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.numberOfFTEsRequired = extractYearlyData(formula.numberOfFTEsRequired);
    this.timeSpentOnSangforSASEPerTeamMember = extractYearlyData(
      formula.timeSpentOnSangforSASEPerTeamMember,
    );
    this.timeSpentOnMigrationOfLegacyInfraToSASE = extractYearlyData(
      formula.timeSpentOnMigrationOfLegacyInfraToSASE,
    );
    this.percentageOfTimeSpentForOngoingManagement = extractYearlyData(
      formula.percentageOfTimeSpentForOngoingManagement,
    );
    this.costOfSASEConnector = extractYearlyData(formula.costOfSASEConnector);
    this.costOfCrossBorderTrafficAcceleration = extractYearlyData(
      formula.costOfCrossBorderTrafficAcceleration,
    );
    this.riskAdjustment = extractYearlyData(formula.riskAdjustment);

    this.numEmployees = userInput.employeeCount;
    this.applicationSites = userInput.hostingSites;
    this.trafficAcceleration = Boolean(userInput.acceleration);
    this.numCountries = userInput.countries;
    this.securityEmployeeSalary = selectedCountry.securityEmployeeSalary;
    this.saseCostPerUserPerYear = selectedCountry.sASECostPerUserPerYear;
  }

  // Calculate required FTE
  private getRequiredFte() {
    return {
      year1: Math.ceil(this.numEmployees / this.numberOfFTEsRequired.year1),
      year2: Math.ceil(this.numEmployees / this.numberOfFTEsRequired.year2),
      year3: Math.ceil(this.numEmployees / this.numberOfFTEsRequired.year3),
    };
  }

  // Calculate installation and development cost
  private getInstallationAndDevelopmentCost() {
    const requiredFte = this.getRequiredFte();

    return {
      year1:
        requiredFte.year1 *
        (this.timeSpentOnSangforSASEPerTeamMember.year1 +
          this.timeSpentOnMigrationOfLegacyInfraToSASE.year1) *
        this.securityEmployeeSalary,
      year2:
        requiredFte.year2 *
        (this.timeSpentOnSangforSASEPerTeamMember.year2 +
          this.timeSpentOnMigrationOfLegacyInfraToSASE.year2) *
        this.securityEmployeeSalary,
      year3:
        requiredFte.year3 *
        (this.timeSpentOnSangforSASEPerTeamMember.year3 +
          this.timeSpentOnMigrationOfLegacyInfraToSASE.year3) *
        this.securityEmployeeSalary,
    };
  }

  // Calculate training and maintenance cost
  private getTrainingMaintenanceCost() {
    const requiredFte = this.getRequiredFte();

    return {
      year1:
        requiredFte.year1 *
        this.securityEmployeeSalary *
        this.percentageOfTimeSpentForOngoingManagement.year1,
      year2:
        requiredFte.year2 *
        this.securityEmployeeSalary *
        this.percentageOfTimeSpentForOngoingManagement.year2,
      year3:
        requiredFte.year3 *
        this.securityEmployeeSalary *
        this.percentageOfTimeSpentForOngoingManagement.year3,
    };
  }

  // Calculate user licenses cost
  private getUserLicensesCost() {
    return {
      year1: this.saseCostPerUserPerYear * this.numEmployees,
      year2: this.saseCostPerUserPerYear * this.numEmployees,
      year3: this.saseCostPerUserPerYear * this.numEmployees,
    };
  }

  // Calculate SASE connector cost
  private getSaseConnectorCost() {
    return {
      year1: this.applicationSites * this.costOfSASEConnector.year1,
      year2: this.applicationSites * this.costOfSASEConnector.year2,
      year3: this.applicationSites * this.costOfSASEConnector.year3,
    };
  }

  // Calculate traffic acceleration cost
  private getTrafficAccelerationCost() {
    return {
      year1: this.trafficAcceleration
        ? this.numCountries * this.costOfCrossBorderTrafficAcceleration.year1
        : this.costOfCrossBorderTrafficAcceleration.year1,
      year2: this.trafficAcceleration
        ? this.numCountries * this.costOfCrossBorderTrafficAcceleration.year2
        : this.costOfCrossBorderTrafficAcceleration.year2,
      year3: this.trafficAcceleration
        ? this.numCountries * this.costOfCrossBorderTrafficAcceleration.year3
        : this.costOfCrossBorderTrafficAcceleration.year3,
    };
  }

  // Calculate total solution cost
  private getSolutionTotalCost() {
    const installationAndDevelopmentCost =
      this.getInstallationAndDevelopmentCost();
    const trainingMaintenanceCost = this.getTrainingMaintenanceCost();
    const userLicensesCost = this.getUserLicensesCost();
    const saseConnectorCost = this.getSaseConnectorCost();
    const trafficAccelerationCost = this.getTrafficAccelerationCost();
    return {
      year1:
        installationAndDevelopmentCost.year1 +
        trainingMaintenanceCost.year1 +
        userLicensesCost.year1 +
        saseConnectorCost.year1 +
        trafficAccelerationCost.year1,
      year2:
        installationAndDevelopmentCost.year2 +
        trainingMaintenanceCost.year2 +
        userLicensesCost.year2 +
        saseConnectorCost.year2 +
        trafficAccelerationCost.year2,
      year3:
        installationAndDevelopmentCost.year3 +
        trainingMaintenanceCost.year3 +
        userLicensesCost.year3 +
        saseConnectorCost.year3 +
        trafficAccelerationCost.year3,
    };
  }

  // Final total cost calculation with risk adjustment
  public getTotalCost() {
    const solutionTotalCost = this.getSolutionTotalCost();

    return {
      year1: Math.round(
        solutionTotalCost.year1 * (1 + this.riskAdjustment.year1),
      ),
      year2: Math.round(
        solutionTotalCost.year2 * (1 + this.riskAdjustment.year2),
      ),
      year3: Math.round(
        solutionTotalCost.year3 * (1 + this.riskAdjustment.year3),
      ),
    };
  }
}
