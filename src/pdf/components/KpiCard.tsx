import { Text, View, StyleSheet } from "@react-pdf/renderer";

type CardProps = {
  label: string;
  value: string | number;
  width: number;
};

function KpiCard({ label, value, width }: CardProps) {
  const styles = StyleSheet.create({
    card: {
      display: "flex",
      flexDirection: "column",
      width: `${width}px`,
      border: "1px solid #0070c0",
      borderRadius: 4,
      paddingHorizontal: 2,
      paddingVertical: 12,
    },
    cardValue: {
      display: "flex",
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      color: "#0070c0",
      lineHeight: 1.25,
      marginBottom: 2,
    },
    cardLabel: {
      textAlign: "center",
      display: "flex",
      fontSize: 9,
      lineHeight: 1.25,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

export default KpiCard;
