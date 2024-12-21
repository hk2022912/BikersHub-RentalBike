import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Importing icons

const AccessoriesDetails = ({ route, navigation }) => {
  const { accessory } = route.params;

  const [cart, setCart] = useState({ quantity: 1 });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    barangay: '',
    street: '',
  });
  const [modals, setModals] = useState({
    quantity: false,
    payment: false,
    shipping: false,
    checkout: false,
    success: false,
  });

  const toggleModal = (modalName, value) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  };

  const proceedToNext = (currentModal, nextModal) => {
    toggleModal(currentModal, false);
    toggleModal(nextModal, true);
  };

  const contactSeller = (method) => {
    const contacts = {
      phone: 'tel:+1234567890',
      email: 'mailto:seller@example.com',
      facebook: 'https://www.facebook.com/sellerprofile',
    };
    Linking.openURL(contacts[method]);
  };

  const handleConfirmOrder = async () => {
  const orderDetails = {
    accessoryName: accessory.name,
    quantity: cart.quantity,
    price: accessory.price,
    paymentMethod,
    shippingInfo,
  };

  try {
    const response = await fetch('http://10.0.0.51:3001/api/confirm-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    });

    const result = await response.json();

    if (response.ok) {
      toggleModal('checkout', false);
      toggleModal('success', true);
      console.log(result);
    } else {
      console.error(result.error);
    }
  } catch (error) {
    console.error('Error confirming order:', error);
  }
};


  const handleBackToHome = () => {
    toggleModal('success', false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Accessory image and details */}
      <Image source={accessory.imageUrl} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{accessory.name}</Text>
      <Text style={styles.accessoryPrice}>₱{accessory.price}</Text>

      {/* Description with styled container */}
      <View style={styles.accessoryDescriptionContainer}>
        <Text style={styles.accessoryDescription}>{accessory.description}</Text>
      </View>

      {/* Seller Details Section */}
      <View style={styles.renterContainer}>
        <Image source={require('../../img/logo.png')} style={styles.renterImage} />
        <View style={styles.renterTextContainer}>
          <Text style={styles.renterName}>BikersHub Company</Text>
          <Text style={styles.renterTitle}>Owner of BikersHub</Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactInfoText}>For more inquiries, contact BikersHub:</Text>
        <View style={styles.renterIconsContainer}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => contactSeller('phone')}>
            <MaterialCommunityIcons name="phone" size={30} color="#0288d1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => contactSeller('email')}>
            <MaterialCommunityIcons name="email" size={30} color="#0288d1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => contactSeller('facebook')}>
            <MaterialCommunityIcons name="facebook" size={30} color="#0288d1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Now Button below the renter details */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => toggleModal('quantity', true)}>
        <Text style={styles.addToCartButtonText}>ORDER NOW</Text>
      </TouchableOpacity>

      {/* Modals */}
      {/* Quantity Modal */}
      <Modal visible={modals.quantity} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Choose Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setCart((prev) => ({
                    ...prev,
                    quantity: Math.max(1, prev.quantity - 1),
                  }))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cart.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                }>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => proceedToNext('quantity', 'payment')}>
              <Text style={styles.primaryButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('quantity', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method Modal */}
      <Modal visible={modals.payment} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Select Payment Method</Text>
            {['Gcash', 'PayMaya', 'GoTyme', 'Cash on Delivery'].map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.optionButton}
                onPress={() => {
                  setPaymentMethod(method);
                  proceedToNext('payment', 'shipping');
                }}>
                <Text style={styles.optionButtonText}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('payment', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Shipping Information Modal */}
      <Modal visible={modals.shipping} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Shipping Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={shippingInfo.fullName}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, fullName: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Barangay"
              value={shippingInfo.barangay}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, barangay: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={shippingInfo.street}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, street: text }))
              }
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => proceedToNext('shipping', 'checkout')}>
              <Text style={styles.primaryButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('shipping', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal visible={modals.checkout} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Checkout Details</Text>
            <ScrollView>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Accessory:</Text>{' '}
                {accessory.name}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Quantity:</Text>{' '}
                {cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Total Price:</Text> ₱
                {accessory.price * cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Payment Method:</Text>{' '}
                {paymentMethod}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Shipping Address:</Text>
              </Text>
              <Text style={styles.detailSubText}>
                {shippingInfo.fullName}, {shippingInfo.street},{' '}
                {shippingInfo.barangay}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleConfirmOrder}>
              <Text style={styles.primaryButtonText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('checkout', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={modals.success} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.successText}>Order Confirmed!</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleBackToHome}>
              <Text style={styles.primaryButtonText}>Back to Home</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  accessoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 5,
  
  },
  accessoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  accessoryPrice: {
    fontSize: 20,
    color: '#0288d1',
    marginBottom: 16,
    textAlign: 'center',
  },
  accessoryDescriptionContainer: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 8,
  },
  accessoryDescription: {
    fontSize: 16,
    color: '#333',
  },
  renterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  renterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  renterTextContainer: {
    flex: 1,
  },
  renterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  renterTitle: {
    fontSize: 14,
    color: '#777',
  },
  contactInfoContainer: {
    marginBottom: 16,
    
  },
  contactInfoText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  renterIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center icons horizontally
    alignItems: 'center', // Center icons vertically
    width: '100%', // Ensure the container takes full width
  },
  
  iconWrapper: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 10, // Use horizontal margin for spacing between icons
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    color: '#0288d1',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 18,
    color: '#0288d1',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailSubText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 8,
  },
  quantityButtonText: { color: '#fff', fontSize: 18 },
  quantityText: { fontSize: 24, marginHorizontal: 16, alignSelf: 'center' },
  primaryButton: {
    backgroundColor: '#1b5e20',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // This ensures the text is centered
  },
});

export default AccessoriesDetails;