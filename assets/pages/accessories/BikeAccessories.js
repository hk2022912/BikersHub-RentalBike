import React, { useContext, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Import icon library
import { AccessoriesContext } from '../../admin/AccessoriesContext';

const Accessories = ({ navigation }) => {
  const { accessories } = useContext(AccessoriesContext);
  const [columns, setColumns] = useState(2);  // State to toggle columns

  return (
    <View style={styles.container}>
      <FlatList
        key={columns}  // Key based on number of columns, forcing re-render
        data={accessories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}  // Dynamically set number of columns
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imageUrl} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.itemStock}>Stock: {item.stock}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            {/* Add to Cart Button */}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => navigation.navigate('AccessoriesDetails', { accessory: item })}
            >
              <MaterialCommunityIcons name="cart-plus" size={25} color="FFFF" />
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
    flex: 1,  // Make each item take full width in its column
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',  // Centering content inside the item
  },
  itemImage: {
    width: '100%',  // Ensure image fills the container width
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
  addToCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
});

export default Accessories;
