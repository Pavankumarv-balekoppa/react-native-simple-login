import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Dashboard from '../Dashboard';
import AddTemples from '../AddTemples';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        tabBarActiveBackgroundColor: '#000',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="AddTemples"
        component={AddTemples}
        options={{
          tabBarLabel: 'AddTemples',
          tabBarIcon: () => <Text>👤</Text>,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Profile}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: () => <Text>😔</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
