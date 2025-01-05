import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet,charAt, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const bikeCategories = [
  {
    id: 1,
    name: 'City Bikes',
    image: require('../img/city2.png'),
    category: 'city',
    screen: 'CityBikes',
  },
  {
    id: 2,
    name: 'Mountain Bikes',
    image: require('../img/mountainbike.png'),
    category: 'mountain',
    screen: 'MountainBikes',
  },
  {
    id: 3,
    name: 'Hybrid Bikes',
    image: require('../img/hybridbike.png'),
    category: 'hybrid',
    screen: 'HybridBikes',
  },
];


export default function BikeList({ navigation }) {

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Logo and Header */}
        <Text style={styles.greeting}>Explore Bike Categories</Text>

        {/* Quick Actions Section */}
<View style={styles.quickActionsContainer}>
  <View style={styles.cardContainer}>
    {bikeCategories.map((item) => (
      <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('BikeCategoryDetails', { category: item.category })}
      activeOpacity={0.8}
    >
      <View style={styles.cardIcon}>
        <Image source={item.image} style={styles.cardImage} />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>    
    ))}
  </View>
</View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  mainContent: {
    padding: 16,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickActionsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '90%',
    height: 185,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
    marginBottom: 26,
    marginLeft: 20,

  },
  cardImage: {
    width: 170,
    height: 180,
    resizeMode: 'contain',
    marginTop : -30,
  },
  cardText: {
    fontSize: 18,
    color: '#28A745',
    fontWeight: '600',
    textAlign: 'center',
    marginTop : -20,
  },
});