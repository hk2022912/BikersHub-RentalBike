import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function BikeDetails({ route }) {
  const { bike } = route.params;
  const fadeAnim = useState(new Animated.Value(0))[0];

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRentNow = () => {
    const calculatedAmount = parseFloat(hours) * bike.price;
    setTotalAmount(calculatedAmount.toFixed(2));
    setModalVisible(false);
    setPaymentModalVisible(true);
  };

  const handlePaymentCompletion = () => {
    setPaymentModalVisible(false);
    setReceiptModalVisible(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch("http://10.0.0.66:3001/api/confirmRent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bikeName: bike.name,
          hours: hours,
          totalAmount: totalAmount,
          date: date,
          time: time,
          paymentMethod: paymentMethod,
        }),
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to confirm the order. Status: ${response.status}`);
      }
  
      // Log the response as text first
      const responseText = await response.text();
      console.log('Response Text:', responseText);
  
      // Try to parse the response as JSON
      const responseBody = JSON.parse(responseText);
      console.log('Response Body:', responseBody);
  
      // If successful, handle the response
      alert("Order successfully confirmed!");
      setReceiptModalVisible(false);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("There was an error confirming your order. Please try again.");
    }
  };
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={bike.imageUrl} style={styles.bikeImage} />
        <Text style={styles.bikeType}>{bike.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₱{bike.price}/hour</Text>
        </View>

        <Animated.View style={[styles.overviewContainer, { opacity: fadeAnim }]}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{bike.description}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.rentButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.rentButtonText}>RENT NOW</Text>
        </TouchableOpacity>

        {/* Rental Details Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer1}>
              <Text style={styles.modalTitle}>Rent Bike</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter hours"
                keyboardType="numeric"
                value={hours}
                onChangeText={setHours}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter date (e.g., 2025-01-10)"
                value={date}
                onChangeText={setDate}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter time (e.g., 14:30)"
                value={time}
                onChangeText={setTime}
              />
              <View style={styles.nextButton}>
                <Button title="Next" color='#4CAF50' onPress={handleRentNow} />
                </View>
                <View style={styles.cancelButton}>
                  <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                </View>

            </View>
          </View>
        </Modal>

        {/* Payment Method Modal */}
        <Modal
          visible={paymentModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose Payment Method</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("PayMaya");
                  handlePaymentCompletion();
                }}
              >
                <Text style={styles.modalOptionText}>PayMaya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("GCash");
                  handlePaymentCompletion();
                }}
              >
                <Text style={styles.modalOptionText}>GCash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("GoTyme");
                  handlePaymentCompletion();
                }}
              >
                <Text style={styles.modalOptionText}>GoTyme</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Receipt/Confirmation Modal */}
        <Modal
          visible={receiptModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setReceiptModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer3}>
              <Text style={styles.modalTitle}>Receipt</Text>
              <Text style={styles.receiptText}>Total Amount: ₱{totalAmount}</Text>
              <Text style={styles.receiptText}>Date: {date}</Text>
              <Text style={styles.receiptText}>Time: {time}</Text>
              <Text style={styles.receiptText}>Payment Method: {paymentMethod}</Text>
              <TouchableOpacity
                style={styles.confirmOrderButton}
                onPress={handleConfirmOrder}
              >
                <Text style={styles.confirmOrderText}>Confirm Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setReceiptModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal
          visible={successModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer2}>
              <Text style={styles.modalTitle}>Success</Text>
              <Text style={styles.successMessage}>You successfully rented the bike!</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setSuccessModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bikeImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    resizeMode: "cover",
    marginBottom: 20,
  },
  bikeType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: "#f1c40f",
    width: "50%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  overviewContainer: {
    marginBottom: 30,
    width: "100%",
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  overviewText: {
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  renterContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  renterImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  renterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  renterTextContainer: {
    justifyContent: "center",
  },
  renterName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  renterTitle: {
    fontSize: 14,
    color: "#777",
  },
  rentButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  rentButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: 290,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContainer1: {
    width: "90%",
    height: 340,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContainer2: {
    width: "90%",
    height: 230,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContainer3: {
    width: "90%",
    height: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    width: '90%',
    height: 50,
    marginLeft: 20,
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    width: '100%',
    height: 50,
    marginTop: 10,
  }, 
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOption: {
    padding: 15,
    backgroundColor: "#3498db",
    marginBottom: 10,
    borderRadius: 5,
  },
  modalOptionText: {
    color: "#fff",
    fontSize: 18,
  },
  modalCloseButton: {
    padding: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 5,
    marginTop: 10,
    height: 55,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
  },
  modalNextButton: {
    padding: 15,
    backgroundColor: "#2ecc71",
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalNextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },  
  receiptText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  confirmOrderButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  confirmOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },  
});