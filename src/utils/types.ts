export type UserInputDataType = {
  userId: string;
  firstName: string;
  emailAddress: string;
  businessPhone: string;
  companyName: string;
  jobTitle: string;
  submissionDate: string;
  region: string;
  totalEmployees: number;
  hybridPercentage: number;
  locations: number;
  countries: number;
  hostingSites: number;
  countryName: string;
  acceleration: number;
  demoRequest: number;
  userConsent: number;
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

export type FinancialData = {
  year1: number;
  year2: number;
  year3: number;
  total: number;
  npv: number;
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

export type PageInfoDataType = {
  lead_source: string;
  marketing_campaign: string;
  form_page_url: string;
  pdf_report_url: string;
};

export type MarketingDataTypes = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_id: string;
  utm_term: string;
  utm_content: string;
  gBraid: string;
  gclid: string;
  gdpr_checkbox: boolean;
  landing_url: string;
};

type MarketingDetails = {
  id: number;
  userId: string;
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
  gdpr_checkbox: number;
  created_at: string;
  updated_at: string;
};

export type CustomerDataType = {
  userId: string;
  firstName: string;
  emailAddress: string;
  businessPhone: string;
  companyName: string;
  jobTitle: string;
  submissionDate: string;
  countryName: string;
  demoRequest: number;
  userConsent: number;
  region: string;
  totalEmployees: number;
  locations: number;
  hostingSites: number;
  hybridPercentage: number;
  countries: number;
  acceleration: number;
  created_at: string;
  updated_at?: string;
  marketing_details?: MarketingDetails;
};
