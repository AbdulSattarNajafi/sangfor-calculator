export type UserInputDataType = {
  firstName: string;
  employeeCount: number;
  hybridPercentage: number;
  locations: number;
  countries: number;
  hostingSites: number;
  countryName: string;
  acceleration: number;
};

export type SelectedCountryType = {
  country: string;
  securityEmployeeSalary: number;
  networkEmployeeSalary: number;
  avgNationalSalary: number;
  sASECostPerUserPerYear: number;
};

export type CostsPercentageType = {
  saseTimeSpentPerMember: number;
  saseTimeSpentMigration: number;
  ongoingManagementTime: number;
};

export type SecurityPercentageType = {
  efficiencyGains: number;
};
