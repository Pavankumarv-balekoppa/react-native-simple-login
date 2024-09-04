import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {height, templeData, width} from '../constants/helper';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [data, setdata] = useState(templeData);
  const navigation = useNavigation();


  const handlepress = (item: any) => {
    navigation.push('TmplDetailsPage', item);
    //  navigation.navigate('TmplDetailsPage', item);
  };

  const renderItems = React.useCallback(
    ({item, index}: any) => {
      return (
        <View key={index}>
          <Pressable
            style={styles.contect}
            onPress={() => {
              handlepress(item);
            }}>
            <FastImage
              source={{uri: item?.img}}
              style={{width: width - 40, height: 200}}
            />
            <Text
              style={{
                color: 'white',
              }}>
              {`Title : ${item?.title}`}
            </Text>
          </Pressable>
        </View>
      );
    },
    [data],
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={true}
        renderItem={renderItems}
        bounces={false}
        keyExtractor={item => item.title}
      />
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  contect: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff3',
    borderRadius: 10,
    flexDirection: 'column',
    gap: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossbtn: {
    position: 'absolute',
    bottom: 9,
    left: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    borderColor: 'white',
  },
});
