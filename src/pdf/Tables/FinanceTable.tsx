import { Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0b2651",
  },
  table: {
    width: "auto",
    marginBottom: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 8,
    // backgroundColor: "#0070c0",
    // borderRight: "1px solid #0070c0",
    color: "#fff",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0070c0",
  },
  tableHeaderValue: {
    width: 82,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    // backgroundColor: "#0070c0",
    // borderLeft: "1px solid #0070c0",
    // borderRight: "1px solid #0070c0",
    color: "#fff",
  },
  tableHeaderPresentValue: {
    width: 82,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
    // backgroundColor: "#0070c0",
    // borderLeft: "1px solid #0070c0",
    color: "#fff",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #fff",
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    backgroundColor: "#e6f2ff",
  },
  tableCellValue: {
    width: 82,
    paddingVertical: 8,
    paddingHorizontal: 2,
    fontSize: 10,
    textAlign: "center",
    backgroundColor: "#d6f5d6",
    borderLeft: "1px solid #fff",
  },
});

const data = [
  {
    label: "Workforce Productivity Gains",
    firstYear: "$ 1,107,000 ",
    secondYear: "$ 1,107,000 ",
    thirdYear: "$ 1,107,000 ",
    total: "$ 1,107,000 ",
    presentValue: "$ 1,107,000 ",
  },
  {
    label: "Security and Data Breach Risk Reduction ",
    firstYear: "$ 1,107,000 ",
    secondYear: "$ 1,107,000 ",
    thirdYear: "$ 1,107,000 ",
    total: "$ 1,107,000 ",
    presentValue: "$ 1,107,000 ",
  },
  {
    label: "Security & Networking Org Efficiency Gain",
    firstYear: "$ 1,107,000 ",
    secondYear: "$ 1,107,000 ",
    thirdYear: "$ 1,107,000 ",
    total: "$ 1,107,000 ",
    presentValue: "$ 1,107,000 ",
  },
  {
    label: "Security & Networking Infra Cost Reduction",
    firstYear: "$ 1,107,000 ",
    secondYear: "$ 1,107,000 ",
    thirdYear: "$ 1,107,000 ",
    total: "$ 1,107,000 ",
    presentValue: "$ 1,107,000 ",
  },
  {
    label: "Total Benefits (Risk Adjusted)",
    firstYear: "$ 1,107,000 ",
    secondYear: "$ 1,107,000 ",
    thirdYear: "$ 1,107,000 ",
    total: "$ 1,107,000 ",
    presentValue: "$ 1,107,000 ",
  },
];

function FinanceTable() {
  return (
    <>
      <Text style={styles.title}>
        BREAK UP OF FINANCIAL BENEFITS – Quantified Benefit Data{" "}
      </Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeader, { flex: 1 }]}>Benefit</Text>
          <Text style={styles.tableHeaderValue}>Year 1</Text>
          <Text style={styles.tableHeaderValue}>Year 2</Text>
          <Text style={styles.tableHeaderValue}>Year 3</Text>
          <Text style={styles.tableHeaderValue}>Total</Text>
          <Text style={styles.tableHeaderPresentValue}>Present Value</Text>
        </View>
        {data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.label}</Text>
            <Text style={styles.tableCellValue}>{row.firstYear}</Text>
            <Text style={styles.tableCellValue}>{row.secondYear}</Text>
            <Text style={styles.tableCellValue}>{row.thirdYear}</Text>
            <Text style={styles.tableCellValue}>{row.total}</Text>
            <Text style={styles.tableCellValue}>{row.presentValue}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

export default FinanceTable;
