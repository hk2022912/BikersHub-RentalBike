import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Switch, Alert, Image, TextInput, Modal } from 'react-native';
import { useBikeContext } from '../admin/BikeContext';

export default function BikeCategoryDetails({ route }) {
  const { category } = route.params;
  const { cityBikes, addBike, updateBikeStatus, removeBike, updateBikeDetails } = useBikeContext();
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBike, setEditedBike] = useState(null);

  useEffect(() => {
    setRefresh(false); // Reset refresh state on mount
  }, []);

  if (!cityBikes) {
    return <Text>Loading bikes...</Text>;
  }

  // Filter bikes by category if needed, here we assume all bikes belong to the same category
  const bikesInCategory = cityBikes.filter((bike) => bike.status === 'available');

  const toggleAvailability = (bike) => {
    const newStatus = bike.status === 'available' ? 'not available' : 'available';
    updateBikeStatus(bike.id, newStatus);
    setRefresh(!refresh); // Trigger re-render
  };

  const handleDelete = (bikeId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this bike?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            removeBike(bikeId);
            setRefresh(!refresh); // Trigger re-render
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderBike = ({ item }) => (
    <View style={styles.bikeCard}>
      <Image source={item.imageUrl} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>₱{item.price}</Text>
      <Text style={styles.bikeStatus}>
        Status: <Text style={styles.statusText}>{item.status}</Text>
      </Text>
      <Switch
        value={item.status === 'available'}
        onValueChange={() => toggleAvailability(item)}
      />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEdit(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddBike = () => {
    const newBike = {
      id: cityBikes.length + 1, // Temporary unique ID generation
      name: 'New Bike',
      category: category.name, // Use the category passed in params
      status: 'available',
      price: 50,  // Default price
      imageUrl: require('../img/city1.jpg'),  // Default image URL
      description: 'A new bike for category ' + category.name,
    };
    addBike(newBike);
    setRefresh(!refresh); // Trigger re-render
  };

  const handleEdit = (bike) => {
    setEditedBike(bike);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedBike) {
      updateBikeDetails(editedBike.id, editedBike); // Update the bike details
      setIsEditing(false); // Close the modal
      setRefresh(!refresh); // Trigger re-render
    }
  };

  const handleChange = (field, value) => {
    setEditedBike({ ...editedBike, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={cityBikes} // Show all bikes
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBike}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddBike}>
        <Text style={styles.addButtonText}>Add New Bike</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal
        visible={isEditing}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Bike Details</Text>
            <TextInput
              style={styles.input}
              value={editedBike?.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Bike Name"
            />
            <TextInput
              style={styles.input}
              value={editedBike?.price.toString()}
              keyboardType="numeric"
              onChangeText={(text) => handleChange('price', parseFloat(text))}
              placeholder="Price"
            />
            <TextInput
              style={styles.input}
              value={editedBike?.description}
              onChangeText={(text) => handleChange('description', text)}
              placeholder="Description"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  listContainer: {
    paddingBottom: 16,
  },
  bikeCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
  },
  bikeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bikePrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  bikeStatus: {
    fontSize: 16,
    marginVertical: 8,
  },
  statusText: {
    color: '#0EA5E9',
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    marginTop: 12,
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});