import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AdminLogin({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = () => {
    // Basic validation (add more logic as necessary)
    if (username === 'bikershub' && password === 'bikershub123') {
      // If login is successful, navigate to the dashboard
      navigation.navigate('AdminDashboard');
    } else {
      Alert.alert('Invalid credentials', 'Please check your username and password');
    }
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('../img/logo.png')} style={styles.bannerImage} />
      <Text style={styles.title}>Admin Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle the secureTextEntry based on state
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)} // Toggle password visibility
        >
          <Text style={styles.eyeIconText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  bannerImage: {
    width: '63%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative', // Position the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  eyeIconText: {
    color: '#0EA5E9',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0EA5E9',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});