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
import Step from "./Step";
import ListItem from "./ListItem";
import Logo from "./Logo";
import { formatDate } from "@/utils/helpers";
import { UserInputDataType } from "@/utils/types";
import BoldText from "./BoldText";

type InputDataType = { label: string; value: string | number };

type FinanceTableDataType = {
  label: string;
  year1: number;
  year2: number;
  year3: number;
  total: number;
  presentValue: number;
};

type ChartImageType = {
  roiChart: string | null;
  npvChart: string | null;
  breachRiskChart: string | null;
  paybackChart: string | null;
  financialChart: string | null;
  fteChart: string | null;
  businessChart: string | null;
  productivityChart: string | null;
  reducedChart: string | null;
  securityChart: string | null;
  riskChart: string | null;
  secOpsChart: string | null;
  strategicChart: string | null;
  savingChart: string | null;
  consolidationChart: string | null;
  infrastructureChart: string | null;
  mplsChart: string | null;
};

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0b2651",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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

type PDFPagesProps = {
  userInput: UserInputDataType;
  images: ChartImageType;
  userInputTableData: InputDataType[];
  inputTableResult: InputDataType[];
  financeTableData: FinanceTableDataType[];
};

function PDFPages({
  userInput,
  images,
  userInputTableData,
  inputTableResult,
  financeTableData,
}: PDFPagesProps) {
  return (
    <Document>
      {/* ========= Page 1 =============== */}
      <Page size="A4" style={{ fontSize: 10, lineHeight: 1.5 }}>
        <Logo />

        <View style={{ paddingHorizontal: 30, marginBottom: 15 }}>
          <Text style={styles.subHeading}>SASE ROI Analysis Report</Text>

          <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>
            Personal Details Provided in the Form:
          </Text>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>First Name:</Text>
              <Text style={styles.userInfoText}>{userInput.firstName}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Email Address:</Text>
              <Text style={styles.userInfoText}>{userInput.email}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Business Phone:</Text>
              <Text style={styles.userInfoText}>{userInput.phone}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Company:</Text>
              <Text style={styles.userInfoText}>{userInput.company}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Job Title:</Text>
              <Text style={styles.userInfoText}>{userInput.jobTitle}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Country / Region:</Text>
              <Text style={styles.userInfoText}>{userInput.country}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfo}>Submission Date & Time:</Text>
              {userInput.date && (
                <Text style={styles.userInfoText}>
                  {formatDate(new Date(userInput.date))}
                </Text>
              )}
            </View>
          </ListItem>
        </View>

        <View style={{ paddingHorizontal: 30, marginBottom: 5 }}>
          <Text style={{ lineHeight: 1.1, display: "flex" }}>
            <BoldText>Sangfor Access Secure:</BoldText>
            Sangfor Access Secure is a comprehensive Secure Access Service Edge
            (SASE) solution that combines SD-WAN and Secure Service Edge (SSE)
            capabilities, including Zero Trust Network Access (ZTNA), Secure Web
            Gateway (SWG), Firewall as a Service (FWaaS), Endpoint Detection and
            Response (EDR), and Data Loss Prevention (DLP), delivered through a
            unified cloud platform. The following are the key benefits of
            Sangfor Access Secure:
          </Text>
        </View>

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
        </View>
      </Page>

      {/* ========= Page 2 =============== */}
      <Page size="A4" style={[styles.page, { paddingBottom: 0 }]}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <Text
            style={{
              lineHeight: 1.1,
              marginTop: 5,
              marginBottom: 10,
              display: "flex",
            }}
          >
            To better understand the benefits, costs, and savings associated
            with the SASE investment, Sangfor has developed this customized
            report specific to your business environment. It is meant to help
            you determine high-level estimates of the costs, benefits,
            flexibility, and risk factors associated with your Access Secure
            Investment.
          </Text>

          <View style={styles.chartContainer}>
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

          <InputTable
            title="You provided the following information to describe your environment:"
            data={userInputTableData}
          />
          <InputTable
            title="FINANCIAL SUMMARY – CONSOLIDATED 3 Year Risk Adjusted Metrics"
            data={inputTableResult}
          />
        </View>
      </Page>

      {/* ========= Page 3 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
          <View style={styles.chartContainer}>
            {images.financialChart && (
              <Image
                style={{ width: "520px", height: "auto" }}
                src={images.financialChart}
              />
            )}
          </View>

          <FinanceTable data={financeTableData} />
          <Text style={styles.text}>
            <BoldText>Workforce Productivity Gains:</BoldText>
            The modern workforce is increasingly mobile, with employees
            requiring access to critical applications and resources from
            anywhere, anytime. With Sangfor Access Secure, business users
            experience fewer interruptions, less downtime, and improved latency
            while accessing on-prem and cloud resources, fostering a more
            empowered and efficient workforce.
          </Text>
          <Text style={[styles.text, { marginBottom: 10 }]}>
            By enabling business users to work without interruptions or lag,
            whether at home, in the office, or on the move, existing Sangfor
            Access Secure customers have historically benefitted from improved
            average end-user productivity per year by more than 8%, directly
            influencing organizational efficiency, innovation, and
            profitability.
          </Text>

          <View style={styles.chartContainer}>
            {images.fteChart && (
              <Image style={styles.donutChart} src={images.fteChart} />
            )}
            {images.businessChart && (
              <Image style={styles.donutChart} src={images.businessChart} />
            )}
            {images.productivityChart && (
              <Image style={styles.donutChart} src={images.productivityChart} />
            )}
          </View>
        </View>
      </Page>

      {/* ========= Page 4 =============== */}
      <Page size={"A4"} style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
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
          <View style={styles.chartContainer}>
            {images.reducedChart && (
              <Image style={styles.donutChart} src={images.reducedChart} />
            )}
            {images.securityChart && (
              <Image style={styles.donutChart} src={images.securityChart} />
            )}
            {images.riskChart && (
              <Image style={styles.donutChart} src={images.riskChart} />
            )}
          </View>

          <Text style={[styles.text, { marginBottom: 10 }]}>
            <BoldText>Security & Networking Org Efficiency Gain:</BoldText>
            IT Teams spend a considerable amount of time and effort on managing
            software updates, patching servers, resolving mundane support
            tickets, and administering a siloed policy infrastructure, which
            prevents them from tackling a variety of strategic projects.
            Existing Access Secure customers were able to reduce their
            administrative overhead and benefitted from simplified networking
            and security administration, automated updates, centralized
            monitoring, and proactive threat prevention.
          </Text>

          <View style={styles.chartContainer}>
            {images.secOpsChart && (
              <Image style={styles.donutChart} src={images.secOpsChart} />
            )}
            {images.strategicChart && (
              <Image style={styles.donutChart} src={images.strategicChart} />
            )}
            {images.savingChart && (
              <Image style={styles.donutChart} src={images.savingChart} />
            )}
          </View>

          <Text style={styles.text}>
            Additional administrative overhead savings are unlocked by Access
            Secure through reduced number of investigations, faster
            mean-time-to-resolution and automated scaling of networking and
            security infrastructure.
          </Text>
          <Text style={styles.text}>
            <BoldText>Security & Networking Infra Cost Reduction:</BoldText>
            With Sangfor Access Secure, customers have significantly reduced
            their annual security and networking tech spend by replacing
            expensive hardware appliances such as VPNs, SWGs, FWs, Edge
            Security, DLP, SD-WAN, Web Proxy and MPLS connections. The unified
            Access secure platform eliminates vendor management expenses,
            upfront hardware expenditures, licensing fees, and ongoing
            maintenance costs of physical infrastructure.
          </Text>
          <Text style={[styles.text, { marginBottom: 10 }]}>
            For SD-WAN deployments, organizations save money on both hardware
            and WAN connectivity costs by leveraging cross border traffic
            acceleration.
          </Text>

          <View style={styles.chartContainer}>
            {images.consolidationChart && (
              <Image
                style={styles.donutChart}
                src={images.consolidationChart}
              />
            )}
            {images.infrastructureChart && (
              <Image
                style={styles.donutChart}
                src={images.infrastructureChart}
              />
            )}
            {images.mplsChart && (
              <Image style={styles.donutChart} src={images.mplsChart} />
            )}
          </View>
        </View>
      </Page>

      {/* ========= Page 5 =============== */}
      <Page size="A4" style={styles.page}>
        <Logo />
        <View style={{ paddingHorizontal: 30 }}>
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
        </View>
      </Page>
    </Document>
  );
}

export default PDFPages;
