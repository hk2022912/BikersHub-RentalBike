import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';

// Get screen width
const screenWidth = Dimensions.get('window').width;

const categories = [
  {
    id: 1,
    name: 'City Bike',
    image: require('../../img/citybike.png'),
  },
  {
    id: 2,
    name: 'Mountain Bike',
    image: require('../../img/mountainbike.png'),
  },
  {
    id: 3,
    name: 'Hybrid Bike',
    image: require('../../img/hybridbike.png'),
  },
];

const Rent = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => {
        if (item.name === 'City Bike') {
          navigation.navigate('CityBikes'); // Navigate to CityBikes page
        } else if (item.name === 'Mountain Bike') {
          navigation.navigate('MountainBikes'); // Navigate to MountainBikes page
        } else if (item.name === 'Hybrid Bike') {
          navigation.navigate('HybridBikes'); // Navigate to HybridBikes page
        }
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}  // Hide the vertical scroll bar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add some padding around the container
  },
  categoryCard: {
    width: screenWidth * 0.8, // 80% of screen width
    height: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20, // Space between items in the column
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 200,
    height: 200,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Rent;
