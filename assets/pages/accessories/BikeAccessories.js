import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Accessories = () => {
  const navigation = useNavigation();

  const accessoriesData = [
    {
      id: 1,
      name: 'Wheels',
      price: 550,
      description: 'Our high-quality wheels are designed to provide a smooth and efficient ride on all types of terrain.',
      imageUrl: require('../../img/wheelss.png'),
    },
    {
      id: 2,
      name: 'Gear',
      price: 330,
      description: 'Durable and precision-crafted gears ensure that your bike shifts smoothly and accurately, providing you with the best performance during your rides.',
      imageUrl: require('../../img/gear.png'),
    },
    {
      id: 3,
      name: 'Bike Helmet',
      price: 235,
      description: 'Safety is paramount when cycling, and our high-performance bike helmet is engineered to protect your head during any ride.',
      imageUrl: require('../../img/helmet.png'),
    },
    {
      id: 4,
      name: 'Bike Lights',
      price: 235,
      description: 'Illuminate your path with our bright, energy-efficient bike lights, specially designed for nighttime and low-light conditions.',
      imageUrl: require('../../img/lights.png'),
    },
    {
      id: 5,
      name: 'Locks',
      price: 235,
      description: 'Our heavy-duty bike locks provide the ultimate security for your bike. Constructed from hardened steel and designed to withstand tampering.',
      imageUrl: require('../../img/locks.png'),
    },
    {
      id: 6,
      name: 'Bearing',
      price: 30,
      description: 'Upgrade your bike’s performance with smooth, durable bearings that ensure maximum efficiency and minimal friction.',
      imageUrl: require('../../img/bearing.png'),
    },
];


  const handlePress = (accessory) => {
    navigation.navigate('AccessoriesDetails', { accessory });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.accessoryCard}>
      <Image source={item.imageUrl} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{item.name}</Text>
      <Text style={styles.accessoryPrice}>₱{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accessoriesData}
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
    backgroundColor: '#f8f8f8',
  },
  accessoryCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  accessoryImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  accessoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accessoryPrice: {
    fontSize: 14,
    color: '#2ecc71',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default Accessories;