import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

const CheckoutDetails = ({ route, navigation }) => {
  const { cartItems } = route.params || { cartItems: [] };
  const [modals, setModals] = useState({
    payment: true,
    shipping: false,
    checkout: false,
    success: false,
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    barangay: '',
    street: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const toggleModal = (modalName, isVisible) => {
    setModals((prev) => ({ ...prev, [modalName]: isVisible }));
  };

  const proceedToNext = (currentModal, nextModal) => {
    toggleModal(currentModal, false);
    toggleModal(nextModal, true);
  };

  const handleConfirmOrder = () => {
    toggleModal('checkout', false);
    toggleModal('success', true);
  };

  const handleBackToHome = () => {
    toggleModal('success', false);
    navigation.goBack();
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
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
              onPress={() => navigation.goBack()}>
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
              {cartItems.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Accessory:</Text> {item.name}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Price:</Text> ₱{item.price}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Quantity:</Text> {item.quantity}
                  </Text>
                </View>
              ))}
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Total Price:</Text> ₱{calculateTotalPrice()}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Payment Method:</Text> {paymentMethod}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Shipping Address:</Text>
              </Text>
              <Text style={styles.detailSubText}>
                {shippingInfo.fullName}, {shippingInfo.street}, {shippingInfo.barangay}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleConfirmOrder}>
              <Text style={styles.primaryButtonText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
  },
  secondaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailSubText: {
    fontSize: 14,
    color: '#555',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemRow: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
});

export default CheckoutDetails;