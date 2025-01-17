import { Text, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '@/utils/helpers';
const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    display: 'flex',
    marginBottom: 5,
  },
});

function Header() {
  return (
    <>
      <Text style={styles.header}>Sangfor Technologies</Text>
      <Text style={styles.subHeading}>SASE ROI Analysis Report</Text>
      <Text style={styles.text}>{formatDate(new Date())}</Text>
      <Text style={styles.text}>
        Sangfor Access Secure: Sangfor Access Secure is a comprehensive Secure Access Service Edge
        (SASE) solution that combines SD-WAN and Secure Service Edge (SSE) capabilities, including
        Zero Trust Network Access (ZTNA), Secure Web Gateway (SWG), Firewall as a Service (FWaaS),
        Endpoint Detection and Response (EDR), and Data Loss Prevention (DLP), delivered through a
        unified cloud platform. The following are the key benefits of Sangfor Access Secure:
      </Text>
    </>
  );
}

export default Header;
