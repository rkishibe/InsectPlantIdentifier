import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function CameraScreen({ onCapture }) {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      onCapture(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
      <Button title="Capture Insect" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '80%' },
});
