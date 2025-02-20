import { Text, StyleSheet, View } from "@react-pdf/renderer";

type inputDataType = {
  label: string;
  value: string | number;
};

type InputTableProps = {
  title: string;
  data: inputDataType[];
};

const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: "#fff",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0070c0",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #fff",
  },
  tableCell: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    lineHeight: 1,
    fontSize: 11,
    backgroundColor: "#e6f2ff",
  },
  tableCellValue: {
    width: 160,
    paddingHorizontal: 2,
    paddingVertical: 8,
    lineHeight: 1,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#d6f5d6",
    borderLeft: "1px solid #fff",
  },
});

function InputTable({ title, data }: InputTableProps) {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableHeader}>{title}</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.label}</Text>
          <Text style={styles.tableCellValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

export default InputTable;
