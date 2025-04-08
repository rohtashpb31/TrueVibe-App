import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  Share,
  Alert,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {postData, backgroundDark,backgroundLight} from '../color';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [user, setuser] = useState('https://picsum.photos/id/1038/500/800');
 const colorDark = useColorScheme()
 useEffect(() => {
  const fetchImage = async () => {
    try {
      const image = await AsyncStorage.getItem('path'); // key should match exactly
      if (image !== null) {
        setuser(image);
      }
    } catch (error) {
      console.log('Error fetching image from storage', error);
    }
  };
  fetchImage();
}, []);
  const dummyStories = [
    {
      id: '1',
      name: 'Your Story',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      stories: [
        {
          id: 's1',
          uri: user,
          type: 'image',
          liked: false,
          comments: [],
        },
        {
          id: 's2',
          uri: 'http://picsum.photos/id/1011/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
      ],
    },
    {
      id: '2',
      name: 'Jobin shandu',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      stories: [
        {
          id: 's1',
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"',
          type: 'video',
          liked: true,
          comments: ['Nice view!'],
        },
        {
          id: 's2',
          uri: 'https://picsum.photos/id/1020/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
      ],
    },
    {
      id: '3',
      name: 'Kiarn',
      avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
      stories: [
        {
          id: 's1',
          uri: 'https://picsum.photos/id/1025/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
      ],
    },
    {
      id: '4',
      name: 'Mia',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      stories: [
        {
          id: 's1',
          uri: 'https://picsum.photos/id/1024/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
      ],
    },
    {
      id: '5',
      name: 'Ryan',
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      stories: [
        {
          id: 's1',
          uri: 'https://picsum.photos/id/1035/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
        {
          id: 's2',
          uri: 'https://picsum.photos/id/1038/500/800',
          type: 'image',
          liked: false,
          comments: [],
        },
      ],
    },
  ];
  const openModal = item => {
    setSelectedStory(item);
    setCurrentStoryIndex(0);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setModalVisible(false);
  };
  const handleNextStory = () => {
    if (selectedStory && currentStoryIndex < selectedStory.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeModal();
    }
  };
  const toggleLike = () => {
    const updatedStories = selectedStory.stories.map((story, index) =>
      index === currentStoryIndex ? {...story, liked: !story.liked} : story,
    );
    setSelectedStory({...selectedStory, stories: updatedStories});
  };
  const addComment = () => {
    if (comment.trim() !== '') {
      const updatedStories = selectedStory.stories.map((story, index) =>
        index === currentStoryIndex
          ? {...story, comments: [...story.comments, comment]}
          : story,
      );
      setSelectedStory({...selectedStory, stories: updatedStories});
      setComment('');
    }
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 1,
    })
      .then(image => {
        console.log(image.path);
        setuser(image.path);
      })
      .catch(e => console.log('Error picking image', e));
  };
  const renderStoryContent = story => {
    if (story.type === 'video') {
      return (
        <Video
          source={{uri: story.uri}}
          style={styles.storyContent}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          source={{uri: story.uri}}
          style={styles.storyContent}
        />
      );
    }
  };
  const onShare = async e => {
    try {
      const result = await Share.share({
        message: e,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  return (
    <SafeAreaView style={[styles.container,{backgroundColor : colorDark === 'dark' ?  backgroundDark : backgroundLight}]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          {(colorDark==='dark') ?
          <Image
            source={require('../assets/images/logo/dark.png')}
            style={styles.logo}
          />
          :(<Image
            source={require('../assets/images/logo/light.png')}
            style={styles.logo}
          />)
          }
          <View style={styles.iconRow}>
            <Icon
              name="cards-heart-outline"
              size={responsiveFontSize(3.5)}
              style={{marginRight: 20}}
              color={colorDark === 'light' ?  backgroundDark : backgroundLight}
            />
            <Icon2 name="message1" size={responsiveFontSize(3.2)} 
            color={colorDark === 'light' ?  backgroundDark : backgroundLight}/>
          </View>
        </View>

        {/* Stories List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={openGallery}
            style={[styles.storyCircle, {marginRight: responsiveWidth(0.2)}]}>
            <Image source={{uri: user}} style={styles.avatar} />
            <Text style={[styles.name,{color:colorDark === 'light' ?  backgroundDark : backgroundLight}]}>Add Story</Text>
          </TouchableOpacity>
          <FlatList
            data={dummyStories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => openModal(item)}
                style={styles.storyCircle}>
                <Image source={{uri: item.avatar}} style={styles.avatar} />
                <Text style={[styles.name,{color:colorDark === 'light' ?  backgroundDark : backgroundLight}]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        {/* Story Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          {selectedStory && (
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={handleNextStory}>
              {renderStoryContent(selectedStory.stories[currentStoryIndex])}
              <View style={styles.storyHeader}>
                <Image
                  source={{uri: selectedStory.avatar}}
                  style={styles.modalAvatar}
                />
                <Text style={styles.modalName}>{selectedStory.name}</Text>
              </View>
              <View style={styles.storyInfo}>
                <View style={styles.commentSection}>
                  <TouchableOpacity onPress={toggleLike}>
                    <Icon
                      name={
                        selectedStory.stories[currentStoryIndex].liked
                          ? 'heart'
                          : 'heart-outline'
                      }
                      size={25}
                      color={
                        selectedStory.stories[currentStoryIndex].liked
                          ? 'red'
                          : 'white'
                      }
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Add a comment..."
                    placeholderTextColor="#ccc"
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={setComment}
                    onSubmitEditing={addComment}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      addComment();
                    }}>
                    <Text
                      style={{color: 'white', fontSize: responsiveFontSize(2)}}>
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </Modal>
        <FlatList
          data={postData}
          renderItem={({item}) => (
            <View style={styles.post}>
              <View
                style={[styles.flex, {paddingHorizontal: responsiveWidth(3)}]}>
                <View style={styles.flex}>
                  <Image
                    source={{uri: item.avatar}}
                    style={{height: 30, width: 30, borderRadius: 15}}
                  />
                  <View style={{marginLeft: responsiveWidth(2.5)}}>
                    <Text style={[styles.name,{color:colorDark === 'light' ?  backgroundDark : backgroundLight}]}>{item.name}</Text>
                    <Text style={[styles.location,{color:colorDark === 'light' ?  backgroundDark : backgroundLight}]}>{item.location}</Text>
                  </View>
                </View>
                <View style={{paddingHorizontal: responsiveWidth(2)}}>
                  <Icon3 name="dots-three-horizontal" size={20} 
                  color={colorDark === 'light' ?  backgroundDark : backgroundLight}/>
                </View>
              </View>
              <View style={[styles.imageWrap,{backgroundColor : colorDark === 'dark' ?  backgroundDark : backgroundLight}]}>
                <Image
                  source={{uri: item.url}}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              </View>
              <View style={[styles.flex]}>
                <View
                  style={[
                    styles.flex,
                    {paddingHorizontal: responsiveWidth(4)},
                  ]}>
                  <Icon2 name="hearto" size={24} style={{marginRight: 3}} color={colorDark === 'light' ?  backgroundDark : backgroundLight}/>
                  <Text style={{color:colorDark === 'light' ?  backgroundDark : backgroundLight}}>{item.like}</Text>
                  <Icon4
                    name="commenting-o"
                    size={24}
                    style={{marginRight: 3, marginLeft: 10}}
                    color={colorDark === 'light' ?  backgroundDark : backgroundLight}
                  />
                  <Text style={{color:colorDark === 'light' ?  backgroundDark : backgroundLight}}>{item.comments}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      onShare(item.url);
                    }}>
                    <Icon
                      name="share-outline"
                      size={24}
                      color={colorDark === 'light' ?  backgroundDark : backgroundLight}
                      style={{marginRight: 3, marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: responsiveWidth(4)}}>
                  <Icon2
                    name="save"
                    size={24}
                    color={colorDark === 'light' ?  backgroundDark : backgroundLight}
                    onPress={() => {
                  Alert.alert('soon')
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(100),
  },
  logo: {
    width: responsiveWidth(22),
    height: responsiveHeight(7),
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyCircle: {
    alignItems: 'center',
    marginRight: responsiveWidth(2),
  },
  avatar: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: responsiveWidth(9),
    borderWidth: 4,
    borderColor: '#e91e63',
  },
  name: {
    marginTop: responsiveHeight(0.3),
    fontSize: responsiveFontSize(1.5),
    color: '#000',
    fontWeight: '500',
  },
  modalContainer: {
    height: responsiveHeight(100),
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  storyContent: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    objectFit:'scale-down' ,

  },
  storyInfo: {
    position: 'absolute',
    bottom: responsiveHeight(2.5),
    width: responsiveWidth(100),
    alignItems: 'center',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: responsiveHeight(7),
    paddingHorizontal: responsiveWidth(3),
  },
  modalAvatar: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    marginRight: responsiveWidth(2.5),
  },
  modalName: {
    color: 'white',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: responsiveWidth(7),
    paddingHorizontal: responsiveHeight(2),
    width: responsiveWidth(90),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentInput: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
    height: responsiveHeight(6),
    marginLeft: responsiveWidth(2),
    textAlign: 'left',
    width: responsiveWidth(60),
  },
  flex: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveHeight(0.5),
  },
  post: {
    paddingTop: responsiveHeight(3),
    width: responsiveWidth(100),
  },
  postImage: {
    height: responsiveHeight(30),
    width: responsiveWidth(95),
    borderRadius: responsiveWidth(7),
    objectFit: 'cover',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(100),
    backgroundColor: 'white',
    paddingVertical: responsiveHeight(1.4),
  },
  names: {
    fontWeight: 600,
    fontSize: responsiveFontSize(1.6),
  },
  location: {
    fontSize: responsiveFontSize(1.3),
  },
});
