import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {posts} from './NewPost';
import ImagePicker from 'react-native-image-crop-picker';

const highlights = [
  {id: '1', label: 'Travel', image: 'https://picsum.photos/100/100?7'},
  {id: '2', label: 'Food', image: 'https://picsum.photos/100/100?8'},
  {id: '3', label: 'Style', image: 'https://picsum.photos/100/100?9'},
  {id: '4', label: 'Fitness', image: 'https://picsum.photos/100/100?10'},
  {id: '5', label: 'Nature', image: 'https://picsum.photos/100/100?11'},
  {id: '6', label: 'Art', image: 'https://picsum.photos/100/100?12'},
  {id: '7', label: 'Music', image: 'https://picsum.photos/100/100?13'},
  {id: '8', label: 'Pets', image: 'https://picsum.photos/100/100?14'},
  {id: '9', label: 'Photography', image: 'https://picsum.photos/100/100?15'},
  {id: '10', label: 'Books', image: 'https://picsum.photos/100/100?16'},
  {id: '11', label: 'Work', image: 'https://picsum.photos/100/100?17'},
  {id: '12', label: 'Friends', image: 'https://picsum.photos/100/100?18'},
  {id: '13', label: 'Memories', image: 'https://picsum.photos/100/100?19'},
  {id: '14', label: 'Events', image: 'https://picsum.photos/100/100?20'},
  {id: '15', label: 'Hobbies', image: 'https://picsum.photos/100/100?21'},
  {id: '16', label: 'City Life', image: 'https://picsum.photos/100/100?22'},
  {id: '17', label: 'Mountains', image: 'https://picsum.photos/100/100?23'},
  {id: '18', label: 'Beaches', image: 'https://picsum.photos/100/100?24'},
  {id: '19', label: 'Winter', image: 'https://picsum.photos/100/100?25'},
  {id: '20', label: 'Summer', image: 'https://picsum.photos/100/100?26'},
];

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Posts');
  const [userProfile, setuserProfile] = useState('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R134006824&ga=GA1.1.1592049451.1735493517&semt=ais_country_boost&w=740');

  const renderPost = ({item}) => (
    <Image source={{uri: item.image}} style={styles.postImage} />
  );

  const renderHighlight = ({item}) => (
    <View style={styles.highlightItem}>
      <View style={styles.highlightImageContainer}>
        <Image source={{uri: item.image}} style={styles.highlightImage} />
      </View>
      <Text style={styles.highlightLabel}>{item.label}</Text>
    </View>
  );
  const profile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setuserProfile(image.path)
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>rohtashpb31</Text>
        <Icon name="menu" size={responsiveFontSize(3)} color="white" />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: userProfile}}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={profile}>
            <Icon name="edit" size={responsiveFontSize(2.5)} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Rohtash Verma</Text>
        <Text style={styles.jobTitle}>Software Developer</Text>
        <Text style={styles.website}>www.example.com</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>500</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={styles.highlightsContainer}>
        <FlatList
          data={highlights}
          keyExtractor={item => item.id}
          renderItem={renderHighlight}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('Posts')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Posts' && {fontWeight: 'bold'},
            ]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Reels')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Reels' && {fontWeight: 'bold'},
            ]}>
            Reels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Tagged')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Tagged' && {fontWeight: 'bold'},
            ]}>
            Tagged
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts */}
      {selectedTab === 'Posts' && (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={renderPost}
          numColumns={3}
          contentContainerStyle={styles.postsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveWidth(4),
  },
  username: {
    color: 'white',
    fontSize: responsiveFontSize(2.2),
    flex: 1,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(12.5),
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#03a4ed',
    borderRadius: responsiveWidth(5),
    padding: responsiveWidth(1),
  },
  name: {
    color: 'white',
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
  },
  jobTitle: {
    color: '#ccc',
    fontSize: responsiveFontSize(1.8),
  },
  website: {
    color: '#03a4ed',
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.5),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(2),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: responsiveFontSize(1.6),
  },
  highlightsContainer: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  highlightItem: {
    alignItems: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  highlightImageContainer: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: responsiveWidth(9),
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
  },
  highlightLabel: {
    color: 'white',
    fontSize: responsiveFontSize(1.4),
    marginTop: responsiveHeight(0.5),
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(2),
  },
  tabText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  postsContainer: {
    marginTop: responsiveHeight(2),
    alignItems:'flex-start',
   
  },
  postImage: {
    width: responsiveWidth(32),
    height: responsiveWidth(32),
    margin: responsiveWidth(1),
  },
});

export default ProfileScreen;
