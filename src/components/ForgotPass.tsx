import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reset, setReset] = useState(false);
  const navigation = useNavigation();

  const handleConfirm = () => {
    setReset(true);
  };
  const handleReset = () => {
    setReset(false);
  };

  return (
    <SafeAreaView>
      {reset ? (
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../logo/logo.png')} />
          <Text style={styles.title}>Reset Your Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmation code"
            autoCapitalize="none"
            placeholderTextColor={'#455A64'}
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            autoCapitalize="none"
            placeholderTextColor={'#455A64'}
            value={newPass}
            onChangeText={setNewPass}
          />
          <Pressable onPress={handleReset}>
            <Text style={styles.signBtn}>RESET</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.forgot}>Back to sign In</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../logo/logo.png')} />
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={'#455A64'}
            value={email}
            onChangeText={setEmail}
          />
          <Pressable onPress={handleConfirm}>
            <Text style={styles.signBtn}>CONFIRM</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.forgot}>Back to sign In</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 8,
    borderRadius: 4,
  },
  signBtn: {
    height: 50,
    width: 300,
    fontSize: 20,
    paddingVertical: 10,
    margin: 10,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 4,
  },
  forgot: {
    marginVertical: 20,
    color: 'blue',
  },
});
export default ForgotPass;
