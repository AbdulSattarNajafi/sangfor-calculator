"use client";

import {
  Page,
  Text,
  Document,
  StyleSheet,
  Link,
  Image,
  View,
} from "@react-pdf/renderer";
import Card from "./Card";
import InputTable from "../Tables/InputTable";
import FinanceTable from "../Tables/FinanceTable";
import ListItem from "./ListItem";
import Logo from "./Logo";
import {
  formatCompactCurrency,
  formatDate,
  formatLongDate,
} from "@/utils/helpers";
import { CustomerDataType, FinancialData } from "@/utils/types";
import KpiCard from "./KpiCard";
import Steps from "./Steps";

type ChartImageType = {
  roiChart: string | null;
  npvChart: string | null;
  breachRiskChart: string | null;
  paybackChart: string | null;
  financialChart: string | null;
};

type OtherCalculationType = {
  paybackPeriod: number;
  avgYearlyBenefits: number;
  totalCostOfSecurityAndDataRisk: number;
  additionalFte: number;
  sdwan: number;
};

type CalculationData = {
  security: FinancialData;
  orgEfficiencyGain: FinancialData;
  productivity: FinancialData;
  breachRisk: FinancialData;
  networking: FinancialData;
  benefits: FinancialData;
  cost: FinancialData;
  roiPercentages: FinancialData;
  totalProductivityRecover: FinancialData;
  otherCalculation: OtherCalculationType;
};

type OperationalSavingsType = {
  lostProductivityRecovered: number;
  reduceLikelihoodOfDataBreach: number;
  netOps: number;
  savingsFromVendor: number;
};

type PDFPagesProps = {
  images: ChartImageType;
  userInput: CustomerDataType;
  calculationData: CalculationData;
  operationalSavings: OperationalSavingsType;
};

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  pageTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0b2651",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0b2651",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0b2651",
  },
  userInfo: {
    fontSize: 10,
    fontWeight: 400,
    width: "120px",
  },
  userInfoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 10,
    color: "#0070c0",
    fontWeight: 400,
  },
  text: {
    display: "flex",
    marginBottom: 8,
  },
  smallText: {
    display: "flex",
    fontSize: 10,
  },
  link: {
    color: "#0070c0",
    textDecoration: "underline",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  donutChart: { width: "100px", height: "auto" },
});

function PDFPages({
  images,
  userInput,
  calculationData,
  operationalSavings,
}: PDFPagesProps) {
  const {
    security,
    productivity,
    breachRisk,
    networking,
    benefits,
    roiPercentages,
    totalProductivityRecover,
    otherCalculation,
  } = calculationData;

  const createdDate = userInput.created_at;

  const organizationDetailTableData = [
    { label: "Organization Name", value: userInput.companyName },
    { label: "Total Number of Employees", value: userInput.totalEmployees },
    {
      label: "Percentage of Remote/Hybrid Employees",
      value: userInput.hybridPercentage + "%",
    },
    {
      label: "Number of Locations/Sites",
      value: userInput.locations,
    },
    {
      label: "Number of Countries",
      value: userInput.countries,
    },
    {
      label: "Number of Application Hosting Sites",
      value: userInput.hostingSites,
    },
    { label: "Country/Region", value: userInput.region },
    {
      label: "Replace MPLS With SASE Traffic Acceleration?",
      value: userInput.acceleration ? "Yes" : "No",
    },
  ];

  const userDetailTableData = [
    { label: "Name", value: userInput.firstName },
    { label: "Email Address", value: userInput.emailAddress },
    { label: "Business Phone", value: userInput.businessPhone },
    { label: "Job Title", value: userInput.jobTitle },
    { label: "Country/Region ", value: userInput.countryName },
    {
      label: "Submission Date & Time",
      value: formatDate(new Date(createdDate)),
    },
  ];

  const lessThan = otherCalculation.paybackPeriod > 0 ? "Less than" : "";

  const riskAdjustedTableData = [
    {
      label: "Return of Investment (ROI)",
      value: Math.round(roiPercentages.total) + "%",
    },
    {
      label: "Payback Period",
      value: `${lessThan} ${Math.round(otherCalculation.paybackPeriod)} months`,
    },
    {
      label: "Total Benefits (measure by Net Present Value)",
      value: `${formatCompactCurrency(benefits.npv)} USD`,
    },
    {
      label: "Average Yearly Benefit",
      value: `${formatCompactCurrency(otherCalculation.avgYearlyBenefits)} USD`,
    },
  ];

  const financeTableData = [
    {
      label: "Workforce Productivity Gains",
      year1: Math.round(productivity.year1),
      year2: Math.round(productivity.year2),
      year3: Math.round(productivity.year3),
      total: Math.round(productivity.total),
      presentValue: Math.round(productivity.npv),
    },
    {
      label: "Security and Data Breach Risk Reduction Cost Savings",
      year1: Math.round(breachRisk.year1),
      year2: Math.round(breachRisk.year2),
      year3: Math.round(breachRisk.year3),
      total: Math.round(breachRisk.total),
      presentValue: Math.round(breachRisk.npv),
    },
    {
      label: "Security & Networking Operational Efficiency Gains",
      year1: Math.round(security.year1),
      year2: Math.round(security.year2),
      year3: Math.round(security.year3),
      total: Math.round(security.total),
      presentValue: Math.round(security.npv),
    },
    {
      label: "Security and Networking Infrastructure Cost Savings",
      year1: Math.round(networking.year1),
      year2: Math.round(networking.year2),
      year3: Math.round(networking.year3),
      total: Math.round(networking.total),
      presentValue: Math.round(networking.npv),
    },
    {
      label: "Total Benefits (Risk-Adjusted)",
      year1: Math.round(benefits.year1),
      year2: Math.round(benefits.year2),
      year3: Math.round(benefits.year3),
      total: Math.round(benefits.total),
      presentValue: Math.round(benefits.npv),
    },
  ];

  return (
    <Document>
      {/* ========= Page 1 =============== */}
      <Page
        size="A4"
        style={{
          position: "relative",
          backgroundColor: "#0070c0",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <Image style={{ width: "100px", height: "auto" }} src="/logo.png" />
        </View>
        <View
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 10,
            right: 0,
            top: 0,
            bottom: 0,
            height: 800,
            width: 800,
            backgroundColor: "#1889da",
            borderRadius: 80,
            transform: "translate(400, 20) rotate(-54deg)",
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 0,
            top: 0,
            bottom: 0,
            height: 780,
            width: 780,
            backgroundColor: "#fff",
            borderRadius: 80,
            transform: "translate(390, 32) rotate(-45deg)",
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            width: "65%",
            height: 280,
            paddingRight: 30,
            transform: "translateY(-155px)",
            textAlign: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Sangfor Technologies
            </Text>
            <Text
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              ROI Analysis Report of Sangfor
            </Text>
            <Text
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Access Secure
            </Text>

            {userInput.submissionDate && (
              <Text style={{ fontSize: 14, color: "#0070c0" }}>
                {formatLongDate(new Date(createdDate))}
              </Text>
            )}

            <View
              style={{
                marginVertical: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Image
                style={{ width: "60px", height: "auto", marginBottom: 6 }}
                src="/report-logo.png"
              />
              <Text style={{ fontSize: 12 }}>
                Secure, Agile, and Everywhere
              </Text>
            </View>
            <Text style={{ fontSize: 14 }}>A SASE Solution by Sangfor</Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            padding: 30,
          }}
        >
          <Link
            style={{
              fontSize: 12,
              textDecoration: "underline",
              color: "#fff",
            }}
            href="https://www.sangfor.com/"
          >
            www.sangfor.com
          </Link>
        </View>
      </Page>

      {/* ========= Page 2 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />

        <View style={{ paddingHorizontal: 30, marginBottom: 15 }}>
          <Text style={styles.heading}>EXECUTIVE SUMMARY</Text>
          <Text style={styles.text}>
            In today’s rapidly evolving digital landscape, organizations face
            increasing pressure to secure their networks while optimizing
            performance and reducing costs. The rise of hybrid work models and
            cloud adoption has made{" "}
            <Link
              style={styles.link}
              href="https://www.sangfor.com/cybersecurity/products/sangfor-access-sase?utm_source=sase_roi_calculator_report&utm_medium=referral&utm_campaign=sase_roi_calculator"
            >
              Secure Access Service Edge (SASE)
            </Link>{" "}
            a critical framework for modern IT infrastructure.
          </Text>
          <Text style={styles.text}>
            To help you evaluate the financial and operational impact of
            implementing Sangfor Access Secure, we have created a customized
            report tailored to your business environment. This report provides
            high-level estimates of the costs and business benefits of your
            investment.
          </Text>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            To ensure accuracy and relevance, the results are derived from
            insights gained through real-world deployments and validated by
            measurable outcomes, delivering a clear understanding of the
            tangible value Access Secure can bring to your organization.
          </Text>
          <InputTable
            title="Your Organization’s Details"
            data={organizationDetailTableData}
          />
          <InputTable title="Your Details" data={userDetailTableData} />
        </View>
      </Page>

      {/* ========= Page 3 =============== */}
      <Page size="A4" style={[styles.page, { paddingBottom: 0 }]}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={[styles.heading, { marginBottom: 30 }]}>
            FINANCIAL SUMMARY
          </Text>
          <InputTable
            title="Consolidated 3-Year Risk-Adjusted Metrics"
            data={riskAdjustedTableData}
          />

          <View
            style={[styles.chartContainer, { marginTop: 20, marginBottom: 30 }]}
          >
            {images.roiChart && (
              <Image style={styles.donutChart} src={images.roiChart} />
            )}

            {images.npvChart && (
              <Image style={styles.donutChart} src={images.npvChart} />
            )}

            {images.breachRiskChart && (
              <Image style={styles.donutChart} src={images.breachRiskChart} />
            )}

            {images.paybackChart && (
              <Image style={styles.donutChart} src={images.paybackChart} />
            )}
          </View>

          <View style={styles.chartContainer}>
            {images.financialChart && (
              <Image
                style={{ width: 440, height: "auto" }}
                src={images.financialChart}
              />
            )}
          </View>
        </View>
      </Page>

      {/* ========= Page 4 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.heading}>SANGFOR ACCESS SECURE OVERVIEW</Text>
          <Text style={[styles.text, { marginBottom: 15 }]}>
            Sangfor Access Secure is one of the few single-vendor SASE solutions
            that combines SD-WAN capabilities with advanced security features,
            including Zero Trust Network Access (ZTNA), Secure Web Gateway
            (SWG), Firewall as a Service (FWaaS), Endpoint Detection and
            Response (EDR), and Data Loss Prevention (DLP)—delivered through a
            unified cloud platform.
          </Text>

          <Text style={styles.subHeading}>Key Features & Capabilities</Text>
          <View style={{ marginTop: 5 }}>
            <Card
              label="Simplified Management"
              labelWidth={146}
              text="Access Secure’s centralized console simplifies configuration, monitoring, and control, enabling IT teams to focus on strategic initiatives."
            />
            <Card
              label="Cloud-Native Security"
              labelWidth={136}
              text="Access Secure’s cloud-native architecture ensures fast, reliable zero-trust access to internet and intranet resources—whether hosted in the cloud or on-premises."
            />
            <Card
              label="AI-Powered Threat Detection"
              labelWidth={172}
              text="Access Secure leverages Sangfor Engine Zero, an AI-driven malware detection engine, ensuring accurate threat prevention to safeguard critical assets."
            />
            <Card
              label="Unparalleled Visibility"
              labelWidth={134}
              text="With granular visibility and real-time analytics for applications, networks, and users, Access Secure enables admins to make confident, data-driven decisions."
            />
          </View>
        </View>
      </Page>

      {/* ========= Page 5 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.heading}>BREAKDOWN OF TOTAL BENEFITS</Text>

          <Text style={styles.text}>
            The following section provides a detailed breakdown of the total
            benefits of implementing Sangfor Access Secure across four key
            dimensions:
          </Text>
          <ListItem>
            <Text>Workforce Productivity Gains</Text>
          </ListItem>
          <ListItem>
            <Text>Security and Data Breach Risk Reduction Cost Savings,</Text>
          </ListItem>
          <ListItem>
            <Text>Security & Networking Operational Efficiency Gains, and</Text>
          </ListItem>
          <ListItem>
            <Text>Security and Networking Infrastructure Cost Savings</Text>
          </ListItem>

          <FinanceTable data={financeTableData} />

          <Text style={styles.subHeading}>Workforce Productivity Gains </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <KpiCard
              label="Number of FTEs Savings"
              value={totalProductivityRecover.year3}
              width={140}
            />
            <KpiCard
              label="Additional Business Value"
              value={formatCompactCurrency(productivity.total)}
              width={140}
            />
            <KpiCard
              label="Lost Productivity Recovered"
              value={
                Math.round(operationalSavings.lostProductivityRecovered) + "%"
              }
              width={140}
            />
          </View>
        </View>
      </Page>

      {/* ========= Page 6 =============== */}
      <Page size={"A4"} style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.text}>
            The modern workforce is increasingly mobile, with employees
            requiring access to critical applications and resources from
            anywhere, at any time. Sangfor Access Secure ensures business users
            experience fewer interruptions, reduced downtime, and improved
            latency when accessing both on-premises and cloud resources,
            fostering a more empowered and efficient workforce.
          </Text>

          <Text style={styles.text}>
            By enabling seamless productivity without interruptions or
            lag—whether at home, in the office, or on the go—existing Access
            Secure customers have historically achieved an average end-user
            productivity improvement of over 8% annually. This directly enhances
            organizational efficiency, innovation, and profitability.
          </Text>
          <Text style={[styles.smallText, { marginBottom: 20 }]}>
            *Assumption: 20% of end-user productivity is impacted by system
            disruptions during remote work.
          </Text>

          <Text style={styles.subHeading}>
            Security and Data Breach Risk Reduction Cost Savings
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
              marginBottom: 15,
            }}
          >
            <KpiCard
              label="Reduced Likelihood of Data Breach"
              value={
                Math.round(operationalSavings.reduceLikelihoodOfDataBreach) +
                "%"
              }
              width={166}
            />
            <KpiCard
              label="Cost of Security and Data Breach Risk"
              value={formatCompactCurrency(
                otherCalculation.totalCostOfSecurityAndDataRisk,
              )}
              width={166}
            />
            <KpiCard
              label="Risk adjust cost reduction"
              value={formatCompactCurrency(breachRisk.total)}
              width={166}
            />
          </View>

          <Text style={styles.text}>
            The financial impact of security breaches is significant, with
            enterprises experiencing 3.2 breaches annually at an average cost of
            USD$53 per employee**. Sangfor Access Secure reduces these risks
            through zero trust principles, real-time threat intelligence,
            AI-powered visibility, and granular DLP.
          </Text>
          <Text style={styles.text}>
            Organizations adopting Access Secure have achieved a 75% reduction
            in breaches, significantly lowering the likelihood of costly
            incidents.
          </Text>
          <Text style={[styles.smallText, { marginBottom: 20 }]}>
            **Source: Forrester Consulting Cost of A Cybersecurity Breach Survey
          </Text>

          <Text style={styles.subHeading}>
            Security and Networking Operational Efficiency Gains
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
              marginBottom: 20,
            }}
          >
            <KpiCard
              label="NetOps and SecOps Efficiency Gains"
              value={`Upto ${Math.round(operationalSavings.netOps)}%`}
              width={166}
            />
            <KpiCard
              label="Additional FTEs on strategic projects"
              value={
                otherCalculation.additionalFte < 10
                  ? "0" + otherCalculation.additionalFte
                  : otherCalculation.additionalFte
              }
              width={166}
            />
            <KpiCard
              label="Administrative Overhead Savings"
              value={formatCompactCurrency(security.total)}
              width={166}
            />
          </View>
          <Text style={styles.text}>
            IT teams often spend considerable time managing software updates,
            patching servers, resolving routine support tickets, and
            administering policies. These tasks divert resources from strategic
            initiatives that drive innovation and growth.
          </Text>
          <Text style={styles.text}>
            Sangfor Access Secure simplifies operations through centralized
            monitoring, automated updates, proactive threat prevention, and
            streamlined policy management. Additional administrative overhead
            savings are unlocked by a reduced number of investigations, faster
            mean-time-to-resolution, and automated scaling of networking and
            security infrastructure.
          </Text>
        </View>
      </Page>

      {/* ========= Page 7 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={styles.subHeading}>
            Security and Networking Infrastructure Cost Savings
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              marginTop: 6,
              marginBottom: 15,
            }}
          >
            <KpiCard
              label="Savings from Vendor Consolidation"
              value={Math.round(operationalSavings.savingsFromVendor) + "%"}
              width={156}
            />
            <KpiCard
              label="Total Infrastructure cost savings"
              value={formatCompactCurrency(networking.total)}
              width={156}
            />
            {userInput.acceleration && (
              <KpiCard
                label="SD-WAN and MPLS Cost Savings"
                value={"~" + formatCompactCurrency(otherCalculation.sdwan)}
                width={156}
              />
            )}
          </View>

          <Text style={styles.text}>
            Sangfor Access Secure customers have significantly reduced their
            annual security and networking technology spend by replacing
            expensive hardware appliances, such as VPNs, SWGs, firewalls, DLP,
            SD-WAN, web proxies, and MPLS connections.
          </Text>
          <Text style={styles.text}>
            The unified Access Secure platform eliminates vendor management
            expenses, upfront hardware costs, licensing fees, and ongoing
            maintenance expenses for physical infrastructure. For SD-WAN
            deployments, organizations save on both hardware and WAN
            connectivity costs by leveraging cross-border traffic acceleration.{" "}
          </Text>

          <Text style={[styles.heading, { marginVertical: 20 }]}>
            NEXT STEPS
          </Text>

          <Steps
            step="1"
            title="Determine What You Need from Sangfor Access Secure"
          >
            <Text>
              Sangfor Access Secure offers a wide range of solutions. Start by
              identifying the key challenges and use cases you want to address
              first.
            </Text>
          </Steps>

          <Steps
            step="2"
            title="Understand the Capabilities of Access Secure in Detail"
          >
            <Text>
              Discover how Sangfor Access Secure can add value to your
              organization’s specific needs. Schedule a meeting with us for a
              tailored discussion by filling out our web form.
            </Text>
          </Steps>

          <Steps step="3" title="Learn the Access Secure Environment">
            <Text>
              <Link
                style={styles.link}
                href="https://active.sangfor.com/sangfor-sase-free-trial?utm_source=sase_roi_calculator_report&utm_medium=referral&utm_campaign=sase_roi_calculator"
              >
                Sign up for a free PoC{" "}
              </Link>
              with Access Secure and explore its capabilities. Gain a clear
              understanding of configuring security policies, monitoring
              performance, responding to security alerts, installing clients,
              and more. Engage with Sangfor experts for best practices and
              optimized configurations..
            </Text>
          </Steps>

          <Steps step="4" title="Implement Access Secure Incrementally">
            <Text>
              Begin by piloting your PoC on a small, single network to evaluate
              how Access Secure performs and integrates with your existing
              security tools. This allows you to identify areas for adjustments
              and modifications. Additionally, establish stricter access
              controls based on the identified relationships between users,
              applications, and data sources.
            </Text>
          </Steps>

          <Steps step="5" title="Review Your Configurations and Expand">
            <Text>
              Gradually expand Access Secure to additional networks and users,
              one step at a time. This approach helps you accurately assess how
              Access Secure impacts the people using your systems every day.
              Once they are comfortable, consider applying Access Secure to
              additional use cases.
            </Text>
          </Steps>
        </View>
      </Page>

      {/* ========= Page 8 =============== */}
      <Page size="A4" style={[styles.page, { position: "relative" }]}>
        <Logo />

        <View style={{ paddingHorizontal: 30 }}>
          <Text
            style={[
              styles.heading,
              { marginBottom: 8, lineHeight: 1.25, letterSpacing: "1px" },
            ]}
          >
            FUTURE-PROOF YOUR BUSINESS WITH SANGFOR ACCESS SECURE
          </Text>
          <Text style={styles.text}>
            Sangfor Access Secure offers significant business benefits and cost
            savings across various aspects, including hardware, security, and
            administration. By consolidating features like ZTNA, SWG, and SD-WAN
            into one unified, cloud-native platform, it simplifies management
            and ensures secure and fast access to essential resources for
            distributed workforces.
          </Text>
          <Text style={styles.text}>
            With Access Secure, businesses future-proof their security and
            network infrastructure, enabling seamless support for digital
            transformation initiatives. Its scalable and adaptive architecture
            ensures that organizations are equipped to handle evolving security
            threats and network demands, empowering them to innovate and grow
            with confidence.
          </Text>
          <Text style={[styles.text, { marginBottom: 30 }]}>
            Visit{" "}
            <Link
              style={styles.link}
              href="https://www.sangfor.com/?utm_source=sase_roi_calculator_report&utm_medium=referral&utm_campaign=sase_roi_calculator"
            >
              www.sangfor.com
            </Link>{" "}
            to learn how Access Secure can help your organization. Fill out the
            web form in the link above to{" "}
            <Link
              style={styles.link}
              href="https://calendly.com/akarsh-jain-sangfor/explore-sangfor-access-secure?utm_source=sase_roi_calculator_report&utm_medium=referral&utm_campaign=sase_roi_calculator"
            >
              schedule a meeting
            </Link>{" "}
            with our team to discuss the best solutions for your needs.
          </Text>

          <Text style={styles.heading}>ADDITIONAL RESOURCES</Text>

          <ListItem>
            <Text>
              Learn more about&nbsp;
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
              Sangfor Access Secure recognized in&nbsp;
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
              Explore&nbsp;
              <Link
                src="https://www.sangfor.com/cybersecurity/solutions/zero-trust-guard-ztna"
                style={styles.link}
              >
                Sangfor Zero Trust Guard
              </Link>
              , the ZTNA module of Access Secure.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Access Secure&nbsp;
              <Link
                src="https://www.sangfor.com/success-stories/sangfor-access-secure-case-study-leading-singaporean-management-consultancy-firm"
                style={styles.link}
              >
                Success Story
              </Link>
              &nbsp;of a leading Singaporean management consultancy firm
            </Text>
          </ListItem>
        </View>

        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            padding: 30,
            color: "#212121",
          }}
        >
          <Text style={{ marginBottom: 20 }}>
            We appreciate your time spent for the SASE ROI Calculator report.
            Should you have any questions or feedback then please reach us out
            to&nbsp;
            <Link href="mailto:marketing@sangfor.com" style={styles.link}>
              marketing@sangfor.com
            </Link>
            .
          </Text>
          <Text>With Regards,</Text>
          <Text>Sangfor SASE Marketing Team</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDFPages;
