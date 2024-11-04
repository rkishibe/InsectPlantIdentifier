import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { launchCamera, Asset } from 'react-native-image-picker';
import { useColorScheme } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStyles from './styles/AppStyles'; // Import styles
import HomeScreen from './screens/HomeScreen';
import IdentifyScreen from './screens/IdentifyScreen';
import ResultScreen from './screens/ResultScreen';

import { enableScreens } from 'react-native-screens';

enableScreens();

type RootStackParamList = {
  Home: undefined;
  Identify: undefined;
  Checkout: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [identificationResult, setIdentificationResult] = useState<string | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f7" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Identify') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Checkout') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2c6e49',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: { backgroundColor: '#f0f4f7' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Identify" component={IdentifyScreen} />
        <Tab.Screen name="Result" component={ResultScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
