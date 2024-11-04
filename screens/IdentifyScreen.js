import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <View style={AppStyles.container}>
    <Text style={AppStyles.headerTitle}>Let's find out if your plant is healthy!</Text>
      <TouchableOpacity style={AppStyles.button} onPress={openCamera}>
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
