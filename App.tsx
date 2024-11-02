import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera} from 'react-native-image-picker'; // Add this for accessing the camera
import {useColorScheme} from 'react-native';
import axios from 'axios';
import AppStyles from './styles/AppStyles';  // Import styles

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // State to store identification result
  const [identificationResult, setIdentificationResult] = useState<string | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Function to handle camera launch and upload image
  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: false,
    });

    if (result.assets && result.assets.length > 0) {
      const image = result.assets[0];

      // Send the image to the backend for processing
      uploadImageToServer(image);
    }
  };

  // Function to upload image to server and get prediction result
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
      // Assuming response includes plant and pest predictions
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
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Insect Identifier</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          {identificationResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{identificationResult}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;
