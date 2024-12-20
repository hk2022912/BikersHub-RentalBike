import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const Accessories = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setModalVisible(true);
  };

  const handleConfirmQuantity = () => {
    if (quantity <= 0) {
      Alert.alert('Invalid Quantity', 'Please select a valid quantity.');
      return;
    }

    const itemInCart = cart.find((cartItem) => cartItem.id === selectedItem.id);

    if (itemInCart) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === selectedItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...selectedItem, quantity }]);
    }

    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleViewCart = () => {
    navigation.navigate('Cart', { cartItems: cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.accessoryCard}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image source={item.imageUrl} style={styles.accessoryImage} />
        <Text style={styles.accessoryName}>{item.name}</Text>
        <Text style={styles.accessoryPrice}>₱{item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
        <Icon name="shopping-cart" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
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
      <TouchableOpacity style={styles.viewCartButton} onPress={handleViewCart}>
        <Icon name="shopping-cart" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityDisplay}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity((prev) => prev + 1)}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmQuantity}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    textAlign: 'center', // Centered the price
    marginVertical: 5,
  },
  listContainer: {
    paddingBottom: 10,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Accessories;
