import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import AppStyles from '../styles/AppStyles';

export default function IdentifyScreen() {
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

  const uploadImageToServer = async (image: Asset) => {
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
      setIdentificationResult(
        `Plant Prediction: ${plant_prediction}\nPest Prediction: ${pest_prediction}`
      );
    } catch (error) {
      console.error("Error uploading image or retrieving prediction:", error);
      setIdentificationResult("Error processing image. Please try again.");
    }
  };

  return (
    <View style={AppStyles.container}>
      <TouchableOpacity style={AppStyles.button} onPress={openCamera}>
        <Text style={AppStyles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      {identificationResult && (
        <View style={AppStyles.resultContainer}>
          <Text style={AppStyles.resultText}>{identificationResult.name}</Text>
          <Text style={AppStyles.resultText}>{identificationResult.tips}</Text>
        </View>
      )}
    </View>
  );
}
