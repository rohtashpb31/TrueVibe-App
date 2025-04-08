import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Video from 'react-native-video';
import {backgroundDark, backgroundLight, dummyData} from '../color';
const TABS = ['Trending', 'Discover', 'Posts', 'Shorts'];
const App = () => {
  const [selectedTab, setSelectedTab] = useState('Trending');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState('');
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemSize = responsiveWidth(33.4);
  const itemHeight = responsiveHeight(20.4);
 const colorDark = useColorScheme()
  const filteredData = dummyData[selectedTab].filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  const handleProgress = (data) => {
    setProgress(data.currentTime / data.playableDuration);
  };
  const togglePlayPause = () => {
    setPaused(prev => !prev);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setPost(item);
      }}>
      <View style={{width: itemSize, height: itemHeight, padding: 1}}>
        {item.type === 'image' ? (
          <Image
            source={{uri: item.source}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        ) : (
          <Video
            source={{uri: item.source}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            muted
            repeat
            paused={false}
          />
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colorDark==='dark' ? backgroundDark: backgroundLight}]}>
      { !modalVisible ? (<>
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={[styles.searchInput,{color: colorDark==='dark'? 'white': 'black',  borderColor:colorDark==='dark'? '#ccc': 'grey'}]}
        placeholderTextColor="#999"
      />
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tabButton, selectedTab === tab && [{backgroundColor: colorDark==='dark'? '#d1364b':'blue'}]]}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
      </>):(
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress={togglePlayPause} activeOpacity={1}>
            {post?.type === 'image' ? (
              <Image
                source={{uri: post.source}}
                style={styles.fullscreenMedia}
                resizeMode="cover"
              />
            ) : (
              <>
                <Video
                  source={{uri: post.source}}
                  style={styles.fullscreenMedia}
                  resizeMode="cover"
                  repeat
                  tapAnywhereToPause={true}
                  paused={paused}
                  onProgress={handleProgress}
                />
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>
      )
}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  alignItems:'center'
  },
  searchInput: {
    height: responsiveHeight(6),
    width:responsiveWidth(98),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: responsiveWidth(5),
    margin: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
  },
  tabsContainer: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: responsiveHeight(2),
  },
  tabButton: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#03a4ed',
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  fullscreenContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: responsiveHeight(5),
    right: responsiveWidth(5),
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: responsiveWidth(2),
  },
  closeText: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
  },
  fullscreenMedia: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  progressBarContainer: {
    position: 'absolute',
    top: responsiveHeight(1),
    left: 0,
    height: responsiveHeight(0.4),
    width: responsiveWidth(100),
    backgroundColor: '#555',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#03a4ed',
  },
});


export default App;
