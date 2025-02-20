import { Text, View, StyleSheet } from "@react-pdf/renderer";

type CardProps = {
  label: string;
  labelWidth: number;
  text: string;
};

function Card({ label, labelWidth, text }: CardProps) {
  const styles = StyleSheet.create({
    card: {
      marginBottom: 15,
    },
    cardLabel: {
      backgroundColor: "#0070c0",
      display: "flex",
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.2,
      width: labelWidth,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    cardLabelText: {
      color: "#fff",
    },
    cardBody: {
      display: "flex",
      backgroundColor: "#e6f2ff",
      borderRadius: 4,
      borderTopLeftRadius: 0,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginTop: -1,
      zIndex: -1,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardLabel}>
        <Text style={styles.cardLabelText}>{label}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

export default Card;
