import { Text, View, StyleSheet } from "@react-pdf/renderer";

type StepsProps = {
  step: string;
  title: string;
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  steps: {
    width: "100%",
    marginBottom: 15,
  },
  stepsHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 5,
  },
  stepsStep: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#0070c0",
    fontWeight: "bold",
    lineHeight: 1.2,
    width: 24,
    height: 24,
    borderRadius: "50%",
    marginLeft: -1,
  },
  stepsContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  stepsTitle: {
    fontSize: 14,
    lineHeight: 1,
    fontWeight: "bold",
  },
  cardBody: {
    display: "flex",
    flexDirection: "row",
    fontSize: 11,
    lineHeight: 1.5,
  },
});

function Steps({ step, title, children }: StepsProps) {
  return (
    <View style={styles.steps}>
      <View style={styles.stepsHeader}>
        <View style={styles.stepsStep}>
          <Text>{step}</Text>
        </View>
        <View style={styles.stepsContent}>
          <Text style={styles.stepsTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

export default Steps;
