import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    console.log('Register:', {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    // On successful registration, navigate to Login screen
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
          <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomTextLink}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAEFF2',
  },
  title: {
    fontSize: 26,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
  },
  passwordInput: {
    width: '100%',
    height: 45,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  bottomText: {
    color: '#333',
  },
  bottomTextLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Register;
