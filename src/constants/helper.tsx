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
