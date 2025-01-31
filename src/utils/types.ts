export type UserInputDataType = {
  userName: string;
  employeeCount: number;
  hybridPercentage: number;
  locations: number;
  countries: number;
  hostingSites: number;
  countryName: string;
  acceleration: number;
};

export type SelectedCountryType = {
  name: string;
  securityEmployeeSalary: number;
  networkEmployeeSalary: number;
  avgNationalSalary2024: number;
  saseCostPerUserPerYear: number;
};

export type CostsPercentageType = {
  saseTimeSpentPerMember: number;
  saseTimeSpentMigration: number;
  ongoingManagementTime: number;
};

export type SecurityPercentageType = {
  efficiencyGains: number;
};
