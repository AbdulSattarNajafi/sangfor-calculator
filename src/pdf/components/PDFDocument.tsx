import {
  Page,
  Text,
  Document,
  StyleSheet,
  Link,
  Image,
  View,
} from "@react-pdf/renderer";
import Header from "./Header";
import Card from "./Card";
import InputTable from "../Tables/InputTable";
import FinanceTable from "../Tables/FinanceTable";
import Step from "./Step";
import ListItem from "./ListItem";

type UserInputDataType = { label: string; value: string | number };
type InputDataType = { label: string; value: string | number };
type FinanceTableDataType = {
  label: string;
  year1: number;
  year2: number;
  year3: number;
  total: number;
  presentValue: number;
};

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
  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  chartImage: {
    marginBottom: 20,
  },
});

type ChartImageType = {
  roiChart: string | null;
  financialChart: string | null;
  financeDonutCharts: string | null;
  riskCharts: string | null;
  savingCharts: string | null;
  totalSavingCharts: string | null;
};

type PDFDocumentProps = {
  firstName: string;
  images: ChartImageType;
  userInputData: UserInputDataType[];
  inputTableResult: InputDataType[];
  financeTableData: FinanceTableDataType[];
};

function PDFDocument({
  firstName,
  images,
  userInputData,
  inputTableResult,
  financeTableData,
}: PDFDocumentProps) {
  return (
    <Document>
      {/* ========= Page 1 =============== */}
      <Page size="A4" style={{ fontSize: 10, lineHeight: 1.5 }}>
        <Header userName={firstName} />
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
          <Text style={{ marginTop: 5, marginBottom: 20, display: "flex" }}>
            To better understand the benefits, costs, and savings associated
            with the SASE investment, Sangfor has developed this customized
            report specific to your business environment. It is meant to help
            you determine high-level estimates of the costs, benefits,
            flexibility, and risk factors associated with your Access Secure
            Investment.
          </Text>

          <View style={styles.chartContainer}>
            {images.roiChart && (
              <Image
                style={{ width: "560px", height: "auto" }}
                src={images.roiChart}
              />
            )}
          </View>
        </View>
      </Page>

      {/* ========= Page 2 =============== */}
      <Page size="A4" style={[styles.page, { paddingBottom: 0 }]}>
        <InputTable
          title="You provided the following information to describe your environment:"
          data={userInputData}
        />
        <InputTable
          title="FINANCIAL SUMMARY – CONSOLIDATED 3 Year Risk Adjusted Metrics"
          data={inputTableResult}
        />
        <View style={styles.chartContainer}>
          {images.financialChart && (
            <Image
              style={{ width: "540px", height: "auto" }}
              src={images.financialChart}
            />
          )}
        </View>
      </Page>

      {/* ========= Page 3 =============== */}
      <Page size="A4" style={styles.page}>
        <FinanceTable data={financeTableData} />
        <Text style={styles.text}>
          Workforce Productivity Gains: The modern workforce is increasingly
          mobile, with employees requiring access to critical applications and
          resources from anywhere, anytime. With Sangfor Access Secure, business
          users experience fewer interruptions, less downtime, and improved
          latency while accessing on-prem and cloud resources, fostering a more
          empowered and efficient workforce.
        </Text>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          By enabling business users to work without interruptions or lag,
          whether at home, in the office, or on the move, existing Sangfor
          Access Secure customers have historically benefitted from improved
          average end-user productivity per year by more than 8%, directly
          influencing organizational efficiency, innovation, and profitability.
        </Text>
        {images.financeDonutCharts && (
          <Image style={styles.chartImage} src={images.financeDonutCharts} />
        )}
        <Text style={styles.heading}>
          Security and Data Breach Risk Reduction:
        </Text>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          The average cost of a security and data breach is *USD 53.00 per
          employee, and a typical enterprise experiences an average of *3.2
          security or data breaches per year. By minimizing attack surface
          through Zero Trust, enforcing real-time threat intelligence, improving
          network traffic visibility powered by AI algorithms, and granular DLP
          capabilities, Sangfor Access Secure has reported more than a 75%
          reduction in security and data breaches historically.
        </Text>
        <Text style={[styles.smallText, { marginBottom: 10 }]}>
          *Source: Forrester Consulting Cost of A Cybersecurity Breach Survey
        </Text>
        {images.riskCharts && (
          <Image style={styles.chartImage} src={images.riskCharts} />
        )}
      </Page>

      {/* ========= Page 4 =============== */}
      <Page size={"A4"} style={styles.page}>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          Security & Networking Org Efficiency Gain: IT Teams spend a
          considerable amount of time and effort on managing software updates,
          patching servers, resolving mundane support tickets, and administering
          a siloed policy infrastructure, which prevents them from tackling a
          variety of strategic projects. Existing Access Secure customers were
          able to reduce their administrative overhead and benefitted from
          simplified networking and security administration, automated updates,
          centralized monitoring, and proactive threat prevention.
        </Text>
        {images.savingCharts && (
          <Image style={styles.chartImage} src={images.savingCharts} />
        )}
        <Text style={styles.text}>
          Additional administrative overhead savings are unlocked by Access
          Secure through reduced number of investigations, faster
          mean-time-to-resolution and automated scaling of networking and
          security infrastructure.
        </Text>
        <Text style={styles.text}>
          Security & Networking Infra Cost Reduction: With Sangfor Access
          Secure, customers have significantly reduced their annual security and
          networking tech spend by replacing expensive hardware appliances such
          as VPNs, SWGs, FWs, Edge Security, DLP, SD-WAN, Web Proxy and MPLS
          connections. The unified Access secure platform eliminates vendor
          management expenses, upfront hardware expenditures, licensing fees,
          and ongoing maintenance costs of physical infrastructure.
        </Text>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          For SD-WAN deployments, organizations save money on both hardware and
          WAN connectivity costs by leveraging cross border traffic
          acceleration.
        </Text>
        {images.totalSavingCharts && (
          <Image style={styles.chartImage} src={images.totalSavingCharts} />
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
            offer a broad range of solutions. It is recommended to identify the
            key challenges and use cases that you would like to tap first.
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
            alerts, installing clients etc. Engage with Sangfor experts for best
            practices and unlock optimized configurations.
          </Text>
        </Step>

        <Step step="4">
          <Text>
            Implement Access Secure Incrementally Pilot test your PoC
            environment on a single, small network first to see how the Access
            Secure is working and how it integrates with your other security
            software. This gives you an opportunity to see where adjustments and
            modifications might be needed. This will also include creating more
            stringent access controls based on the identified relationships
            between users, applications, and data sources.
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
}

export default PDFDocument;
