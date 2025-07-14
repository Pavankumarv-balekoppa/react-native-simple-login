import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getIPCData} from '../Slice/extraSlice';
import FastImage from 'react-native-fast-image';
import {width} from '../constants/helper';
import {ActivityIndicator} from 'react-native-paper';

const IPCsection = () => {
  const dispatch = useDispatch();
  const {IPCData, isLoading} = useSelector(state => state.extraSlice);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getIPCData());
  }, []);

  const dataLoading = () => {
    return (
      <Text style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </Text>
    );
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
            <Text style={styles.title}>Section {item?.Section}</Text>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
              }}>
              {item?.section_title}
            </Text>
          </Pressable>
        </View>
      );
    },
    [IPCData],
  );

  const handlepress = (item: any) => {
    navigation.push('IPCsectionDetails', item);
  };

  return (
    <View style={styles.container}>
      {IPCData?.length ? (
        <View>
          <FlatList
            data={IPCData}
            scrollEnabled={true}
            renderItem={renderItems}
            keyExtractor={item => item.Section}
          />
        </View>
      ) : (
        dataLoading()
      )}
    </View>
  );
};
export default IPCsection;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff3',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  contect: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
