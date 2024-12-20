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

  return (
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

        <Text style={styles.slogan}>Laag everywhere with BikersHub</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});

export default Profile;
