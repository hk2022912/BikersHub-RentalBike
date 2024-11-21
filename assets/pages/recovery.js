import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();

  // Function to generate a random OTP (6 digits)
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to send OTP to email (this is a mock function, replace with API call)
  const sendOtpToEmail = (email) => {
    const otp = generateOtp();
    setGeneratedOtp(otp); // Save the OTP for later verification
    
    // Simulate sending OTP via email
    // Here you would typically make an API call to your backend service to send the OTP email
    // For example, axios.post('api/send-otp', { email, otp });

    console.log(`Sending OTP ${otp} to email: ${email}`); // This simulates sending the OTP to the email
    setOtpSent(true); // Update the state to indicate OTP is sent
  };

  // Function to verify the OTP entered by the user
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert('Success', 'OTP verified successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  // Function to handle the verify email action
  const handleVerify = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // Call the send OTP function
    sendOtpToEmail(email);
    Alert.alert('Success', `An OTP has been sent to ${email}.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../img/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Forgot Password?</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>
          Please enter the email address associated with your account.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {!otpSent ? (
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        ) : (
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
