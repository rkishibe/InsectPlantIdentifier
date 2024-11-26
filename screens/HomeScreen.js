import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function HomeScreen({ navigation }) {
  const keywords = [
    'Apple Cedar Rust', 'Tomato Yellow Leaf Curl Virus', 'Corn Northern Leaf Blight',
    'Orange Huanglongbing', 'Potato Early Blight', 'Tomato Bacterial Spot', 'Tomato Leaf Mold',
    'Grape Leaf Blight', 'Tomato Early Blight', 'Corn Cercospora Gray Leaf Spot',
    'Peach Bacterial Spot', 'Tomato Spider mites', 'Grape Black Rot', 'Potato Late Blight',
    'Tomato Late Blight', 'Strawberry Leaf Scorch', 'Apple Scab', 'Corn Common Rust', 'Squash Powdery mildew',
    'Tomato Septoria Leaf Spot', 'Apple Black Rot', 'Tomato Target Spot', 'Grape Esca',
    'Cherry Powdery Mildew', 'Tomato Mosaic Virus', 'Pepper Bell Bacterial spot', 'Ants',
    'Bees', 'Beetle', 'Catterpillar', 'Earthworms', 'Earwig', 'Grasshopper', 'Moth', 'Slug', 'Snail', 'Wasp', 'Weevil',
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

  const handleKeywordPress = (item) => {
    navigation.navigate('DetailsScreen', { selectedKeyword: item });
  };

  const displayData = searchQuery ? filteredKeywords : keywords;

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

      {/* Display items in two columns with spacing */}
      <FlatList
        data={displayData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}  // Set number of columns to 2
        renderItem={({ item }) => (
          <TouchableOpacity
            style={AppStyles.recommendCard}
            onPress={() => handleKeywordPress(item)}
          >
            <Text style={AppStyles.recommendText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
