import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
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
        const { fullName, email, phoneNumber } = JSON.parse(userData);
        setName(fullName);
        setEmail(email);
        setPhoneNumber(phoneNumber || '');
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

  const confirmLogout = async () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  const changeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to enable permissions to access photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar({ uri: result.uri });
    }
  };

  const resetAvatar = () => {
    setAvatar(require('../../img/6.jpg'));
    Alert.alert('Avatar Reset', 'Your avatar has been reset to default.');
  };

  return (
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

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.nonEditable]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          keyboardType="email-address"
        />

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
                onPress={confirmLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  label: {
    fontSize: 16,
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
  },
});

export default Profile;
