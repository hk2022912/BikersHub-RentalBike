import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";

const AdminRegister = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Perform registration logic here (e.g., API call)
      setModalVisible(true); // Show success modal
    }
  };

  const handleModalOption = () => {
    setModalVisible(false);
    navigation.navigate("Admin"); // Navigate to Admin Panel
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Admin Registration</Text>
        <Text style={styles.subtitle}>Enter Your Information</Text>

        <View style={styles.form}>
          <View style={styles.inputField}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(text) => handleInputChange("name", text)}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={form.password}
                onChangeText={(text) => handleInputChange("password", text)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={togglePasswordVisibility}
              >
                <Image
                  source={
                    showPassword
                      ? require("../img/eyeOpen.png")
                      : require("../img/eyeClose.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={form.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Image
                  source={
                    showConfirmPassword
                      ? require("../img/eyeOpen.png")
                      : require("../img/eyeClose.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Registration completed successfully.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalOption}
            >
              <Text style={styles.modalButtonText}>Proceed to Admin Panel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
  },
  inputField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 45,
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#888",
  },
  buttonSubmit: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AdminRegister;
