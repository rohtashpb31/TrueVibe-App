import React, { useEffect, useState } from 'react';
import {
    Image,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import { backgroundDark, backgroundLight } from '../color'; 


const Splash = ({navigation}) => {
  const colorScheme = useColorScheme(); 
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Skip'); 
    }, 4000); 
  }, [navigation]);
  console.log(colorScheme);
  const logo = colorScheme === 'dark' 
  ? require('../assets/images/logo/dark.png') 
  : require('../assets/images/logo/light.png');
  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? backgroundDark : backgroundLight }]}>
      <View>
        <Image source={logo} style={styles.image}/>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height: responsiveHeight(20),
    width: responsiveWidth(80),
    objectFit:'contain'
  }
});
