import { Text, StyleSheet, View } from '@react-pdf/renderer';

type inputDataType = {
  label: string;
  value: string;
};

type InputTableProps = {
  title: string;
  data: inputDataType[];
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: 'auto',
    marginBottom: 30,
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: '#0b2651',
    borderRight: '1px solid #0b2651',
    color: '#fff',
  },
  tableHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableHeaderValue: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 160,
    padding: 8,
    backgroundColor: '#0b2651',
    borderLeft: '1px solid #0b2651',
    color: '#fff',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #fff',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    backgroundColor: '#e8e8e8',
  },
  tableCellValue: {
    width: 160,
    padding: 8,
    fontSize: 10,
    textAlign: 'center',
    backgroundColor: '#c0f0c7',
    borderLeft: '1px solid #fff',
  },
});

function InputTable({ data, title }: InputTableProps) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeader, { flex: 1 }]}>Metric</Text>
          <Text style={styles.tableHeaderValue}>Input Value</Text>
        </View>
        {data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.label}</Text>
            <Text style={styles.tableCellValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

export default InputTable;
