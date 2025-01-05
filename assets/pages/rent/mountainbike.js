import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBikeContext } from '../../admin/BikeContext';


const MountainBikes = () => {
  const navigation = useNavigation();

  const mountainBikesData = [
    {
      id: 1,
      name: 'Trek Dual Sport 2',
      price: 60,
      imageUrl: require('../../img/mountain1.jpg'),
      description: 'A versatile hybrid bike with front suspension, perfect for commuting and light trail rides, offering a smooth and comfortable experience.',
    },
    {
      id: 2,
      name: 'Giant Talon 3',
      price: 85,
      imageUrl: require('../../img/mountain2.jpg'),
      description: 'Designed for light trails and city streets, this bike features a lightweight aluminum frame and excellent handling for a smooth ride.',
    },
    {
      id: 3,
      name: 'Rockrider ST100',
      price: 95,
      imageUrl: require('../../img/mountain3.jpg'),
      description: 'An affordable and reliable mountain bike, ideal for beginners and leisure riders who enjoy both paved paths and gentle trails.',
    },
    {
      id: 4,
      name: 'Co-op Cycles DRT 1.1',
      price: 75,
      imageUrl: require('../../img/mountain4.jpg'),
      description: 'Built for durability and control, this bike is great for casual trail riding and commuting, offering a stable and comfortable ride.',
    },
    {
      id: 5,
      name: 'Marin Bolinas Ridge 1',
      price: 85,
      imageUrl: require('../../img/mountain5.jpg'),
      description: 'Perfect for leisure and commuting, this bike features wide tires for grip and a sturdy frame for lasting durability.',
    },
    {
      id: 6,
      name: 'Schwinn High Timber',
      price: 65,
      imageUrl: require('../../img/mountain6.jpg'),
      description: 'A classic mountain bike with a comfortable seat and wide tires, ideal for both casual rides and everyday commutes.',
    },
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