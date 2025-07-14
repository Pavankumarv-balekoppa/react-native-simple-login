import {ScrollView, StyleSheet, Text, View} from 'react-native';

const IPCsectionDetails = ({route}: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.contentHeader}>Chapter Title </Text>
        <Text style={styles.text}>
          {`: ${route?.params?.chapter} ${route?.params?.chapter_title}`}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.contentHeader}>Section </Text>
        <Text style={styles.text}>: {route?.params?.Section}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.contentHeader}>Section Title :</Text>
        <Text style={styles.text}>{`${route?.params?.section_title}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
          Section Description :
        </Text>
        <Text style={styles.text}>{`     ${route?.params?.section_desc}`}</Text>
      </View>
    </ScrollView>
  );
};
export default IPCsectionDetails;
const styles = StyleSheet.create({
  text: {
    color: '#fffe',
    padding: 5,
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  contentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '35%',
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});
