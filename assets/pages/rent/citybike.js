import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CityBikes = () => {
  const navigation = useNavigation();

  const cityBikesData = [
    {
      id: 1,
      name: 'Black Velo Sport Bike',
      price: 35,
      imageUrl: require('../../img/city1.jpg'),
      description: 'A sleek and lightweight city bike designed for speed and efficiency, perfect for urban commuting and leisure rides.',
    },
    {
      id: 2,
      name: 'Green Road Bike',
      price: 50,
      imageUrl: require('../../img/city2.png'),
      description: 'Lightweight and durable, ideal for long rides.',
    },
    {
      id: 3,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../../img/city3.png'),
      description: 'Versatile hybrid bike designed for both streets and trails.',
    },
    {
      id: 4,
      name: 'Sixthreezero EVRYjourney Hybrid Cruiser',
      price: 40,
      imageUrl: require('../../img/city4.jpg'),
      description: 'A stylish, comfortable bike with a step-through frame, ideal for relaxed city rides and short commutes.',
    },
    {
      id: 5,
      name: 'Priority Classic Plus',
      price: 40,
      imageUrl: require('../../img/city5.jpg'),
      description: 'A reliable commuter bike with excellent comfort.',
    },
    {
      id: 6,
      name: 'Retrospec Beaumont City Bike',
      price: 40,
      imageUrl: require('../../img/city6.png'),
      description: 'Comfortable and affordable bike for everyday use.',
    },
  ];
  const handlePress = (bike) => {
    navigation.navigate('BikeDetails', { bike }); // Pass the selected bike to the BikeDetails screen
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
