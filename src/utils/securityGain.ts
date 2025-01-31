// Row 1

import { SelectedCountryType, UserInputDataType } from "./types";

export class SecurityGain {
  private numEmployees: number;
  private securitySalary: number;
  private networkSalary: number;
  private efficiencyGains: number;

  // Constants
  private readonly securityTeamPerEmployee = 1500;
  private readonly networkingTeamPerEmployee = 1800;
  private readonly administrationSetting = 0.33;
  private readonly productivityRecapture = 0.25;
  private readonly riskAdjustment = 0.1;
  private readonly avgAdministration = 0.6;
  private readonly timeTracking = 0.15;

  constructor(
    efficiencyGains: number,
    userInput: UserInputDataType,
    selectedCountry: SelectedCountryType,
  ) {
    this.numEmployees = userInput.employeeCount;
    this.securitySalary = selectedCountry.securityEmployeeSalary;
    this.networkSalary = selectedCountry.networkEmployeeSalary;
    this.efficiencyGains = efficiencyGains / 100;
  }

  // Calculate security team size
  private getSizeOfSecurity(): number {
    return Math.ceil(this.numEmployees / this.securityTeamPerEmployee);
  }

  // Calculate total time savings for security
  private getTotalTimeSaving(): number {
    return Math.ceil(
      this.getSizeOfSecurity() * this.avgAdministration * this.efficiencyGains,
    );
  }

  private getTotalTimeSavingInTracking(): number {
    return Math.ceil(
      this.getSizeOfSecurity() * this.timeTracking * this.efficiencyGains,
    );
  }

  public getOrgEfficiencyGain(): number {
    return Math.round(
      (this.getTotalTimeSaving() + this.getTotalTimeSavingInTracking()) *
        this.securitySalary,
    );
  }

  // Calculate networking team size
  private getSizeOfNetworking(): number {
    return Math.ceil(this.numEmployees / this.networkingTeamPerEmployee);
  }

  // Calculate administration time savings
  private getAdministrationTimeSaving(): number {
    return Math.ceil(
      this.getSizeOfNetworking() *
        this.administrationSetting *
        this.efficiencyGains,
    );
  }

  private getTotalValueOfNetworking(): number {
    return this.networkSalary * this.getAdministrationTimeSaving();
  }

  // Final efficiency gain calculation
  public getSecurityGain(): number {
    return Math.round(
      (this.getOrgEfficiencyGain() + this.getTotalValueOfNetworking()) *
        (1 - this.productivityRecapture) *
        (1 - this.riskAdjustment),
    );
  }
}
