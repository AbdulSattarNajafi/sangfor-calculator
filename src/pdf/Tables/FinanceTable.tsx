import { formatCurrency } from "@/utils/helpers";
import { Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 8,
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
    color: "#fff",
  },
  tableHeaderPresentValue: {
    width: 82,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
    color: "#fff",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #fff",
  },
  tableCell: {
    padding: 8,
    fontSize: 11,
    backgroundColor: "#e6f2ff",
  },
  tableCellValue: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 82,
    paddingVertical: 8,
    paddingHorizontal: 2,
    fontSize: 11,
    textAlign: "center",
    backgroundColor: "#d6f5d6",
    borderLeft: "1px solid #fff",
  },
  tableFooter: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0070c0",
    color: "#fff",
  },
  tableFooterCell: {
    padding: 8,
    fontSize: 11,
  },
  tableFooterCellValue: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 82,
    paddingVertical: 8,
    paddingHorizontal: 2,
    fontSize: 11,
    textAlign: "center",
    borderLeft: "1px solid #fff",
  },
});

type dataType = {
  label: string;
  year1: number;
  year2: number;
  year3: number;
  total: number;
  presentValue: number;
};

type FinanceTableProps = {
  data: dataType[];
};

function FinanceTable({ data }: FinanceTableProps) {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeader, { flex: 1 }]}>Benefit</Text>
        <Text style={styles.tableHeaderValue}>Year 1</Text>
        <Text style={styles.tableHeaderValue}>Year 2</Text>
        <Text style={styles.tableHeaderValue}>Year 3</Text>
        <Text style={styles.tableHeaderValue}>Total</Text>
        <Text style={styles.tableHeaderPresentValue}>Present Value</Text>
      </View>
      {data.slice(0, -1).map((row, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 1 }]}>
            <Text>{row.label}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formatCurrency(row.year1)}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formatCurrency(row.year2)}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formatCurrency(row.year3)}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formatCurrency(row.total)}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formatCurrency(row.presentValue)}</Text>
          </View>
        </View>
      ))}
      {data.slice(-1).map((row, index) => (
        <View key={index} style={styles.tableFooter}>
          <View style={[styles.tableFooterCell, { flex: 1 }]}>
            <Text>{row.label}</Text>
          </View>
          <View style={styles.tableFooterCellValue}>
            <Text>{formatCurrency(row.year1)}</Text>
          </View>
          <View style={styles.tableFooterCellValue}>
            <Text>{formatCurrency(row.year2)}</Text>
          </View>
          <View style={styles.tableFooterCellValue}>
            <Text>{formatCurrency(row.year3)}</Text>
          </View>
          <View style={styles.tableFooterCellValue}>
            <Text>{formatCurrency(row.total)}</Text>
          </View>
          <View style={styles.tableFooterCellValue}>
            <Text>{formatCurrency(row.presentValue)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default FinanceTable;
