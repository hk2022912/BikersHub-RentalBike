import React, { useContext, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AccessoriesContext } from '../../admin/AccessoriesContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Accessories = ({ navigation }) => {
  const { accessories } = useContext(AccessoriesContext);
  const [columns, setColumns] = useState(2);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handlePress = (accessory) => {
    navigation.navigate('AccessoriesDetails', { accessory });
  };

  const navigateToCart = () => {
    navigation.navigate('Cart', { cartItems });
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={columns}
        data={accessories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
            <Image source={item.imageUrl} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
            <Text style={styles.itemStock}>Stock: {item.stock}</Text>

            <TouchableOpacity onPress={() => addToCart(item)} style={styles.iconContainer}>
              <MaterialCommunityIcons name="cart-plus" size={30} color="#007BFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={[styles.iconContainer, styles.cartButton]} onPress={navigateToCart}>
        <MaterialCommunityIcons name="cart" size={40} color="#007BFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
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
  iconContainer: {
    backgroundColor: '#e0f7e9',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cartButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Accessories;