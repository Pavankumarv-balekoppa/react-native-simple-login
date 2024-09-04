import React from "react";
import { Pressable, StyleSheet, View } from "react-native"
import FastImage from "react-native-fast-image";
import { Text } from "react-native-paper"
import { width } from "../constants/helper";
import { ScrollView } from "react-native-gesture-handler";

const TmplDetailsPage=({route}: any)=>{
    const [showMore,setShowMore] = React.useState(false)
  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={{uri: route?.params?.img}}
        style={{width: width, height: 200}}
      />
      <View style={styles.Details}>
        <Text style={styles.text}>
          <Text style={{...styles.text, fontWeight: 'bold'}}>Name : </Text>
          {route?.params?.title}
        </Text>
        <Text style={styles.text}>
          <Text style={{...styles.text, fontWeight: 'bold'}}>Place : </Text>
          {route?.params?.place}
        </Text>
        <Text style={styles.text}>
          <Text style={{...styles.text, fontWeight: 'bold'}}>Details : </Text>
          {route?.params?.details?.slice(
            0,
            showMore ? route?.params?.details?.length : 500,
          )}
        </Text>
        <Pressable
          onPress={() => setShowMore(!showMore)}
          style={{alignSelf: 'flex-end', paddingBottom: 20}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: '#C2D1F0',
            }}>
            {'  '}
            {route?.params?.details?.length ? showMore
              ? 'Show less...'
              : 'Show more...' : ""}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
export default TmplDetailsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    paddingVertical: 5,
  },
  Details: {
    color: 'white',
    padding: 7,
  },
});