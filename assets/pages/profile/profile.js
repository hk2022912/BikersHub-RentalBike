<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = (route) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const [rentalInfo, setRentalInfo] = useState({
    currentRental: '',
    totalRented: 0,
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedRental = await AsyncStorage.getItem('rentalInfo');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData((prev) => ({ ...prev, name: parsedUser.fullName, email: parsedUser.email }));
        }

        if (storedRental) {
          const parsedRental = JSON.parse(storedRental);
          setRentalInfo({
            currentRental: parsedRental.currentRental || 'No current rental',
            totalRented: parsedRental.totalRented || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        fullName: userData.name,
        email: userData.email,
      }));
      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditable(false);
    } catch (error) {
      console.error('Error saving data:', error);
=======
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Import the icons

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(require('../../img/profileicon.png'));
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const { fullName, email } = JSON.parse(userData);
        setName(fullName);
        setEmail(email);
      }
    };

    fetchUserData();
  }, []);

  const saveProfile = async () => {
    try {
      const updatedUserData = JSON.stringify({
        fullName: name,
        email,
        phoneNumber,
      });
      await AsyncStorage.setItem('user', updatedUserData);
      setIsEditing(false);
      Alert.alert('Profile Updated', 'Your changes have been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile changes.');
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const changeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to enable permissions to access photos.');
      return;
>>>>>>> origin/master
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      Alert.alert('Logged Out', 'You have been logged out.', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const resetAvatar = () => {
    setAvatar(require('../../img/6.jpg'));
    Alert.alert('Avatar Reset', 'Your avatar has been reset to default.');
  };

  const Logout = () => {
    AsyncStorage.removeItem('user') // Clear user data
      .then(() => {
        setModalVisible(false);
        navigation.replace('Login'); // Navigate to the login screen
      })
      .catch(() => Alert.alert('Error', 'Failed to log out.'));
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profilePhotoSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profilePhoto}
          />
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            placeholder="Full Name"
            editable={isEditable}
            onChangeText={(text) => setUserData((prev) => ({ ...prev, name: text }))}
          />
          <TextInput
            style={styles.input}
            value={userData.email}
            placeholder="Email Address"
            editable={isEditable}
            onChangeText={(text) => setUserData((prev) => ({ ...prev, email: text }))}
          />
        </View>
=======
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.avatarRow}>
          <TouchableOpacity onPress={changeAvatar}>
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Hello, {name}!</Text>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.nonEditable]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
>>>>>>> origin/master

        <Text style={styles.slogan}>Laag everywhere with BikersHub</Text>

<<<<<<< HEAD
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => (isEditable ? handleSave() : setIsEditable(true))}
        >
          <Text style={styles.buttonText}>{isEditable ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
=======
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.nonEditable]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={isEditing}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={toggleEdit}>
          <MaterialCommunityIcons
            name={isEditing ? 'content-save' : 'pencil'}
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogout} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={Logout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
>>>>>>> origin/master
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100, // Add padding at the bottom to make room for the buttons
  },
  slogan: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00796B',
    marginTop: 20,
    marginBottom: 30, // Adjusted space between the input and slogan
    textAlign: 'center',
  },
  profilePhotoSection: {
    alignItems: 'center',
    marginBottom: 20,
=======
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  avatarRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 150,
    borderRadius: 50,
    marginBottom: 15,
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> origin/master
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoText: {
    marginTop: 10,
    color: '#FF6F00',
    fontWeight: '600',
  },
  sectionContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
<<<<<<< HEAD
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
=======
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  editable: {
    backgroundColor: '#f9f9f9',
  },
  nonEditable: {
    backgroundColor: '#f1f1f1',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 150,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text in a row
    justifyContent: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 150,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text in a row
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonConfirm: {
    backgroundColor: '#FF4D4D',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
>>>>>>> origin/master
  },
});

export default Profile;