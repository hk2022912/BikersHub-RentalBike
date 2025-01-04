import React, { useContext, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Import icon library
import { AccessoriesContext } from '../../admin/AccessoriesContext';

const Accessories = ({ navigation }) => {
  const { accessories } = useContext(AccessoriesContext);
  const [columns, setColumns] = useState(2); // State to toggle columns

  return (
    <View style={styles.container}>
      <FlatList
        key={columns} // Key based on the number of columns, forcing re-render
        data={accessories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns} // Dynamically set number of columns
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imageUrl} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
            <Text style={styles.itemStock}>Stock: {item.stock}</Text>
            

            {/* Navigate to Accessory Details */}
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => navigation.navigate('AccessoriesDetails', { accessory: item })}
            >
              <Text style={styles.payButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f8f8f8' },
  item: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: '#2ecc71',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemStock: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  payButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Accessories;
