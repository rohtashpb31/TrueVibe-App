import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  useColorScheme,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {backgroundDark, backgroundLight} from '../color';
const {width} = Dimensions.get('window');
const SkipScreen1 = ({navigation}) => {
  const colorScheme = useColorScheme();
  const data = [
    {
      id: 1,
      title: 'The Best Social Media App of the country   ',
      text: 'Connect with friends, share special moments, and explore endless possibilities. Stay engaged and discover.',
    },
    {
      id: 2,
      title: 'Connect, talk & Share Effortlessly    ',
      text: 'Experience seamless social networking. Meet new people, share your thoughts, and stay updated on trends.',
    },
    {
      id: 3,
      title: 'A Smarter and Unique Way to Connect Users  ',
      text: 'Effortless communication and endless opportunities. Your social world is redefined with innovative features.',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
    }
    else{
        navigation.replace('Login'); 
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'dark' ? backgroundDark : backgroundLight,
        },
      ]}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/social.png')}
          style={styles.image}
        />
      </View>
      {/* Content Section */}
      <FlatList
        horizontal
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        data={data}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={[styles.wrap, {width}]}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    colorScheme === 'dark' ? backgroundLight : backgroundDark,
                },
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.lorem,
                {
                  color:
                    colorScheme === 'dark' ? backgroundLight : backgroundDark,
                },
              ]}>
              {item.text}
            </Text>
          </View>
        )}
      />
      {/*Paggination dots section*/}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {backgroundColor: index === currentIndex ? '#d1364b' : 'grey'},
            ]}
          />
        ))}
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#d1364b'}]}
          onPress={handleNext}>
          <Text style={styles.textcolor}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>
             navigation.replace('Login')
        }>
          <Text style={styles.textcolor}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SkipScreen1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(5),
  },
  topSection: {
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  image: {
    height: responsiveHeight(40),
    width: responsiveWidth(80),
    resizeMode: 'contain',
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(100),
  },
  text: {
    fontSize: responsiveFontSize(3),
    width: responsiveWidth(80),
    textAlign: 'center',
    fontWeight: '700',
    marginTop: responsiveHeight(3),
  },
  lorem: {
    width: responsiveWidth(90),
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    marginTop: responsiveHeight(1.7),
    marginBottom: responsiveHeight(3),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: responsiveHeight(6),
    backgroundColor: 'grey',
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
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(3),
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
