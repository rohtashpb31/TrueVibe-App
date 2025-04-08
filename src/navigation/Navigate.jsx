import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import HomeScreen from '../screens/HomeScreen';
import SkipScreen1 from '../screens/SkipScreen1';
import Login from '../Components/Login';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUp from '../Components/SignUp';
import BottomNavigation from '../BottomNavigation';
import ProfileScreen from '../screens/Profile';
const Stack = createNativeStackNavigator();

const Navigate = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Skip"
          component={SkipScreen1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
</GestureHandlerRootView>
  );
};

export default Navigate;
