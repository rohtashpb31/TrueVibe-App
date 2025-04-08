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
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const darkmode = useColorScheme();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confrim, setconfrim] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confrim.trim()) {
      Alert.alert('Error', 'All fields are required');
    } else if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    } else if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
    } else if (password !== confrim) {
      Alert.alert('Mismatch', 'Passwords do not match');
    } else {
        AsyncStorage.setItem('Name', name);
        AsyncStorage.setItem('Email', email);
        AsyncStorage.setItem('Password', password);
        Alert.alert('Success', 'Account created successfully!');
        setpassword('');
        setconfrim('');
        setname('');
        setemail('');
        navigation.replace('Login')
      }
  };
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
        <TouchableOpacity onPress={() => navigation.replace('Skip')}>
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
          Create your Account
        </Text>
      </View>

      <View style={styles.warrap}>
        <View style={styles.wrapInput}>
          <Icon2 name="user" color={'white'} size={responsiveFontSize(3)} />
          <TextInput
            placeholder="User Name"
            placeholderTextColor="white"
            value={name}
            onChangeText={setname}
            style={styles.input}
          />
        </View>

        <View style={styles.wrapInput}>
          <Icon
            name="email-outline"
            color={'white'}
            size={responsiveFontSize(3)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setemail}
            style={styles.input}
          />
        </View>

        <View style={styles.wrapInput}>
          <Icon name="lock" color={'white'} size={responsiveFontSize(3)} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setpassword}
            secureTextEntry
            placeholderTextColor="white"
            style={styles.input}
          />
        </View>

        <View style={styles.wrapInput}>
          <Icon name="lock" color={'white'} size={responsiveFontSize(3)} />
          <TextInput
            placeholder="Confirm Password"
            value={confrim}
            onChangeText={setconfrim}
            secureTextEntry
            placeholderTextColor="white"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textcolor}>Sign Up</Text>
        </TouchableOpacity>

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
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  login: {
    fontSize: responsiveFontSize(5),
    fontWeight: '800',
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
    fontWeight: '700',
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  warrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: responsiveHeight(60),
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
    fontWeight: '600',
  },
  left: {
    alignItems: 'flex-start',
    width: responsiveWidth(90),
  },
});
