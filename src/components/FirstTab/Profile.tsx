import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import PressableButton from '../../CommanComponents/PressableButton';
import {logout} from '../../Slice/authSlice';
import {useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {getUserData, width} from '../../constants/helper';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [useDetails,setUserDetails] = useState("")
  const handleLogout = async () => {
    await dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    AsyncStorage.removeItem('user');
  };

  useFocusEffect(
    useCallback(() => {
      const callfun = async () => {
        const storageData = await getUserData();
        setUserDetails(storageData);
        console.log('storageData', storageData);
        if (!storageData) {
          navigation.navigate('Login');
        }
      };
      callfun();
    }, []),
  );
  return (
    <View>
      <View>
        <View style={styles.textField}>
          <Text style={[styles.text, {width: 70}]}> Name</Text>
          <Text style={styles.text}>: {useDetails?.name}</Text>
        </View>
        <View style={styles.textField}>
          <Text style={[styles.text, {width: 70}]}> Email </Text>
          <Text style={styles.text}>: {useDetails?.email}</Text>
        </View>
        <View style={styles.textField}>
          <Text style={[styles.text, {width: 70}]}> ID </Text>
          <Text style={styles.text}>: {useDetails?.id}</Text>
        </View>
        <View style={styles.textField}>
          <Text style={[styles.text, {width: 70}]}> Gender </Text>
          <Text style={styles.text}>: {useDetails?.gender}</Text>
        </View>
      </View>
      <View>
        <PressableButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  textField: {
    display: 'flex',
    flexDirection:'row',
    columnGap:10,
    backgroundColor: '#1B1D21',
    borderRadius: 7,
    padding: 10,
    margin:3,
  },
  text:{
    color:"#fff",
    fontSize:20
  }
});