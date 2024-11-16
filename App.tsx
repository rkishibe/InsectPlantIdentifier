import React, { useState, createContext, useContext } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { enableScreens } from 'react-native-screens';

import AppStyles from './styles/AppStyles';
import HomeScreen from './screens/HomeScreen';
import IdentifyScreen from './screens/IdentifyScreen';
import ResultScreen from './screens/ResultScreen';
import DetailsScreen from './screens/DetailsScreen';

enableScreens();

// Define types for navigation
type RootStackParamList = {
  HomeTab: undefined;
  IdentifyTab: undefined;
  ResultTab: undefined; // Ensure this is here for ResultStack
  DetailsScreen: { selectedKeyword: string };
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator<RootStackParamList>();

export const PredictionContext = createContext(null);
export const usePrediction = () => useContext(PredictionContext);

// Stack Navigator for nested screens
const Stack = createStackNavigator<RootStackParamList>();

// Home Stack with DetailsScreen included
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

// Identify Stack with DetailsScreen included
function IdentifyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IdentifyScreen" component={IdentifyScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

// Result Stack with DetailsScreen included
function ResultStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ headerShown: false }}
        initialParams={{ plant_prediction: '', pest_prediction: '' }} // Default params
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f7" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'IdentifyTab') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'ResultTab') {
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
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="IdentifyTab" component={IdentifyStack} options={{ title: 'Identify' }} />
        <Tab.Screen name="ResultTab" component={ResultStack} options={{ title: 'Result' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
