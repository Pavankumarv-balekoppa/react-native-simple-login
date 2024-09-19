import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Signup from './src/components/Signup';
import Dashboard from './src/components/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/components/Login';
import ForgotPass from './src/components/ForgotPass';
import BatteryStatus from './src/components/BatteryStatus';
import TmplDetailsPage from './src/components/TmplDetailsPage';
import AddTemples from './src/components/AddTemples';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import MainTabs from './src/components/FirstTab/MainTab';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        setUserData(data != null ? JSON.parse(data) : null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
      return (
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }

  console.log('userdata', userData);

  return (
    // without Navigation
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <Signup />
    //   {/* <Dashboard/> */}
    //   {/* {currentScreen === 'login' ? <Signup /> : <Dashboard />} */}
    // </SafeAreaView>

    // with navigation
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={userData === null ? 'Login' : 'MainTabs'}
          screenOptions={{
            headerShown: Platform?.OS === 'android' ? false : true,
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTintColor: !isDarkMode ? '#fff' : '#000',
          }}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="BatteryStatus" component={BatteryStatus} />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={() => ({
              headerShown: true,
              headerTitle: 'Dashboard',
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="AddTemples"
            component={AddTemples}
            options={() => ({
              headerShown: true,
              headerTitle: 'Add Temples',
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="TmplDetailsPage"
            component={TmplDetailsPage}
            options={({route}) => ({
              headerShown: true, // Show the header
              headerTitle: route.params?.title || 'TmplDetailsPage', // Use the title from route params or a fallback title
              headerBackTitleVisible: false, // Hide the back button title
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
