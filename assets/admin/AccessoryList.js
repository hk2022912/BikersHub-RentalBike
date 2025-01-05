import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccessoriesContext } from './AccessoriesContext';

export default function AccessoryList() {
  const { accessories, setAccessories } = useContext(AccessoriesContext);
  const [newAccessory, setNewAccessory] = useState('');
  const [newStock, setNewStock] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Load saved data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadAccessories = async () => {
      try {
        const savedAccessories = await AsyncStorage.getItem('accessories');
        if (savedAccessories) {
          setAccessories(JSON.parse(savedAccessories));
        }
      } catch (error) {
        console.error('Failed to load accessories:', error);
      }
    };
    loadAccessories();
  }, []);

  // Save accessories to AsyncStorage whenever they change
  useEffect(() => {
    const saveAccessories = async () => {
      try {
        await AsyncStorage.setItem('accessories', JSON.stringify(accessories));
      } catch (error) {
        console.error('Failed to save accessories:', error);
      }
    };
    saveAccessories();
  }, [accessories]);

  const addAccessory = () => {
    if (newAccessory.trim() && newStock) {
      setAccessories([...accessories, { id: Date.now(), name: newAccessory, stock: Number(newStock) }]);
      setNewAccessory('');
      setNewStock('');
    } else {
      Alert.alert('Error', 'Please enter a valid accessory name and stock.');
    }
  };

  const editAccessory = () => {
    if (newAccessory.trim() && newStock) {
      const updatedAccessories = accessories.map((item) =>
        item.id === editingItem ? { ...item, name: newAccessory, stock: Number(newStock) } : item
      );
      setAccessories(updatedAccessories);
      setNewAccessory('');
      setNewStock('');
      setEditingItem(null);
    } else {
      Alert.alert('Error', 'Please enter a valid accessory name and stock.');
    }
  };

  const deleteAccessory = (id) => {
    setAccessories(accessories.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accessory Manager</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Accessory Name"
          value={newAccessory}
          onChangeText={setNewAccessory}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Stock Quantity"
          value={newStock}
          keyboardType="numeric"
          onChangeText={setNewStock}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          onPress={editingItem ? editAccessory : addAccessory}
          style={[styles.button, editingItem && styles.updateButton]}
        >
          <Text style={styles.buttonText}>{editingItem ? 'Update Accessory' : 'Add Accessory'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={accessories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Stock: {item.stock}</Text>
            </View>
            <View style={styles.itemActions}>
              <TouchableOpacity
                onPress={() => {
                  setEditingItem(item.id);
                  setNewAccessory(item.name);
                  setNewStock(item.stock ? item.stock.toString() : '0');

                }}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteAccessory(item.id)}
                style={styles.actionButton2}
              >
                <Text style={styles.actionText2}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
  
  actionButton2: {
    marginLeft: 10,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText2: {
    color: '#fff',
    fontSize: 14,
  },
});