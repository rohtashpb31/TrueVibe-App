import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Post array to store all posts
export const posts = [];

const NewPost = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    openImagePicker();
  }, []);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        console.log('Image selected:', image);
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log('Image selection canceled:', error.message);
        navigation.goBack(); // If user cancels image picking, go back
      });
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image.');
      return;
    }
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a title.');
      return;
    }
    if (location.trim() === '') {
      Alert.alert('Error', 'Please enter a location.');
      return;
    }
    if (description.trim() === '') {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }

    try {
      // Store in AsyncStorage if needed
      await AsyncStorage.setItem('path', selectedImage);

      // Create a new post object
      const newPost = {
        id: Date.now().toString(), // Unique id based on timestamp
        title: title,
        location: location,
        description: description,
        image: selectedImage,
      };

      // Push into posts array
      posts.push(newPost);

      console.log('Post added:', newPost);
      console.log('All posts:', posts);

      Alert.alert('Success', 'Post uploaded successfully!');
      navigation.replace('Home'); 
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to upload post.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Create New Post</Text>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        )}

        <TextInput
          placeholder="Enter Post Title"
          placeholderTextColor="#6c757d"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Enter Location"
          placeholderTextColor="#6c757d"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          placeholder="Write a description..."
          placeholderTextColor="#6c757d"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadText}>Upload Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPost;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: responsiveWidth(5),
    alignItems: 'center',
  },
  header: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(2.5),
    color: '#212529',
  },
  imagePreview: {
    height: responsiveHeight(38),
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(2),
    resizeMode: 'cover',
    marginBottom: responsiveHeight(2.5),
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2),
    color: '#212529',
    marginBottom: responsiveHeight(2),
    elevation: 2,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  textArea: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#dc3545',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveWidth(2),
    elevation: 3,
    marginTop: responsiveHeight(1),
  },
  uploadText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
});
