import { Text, View, StyleSheet } from "@react-pdf/renderer";

type CardProps = {
  step: string;
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  cardLabel: {
    backgroundColor: "#0070c0",
    display: "flex",
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.2,
    width: 52,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  cardLabelText: {
    color: "#fff",
  },
  cardBody: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #0070c0",
    borderRadius: 4,
    borderTopLeftRadius: 0,
    padding: 10,
    marginTop: -1,
    zIndex: -1,
  },
});

function Step({ step, children }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLabel}>
        <Text style={styles.cardLabelText}>Step {step}</Text>
      </View>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

export default Step;
