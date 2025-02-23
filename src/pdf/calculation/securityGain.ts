// 1- Security and Networking Org Efficiency Gain
import { extractYearlyData } from "@/utils/helpers";
import {
  CustomerDataType,
  SecurityGainType,
  SelectedCountryType,
  YearlyData,
} from "@/utils/types";

export class SecurityGain {
  private readonly securityTeamPerEmployee: YearlyData;
  private readonly avgTimeSpendOnAdministration: YearlyData;
  private readonly efficiencyGainsDueToAccessSecure: YearlyData;
  private readonly timeTrackingAndRespondingToSecurity: YearlyData;
  private readonly sizeOfTheNetworkingOrg: YearlyData;
  private readonly timeSpendOnAdministration: YearlyData;
  private readonly productivityRecapture: YearlyData;
  private readonly riskAdjustment: YearlyData;

  private readonly numEmployees: number;
  private readonly securitySalary: number;
  private readonly networkSalary: number;

  constructor(
    formula: SecurityGainType,
    userInput: CustomerDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.securityTeamPerEmployee = extractYearlyData(
      formula.securityTeamPerEmployee,
    );
    this.avgTimeSpendOnAdministration = extractYearlyData(
      formula.avgTimeSpendOnAdministration,
    );
    this.efficiencyGainsDueToAccessSecure = extractYearlyData(
      formula.efficiencyGainsDueToAccessSecure,
    );
    this.timeTrackingAndRespondingToSecurity = extractYearlyData(
      formula.timeTrackingAndRespondingToSecurity,
    );
    this.sizeOfTheNetworkingOrg = extractYearlyData(
      formula.sizeOfTheNetworkingOrg,
    );
    this.timeSpendOnAdministration = extractYearlyData(
      formula.timeSpendOnAdministration,
    );
    this.productivityRecapture = extractYearlyData(
      formula.productivityRecapture,
    );
    this.riskAdjustment = extractYearlyData(formula.riskAdjustment);

    this.numEmployees = userInput.totalEmployees;
    this.securitySalary = selectedCountry.securityEmployeeSalary;
    this.networkSalary = selectedCountry.networkEmployeeSalary;
  }

  // D 19
  private getSizeOfSecurity() {
    return {
      year1: this.numEmployees / this.securityTeamPerEmployee.year1,
      year2: this.numEmployees / this.securityTeamPerEmployee.year2,
      year3: this.numEmployees / this.securityTeamPerEmployee.year3,
    };
  }

  // D 22
  private getTotalTimeSaving() {
    const sizeOfSecurity = this.getSizeOfSecurity();

    return {
      year1: Math.ceil(
        sizeOfSecurity.year1 *
          this.avgTimeSpendOnAdministration.year1 *
          this.efficiencyGainsDueToAccessSecure.year1,
      ),
      year2: Math.ceil(
        sizeOfSecurity.year2 *
          this.avgTimeSpendOnAdministration.year2 *
          this.efficiencyGainsDueToAccessSecure.year2,
      ),
      year3: Math.ceil(
        sizeOfSecurity.year3 *
          this.avgTimeSpendOnAdministration.year3 *
          this.efficiencyGainsDueToAccessSecure.year3,
      ),
    };
  }

  // D 25
  private getTotalTimeSavingInTracking() {
    const sizeOfSecurity = this.getSizeOfSecurity();
    return {
      year1: Math.ceil(
        sizeOfSecurity.year1 *
          this.timeTrackingAndRespondingToSecurity.year1 *
          this.efficiencyGainsDueToAccessSecure.year1,
      ),
      year2: Math.ceil(
        sizeOfSecurity.year2 *
          this.timeTrackingAndRespondingToSecurity.year2 *
          this.efficiencyGainsDueToAccessSecure.year2,
      ),
      year3: Math.ceil(
        sizeOfSecurity.year3 *
          this.timeTrackingAndRespondingToSecurity.year3 *
          this.efficiencyGainsDueToAccessSecure.year3,
      ),
    };
  }

  // D 27
  public getOrgEfficiencyGain() {
    const totalTimeSaving = this.getTotalTimeSaving();
    const totalTimeSavingInTracking = this.getTotalTimeSavingInTracking();

    return {
      year1:
        (totalTimeSaving.year1 + totalTimeSavingInTracking.year1) *
        this.securitySalary,
      year2:
        (totalTimeSaving.year2 + totalTimeSavingInTracking.year2) *
        this.securitySalary,
      year3:
        (totalTimeSaving.year3 + totalTimeSavingInTracking.year3) *
        this.securitySalary,
    };
  }

  // D 29
  private getSizeOfNetworking() {
    return {
      year1: Math.ceil(this.numEmployees / this.sizeOfTheNetworkingOrg.year1),
      year2: Math.ceil(this.numEmployees / this.sizeOfTheNetworkingOrg.year2),
      year3: Math.ceil(this.numEmployees / this.sizeOfTheNetworkingOrg.year3),
    };
  }

  // D 32
  private getAdministrationTimeSaving() {
    const sizeOfNetworking = this.getSizeOfNetworking();

    return {
      year1: Math.ceil(
        sizeOfNetworking.year1 *
          this.timeSpendOnAdministration.year1 *
          this.efficiencyGainsDueToAccessSecure.year1,
      ),
      year2: Math.ceil(
        sizeOfNetworking.year2 *
          this.timeSpendOnAdministration.year2 *
          this.efficiencyGainsDueToAccessSecure.year2,
      ),
      year3: Math.ceil(
        sizeOfNetworking.year3 *
          this.timeSpendOnAdministration.year3 *
          this.efficiencyGainsDueToAccessSecure.year3,
      ),
    };
  }

  // D 34
  private getTotalValueOfNetworking() {
    const administrationTimeSaving = this.getAdministrationTimeSaving();

    return {
      year1: this.networkSalary * administrationTimeSaving.year1,
      year2: this.networkSalary * administrationTimeSaving.year2,
      year3: this.networkSalary * administrationTimeSaving.year3,
    };
  }

  public getAdditionalFte() {
    const totalTimeSaving = this.getTotalTimeSaving();
    const totalTimeSavingInTracking = this.getTotalTimeSavingInTracking();

    return totalTimeSaving.year3 + totalTimeSavingInTracking.year3;
  }

  // D38
  public getSecurityGain() {
    const orgEfficiencyGain = this.getOrgEfficiencyGain();
    const totalValueOfNetworking = this.getTotalValueOfNetworking();

    return {
      year1: Math.round(
        (orgEfficiencyGain.year1 + totalValueOfNetworking.year1) *
          (1 - this.productivityRecapture.year1) *
          (1 - this.riskAdjustment.year1),
      ),
      year2: Math.round(
        (orgEfficiencyGain.year2 + totalValueOfNetworking.year2) *
          (1 - this.productivityRecapture.year2) *
          (1 - this.riskAdjustment.year2),
      ),
      year3: Math.round(
        (orgEfficiencyGain.year3 + totalValueOfNetworking.year3) *
          (1 - this.productivityRecapture.year3) *
          (1 - this.riskAdjustment.year3),
      ),
    };
  }
}
