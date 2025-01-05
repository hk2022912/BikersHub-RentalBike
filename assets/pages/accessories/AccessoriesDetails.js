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
      const response = await fetch('http://10.0.0.66:3001/api/confirm-order', {
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
      <TouchableOpacity style={styles.addToCartButton} onPress={() => toggleModal('quantity', true)}>
        <Text style={styles.addToCartButtonText}>ORDER NOW</Text>
      </TouchableOpacity>

      {/* Quantity Modal */}
      <Modal visible={modals.quantity} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Choose Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setCart((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cart.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }))}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => proceedToNext('quantity', 'payment')}>
              <Text style={styles.primaryButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal('quantity', false)}>
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
                }}
              >
                <Text style={styles.optionButtonText}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal('payment', false)}>
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
              onChangeText={(text) => setShippingInfo((prev) => ({ ...prev, fullName: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Barangay"
              value={shippingInfo.barangay}
              onChangeText={(text) => setShippingInfo((prev) => ({ ...prev, barangay: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={shippingInfo.street}
              onChangeText={(text) => setShippingInfo((prev) => ({ ...prev, street: text }))}
            />
            <TouchableOpacity style={styles.primaryButton} onPress={() => proceedToNext('shipping', 'checkout')}>
              <Text style={styles.primaryButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal('shipping', false)}>
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
                <Text style={styles.detailLabel}>Accessory:</Text> {accessory.name}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Quantity:</Text> {cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Total Price:</Text> ₱{accessory.price * cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Payment Method:</Text> {paymentMethod}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Shipping Address:</Text>
              </Text>
              <Text style={styles.detailText}>Full Name: {shippingInfo.fullName}</Text>
              <Text style={styles.detailText}>Barangay: {shippingInfo.barangay}</Text>
              <Text style={styles.detailText}>Street: {shippingInfo.street}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.primaryButton} onPress={handleConfirmOrder}>
              <Text style={styles.primaryButtonText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal('checkout', false)}>
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
            <TouchableOpacity style={styles.primaryButton} onPress={handleBackToHome}>
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  accessoryImage: { width: '100%', height: 250, resizeMode: 'cover' },
  accessoryName: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  accessoryPrice: { fontSize: 20, color: '#0288d1', marginBottom: 10 },
  accessoryDescriptionContainer: { marginBottom: 15 },
  accessoryDescription: { fontSize: 16, lineHeight: 22 },
  renterContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  renterImage: { width: 50, height: 50, borderRadius: 25 },
  renterTextContainer: { marginLeft: 10 },
  renterName: { fontSize: 18, fontWeight: 'bold' },
  renterTitle: { fontSize: 14, color: 'gray' },
  contactInfoContainer: { marginTop: 20 },
  contactInfoText: { fontSize: 16 },
  renterIconsContainer: { flexDirection: 'row', marginTop: 10 },
  iconWrapper: { marginHorizontal: 10 },
  addToCartButton: { backgroundColor: '#0288d1', padding: 15, marginTop: 30, borderRadius: 5 },
  addToCartButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  quantityContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  quantityButton: { padding: 10, backgroundColor: '#0288d1', borderRadius: 5 },
  quantityButtonText: { color: '#fff', fontSize: 20 },
  quantityText: { fontSize: 20, marginHorizontal: 20 },
  primaryButton: { backgroundColor: '#0288d1', padding: 15, borderRadius: 5, marginTop: 20 },
  primaryButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  secondaryButton: { backgroundColor: '#f44336', padding: 15, borderRadius: 5, marginTop: 10 },
  secondaryButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  optionButton: { backgroundColor: '#0288d1', padding: 15, borderRadius: 5, marginTop: 10 },
  optionButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 10, fontSize: 18, padding: 5 },
  successText: { fontSize: 24, fontWeight: 'bold', color: '#4caf50' },
  detailText: { fontSize: 16, marginVertical: 5 },
  detailLabel: { fontWeight: 'bold' },
});

export default AccessoriesDetails;
