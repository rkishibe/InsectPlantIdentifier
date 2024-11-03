import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={AppStyles.container}>
      <View style={AppStyles.header}>
        <Text style={AppStyles.headerTitle}>Let's find your pests & diseases</Text>
      </View>
      <TextInput style={AppStyles.searchBar} placeholder="Search pests or diseases" />

      {/* Example of recommended plants/diseases */}
      <View style={AppStyles.recommendContainer}>
        <TouchableOpacity style={AppStyles.recommendCard}>
          <Text style={AppStyles.recommendText}>Aphids</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.recommendCard}>
          <Text style={AppStyles.recommendText}>Powdery Mildew</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
