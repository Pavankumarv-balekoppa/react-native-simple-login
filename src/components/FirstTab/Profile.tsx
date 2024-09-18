import { View } from 'react-native';
import {Text} from 'react-native-paper';
import PressableButton from '../../CommanComponents/PressableButton';
import { logout } from '../../Slice/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async() => {
     await dispatch(logout());
     navigation.navigate('Login');
  }
  return (
    <View>
      <PressableButton title="Logout" onPress={handleLogout} />
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000',
        }}>
        Profile Screen
      </Text>
    </View>
  );
};

export default Profile;
