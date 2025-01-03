import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useBikeContext } from '../admin/BikeContext';

export default function BikeCategoryDetails({ route, navigation }) {
  const { category } = route.params;
  const { cityBikes, updateBikeStatus } = useBikeContext(); // Access bike data from context
  const [newBike, setNewBike] = useState('');

  // CRUD methods
  const addBike = () => {
    if (newBike) {
      // Add a new bike (this can be extended to add a status)
      setNewBike('');
    }
  };

  // Update bike status (availability)
  const changeStatus = (id, status) => {
    updateBikeStatus(id, status); // Update the bike status in the context
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name} - Bike Details</Text>

      <FlatList
        data={cityBikes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => changeStatus(item.id, 'available')}>
              <Text style={styles.updateText}>Set Available</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeStatus(item.id, 'under maintenance')}>
              <Text style={styles.updateText}>Set Maintenance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeStatus(item.id, 'not available')}>
              <Text style={styles.updateText}>Set Not Available</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0EA5E9',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  updateText: {
    color: 'green',
    marginRight: 10,
  },
});
