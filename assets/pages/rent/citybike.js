import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CityBikes = () => {
  const navigation = useNavigation(); // Access navigation

  const cityBikesData = [
    {
      id: 1,
      name: 'Black Velo Sport Bike',
      price: 35,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    {
      id: 2,
      name: 'Green Road Bike',
      price: 50,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    {
      id: 3,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    {
      id: 4,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    {
      id: 5,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    {
      id: 6,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../../img/logo.png'), // Example image
    },
    
    // Add more bikes as needed
  ];

  const handlePress = (bike) => {
    // Navigate to BikeDetails and pass bike data
    navigation.navigate('BikeDetails', { bike });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.bikeCard}>
      <Image source={item.imageUrl} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>₱{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cityBikesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bikeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  bikeImage: {
    width: 130,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bikePrice: {
    fontSize: 14,
    color: '#2ecc71',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default CityBikes;
