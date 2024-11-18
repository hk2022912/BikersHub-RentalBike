import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MountainBikes = () => {
  const navigation = useNavigation();

  const mountainBikesData = [
    {
      id: 1,
      name: 'Rocky Mountain Trail Bike',
      price: 60,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
    },
    {
      id: 2,
      name: 'Mud Hopper Mountain Bike',
      price: 75,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
    },
    {
      id: 3,
      name: 'Mud Hopper Mountain Bike',
      price: 75,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
    },    {
      id: 4,
      name: 'Mud Hopper Mountain Bike',
      price: 75,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
    },    {
      id: 5,
      name: 'Mud Hopper Mountain Bike',
      price: 75,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
      
    },   
    {
      id: 6,
      name: 'Mud Hopper Mountain Bike',
      price: 75,
      imageUrl: require('../../img/logo.png'),
      description: 'Comfortable commuter bike for daily travel.',
    },
    // Add more bikes
  ];

  const handlePress = (bike) => {
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
        data={mountainBikesData}
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

export default MountainBikes;
