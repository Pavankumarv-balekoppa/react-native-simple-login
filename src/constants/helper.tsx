import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

export const Person = [
  {
    data: {
      personal: {
        name: 'Example',
        gender: 'Male',
        email: 'example@gamail.com',
        password: 'Example',
      },
      extraData: {},
    },
  },
];

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

 export const storeUserData = async (user: any) => {
   try {
     await AsyncStorage.setItem('user', JSON.stringify(user));
   } catch (error) {
     console.error('Error storing user data', error);
   }
 };
 export const getUserData = async () => {
   try {
     const jsonValue = await AsyncStorage.getItem('user');
     return jsonValue != null ? JSON.parse(jsonValue) : null;
   } catch (error) {
     console.error('Error retrieving user data', error);
   }
 };