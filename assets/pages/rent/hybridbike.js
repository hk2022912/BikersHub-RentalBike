import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MountainBikes = () => {
  const navigation = useNavigation();

  const mountainBikesData = [
    {
      id: 1,
      name: 'Royce Union RMT Mens Bike',
      price: 70,
      imageUrl: require('../../img/hybrid1.jpg'),
      description: 'Durable and lightweight aluminum frame, perfect for tackling rugged trails and smooth urban roads.',
    },
    {
      id: 2,
      name: 'Mongoose Malus Bike with Disc Brakes',
      price: 80,
      imageUrl: require('../../img/hybrid2.jpg'),
      description: 'Equipped with fat tires and reliable disc brakes for superior control on sandy or snowy terrains.',
    },
    {
      id: 3,
      name: 'Rocky Mountain Bike',
      price: 60,
      imageUrl: require('../../img/hybrid3.jpg'),
      description: 'Engineered for extreme off-road performance, featuring shock-absorbing suspension for a smoother ride.',
    },
    {
      id: 4,
      name: 'Folding Mountain Bike',
      price: 90,
      imageUrl: require('../../img/hybrid4.jpg'),
      description: 'Compact and foldable design, ideal for adventurers seeking portability without compromising performance.',
    },
    {
      id: 5,
      name: 'Kent T-29 Men’s Mountain Bike',
      price: 80,
      imageUrl: require('../../img/hybrid5.jpg'),
      description: '29-inch wheels with a sleek design, delivering stability and speed for both trails and urban exploration.',
    },
    {
      id: 6,
      name: 'Hiland Aluminum Hybrid Fitness Road Bike',
      price: 70,
      imageUrl: require('../../img/hybrid6.jpg'),
      description: 'A versatile hybrid bike with a lightweight frame, perfect for fitness rides and long-distance commuting.',
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
  container: { flex: 1, padding: 10 },
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
  bikeImage: { width: 130, height: 120, marginBottom: 10, resizeMode: 'contain' },
  bikeName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  bikePrice: { fontSize: 14, color: '#2ecc71' },
  listContainer: { paddingBottom: 10 },
});

export default MountainBikes;
