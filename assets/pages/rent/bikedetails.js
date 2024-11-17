import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, ScrollView, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons"; 

export default function BikeDetails() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // For payment modal
  const [showRentModal, setShowRentModal] = useState(false); // For rent success modal
  const [paymentMethod, setPaymentMethod] = useState("Gcash"); // Track selected payment method
  const fadeAnim = useState(new Animated.Value(0))[0];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setShowTime(false);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();  // Trigger fade-in animation only once when the component mounts
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Bike Image */}
        <Image source={require('../../img/mountainbike.png')} style={styles.bikeImage} />
        <Text style={styles.bikeType}>Mountain Bike</Text>

        {/* Date, Time Picker, and Price Section */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={() => setShowDate(true)} style={styles.iconButton}>
            <MaterialIcons name="calendar-today" size={30} color="#3498db" />
            {date && (
              <Text style={styles.dateTimeText}>{date.toLocaleDateString()}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTime(true)} style={styles.iconButton}>
            <MaterialIcons name="access-time" size={30} color="#3498db" />
            {time && (
              <Text style={styles.dateTimeText}>{time.toLocaleTimeString()}</Text>
            )}
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.price}>₱50</Text>
          </View>
        </View>

        {/* Show DateTimePicker only if visible */}
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onDateChange}
          />
        )}
        {showTime && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            onChange={onTimeChange}
          />
        )}

        {/* Overview Section */}
        <Animated.View style={[styles.overviewContainer, { opacity: fadeAnim }]}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>
            This is a sturdy mountain bike perfect for off-road trails and outdoor adventures. It offers a smooth ride on rugged terrain.
          </Text>
        </Animated.View>

        {/* Payment Section */}
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Payment Method</Text>
          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => setShowPaymentModal(true)} // Show payment modal
          >
            <Text style={styles.paymentButtonText}>{paymentMethod}</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Payment Modal */}
        <Modal
          visible={showPaymentModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose Payment Method</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("PayMaya");
                  setShowPaymentModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>PayMaya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("GCash");
                  setShowPaymentModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>GCash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("COD");
                  setShowPaymentModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>COD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setPaymentMethod("GotoMe");
                  setShowPaymentModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>GotoMe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Renter Details */}
        <View style={styles.renterContainer}>
          <View style={styles.renterImageContainer}>
            <Image source={require('../../img/6.jpg')} style={styles.renterImage} />
          </View>
          <View style={styles.renterTextContainer}>
            <Text style={styles.renterName}>Sooftware Eng</Text>
            <Text style={styles.renterTitle}>Owner</Text>
          </View>
        </View>

        {/* Rent Now Button */}
        <TouchableOpacity 
          style={styles.rentButton}
          onPress={() => setShowRentModal(true)} // Show rent success modal when clicked
        >
          <Text style={styles.rentButtonText}>RENT NOW</Text>
        </TouchableOpacity>

        {/* Rent Success Modal */}
        <Modal
          visible={showRentModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowRentModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.successModalContainer}>
              <MaterialIcons name="check-circle" size={80} color="#2ecc71" />
              <Text style={styles.successTitle}>Congratulations!</Text>
              <Text style={styles.successMessage}>Your rent has been successfully confirmed. Enjoy your ride!</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowRentModal(false)}
              >
                <Text style={styles.modalCloseText}>OK</Text>
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
    width: "80%",
    height: 250,
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
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 30,
    width: "100%",
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  dateTimeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  priceContainer: {
    backgroundColor: "#f1c40f", // Yellow background
    width: "20%", // Adjust width as needed
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
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
    color: "#666",
    marginTop: 10,
  },
  paymentContainer: {
  
    width: "100%",
  },
  paymentTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333",
  },
  paymentMethodButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 10,
    marginTop: 10,
  },
  paymentButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3498db",
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  modalOptionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
  },
  renterContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  renterImageContainer: {
    marginRight: 20,
  },
  renterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  renterTextContainer: {
    justifyContent: "center",
  },
  renterName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  renterTitle: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  rentButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 40,
    width: '100%',
  },
  rentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    
  },
  successModalContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2ecc71",
    marginTop: 10,
  },
  successMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
  },
});
