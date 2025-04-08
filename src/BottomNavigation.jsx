import { StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SearchPage from './screens/SearchPage';
import RealScreen from './screens/RealScreen';
import Profile from './screens/Profile';
import NewPost from './screens/NewPost';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { backgroundDark, backgroundLight } from './color';
const Tab = createBottomTabNavigator();

function MyTabs() {
 const dark= useColorScheme()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, 
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle';
          } else if (route.name === 'Reals') {
            iconName = focused ? 'play-circle' : 'play-circle';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          }
          return <Ionicons name={iconName} size={28} color={focused ? '#d1364b' : dark==='dark'? 'white': 'grey'} />;
        },
        tabBarStyle: {
          backgroundColor: dark==='dark'? backgroundDark: backgroundLight, 
          height: responsiveHeight(9),
          paddingTop:responsiveHeight(1),
          borderColor:dark==='dark'? backgroundDark: backgroundLight, 
        },
        tabBarActiveTintColor: '#d1364b',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Post" component={NewPost} />
      <Tab.Screen name="Reals" component={RealScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
const BottomNavigation = () => {
  return <MyTabs />
};
export default BottomNavigation;
