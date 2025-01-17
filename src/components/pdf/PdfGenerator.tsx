'use client';

import { useRef } from 'react';

import {
  Page,
  Text,
  Document,
  StyleSheet,
  Link,
  Image,
  pdf,
  Font,
  View,
} from '@react-pdf/renderer';
import InputTable from './InputTable';
import Header from './Header';
import Card from './Card';
import RoiCharts from './RoiCharts';
import { InputTableData, InputTableResult } from '@/utils/constants';
import FinancialChart from './FinancialChart';
import { captureElementAsImage } from '@/utils/helpers';
import FinanceTable from './FinanceTable';
import FincanceDonutCharts from './FincanceDonutCharts';
import RiskCharts from './RiskCharts';
import SavingCharts from './SavingCharts';
import TotalSavingCharts from './TotalSavingCharts';
import ListItem from './ListItem';

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'red',
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    display: 'flex',
    marginBottom: 5,
  },
  smallText: {
    fontSize: 8,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  chartImage: {
    marginBottom: 10,
  },
});

function PdfGenerator() {
  const roiChartRef = useRef<HTMLDivElement>(null);
  const financialChartRef = useRef<HTMLDivElement>(null);
  const financeDonutChartsRef = useRef<HTMLDivElement>(null);
  const riskChartsRef = useRef<HTMLDivElement>(null);
  const savingChartsRef = useRef<HTMLDivElement>(null);
  const totalSavingChartsRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const roiChartImage = await captureElementAsImage(roiChartRef.current);
    const financialChartImage = await captureElementAsImage(financialChartRef.current);
    const financeDonutChartsImage = await captureElementAsImage(financeDonutChartsRef.current);
    const riskChartsImage = await captureElementAsImage(riskChartsRef.current);
    const savingChartsImage = await captureElementAsImage(savingChartsRef.current);
    const totalSavingChartsImage = await captureElementAsImage(totalSavingChartsRef.current);

    // Define the PDF document
    const MyDocument = () => (
      <Document>
        <Page>
          <View style={{ backgroundColor: '#0b99d8', padding: 20 }}>
            <Image style={{ width: '100px' }} src='/logo.png' />
          </View>
        </Page>
        {/* ========= Page 1 =============== */}
        <Page size='A4' style={styles.page}>
          <Header />
          <Card
            label='Simplified Management'
            labelWidth={150}
            text='To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,'
          />
          <Card
            label='Cloud-Native Security'
            labelWidth={150}
            text='To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,'
          />
          <Card
            label='AI-Powered Threat Detection'
            labelWidth={180}
            text='To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,'
          />
          <Card
            label='Unparalleled Visibility'
            labelWidth={150}
            text='To better understand the benefits, costs, and savings associated with the SASE
              investment, Sangfor has developed this customized report specific to your business
              environment. It is meant to help you determine high-level estimates of the costs,'
          />
          <Text style={{ marginTop: 20, marginBottom: 10, display: 'flex' }}>
            To better understand the benefits, costs, and savings associated with the SASE
            investment, Sangfor has developed this customized report specific to your business
            environment. It is meant to help you determine high-level estimates of the costs,
            benefits, flexibility, and risk factors associated with your Access Secure Investment.
          </Text>

          {roiChartImage && <Image style={styles.chartImage} src={roiChartImage} />}
        </Page>

        {/* ========= Page 2 =============== */}
        <Page size='A4' style={styles.page}>
          <InputTable
            title='You provided the following information to describe your environment:'
            data={InputTableData}
          />
          <InputTable
            title='FINANCIAL SUMMARY – CONSOLIDATED 3 Year Risk Adjusted Metrics'
            data={InputTableResult}
          />
          {financialChartImage && <Image style={styles.chartImage} src={financialChartImage} />}
        </Page>

        {/* ========= Page 3 =============== */}
        <Page size='A4' style={styles.page}>
          <FinanceTable />
          <Text style={styles.text}>
            Workforce Productivity Gains: The modern workforce is increasingly mobile, with
            employees requiring access to critical applications and resources from anywhere,
            anytime. With Sangfor Access Secure, business users experience fewer interruptions, less
            downtime, and improved latency while accessing on-prem and cloud resources, fostering a
            more empowered and efficient workforce.
          </Text>
          <Text style={styles.text}>
            By enabling business users to work without interruptions or lag, whether at home, in the
            office, or on the move, existing Sangfor Access Secure customers have historically
            benefitted from improved average end-user productivity per year by more than 8%,
            directly influencing organizational efficiency, innovation, and profitability.
          </Text>
          {financeDonutChartsImage && (
            <Image style={styles.chartImage} src={financeDonutChartsImage} />
          )}
          <Text style={styles.heading}>Security and Data Breach Risk Reduction:</Text>
          <Text style={styles.text}>
            The average cost of a security and data breach is *USD 53.00 per employee, and a typical
            enterprise experiences an average of *3.2 security or data breaches per year. By
            minimizing attack surface through Zero Trust, enforcing real-time threat intelligence,
            improving network traffic visibility powered by AI algorithms, and granular DLP
            capabilities, Sangfor Access Secure has reported more than a 75% reduction in security
            and data breaches historically.
          </Text>
          <Text style={styles.smallText}>
            *Source: Forrester Consulting Cost of A Cybersecurity Breach Survey
          </Text>
          {riskChartsImage && <Image style={styles.chartImage} src={riskChartsImage} />}
        </Page>

        {/* ========= Page 4 =============== */}
        <Page size={'A4'} style={styles.page}>
          <Text style={styles.text}>
            Security & Networking Org Efficiency Gain: IT Teams spend a considerable amount of time
            and effort on managing software updates, patching servers, resolving mundane support
            tickets, and administering a siloed policy infrastructure, which prevents them from
            tackling a variety of strategic projects. Existing Access Secure customers were able to
            reduce their administrative overhead and benefitted from simplified networking and
            security administration, automated updates, centralized monitoring, and proactive threat
            prevention.
          </Text>
          {savingChartsImage && <Image style={styles.chartImage} src={savingChartsImage} />}
          <Text style={styles.text}>
            Additional administrative overhead savings are unlocked by Access Secure through reduced
            number of investigations, faster mean-time-to-resolution and automated scaling of
            networking and security infrastructure.
          </Text>
          <Text style={styles.text}>
            Security & Networking Infra Cost Reduction: With Sangfor Access Secure, customers have
            significantly reduced their annual security and networking tech spend by replacing
            expensive hardware appliances such as VPNs, SWGs, FWs, Edge Security, DLP, SD-WAN, Web
            Proxy and MPLS connections. The unified Access secure platform eliminates vendor
            management expenses, upfront hardware expenditures, licensing fees, and ongoing
            maintenance costs of physical infrastructure.
          </Text>
          <Text style={styles.text}>
            For SD-WAN deployments, organizations save money on both hardware and WAN connectivity
            costs by leveraging cross border traffic acceleration.
          </Text>
          {totalSavingChartsImage && (
            <Image style={styles.chartImage} src={totalSavingChartsImage} />
          )}
          <Text style={styles.heading}>
            Next Five Steps to define for your Access Secure implementation roadmap
          </Text>
          <ListItem>
            <Text>
              Step 1 – Determine what you need from Access Secure? Sangfor Access Secure offer a
              broad range of solutions. It is recommended to identify the key challenges and use
              cases that you would like to tap first.
            </Text>
          </ListItem>

          <ListItem>
            <Text>
              Step 2 – Understand the capabilities of Sangfor Access Secure in detail? Discover the
              value Sangfor Access Secure can add to your organization’s specific needs. Schedule a
              meeting with us for a customized discussion by filling in this web form.
              <Link src='https://github.com' style={styles.link}>
                web form
              </Link>
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Step 3 – Learn the Access Secure environment&nbsp;
              <Link src='https://github.com' style={styles.link}>
                Sign up for a free PoC
              </Link>
              &nbsp; with Sangfor Access Secure and play around with the capabilities we offer. Get
              a clear understanding of configuring security policies, monitoring performance,
              responding to security alerts, installing clients etc. Engage with Sangfor experts for
              best practices and unlock optimized configurations.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Step 4 – Implement Access Secure Incrementally Pilot test your PoC environment on a
              single, small network first to see how the Access Secure is working and how it
              integrates with your other security software. This gives you an opportunity to see
              where adjustments and modifications might be needed. This will also include creating
              more stringent access controls based on the identified relationships between users,
              applications, and data sources.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Step 5 – Review your configurations and expand Gradually configure Access Secure for
              additional networks and users, one at a time to accurately picture how Access Secure
              will affect the people using your systems every day. Once they are comfortable,
              consider using Access Secure for additional use cases.
            </Text>
          </ListItem>
        </Page>

        {/* ========= Page 5 =============== */}
        <Page size='A4' style={styles.page}>
          <Text style={styles.heading}>Check out our additional resources </Text>
          <ListItem>
            <Text>
              Learn more about &nbsp;
              <Link
                src='https://www.sangfor.com/cybersecurity/products/sangfor-access-sase'
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
                src='https://connect.sangfor.com/frost-radar-sase-2023?utm_source=Website&utm_medium=Sangfor'
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
                src='https://www.sangfor.com/cybersecurity/solutions/zero-trust-guard-ztna'
                style={styles.link}
              >
                Sangfor’s Zero Trust Guard
              </Link>
              &nbsp; Capabilities, which is the flagship ZTNA module as part of Access Secure
              Platform.
            </Text>
          </ListItem>
        </Page>
      </Document>
    );

    // Generate the PDF as a blob
    const pdfBlob = await pdf(<MyDocument />).toBlob();

    // Open the PDF in a new browser tab
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  // pdfGeneratorHandler.call(generatePDF);

  return (
    <>
      <div className='flex justify-center absolute top-[180px] z-10 left-1/2 -translate-x-1/2'>
        <button
          onClick={generatePDF}
          className='rounded bg-green text-white py-2 px-4 font-semibold transition-all duration-300 hover:bg-green/7'
        >
          View My Report
        </button>
      </div>
      <div className='bg-white p-6 mb-6'>
        <div ref={roiChartRef}>
          <RoiCharts />
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
          <FinancialChart />
        </div>
      </div>
    </>
  );
}

export default PdfGenerator;
