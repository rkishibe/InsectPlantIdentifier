import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AppStyles from '../styles/AppStyles';
import axios from 'axios';


export default function IdentifyScreen({ navigation }) {
  const [identificationResult, setIdentificationResult] = useState(null);

  const openCamera = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.error('Error with camera:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const image =response.assets[0];
          uploadImageToServer(image);
        }
      }
    );
  };


  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Error with image picker:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const image =response.assets[0];
          uploadImageToServer(image);
        }
      }
    );
  };

//const testImg="./server/images/a.jpg";
//

  const uploadImageToServer = async (image) => {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || 'photo.jpg',
    });

    try { //http://192.168.1.131:5000/predict
      const response = await axios.post('http://10.0.2.2:5000/predict', formData, { //http://10.0.2.2:5000/predict
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      plant_prediction=response.data['plant'];
      pest_prediction=response.data['pest'];

      // Navigate to ResultScreen with prediction results as parameters
      navigation.navigate('ResultTab',{
      screen: 'ResultScreen',
      params:{
              plant_prediction: plant_prediction,
              pest_prediction: pest_prediction,
      },

      });
    } catch (error) {
      console.error("Error uploading image or retrieving prediction:", error);
      setIdentificationResult("Error processing image. Please try again.");
    }
  };

  return (
    <View style={[AppStyles.container, styles.container]}>
      <Text style={AppStyles.headerTitle}>Let's find out if your plant is healthy!</Text>
      <Text style={styles.instructions}>
        To check your plant's health, please follow these steps:
      </Text>
      <Text style={styles.instructionStep}>1. Make sure your plant is in good lighting.</Text>
      <Text style={styles.instructionStep}>2. Avoid any blur; hold your phone steady.</Text>
      <Text style={styles.instructionStep}>3. Capture a clear image of the entire leaf.</Text>

      <TouchableOpacity style={[AppStyles.button, styles.centerButton]} onPress={openCamera}>

        <Text style={AppStyles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[AppStyles.button, styles.centerButton]} onPress={openGallery}>
      <Text style={AppStyles.buttonText}>Pick from Gallery</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 15,
  },
  instructionStep: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
    marginVertical: 5,
  },
  centerButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
