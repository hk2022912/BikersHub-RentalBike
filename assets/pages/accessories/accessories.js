import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import the local image
import snackIcon from '../../img/6.jpg';

const accessoriesData = [
  { id: '1', name: 'Wheels', price: '₱50', image: snackIcon },
  { id: '2', name: 'Gear', price: '₱50', image: snackIcon },
  { id: '3', name: 'Bike Helmet', price: '₱35', image: snackIcon },
  { id: '4', name: 'Bike Lights', price: '₱35', image: snackIcon },
  { id: '5', name: 'Locks', price: '₱35', image: snackIcon },
  { id: '6', name: 'Bearing', price: '₱35', image: snackIcon },
  { id: '7', name: 'Saddle Bag', price: '₱40', image: snackIcon },
  { id: '8', name: 'Water Bottle Holder', price: '₱20', image: snackIcon },
  { id: '9', name: 'Chain Lubricant', price: '₱15', image: snackIcon },
  { id: '10', name: 'Bell', price: '₱10', image: snackIcon },
];

const BikeAccessories = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Scrollable Accessories List */}
      <ScrollView contentContainerStyle={styles.grid}>
        {accessoriesData.map((item) => (
          <AccessoryItem
            key={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const AccessoryItem = ({ name, price, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{price}</Text>
      </View>
    </View>
  );
};

export default BikeAccessories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 8,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6347',
  },
});
