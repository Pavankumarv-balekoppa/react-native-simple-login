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
import {RadioButton} from 'react-native-paper';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!name) {
      alert('name is Required');
    } else if (!email) {
      alert('Email is Required');
    } else if (
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      alert('please enter valid Email');
    } else if (!password) {
      alert('Password is Required');
    } else if (
      !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
    ) {
      alert(
        'Password must contain at least one number and one special character and be at least 8 characters long',
      );
    } else if (!confirmPassword) {
      alert('confirmPassword is Required');
    } else if (
      !confirmPassword.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      )
    ) {
      alert(
        'confirmPassword must contain at least one number and one special character and be at least 8 characters long',
      );
    } else if (password !== confirmPassword) {
      alert('password and confirmPassword not match');
    } else if (!gender) {
      alert('Gender is Required');
    } else {
      // const randomNum = Math.floor(1000 + Math.random() * 9999);
      // const payload = {
      //   '0001': {
      //     personal: {
      //       name: name,
      //       gender: gender,
      //       email: email,
      //       password: password,
      //     },
      //     extraData: {},
      //   },
      // };
      // setEmpData([...empData, payload]);
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.container}> */}
        <Image style={styles.logo} source={require('../logo/logo.png')} />
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor={'#455A64'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={'#455A64'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor={'#455A64'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="ConfirmPassword"
          autoCapitalize="none"
          placeholderTextColor={'#455A64'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.radioContainer}>
          <Text style={styles.label}>Gender:</Text>
          <RadioButton.Group
            onValueChange={value => setGender(value)}
            value={gender}>
            <View style={styles.radioItem}>
              <RadioButton.Android value="male" />
              <Text>Male</Text>
              <RadioButton.Android value="female" />
              <Text>Female</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Pressable onPress={handleLogin}>
          <Text style={styles.signBtn}>SIGN UP</Text>
        </Pressable>
        <Text>
          Already have an account?{' '}
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: 'blue'}}>Login</Text>
          </Pressable>
        </Text>
        {/* </ImageBackground> */}
      </View>
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
  signIn: {
    height: 50,
    width: 240,
    fontSize: 18,
    paddingVertical: 10,
    margin: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 4,
    fontWeight: 'bold',
  },
  radioContainer: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});
export default Signup;
