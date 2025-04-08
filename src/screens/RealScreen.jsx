import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, Animated, Easing, Pressable } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const dummyVideos = [
  {
    id: '1',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Big Buck Bunny',
    description: 'A short animated movie by Blender Foundation.',
    user: 'jenny_wirosa',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    music: 'Favorite Girl - Justin Bieber',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Sample Video 1MB',
    description: 'Test video for streaming and buffering.',
    user: 'alex_turner',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    music: 'Rolling in the Deep - Adele',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    title: 'Sintel Trailer',
    description: 'A trailer for the open movie Sintel.',
    user: 'maya_angel',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    music: 'Dream On - Aerosmith',
  },
  {
    id: '4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Nature Walk',
    description: 'Exploring the beauty of nature.',
    user: 'lucas_brown',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    music: 'Blinding Lights - The Weeknd',
  },
  {
    id: '5',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'City Lights',
    description: 'A timelapse of city life at night.',
    user: 'sophie_woods',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    music: 'Someone Like You - Adele',
  },
  {
    id: '6',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Ocean Breeze',
    description: 'Relaxing sounds of the ocean.',
    user: 'chris_evans',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    music: 'Ocean Eyes - Billie Eilish',
  },
  {
    id: '7',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Mountain Hike',
    description: 'Adventures in the mountains.',
    user: 'emma_wilson',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    music: 'Counting Stars - OneRepublic',
  },
  {
    id: '8',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Desert Dreams',
    description: 'Mystical journey through the desert.',
    user: 'daniel_morris',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    music: 'Desert Rose - Sting',
  },
  {
    id: '9',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Sky High',
    description: 'Aerial view of stunning landscapes.',
    user: 'mia_clark',
    avatar: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    music: 'Castle on the Hill - Ed Sheeran',
  },
  {
    id: '10',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    title: 'Road Trip',
    description: 'Driving across the country.',
    user: 'liam_white',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    music: 'Drive - Incubus',
  },
  {
    id: '11',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Sunset Vibes',
    description: 'Beautiful sunset at the beach.',
    user: 'olivia_harris',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    music: 'Sunflower - Post Malone',
  },
  {
    id: '12',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Snow Adventure',
    description: 'Snowboarding in the Alps.',
    user: 'noah_mitchell',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    music: 'Let It Go - Idina Menzel',
  },
  {
    id: '13',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Countryside Bliss',
    description: 'Fields, farms, and fresh air.',
    user: 'ava_thomas',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    music: 'Country Roads - John Denver',
  },
  {
    id: '14',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'City Rush',
    description: 'Fast-paced city living.',
    user: 'william_jones',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    music: 'Empire State of Mind - Jay-Z',
  },
  {
    id: '15',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Festival Fun',
    description: 'Dancing under the stars.',
    user: 'isabella_green',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    music: 'Uptown Funk - Bruno Mars',
  },
  {
    id: '16',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Into the Woods',
    description: 'Exploring the wilderness.',
    user: 'james_adams',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    music: 'Boulevard of Broken Dreams - Green Day',
  },
  {
    id: '17',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Carnival Nights',
    description: 'Colorful rides and games.',
    user: 'charlotte_carter',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    music: 'Shake It Off - Taylor Swift',
  },
  {
    id: '18',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Rainy Day',
    description: 'Raindrops and reflections.',
    user: 'benjamin_scott',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    music: 'Set Fire to the Rain - Adele',
  },
  {
    id: '19',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Island Hopping',
    description: 'Exploring tropical islands.',
    user: 'amelia_taylor',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    music: 'Island In The Sun - Weezer',
  },
  {
    id: '20',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Autumn Leaves',
    description: 'Fall colors in the forest.',
    user: 'logan_walker',
    avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    music: 'Autumn Leaves - Nat King Cole',
  },
  {
    id: '21',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    title: 'Morning Dew',
    description: 'Fresh start of the day.',
    user: 'ella_martin',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    music: 'Here Comes the Sun - The Beatles',
  },
  {
    id: '22',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Starry Night',
    description: 'Night sky full of stars.',
    user: 'jackson_clark',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    music: 'Counting Stars - OneRepublic',
  },
  {
    id: '23',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Campfire Songs',
    description: 'Music around the fire.',
    user: 'grace_lewis',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    music: 'Home - Phillip Phillips',
  },
  {
    id: '24',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Wildlife Wonders',
    description: 'Animals in their natural habitat.',
    user: 'sebastian_hall',
    avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    music: 'Roar - Katy Perry',
  },
  {
    id: '25',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    title: 'Frosty Mornings',
    description: 'Winter’s first snow.',
    user: 'victoria_allen',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    music: 'Sweater Weather - The Neighbourhood',
  },
  {
    id: '26',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Sun-kissed Shores',
    description: 'Golden sands and waves.',
    user: 'leo_young',
    avatar: 'https://randomuser.me/api/portraits/men/26.jpg',
    music: 'Riptide - Vance Joy',
  },
  {
    id: '27',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    title: 'Jungle Beats',
    description: 'Adventure in the jungle.',
    user: 'chloe_king',
    avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    music: 'Welcome to the Jungle - Guns N’ Roses',
  },
  {
    id: '28',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: 'Vintage Vibes',
    description: 'Retro-style journey.',
    user: 'henry_wright',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
    music: 'Bohemian Rhapsody - Queen',
  },
  {
    id: '29',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    title: 'Hidden Waterfalls',
    description: 'Secret places of nature.',
    user: 'zoe_scott',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    music: 'Waterfalls - TLC',
  },
  {
    id: '30',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Golden Hour',
    description: 'Perfect sunset light.',
    user: 'jack_moore',
    avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    music: 'Golden - Harry Styles',
  },
];


const ShortsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
    const [paused, setPaused] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const togglePausePlay = () => {
    setPaused(!paused);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setPaused(false); // Auto-play when new video appears
    }
  }).current;
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dummyVideos}
        keyExtractor={(item) => item.id}

        renderItem={({ item, index }) => (
          <>
          <Pressable onPress={togglePausePlay} >
          <View style={styles.videoContainer}>
            
            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              
              resizeMode="cover"
              repeat
              paused={currentIndex !== index || paused}
            />

            {/* Overlay Content */}
            <View style={styles.overlayContent}>

              {/* Right Actions */}
              <View style={styles.rightActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <AntDesign name="hearto" size={30} color="white" />
                  <Text style={styles.iconText}>12.8K</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="chatbubble-outline" size={30} color="white" />
                  <Text style={styles.iconText}>345</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionIcon}>
                  <Feather name="send" size={28} color="white" />
                  <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>

                {/* Rotating Music Disc */}
                <Animated.View style={[styles.musicDisc, { transform: [{ rotate: spin }] }]}>
                  <Image
                    source={{ uri: item.avatar}}
                    style={styles.musicImage}
                  />
                </Animated.View>

              </View>

              {/* Bottom User Info */}
              <View style={styles.bottomInfo}>
                <View style={styles.userRow}>
                  <Image
                    source={{ uri:item.avatar}}
                    style={styles.avatar}
                  />
                  <Text style={styles.username}>{item.user}</Text>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Follow</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.descriptionText}>{item.description}</Text>
                <View style={styles.musicRow}>
                  <Ionicons name="musical-notes" size={16} color="white" />
                  <Text style={styles.musicText}>{item.music}</Text>
                </View>
              </View>

            </View>

          </View>
        </Pressable>
     </>)}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
};

export default ShortsScreen;

const styles = StyleSheet.create({
  container: {
  height:responsiveHeight(100),
  width:responsiveWidth(100),
    backgroundColor: 'black',
  },
  videoContainer: {
    height:responsiveHeight(100),
    width:responsiveWidth(100),
  },
  video: {
    height:responsiveHeight(100),
    width:responsiveWidth(100),
  },
  overlayContent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: responsiveHeight(10), 
    paddingHorizontal: responsiveWidth(3), 
  },
  rightActions: {
    position: 'absolute',
    right: responsiveWidth(4), 
    bottom: responsiveHeight(15), 
    alignItems: 'center',
  },
  actionIcon: {
    marginBottom: responsiveHeight(2.5), 
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.5),
  },
  bottomInfo: {
    width: '80%',
    marginBottom: responsiveHeight(2),
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  avatar: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(2),
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginRight: responsiveWidth(2),
  },
  followButton: {
    backgroundColor: '#FF2D55',
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(3),
  },
  followText: {
    color: 'white',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
  },
  descriptionText: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(0.5),
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  musicText: {
    color: 'white',
    fontSize: responsiveFontSize(1.6),
    marginLeft: responsiveWidth(1),
  },
  musicDisc: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginTop: responsiveHeight(2),
  },
  musicImage: {
    width: '100%',
    height: '100%',
  },
});

