import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function ResultScreen({ route }) {
const data = [
  {
    id: '1',
    title: 'Apple Cedar Apple Rust',
    description: 'A fungal disease affecting apple trees, causing yellow-orange spots on leaves and fruit. Management: Remove infected leaves and fruits, maintain good air circulation, and apply fungicides in early spring.',
    image: 'https://example.com/image1.jpg', // Replace with actual image URLs
  },
  {
    id: '2',
    title: 'Tomato Tomato Yellow Leaf Curl Virus',
    description: 'A viral infection causing yellowing and curling of tomato leaves, often transmitted by whiteflies. Management: Remove and destroy infected plants, control whitefly populations, and use resistant tomato varieties.',
    image: 'https://example.com/image2.jpg', // Replace with actual image URLs
  },
  {
    id: '3',
    title: 'Corn (maize) Northern Leaf Blight',
    description: 'A fungal disease that causes long, gray-green lesions on corn leaves. Management: Rotate crops, plant resistant hybrids, and remove debris after harvest to reduce overwintering spores.',
    image: 'https://example.com/image3.jpg', // Replace with actual image URLs
  },
  {
    id: '4',
    title: 'Orange Huanglongbing (Citrus greening)',
    description: 'A severe bacterial disease that causes yellowing of leaves and fruit drop in citrus trees. Management: Remove infected trees, control the insect vectors (e.g., Asian citrus psyllid), and practice good sanitation.',
    image: 'https://example.com/image4.jpg', // Replace with actual image URLs
  },
  {
    id: '5',
    title: 'Potato Early Blight',
    description: 'Caused by a fungus, this disease results in dark, sunken lesions on leaves and stems. Management: Rotate crops, use resistant varieties, and apply fungicides at the first sign of disease.',
    image: 'https://example.com/image5.jpg', // Replace with actual image URLs
  },
  {
    id: '6',
    title: 'Tomato Bacterial Spot',
    description: 'A bacterial infection characterized by dark, water-soaked spots on leaves and fruit. Management: Use disease-free seeds, rotate crops, and apply copper-based bactericides.',
    image: 'https://example.com/image6.jpg', // Replace with actual image URLs
  },
  {
    id: '7',
    title: 'Tomato Leaf Mold',
    description: 'A fungal disease leading to yellowing of leaves and gray, fuzzy mold on the undersides. Management: Improve air circulation, avoid overhead watering, and apply fungicides as needed.',
    image: 'https://example.com/image7.jpg', // Replace with actual image URLs
  },
  {
    id: '8',
    title: 'Grape Leaf Blight (Isariopsis Leaf Spot)',
    description: 'A fungal disease causing dark spots on grape leaves, potentially leading to leaf drop. Management: Remove infected leaves, avoid wetting foliage, and apply fungicides.',
    image: 'https://example.com/image8.jpg', // Replace with actual image URLs
  },
  {
    id: '9',
    title: 'Tomato Early Blight',
    description: 'Similar to potato early blight, causing dark spots and premature leaf drop. Management: Crop rotation, resistant varieties, and timely fungicide application.',
    image: 'https://example.com/image9.jpg', // Replace with actual image URLs
  },
  {
    id: '10',
    title: 'Corn (maize) Cercospora Leaf Spot (Gray Leaf Spot)',
    description: 'A fungal disease producing gray spots on corn leaves, which can lead to yield loss. Management: Rotate crops, use resistant varieties, and apply fungicides as needed.',
    image: 'https://example.com/image10.jpg', // Replace with actual image URLs
  },
  {
    id: '11',
    title: 'Peach Bacterial Spot',
    description: 'A bacterial infection causing leaf spots and premature leaf drop in peach trees. Management: Remove infected leaves and practice sanitation to prevent spread.',
    image: 'https://example.com/image11.jpg', // Replace with actual image URLs
  },
  {
    id: '12',
    title: 'Tomato Spider Mites (Two-Spotted Spider Mite)',
    description: 'Tiny pests that cause stippling on leaves and may produce webbing. Management: Increase humidity, wash plants with water, and apply miticides as necessary.',
    image: 'https://example.com/image12.jpg', // Replace with actual image URLs
  },
  {
    id: '13',
    title: 'Grape Black Rot',
    description: 'A fungal disease causing black spots on leaves and fruit, leading to fruit decay. Management: Remove infected fruit and leaves, and apply fungicides at flowering.',
    image: 'https://example.com/image13.jpg', // Replace with actual image URLs
  },
  {
    id: '14',
    title: 'Potato Late Blight',
    description: 'A devastating fungal disease causing dark spots and rapid decay of tubers. Management: Use resistant varieties, practice crop rotation, and apply fungicides.',
    image: 'https://example.com/image14.jpg', // Replace with actual image URLs
  },
  {
    id: '15',
    title: 'Tomato Late Blight',
    description: 'Similar to potato late blight, leading to rapid decline of tomato plants. Management: Remove infected plants, practice crop rotation, and use fungicides.',
    image: 'https://example.com/image15.jpg', // Replace with actual image URLs
  },
  {
    id: '16',
    title: 'Strawberry Leaf Scorch',
    description: 'A fungal disease causing scorched leaf edges and potential yield loss in strawberries. Management: Improve air circulation, avoid overhead irrigation, and apply fungicides.',
    image: 'https://example.com/image16.jpg', // Replace with actual image URLs
  },
  {
    id: '17',
    title: 'Apple Apple Scab',
    description: 'A fungal disease leading to dark, olive-green spots on leaves and fruit. Management: Prune trees for airflow, apply fungicides in spring, and remove fallen leaves.',
    image: 'https://example.com/image17.jpg', // Replace with actual image URLs
  },
  {
    id: '18',
    title: 'Corn (maize) Common Rust',
    description: 'A fungal disease with reddish-brown pustules on leaves. Management: Use resistant varieties and apply fungicides if necessary.',
    image: 'https://example.com/image18.jpg', // Replace with actual image URLs
  },
  {
    id: '19',
    title: 'Squash Powdery Mildew',
    description: 'A common fungal disease characterized by white powdery spots on leaves. Management: Improve airflow, avoid overhead watering, and use fungicides as needed.',
    image: 'https://example.com/image19.jpg', // Replace with actual image URLs
  },
  {
    id: '20',
    title: 'Tomato Septoria Leaf Spot',
    description: 'A fungal disease causing circular spots on lower leaves, leading to early leaf drop. Management: Use resistant varieties, rotate crops, and apply fungicides.',
    image: 'https://example.com/image20.jpg', // Replace with actual image URLs
  },
  {
    id: '21',
    title: 'Apple Black Rot',
    description: 'A fungal disease leading to black spots on fruit and leaves. Management: Prune infected wood, clean up fallen fruit, and apply fungicides.',
    image: 'https://example.com/image21.jpg', // Replace with actual image URLs
  },
  {
    id: '22',
    title: 'Tomato Target Spot',
    description: 'A fungal disease causing dark spots with concentric rings on tomato leaves. Management: Use resistant varieties and apply fungicides as needed.',
    image: 'https://example.com/image22.jpg', // Replace with actual image URLs
  },
  {
    id: '23',
    title: 'Grape Esca (Black Measles)',
    description: 'A fungal disease affecting grapevines, leading to leaf and fruit decline. Management: Prune affected vines and manage vine health to reduce stress.',
    image: 'https://example.com/image23.jpg', // Replace with actual image URLs
  },
  {
    id: '24',
    title: 'Cherry (including sour) Powdery Mildew',
    description: 'A fungal infection causing white powdery spots on leaves. Management: Prune for airflow, avoid overhead watering, and apply fungicides.',
    image: 'https://example.com/image24.jpg', // Replace with actual image URLs
  },
  {
    id: '25',
    title: 'Tomato Tomato Mosaic Virus',
    description: 'A viral infection causing mottled leaves and stunted growth in tomatoes. Management: Remove infected plants and control aphid populations.',
    image: 'https://example.com/image25.jpg', // Replace with actual image URLs
  },
  {
    id: '26',
    title: 'Pepper, Bell Bacterial Spot',
    description: 'A bacterial disease causing dark spots on leaves and fruit in bell peppers. Management: Use disease-free seeds, rotate crops, and apply copper-based bactericides.',
    image: 'https://example.com/image26.jpg', // Replace with actual image URLs
  },
  {
    id: '27',
    title: 'Ants',
    description: 'Small insects that can protect aphids and other pests on plants. Management: Remove food sources, use bait, and create barriers to prevent access to plants.',
    image: 'https://example.com/image27.jpg', // Replace with actual image URLs
  },
  {
    id: '28',
    title: 'Bees',
    description: 'Beneficial insects that pollinate plants. Generally not harmful, but their presence is crucial for fruit set and plant health.',
    image: 'https://example.com/image28.jpg', // Replace with actual image URLs
  },
  {
    id: '29',
    title: 'Beetle',
    description: 'Insects that can cause damage to leaves and stems of plants. Management: Handpick beetles, use insecticidal soap, and introduce beneficial predators.',
    image: 'https://example.com/image29.jpg', // Replace with actual image URLs
  },
  {
    id: '30',
    title: 'Catterpillar',
    description: 'Larvae of moths that can devour leaves quickly. Management: Handpick, use Bacillus thuringiensis (Bt), or apply insecticides.',
    image: 'https://example.com/image30.jpg', // Replace with actual image URLs
  },
  {
    id: '31',
    title: 'Earthworms',
    description: 'Beneficial organisms that aerate the soil and improve nutrient cycling. Encourage their presence through organic matter addition.',
    image: 'https://example.com/image31.jpg', // Replace with actual image URLs
  },
  {
    id: '32',
    title: 'Earwig',
    description: 'Insects that can feed on young plants and fruits. Management: Use traps or insecticidal soap to control populations.',
    image: 'https://example.com/image32.jpg', // Replace with actual image URLs
  },
  {
    id: '33',
    title: 'Grasshopper',
    description: 'Insects that can cause significant leaf damage, especially in late summer. Management: Use barriers, insecticides, and attract natural predators.',
    image: 'https://example.com/image33.jpg', // Replace with actual image URLs
  },
  {
    id: '34',
    title: 'Moth',
    description: 'Adult stage of certain caterpillars, which can cause plant damage. Management: Use traps, beneficial insects, and insecticides as needed.',
    image: 'https://example.com/image34.jpg', // Replace with actual image URLs
  },
  {
    id: '35',
    title: 'Slug',
    description: 'Pests that feed on leaves, particularly at night. Management: Handpick, use bait, and encourage natural predators.',
    image: 'https://example.com/image35.jpg', // Replace with actual image URLs
  },
  {
    id: '36',
    title: 'Snail',
    description: 'Similar to slugs but have a shell. They feed on leaves and can damage plants. Management: Handpick, use traps, and create barriers.',
    image: 'https://example.com/image36.jpg', // Replace with actual image URLs
  },
  {
    id: '37',
    title: 'Wasp',
    description: 'Some wasps are beneficial as they control pest populations, while others can be pests themselves. Management: Identify species and use traps if necessary.',
    image: 'https://example.com/image37.jpg', // Replace with actual image URLs
  },
  {
    id: '38',
    title: 'Weevil',
    description: 'Small beetles that can damage roots, leaves, and stems of plants. Management: Remove infested plants and use insecticides as needed.',
    image: 'https://example.com/image38.jpg', // Replace with actual image URLs
  },
];

  const { plant_prediction, pest_prediction } = route.params || {};

  plant_prediction_processed = plant_prediction.replaceAll("_", "").trim().toLowerCase();
  pest_prediction_processed =pest_prediction.trim().toLowerCase();

console.log("route params in result", plant_prediction, pest_prediction);


  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedPest, setSelectedPest] = useState(null);

  useEffect(() => {
  const formattedData = data.map((item) => ({
      ...item,
      title: item.title.replaceAll(" ", "").trim().toLowerCase(),
    }));

    // Find the disease based on plant prediction
  if (plant_prediction_processed?.includes("healthy")) {
    console.log("Plant prediction contains 'healthy'. Setting to 'Healthy Plant'.");
    setSelectedDisease({
      title: 'Healthy Plant',
      description: 'This plant is healthy and requires regular care to maintain its good condition.',
      image: 'https://example.com/healthy-plant.jpg', // Replace with an actual image URL
    });
    //setSelectedPest(null); // Optionally clear pest information if plant is healthy
    return; // Exit early since we already handled the case
  }

  // Matching Logic
  const diseaseMatch = formattedData.find((item) => {
    console.log("Matching disease with:", item.title, "vs", plant_prediction_processed);
    return item.title.includes(plant_prediction_processed || '');
  });

  console.log("Disease Match:", diseaseMatch);

  const pestMatch = formattedData.find((item) => {
    console.log("Matching pest with:", item.title, "vs", pest_prediction_processed);
    return item.title.includes(pest_prediction_processed || '');
  });

  console.log("Pest Match:", pestMatch);

    // Set matched disease and pest, or default to unknown entries
    setSelectedDisease(
      diseaseMatch || { title: 'Unknown Disease', description: 'No disease care tips available.', image: '' }
    );
    setSelectedPest(
      pestMatch || { title: 'Unknown Pest', description: 'No pest control tips available.', image: '' }
    );
  }, [plant_prediction, pest_prediction]);

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.headerTitle}>Detailed Care Tips</Text>

      {selectedDisease && (
        <View style={AppStyles.detailsContainer}>
          <Text style={AppStyles.detailsText}>Disease: {selectedDisease.title}</Text>
          <Text style={AppStyles.detailsText}>Description: {selectedDisease.description}</Text>
          {selectedDisease.image && <Image source={{ uri: selectedDisease.image }} style={AppStyles.image} />}
        </View>
      )}

      {selectedPest && (
        <View style={AppStyles.detailsContainer}>
          <Text style={AppStyles.detailsText}>Pest: {selectedPest.title}</Text>
          <Text style={AppStyles.detailsText}>Description: {selectedPest.description}</Text>
          {selectedPest.image && <Image source={{ uri: selectedPest.image }} style={AppStyles.image} />}
        </View>
      )}
    </View>
  );
}
