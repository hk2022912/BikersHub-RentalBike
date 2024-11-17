import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {  // Add navigation prop
  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.png')} style={styles.image} />
      <Text style={styles.title}>BikersHub</Text>
      <Text style={styles.description1}>Everything you need is in one place!</Text>
      <Text style={styles.description2}>Choose your bike and enjoy your riding experience.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Navigate to Login on press
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonR}
        onPress={() => navigation.navigate('Register')} // Navigate to Register on press
      >
        <Text style={styles.buttonTextr}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description1: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description2: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 15,
    width: '80%',
    marginBottom: 10,
  },
  buttonR: {
    backgroundColor: '#fff',
    padding: 10,  // Ensure padding matches Login button
    borderRadius: 15,  // Make border radius match Login button
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,  // Border for Register button
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonTextr: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    
  },
});

export default Welcome;