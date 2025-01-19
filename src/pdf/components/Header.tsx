import { Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import { formatDate } from "@/utils/helpers";
const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "red",
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0b2651",
  },
  text: {
    display: "flex",
    marginBottom: 5,
  },
  date: {
    fontStyle: "italic",
    display: "flex",
    fontSize: 12,
    marginBottom: 8,
    color: "#444444",
  },
});

function Header({ userName }: { userName: string }) {
  return (
    <>
      <View
        style={{
          backgroundColor: "#0070c0",
          paddingHorizontal: 30,
          paddingVertical: 10,
          marginBottom: 14,
        }}
      >
        <Image style={{ width: "100px", height: "auto" }} src="/logo.png" />
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        {/* <Text style={styles.header}>Sangfor Technologies</Text> */}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 6,
          }}
        >
          <Text style={styles.subHeading}>SASE ROI Analysis Report for:</Text>
          <Text style={[styles.subHeading, { color: "#0070c0" }]}>
            {userName}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(new Date())}</Text>
        <Text style={styles.text}>
          Sangfor Access Secure: Sangfor Access Secure is a comprehensive Secure
          Access Service Edge (SASE) solution that combines SD-WAN and Secure
          Service Edge (SSE) capabilities, including Zero Trust Network Access
          (ZTNA), Secure Web Gateway (SWG), Firewall as a Service (FWaaS),
          Endpoint Detection and Response (EDR), and Data Loss Prevention (DLP),
          delivered through a unified cloud platform. The following are the key
          benefits of Sangfor Access Secure:
        </Text>
      </View>
    </>
  );
}

export default Header;
