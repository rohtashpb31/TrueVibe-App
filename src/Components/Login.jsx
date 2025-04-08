import {
    Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {backgroundDark, backgroundLight} from '../color';
import React, { useEffect, useState } from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const darkmode = useColorScheme();
  useEffect(() => {
    const getData = async () => {
        const email = await AsyncStorage.getItem('Email');
        const password = await AsyncStorage.getItem('Password');
        setTokenEmail(email);
        setTokenPassword(password);
      };
      getData();
  }, []);
  const [Email, setEmail] = useState('test@gmail.com');
  const [Password, setPassword] = useState('123456');
  const [TokenEmail, setTokenEmail] = useState();
  const [TokenPassword, setTokenPassword] = useState();

  const Login = async()=>{
   
    if(Email===TokenEmail && Password===TokenPassword){
        Alert.alert('logined')
        navigation.replace('Home')
    }
    else{
        Alert.alert('Wrong Password')
        console.log(TokenEmail)
        console.log(TokenPassword)
    }
  }
 
  return (
    <SafeAreaView
      style={[
        styles.conatiner,
        {
          backgroundColor:
            darkmode === 'dark' ? backgroundDark : backgroundLight,
        },
      ]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Icon
            name="arrow-left"
            size={30}
            color={darkmode === 'dark' ? backgroundLight : backgroundDark}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.left}>
        <Text
          style={[
            styles.login,
            {color: darkmode === 'dark' ? backgroundLight : backgroundDark},
          ]}>
          Login Your Account
        </Text>
      </View>
      <View style={styles.warrap}>
        <View style={styles.wrapInput}>
          <Icon
            name="email-outline"
            color={'white'}
            size={responsiveFontSize(3)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            value={Email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.wrapInput}>
          <Icon name="lock" color={'white'} size={responsiveFontSize(3)} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={Password}
            onChangeText={setPassword}
            placeholderTextColor="white"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{
            Login()
        } }>
          <Text style={styles.textcolor}>Login</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.forget}>Forgot the Password?</Text>
        </View>
        <View style={{marginTop: responsiveHeight(3)}}>
          <Text
            style={{
              color: darkmode === 'dark' ? backgroundLight : backgroundDark,
            }}>
            -------- or continue with --------
          </Text>
        </View>

        <View style={styles.imagesWrap}>
          <View style={styles.border}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.border}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.border}>
            <Image
              source={require('../assets/images/apple3.png')}
              style={[styles.image, {height: responsiveHeight(2.5)}]}
            />
          </View>
        </View>
        <View style={styles.flex}>
          <Text
            style={{
              color: darkmode === 'dark' ? backgroundLight : backgroundDark,
            }}>
            Don't have an account ?
          </Text>
          <TouchableOpacity onPress={()=>navigation.replace('SignUp')}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  login: {
    fontSize: responsiveFontSize(5),
    fontWeight: 800,
    width: responsiveWidth(60),
  },
  wrapInput: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    backgroundColor: 'rgba(35, 38, 46, 1)',
    borderRadius: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(5),
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(70),
    color: 'white',
    marginLeft: responsiveWidth(3),
  },
  button: {
    height: responsiveHeight(6),
    backgroundColor: '#d1364b',
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  textcolor: {
    color: 'white',
    fontWeight: '800',
    fontSize: responsiveFontSize(1.9),
  },
  forget: {
    color: '#d1364b',
    fontWeight: 700,
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  warrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: responsiveHeight(55),
  },
  imagesWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: responsiveWidth(70),
    marginTop: responsiveHeight(1),
  },
  image: {
    height: responsiveHeight(7),
    width: responsiveWidth(7),
    resizeMode: 'contain',
  },
  border: {
    backgroundColor: 'rgba(35, 38, 46, 1)',
    height: responsiveWidth(12),
    width: responsiveWidth(20),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  text: {
    color: '#d1364b',
    marginLeft: responsiveWidth(1),
    fontWeight: 600,
  },
  left: {
    alignItems: 'flex-start',
    width: responsiveWidth(90),
  },
});
