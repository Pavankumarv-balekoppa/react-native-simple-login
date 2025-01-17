import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAllUserData, login} from '../Slice/authSlice';
import {getUserData} from '../constants/helper';
import {ActivityIndicator} from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [localData,setLocalData]= useState("")

  const handleLogin = async () => {
    setLoading(true);
    if (!email) {
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
    } else if (email && password) {
      await dispatch(getAllUserData());
      const userData = {email, password};
      const res = await dispatch(login(userData));
      const storageData = await getUserData();
      if (res?.payload?.email && storageData?.email === res?.payload?.email) {
        navigation.navigate('MainTabs');
      } else {
        alert(res?.payload);
      }
    } else {
      alert('Please Enter credentials');
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(()=>{
      const callfun=async()=>{
        const storageData = await getUserData();
        console.log('storageData===', storageData);
        setLocalData(storageData);
        if (storageData) {
          navigation.reset({
            index: 0,
            routes: [{name: 'MainTabs'}],
          });
        } 
      }
      callfun()
    },[])
  )
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };
  const handleForgotPass = () => {
    navigation.navigate('ForgotPass');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../logo/logo.png')} />
        <Text style={styles.title}>Login Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={'#455A64'}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.inputPass}>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={'#455A64'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordHidden}
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={()=>{setIsPasswordHidden(!isPasswordHidden)}}>
            <Text style={{color: '#000',fontSize:30}}>
              {isPasswordHidden ? '🕶️' : '👀'}
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={handleForgotPass}>
          <Text style={styles.forgot}>Forgot Password ?</Text>
        </Pressable>
        <Pressable onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator
              style={styles.signBtn}
              size="small"
              color="#ffff"
            />
          ) : (
            <Text style={styles.signBtn}>LOGIN</Text>
          )}
        </Pressable>
        <Pressable onPress={handleSignUp}>
          <Text style={styles.signBtn}>SIGN UP</Text>
        </Pressable>
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
  forgot: {
    marginTop: -20,
    marginBottom: 20,
    color: 'red',
    marginLeft: '40%',
  },
  inputPass: {
    height: 50,
    width: 300,
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 8,
    borderRadius: 4,
    flexDirection:'row',
    display:'flex',
    justifyContent:"space-between",
    alignItems:'center',
    paddingRight:5,
  },
});
export default Login;
