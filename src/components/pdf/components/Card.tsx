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
      fontSize: 10,
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
      // border: "1px solid #0070c0",
      borderRadius: 4,
      borderTopLeftRadius: 0,
      padding: 10,
      marginTop: -1,
      zIndex: -1,
    },
    cardBodyText: {
      // color: "#444444",
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardLabel}>
        <Text style={styles.cardLabelText}>{label}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardBodyText}>{text}</Text>
      </View>
    </View>
  );
}

export default Card;
