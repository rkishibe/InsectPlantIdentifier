import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import AppStyles from '../styles/AppStyles';
import axios from 'axios';

export default function IdentifyScreen({ navigation }) {
  const [identificationResult, setIdentificationResult] = useState(null);

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: false,
    });

    if (result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      uploadImageToServer(image);
    }
  };

  const uploadImageToServer = async (image) => {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || 'photo.jpg',
    });

    try {
      const response = await axios.post('http://10.0.2.2:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { plant_prediction, pest_prediction } = response.data;

      const result = {
        name: plant_prediction,
        pest: pest_prediction,
      };

      setIdentificationResult(result);
      navigation.navigate('Checkout', { result });
    } catch (error) {
      console.error("Error uploading image or retrieving prediction:", error);
      setIdentificationResult({ name: "Error", pest: "Unable to process image." });
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

      {identificationResult && (
        <View style={AppStyles.resultContainer}>
          <Text style={AppStyles.resultText}>{identificationResult.name}</Text>
          <Text style={AppStyles.resultText}>{identificationResult.pest}</Text>
        </View>
      )}
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
