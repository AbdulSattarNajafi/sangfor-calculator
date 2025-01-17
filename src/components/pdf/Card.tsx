import { Text, View, StyleSheet } from '@react-pdf/renderer';

type CardProps = {
  label: string;
  labelWidth: number;
  text: string;
};

function Card({ label, labelWidth, text }: CardProps) {
  const styles = StyleSheet.create({
    card: {
      marginBottom: 10,
    },
    cardLabel: {
      backgroundColor: '#0053b8',
      display: 'flex',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1,
      width: labelWidth,
      padding: '4px 10px 6px 10px',
    },
    cardLabelText: {
      color: '#fff',
    },
    cardBody: {
      backgroundColor: '#eef4fc',
      display: 'flex',
      padding: 10,
      paddingTop: 20,
      marginTop: -10,
      zIndex: -1,
    },
    cardBodyText: {
      color: '#00000070',
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
