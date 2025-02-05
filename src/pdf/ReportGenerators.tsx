"use client";

import { useRef, useState } from "react";

import {
  Page,
  Text,
  Document,
  StyleSheet,
  Link,
  Image,
  pdf,
  View,
} from "@react-pdf/renderer";
import InputTable from "./Tables/InputTable";
import Header from "./components/Header";
import Card from "./components/Card";
import RoiCharts from "./charts/RoiCharts";
import FinancialChart from "./charts/FinancialChart";
import { captureElementAsImage, shortenNumber } from "@/utils/helpers";
import FinanceTable from "./Tables/FinanceTable";
import FincanceDonutCharts from "./charts/FincanceDonutCharts";
import RiskCharts from "./charts/RiskCharts";
import SavingCharts from "./charts/SavingCharts";
import TotalSavingCharts from "./charts/TotalSavingCharts";
import ListItem from "./components/ListItem";
import Step from "./components/Step";
import { UserInputDataType } from "@/utils/types";
import { costSavingBenefits } from "@/utils/financeSummary";
import { useUserInputContext } from "@/contexts/UserInputContext";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0b2651",
  },
  text: {
    display: "flex",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 8,
    marginBottom: 5,
  },
  link: {
    color: "#0070c0",
    textDecoration: "underline",
  },
  chartImage: {
    marginBottom: 20,
  },
});

function ReportGenerators({ data }: { data: UserInputDataType }) {
  const [isLoading, setIsLoading] = useState(false);
  const roiChartRef = useRef<HTMLDivElement>(null);
  const financialChartRef = useRef<HTMLDivElement>(null);
  const financeDonutChartsRef = useRef<HTMLDivElement>(null);
  const riskChartsRef = useRef<HTMLDivElement>(null);
  const savingChartsRef = useRef<HTMLDivElement>(null);
  const totalSavingChartsRef = useRef<HTMLDivElement>(null);

  const { state } = useUserInputContext();

  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );
  const financeSummary = costSavingBenefits(data, selectedCountry!);

  const userInputData = [
    { label: "Total Number of Employees", value: data.employeeCount },
    {
      label: "Percentage of Remote/Hybrid Employees ",
      value: data.hybridPercentage + "%",
    },
    {
      label:
        "Number of locations/sites (Inclu des HQ, Datacentres, Cloud, Branch, Retail, Manufacturing Plants) ",
      value: data.locations,
    },
    {
      label:
        "Number of countries (if multiple sites are in one country, count them as one) ",
      value: data.countries,
    },
    {
      label:
        "Number of Application Hosting Sites. Number of locations where applications servers are hosted. Please include public/private cloud locations as well. ",
      value: data.hostingSites,
    },
    { label: "Region (Country)", value: data.countryName },
    {
      label: "Replace existing MPLS with SASE Traffic Acceleration",
      value: data.acceleration === 1 ? "Yes" : "No",
    },
  ];

  const inputTableResult = [
    {
      label: "ROI ",
      value: Math.round(financeSummary.roiPercentages.total) + "%",
    },
    {
      label: "Payback Period  ",
      value: `Less than ${Math.round(financeSummary.paybackPeriod.value)} months`,
    },
    {
      label: "Total Benefits (NPV) ",
      value: `${shortenNumber(financeSummary.benefits.npv)} USD`,
    },
    {
      label: "Average Yearly Benefit ",
      value: `${shortenNumber(financeSummary.avgYearlyBenefits.value)} USD`,
    },
  ];

  const financeTableData = [
    {
      label: "Workforce Productivity Gains",
      year1: financeSummary.productivity.year1,
      year2: financeSummary.productivity.year2,
      year3: financeSummary.productivity.year3,
      total: financeSummary.productivity.total,
      presentValue: financeSummary.productivity.npv,
    },
    {
      label: "Security and Data Breach Risk Reduction",
      year1: financeSummary.breachRisk.year1,
      year2: financeSummary.breachRisk.year2,
      year3: financeSummary.breachRisk.year3,
      total: financeSummary.breachRisk.total,
      presentValue: financeSummary.breachRisk.npv,
    },
    {
      label: "Security & Networking Org Efficiency Gain",
      year1: financeSummary.orgEfficiency.year1,
      year2: financeSummary.orgEfficiency.year2,
      year3: financeSummary.orgEfficiency.year3,
      total: financeSummary.orgEfficiency.total,
      presentValue: financeSummary.orgEfficiency.npv,
    },
    {
      label: "Security & Networking Infra Cost Reduction",
      year1: financeSummary.networking.year1,
      year2: financeSummary.networking.year2,
      year3: financeSummary.networking.year3,
      total: financeSummary.networking.total,
      presentValue: financeSummary.networking.npv,
    },
    {
      label: "Total Benefits (Risk Adjusted)",
      year1: financeSummary.benefits.year1,
      year2: financeSummary.benefits.year2,
      year3: financeSummary.benefits.year3,
      total: financeSummary.benefits.total,
      presentValue: financeSummary.benefits.npv,
    },
  ];

  const generatePDF = async () => {
    setIsLoading(true);

    const roiChartImage = await captureElementAsImage(roiChartRef.current);
    const financialChartImage = await captureElementAsImage(
      financialChartRef.current,
    );
    const financeDonutChartsImage = await captureElementAsImage(
      financeDonutChartsRef.current,
    );
    const riskChartsImage = await captureElementAsImage(riskChartsRef.current);
    const savingChartsImage = await captureElementAsImage(
      savingChartsRef.current,
    );
    const totalSavingChartsImage = await captureElementAsImage(
      totalSavingChartsRef.current,
    );

    // Define the PDF document
    const MyDocument = () => (
      <Document>
        {/* ========= Page 1 =============== */}
        <Page size="A4" style={{ fontSize: 10, lineHeight: 1.5 }}>
          <Header userName={data.firstName} />
          <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
            <Card
              label="Simplified Management"
              labelWidth={126}
              text="To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,"
            />
            <Card
              label="Cloud-Native Security"
              labelWidth={116}
              text="To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,"
            />
            <Card
              label="AI-Powered Threat Detection"
              labelWidth={148}
              text="To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,"
            />
            <Card
              label="Unparalleled Visibility"
              labelWidth={115}
              text="To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,"
            />
            <Text style={{ marginTop: 5, marginBottom: 15, display: "flex" }}>
              To better understand the benefits, costs, and savings associated
              with the SASE investment, Sangfor has developed this customized
              report specific to your business environment. It is meant to help
              you determine high-level estimates of the costs, benefits,
              flexibility, and risk factors associated with your Access Secure
              Investment.
            </Text>

            {roiChartImage && (
              <Image style={styles.chartImage} src={roiChartImage} />
            )}
          </View>
        </Page>

        {/* ========= Page 2 =============== */}
        <Page size="A4" style={styles.page}>
          <InputTable
            title="You provided the following information to describe your environment:"
            data={userInputData}
          />
          <InputTable
            title="FINANCIAL SUMMARY – CONSOLIDATED 3 Year Risk Adjusted Metrics"
            data={inputTableResult}
          />
          {financialChartImage && (
            <Image style={styles.chartImage} src={financialChartImage} />
          )}
        </Page>

        {/* ========= Page 3 =============== */}
        <Page size="A4" style={styles.page}>
          <FinanceTable data={financeTableData} />
          <Text style={styles.text}>
            Workforce Productivity Gains: The modern workforce is increasingly
            mobile, with employees requiring access to critical applications and
            resources from anywhere, anytime. With Sangfor Access Secure,
            business users experience fewer interruptions, less downtime, and
            improved latency while accessing on-prem and cloud resources,
            fostering a more empowered and efficient workforce.
          </Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            By enabling business users to work without interruptions or lag,
            whether at home, in the office, or on the move, existing Sangfor
            Access Secure customers have historically benefitted from improved
            average end-user productivity per year by more than 8%, directly
            influencing organizational efficiency, innovation, and
            profitability.
          </Text>
          {financeDonutChartsImage && (
            <Image style={styles.chartImage} src={financeDonutChartsImage} />
          )}
          <Text style={styles.heading}>
            Security and Data Breach Risk Reduction:
          </Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            The average cost of a security and data breach is *USD 53.00 per
            employee, and a typical enterprise experiences an average of *3.2
            security or data breaches per year. By minimizing attack surface
            through Zero Trust, enforcing real-time threat intelligence,
            improving network traffic visibility powered by AI algorithms, and
            granular DLP capabilities, Sangfor Access Secure has reported more
            than a 75% reduction in security and data breaches historically.
          </Text>
          <Text style={[styles.smallText, { marginBottom: 10 }]}>
            *Source: Forrester Consulting Cost of A Cybersecurity Breach Survey
          </Text>
          {riskChartsImage && (
            <Image style={styles.chartImage} src={riskChartsImage} />
          )}
        </Page>

        {/* ========= Page 4 =============== */}
        <Page size={"A4"} style={styles.page}>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            Security & Networking Org Efficiency Gain: IT Teams spend a
            considerable amount of time and effort on managing software updates,
            patching servers, resolving mundane support tickets, and
            administering a siloed policy infrastructure, which prevents them
            from tackling a variety of strategic projects. Existing Access
            Secure customers were able to reduce their administrative overhead
            and benefitted from simplified networking and security
            administration, automated updates, centralized monitoring, and
            proactive threat prevention.
          </Text>
          {savingChartsImage && (
            <Image style={styles.chartImage} src={savingChartsImage} />
          )}
          <Text style={styles.text}>
            Additional administrative overhead savings are unlocked by Access
            Secure through reduced number of investigations, faster
            mean-time-to-resolution and automated scaling of networking and
            security infrastructure.
          </Text>
          <Text style={styles.text}>
            Security & Networking Infra Cost Reduction: With Sangfor Access
            Secure, customers have significantly reduced their annual security
            and networking tech spend by replacing expensive hardware appliances
            such as VPNs, SWGs, FWs, Edge Security, DLP, SD-WAN, Web Proxy and
            MPLS connections. The unified Access secure platform eliminates
            vendor management expenses, upfront hardware expenditures, licensing
            fees, and ongoing maintenance costs of physical infrastructure.
          </Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            For SD-WAN deployments, organizations save money on both hardware
            and WAN connectivity costs by leveraging cross border traffic
            acceleration.
          </Text>
          {totalSavingChartsImage && (
            <Image style={styles.chartImage} src={totalSavingChartsImage} />
          )}
        </Page>

        {/* ========= Page 5 =============== */}
        <Page size="A4" style={styles.page}>
          <Text style={styles.heading}>
            Next Five Steps to define for your Access Secure implementation
            roadmap
          </Text>

          <Step step="1">
            <Text>
              Determine what you need from Access Secure? Sangfor Access Secure
              offer a broad range of solutions. It is recommended to identify
              the key challenges and use cases that you would like to tap first.
            </Text>
          </Step>

          <Step step="2">
            <Text>
              Understand the capabilities of Sangfor Access Secure in detail?
              Discover the value Sangfor Access Secure can add to your
              organization’s specific needs. Schedule a meeting with us for a
              customized discussion by filling in this web form.&nbsp;
              <Link src="https://github.com" style={styles.link}>
                web form
              </Link>
            </Text>
          </Step>

          <Step step="3">
            <Text>
              Learn the Access Secure environment&nbsp;
              <Link src="https://github.com" style={styles.link}>
                Sign up for a free PoC
              </Link>
              &nbsp; with Sangfor Access Secure and play around with the
              capabilities we offer. Get a clear understanding of configuring
              security policies, monitoring performance, responding to security
              alerts, installing clients etc. Engage with Sangfor experts for
              best practices and unlock optimized configurations.
            </Text>
          </Step>

          <Step step="4">
            <Text>
              Implement Access Secure Incrementally Pilot test your PoC
              environment on a single, small network first to see how the Access
              Secure is working and how it integrates with your other security
              software. This gives you an opportunity to see where adjustments
              and modifications might be needed. This will also include creating
              more stringent access controls based on the identified
              relationships between users, applications, and data sources.
            </Text>
          </Step>

          <Step step="5">
            <Text>
              Review your configurations and expand Gradually configure Access
              Secure for additional networks and users, one at a time to
              accurately picture how Access Secure will affect the people using
              your systems every day. Once they are comfortable, consider using
              Access Secure for additional use cases.
            </Text>
          </Step>

          <Text style={[styles.heading, { marginTop: 10 }]}>
            Check out our additional resources
          </Text>
          <ListItem>
            <Text>
              Learn more about &nbsp;
              <Link
                src="https://www.sangfor.com/cybersecurity/products/sangfor-access-sase"
                style={styles.link}
              >
                Sangfor Access Secure
              </Link>
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Learn more about Access Secure recent recognition - &nbsp;
              <Link
                src="https://connect.sangfor.com/frost-radar-sase-2023?utm_source=Website&utm_medium=Sangfor"
                style={styles.link}
              >
                Frost & Sullivan Frost Radar™ for SASE, 2023
              </Link>
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Learn in detail about &nbsp;
              <Link
                src="https://www.sangfor.com/cybersecurity/solutions/zero-trust-guard-ztna"
                style={styles.link}
              >
                Sangfor’s Zero Trust Guard
              </Link>
              &nbsp; Capabilities, which is the flagship ZTNA module as part of
              Access Secure Platform.
            </Text>
          </ListItem>
        </Page>
      </Document>
    );

    const pdfBlob = await pdf(<MyDocument />).toBlob();

    setIsLoading(false);

    // Create a Blob URL
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "sangfor-sase-roi-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  };

  return (
    <>
      <div className="">
        <button
          id="generate-pdf-btn"
          onClick={generatePDF}
          disabled={isLoading}
          className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
        >
          {isLoading ? "Downloading..." : "Download Report"}
        </button>
      </div>
      <div className="mb-6 w-full bg-white p-6">
        <div ref={roiChartRef}>
          <RoiCharts
            roi={Math.round(financeSummary.roiPercentages.total)}
            npv={financeSummary.benefits.npv / 1000000}
            breachRisk={financeSummary.breachRisk.total}
            paybackPeriod={Math.round(financeSummary.paybackPeriod.value)}
          />
        </div>
        <div ref={financeDonutChartsRef}>
          <FincanceDonutCharts />
        </div>
        <div ref={riskChartsRef}>
          <RiskCharts />
        </div>
        <div ref={savingChartsRef}>
          <SavingCharts />
        </div>
        <div ref={totalSavingChartsRef}>
          <TotalSavingCharts />
        </div>
        <div ref={financialChartRef}>
          <FinancialChart
            benefits={[
              financeSummary.cost.year1,
              financeSummary.cost.year2,
              financeSummary.cost.year3,
            ]}
            costs={[
              financeSummary.benefits.year1 - financeSummary.cost.year1,
              financeSummary.benefits.year2 - financeSummary.cost.year2,
              financeSummary.benefits.year3 - financeSummary.cost.year3,
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default ReportGenerators;
