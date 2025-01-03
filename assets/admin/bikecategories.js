import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Adding icons for bike categories

const bikeCategories = [
  { id: 1, name: 'City Bikes', icon: 'bicycle' },
  { id: 2, name: 'Mountain Bikes', icon: 'mountain' },
  { id: 3, name: 'Hybrid Bikes', icon: 'logo-octocat' }, // Example icon, you can customize
];

export default function BikeList({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Bike Categories</Text>
      <FlatList
        data={bikeCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('BikeCategoryDetails', { category: item })}
            activeOpacity={0.8}
          >
            <Ionicons name={item.icon} size={40} color="#fff" style={styles.icon} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#0EA5E9',
    marginBottom: 12,
    borderRadius: 15,
    elevation: 6,
  },
  itemText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 14,
  },
  icon: {
    borderRadius: 50,
    padding: 12,
    backgroundColor: '#fff',
  },
});
