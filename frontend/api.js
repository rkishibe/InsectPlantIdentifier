import axios from 'axios';

export const uploadImage = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: 'insect.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await axios.post('http://your-backend-url/identify', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error identifying insect:', error);
    return null;
  }
};
