import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// URL of the backend server where Flask app is running
const serverUrl = 'http://10.0.2.2:5000/predict';

test('Check model output for a.jpg', async () => {
  // Load the test image located in the server folder
  const imagePath = './server/a.jpg';
  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath), {
    filename: 'a.jpg',
    contentType: 'image/jpeg'
  });

  try {
    const response = await axios.post(serverUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Expected structure of the response
    const { plant, pest } = response.data;

    // Print or check the predictions
    console.log('Plant Prediction:', plant);
    console.log('Pest Prediction:', pest);

    // Assert that we got predictions (assuming that empty values are not expected)
    expect(plant).toBeDefined();
    expect(pest).toBeDefined();
    expect(typeof plant).toBe('string');  // Adjust according to the expected response type
    expect(typeof pest).toBe('string');   // Adjust according to the expected response type
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
