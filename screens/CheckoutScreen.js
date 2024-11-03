import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function CheckoutScreen() {
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.headerTitle}>Detailed Care Tips</Text>
      {/* Display detailed information about pest/disease */}
      <View style={AppStyles.detailsContainer}>
        <Text style={AppStyles.detailsText}>Pest: Aphids</Text>
        <Text style={AppStyles.detailsText}>Tips: Spray with neem oil or use insecticidal soap.</Text>
      </View>
      <TouchableOpacity style={AppStyles.button}>
        <Text style={AppStyles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
