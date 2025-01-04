import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

const AccessoriesDetails = ({ route, navigation }) => {
  const { accessory } = route.params;
  const [cart, setCart] = useState({ quantity: 1 });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', barangay: '', street: '' });
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

  const handleConfirmOrder = () => {
    if (!paymentMethod || !shippingInfo.fullName || !shippingInfo.barangay || !shippingInfo.street) {
      Alert.alert('Error', 'Please fill out all details before proceeding.');
      return;
    }
    toggleModal('checkout', false);
    toggleModal('success', true);
  };

  return (
    <View style={styles.container}>
      <Image source={accessory.imageUrl} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{accessory.name}</Text>
      <Text style={styles.accessoryPrice}>₱{accessory.price}</Text>
      <Text style={styles.itemDescription}>{accessory.description}</Text>


      {/* Company Name */}
      <Text style={styles.companyName}>BIKERSHUB</Text>

      {/* Contact Details Section */}
      <View style={styles.contactDetailsContainer}>
        <TouchableOpacity style={styles.contactIcon}>
          <MaterialIcons name="email" size={30} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactIcon}>
          <FontAwesome name="phone" size={30} color="#2ecc71" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactIcon}>
          <Entypo name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => toggleModal('quantity', true)}
      >
        <Text style={styles.orderButtonText}>ORDER NOW</Text>
      </TouchableOpacity>

      {/* Quantity Modal */}
      <Modal visible={modals.quantity} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setCart({ quantity: Math.max(1, cart.quantity - 1) })}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cart.quantity}</Text>
              <TouchableOpacity onPress={() => setCart({ quantity: cart.quantity + 1 })}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalNextButton}
              onPress={() => proceedToNext('quantity', 'payment')}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method Modal */}
      <Modal visible={modals.payment} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'Gcash' && styles.selectedOption,
              ]}
              onPress={() => setPaymentMethod('Gcash')}
            >
              <Text style={styles.paymentText}>Gcash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'Cash on Delivery' && styles.selectedOption,
              ]}
              onPress={() => setPaymentMethod('Cash on Delivery')}
            >
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalNextButton}
              onPress={() => proceedToNext('payment', 'shipping')}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Shipping Info Modal */}
      <Modal visible={modals.shipping} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Shipping Information</Text>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={shippingInfo.fullName}
              onChangeText={(text) => setShippingInfo({ ...shippingInfo, fullName: text })}
            />
            <TextInput
              placeholder="Barangay"
              style={styles.input}
              value={shippingInfo.barangay}
              onChangeText={(text) => setShippingInfo({ ...shippingInfo, barangay: text })}
            />
            <TextInput
              placeholder="Street"
              style={styles.input}
              value={shippingInfo.street}
              onChangeText={(text) => setShippingInfo({ ...shippingInfo, street: text })}
            />
            <TouchableOpacity
              style={styles.modalNextButton}
              onPress={() => proceedToNext('shipping', 'checkout')}
            >
              <Text style={styles.modalButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal visible={modals.checkout} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Your Order</Text>
            <Text>Accessory: {accessory.name}</Text>
            <Text>Quantity: {cart.quantity}</Text>
            <Text>Payment Method: {paymentMethod}</Text>
            <Text>Shipping Address: {`${shippingInfo.street}, ${shippingInfo.barangay}`}</Text>
            <View style={styles.buttonContainer}>
              {/* Confirm Button */}
              <TouchableOpacity
                style={styles.modalNextButton}
                onPress={handleConfirmOrder}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => toggleModal('checkout', false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      {/* Success Modal */}
      <Modal visible={modals.success} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Confirmed!</Text>
            <Text>Thank you for your purchase.</Text>
            <TouchableOpacity
              style={styles.modalNextButton}
              onPress={() => toggleModal('success', false)}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  accessoryImage: { width: '100%', height: 200 },
  accessoryName: { fontSize: 18, fontWeight: 'bold', top: 20, },
  accessoryPrice: { fontSize: 16, color: '#3498db', top: 30, },
  itemDescription: { marginVertical: 10, color: '#7f8c8d',top: 40, },
  contactDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
    top: 60,
  },
  contactIcon: { alignItems: 'center', justifyContent: 'center' },
  orderButton: {
    padding: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignItems: 'center',
    top: 70,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    top: 50,
  },
  
  orderButtonText: { color: '#fff', fontWeight: 'bold', },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
    top: 10,
  },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  quantityContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  quantityButton: { fontSize: 20, padding: 10, color: '#34495e' },
  quantityText: { fontSize: 18, marginHorizontal: 20 },
  modalNextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#ecf0f1',
    borderColor: '#3498db',
  },
  paymentText: { fontSize: 16 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalCancelButton: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  modalNextButton: {
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    
  },
  
});

export default AccessoriesDetails;
