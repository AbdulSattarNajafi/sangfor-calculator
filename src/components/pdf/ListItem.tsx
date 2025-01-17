import { Text, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  list: {
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
});

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.list}>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <View style={styles.listItem}>{children}</View>
      </View>
    </View>
  );
}

export default ListItem;
