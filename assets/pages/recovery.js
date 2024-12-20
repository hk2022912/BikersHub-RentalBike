import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

<<<<<<< HEAD
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtpToEmail = async (email) => {
    if (!email || !validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    try {
      // Send request to backend to generate and send OTP
      const response = await axios.post('http://10.0.0.66:3001/send-otp', { email });
      if (response.data.success) {
        setOtpSent(true);
        setGeneratedOtp(response.data.otp); // Use OTP from the backend
        Alert.alert('Success', 'OTP sent to your email!');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
=======
  // Function to generate a random OTP (6 digits)
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Function to send OTP to email (this is a mock function, replace with actual API call)
  const sendOtpToEmail = (email) => {
    const otp = generateOtp();
    setGeneratedOtp(otp); // Save the OTP for later verification
    console.log(`Sending OTP ${otp} to email: ${email}`);
    setOtpSent(true); // Update the state to indicate OTP is sent
  };

  // Function to verify the OTP entered by the user
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      Alert.alert('Success', 'OTP verified successfully.', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
>>>>>>> origin/master
    }
  };
  

<<<<<<< HEAD
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://192.168.1.9:3001/verify-otp', { email, otp });
      if (response.data.success) {
        Alert.alert('Success', 'OTP verified successfully!');
        setOtpVerified(true);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
    }
  };
  
  

  const handleChangePassword = async () => {
=======
  // Function to handle password change
  const handleChangePassword = () => {
>>>>>>> origin/master
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both the new password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

<<<<<<< HEAD
    try {
      // Send new password to the backend for saving
      const response = await axios.post('http://192.168.1.9:3001/change-password', {
        email,
        newPassword,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Your password has been changed successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', 'Failed to change password. Please try again later.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password. Please try again later.');
    }
=======
    // Proceed with password change (replace with actual API call)
    Alert.alert('Success', 'Your password has been changed successfully.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
>>>>>>> origin/master
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../img/logo.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>Forgot Password?</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Please enter your email address.</Text>

<<<<<<< HEAD
=======
        {/* Email Entry */}
>>>>>>> origin/master
        {!otpSent && !otpVerified && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={() => sendOtpToEmail(email)}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        )}

<<<<<<< HEAD
=======
        {/* OTP Entry */}
>>>>>>> origin/master
        {otpSent && !otpVerified && (
          <>
            <Text style={styles.subtitle}>Enter the OTP sent to your email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="black"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

<<<<<<< HEAD
=======
        {/* New Password Entry */}
>>>>>>> origin/master
        {otpVerified && (
          <>
            <Text style={styles.subtitle}>Create a new password:</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="black"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoImage: {
    width: 150,
    height: 120,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: '60%',
    marginLeft: 60,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Recovery;
