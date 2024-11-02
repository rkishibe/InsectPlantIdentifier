import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import CameraScreen from './camera';
import { uploadImage } from './api';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [insectData, setInsectData] = useState(null);

  const handleCapture = async (uri) => {
    setImageUri(uri);
    const response = await uploadImage(uri);
    setInsectData(response);
  };

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <CameraScreen onCapture={handleCapture} />
      ) : (
        <View style={styles.resultContainer}>
          <Image source={{ uri: imageUri }} style={styles.capturedImage} />
          {insectData ? (
            <Text style={styles.insectInfo}>Identified Insect: {insectData.insect_name}</Text>
          ) : (
            <Text style={styles.loadingText}>Identifying...</Text>
          )}
          <Button title="Retake" onPress={() => setImageUri(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  capturedImage: { width: 300, height: 300, marginBottom: 20 },
  insectInfo: { fontSize: 18, color: 'green' },
  loadingText: { fontSize: 18, color: 'gray' },
});
