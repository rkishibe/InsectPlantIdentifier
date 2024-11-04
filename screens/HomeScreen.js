import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function HomeScreen() {
  const keywords = [
    'Apple Cedar apple rust',
    'Tomato Tomato Yellow Leaf Curl Virus',
    'Corn (maize) Northern Leaf Blight',
    'Orange Huanglongbing (Citrus greening)',
    'Potato Early blight',
    'Tomato Bacterial spot',
    'Tomato Leaf Mold',
    'Grape Leaf blight (Isariopsis Leaf Spot)',
    'Tomato Early blight',
    'Corn (maize) Cercospora leaf spot Gray leaf spot',
    'Peach Bacterial spot',
    'Tomato Spider mites Two-spotted spider mite',
    'Grape Black rot',
    'Potato Late blight',
    'Tomato Late blight',
    'Strawberry Leaf scorch',
    'Apple Apple scab',
    'Corn (maize) Common rust',
    'Squash Powdery mildew',
    'Tomato Septoria leaf spot',
    'Apple Black rot',
    'Tomato Target Spot',
    'Grape Esca (Black Measles)',
    'Cherry (including sour) Powdery mildew',
    'Tomato Tomato mosaic virus',
    'Pepper, bell Bacterial spot',
    'ants',
    'bees',
    'beetle',
    'catterpillar',
    'earthworms',
    'earwig',
    'grasshopper',
    'moth',
    'slug',
    'snail',
    'wasp',
    'weevil',
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = keywords.filter(keyword =>
        keyword.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredKeywords(filtered);
    } else {
      setFilteredKeywords([]);
    }
  };

  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.header}>
        <Text style={AppStyles.headerTitle}>Search common plant diseases and pests</Text>
      </View>
      <TextInput
        style={AppStyles.searchBar}
        placeholder="Search pests or diseases"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Display filtered results */}
      <FlatList
        data={filteredKeywords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={AppStyles.recommendCard}>
            <Text style={AppStyles.recommendText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Example of recommended plants/diseases */}
      <View style={AppStyles.recommendContainer}>
        {/* Example recommended items */}
        {keywords.slice(0, 37).map((item, index) => (
          <TouchableOpacity key={index} style={AppStyles.recommendCard}>
            <Text style={AppStyles.recommendText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
