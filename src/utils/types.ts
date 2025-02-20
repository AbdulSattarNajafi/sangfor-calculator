export type UserInputDataType = {
  firstName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  date: Date;
  country: string;
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

export type YearlyData = Record<"year1" | "year2" | "year3", number>;

export type SecurityGainType = {
  securityTeamPerEmployee: YearlyData[];
  avgTimeSpendOnAdministration: YearlyData[];
  efficiencyGainsDueToAccessSecure: YearlyData[];
  timeTrackingAndRespondingToSecurity: YearlyData[];
  sizeOfTheNetworkingOrg: YearlyData[];
  timeSpendOnAdministration: YearlyData[];
  productivityRecapture: YearlyData[];
  riskAdjustment: YearlyData[];
};

export type ProductivityGainType = {
  endUsersProductivityImpacted: YearlyData[];
  productivityImprovement: YearlyData[];
  productivityRecapture: YearlyData[];
  riskAdjustment: YearlyData[];
};

export type BreachRiskType = {
  averageNumberOfSecurity: YearlyData[];
  averageCostOfDataBreach: YearlyData[];
  reducedLikelihoodOfABreach: YearlyData[];
  riskAdjustment: YearlyData[];
};

export type NerworkCostType = {
  numberOfEmployeeCost: YearlyData[];
  numberOfRemoteSites: YearlyData[];
  dCs: YearlyData[];
  percentageOfSavingsFromVendor: YearlyData[];
  replacingExistingMPLSConnectivityCost: YearlyData[];
  riskAdjustment: YearlyData[];
};

export type TotalCostType = {
  numberOfFTEsRequired: YearlyData[];
  timeSpentOnSangforSASEPerTeamMember: YearlyData[];
  timeSpentOnMigrationOfLegacyInfraToSASE: YearlyData[];
  percentageOfTimeSpentForOngoingManagement: YearlyData[];
  costOfSASEConnector: YearlyData[];
  costOfCrossBorderTrafficAcceleration: YearlyData[];
  riskAdjustment: YearlyData[];
};

export type FormulaType = {
  securityAndNetworkingOrgEfficiencyGain: SecurityGainType;
  endUserProductivityGains: ProductivityGainType;
  securityAndDataBreachRiskReduction: BreachRiskType;
  securityAndNetworkingInfraCostReduction: NerworkCostType;
  analysisOfCosts: TotalCostType;
};

type UTMValue = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  utm_id: string | null;
  landing_url: string | null;
  gBraid: string | null;
  gclid: string | null;
  gdpr_checkbox: boolean | null;
};

type UTMData = {
  name: "utm";
  expiration: string;
  value: UTMValue;
};

export type ScsDataType = {
  default: {
    utm: UTMData;
  };
};

// Stored Data Types
export type dataType = {
  userId: string;
  firstName: string;
  emailAddress: string;
  businessPhone: string;
  companyName: string;
  jobTitle: string;
  submissionDate: Date;
  countryName: string;
  userConsent: boolean;
  demoRequest: boolean;
  region: string;
  totalEmployees: number;
  locations: number;
  hostingSites: number;
  hybridPercentage: number;
  countries: number;
  acceleration: boolean;
  lead_source: string;
  marketing_campaign: string;
  landing_page_url: string;
  form_page_url: string;
  pdf_report_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_id: string;
  utm_term: string;
  utm_content: string;
  gBraid: string;
  gclid: string;
  gdpr_checkbox: boolean;
};
