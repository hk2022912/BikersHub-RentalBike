import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [avatar, setAvatar] = useState(require('../../img/6.jpg')); // Default image
  const [isEditing, setIsEditing] = useState(false);

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save the profile changes
  const saveProfile = () => {
    setIsEditing(false);
  };

  // Logout function
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Change avatar image
  const changeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to enable permissions to access photos.");
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Avatar and Welcome Message */}
        <View style={styles.avatarRow}>
          <TouchableOpacity onPress={changeAvatar}>
            <Image
              source={avatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Hello, {name}!</Text>
        </View>

        {/* Editable fields */}
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

        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={[styles.input, isEditing ? styles.editable : styles.nonEditable]}
          value={phone}
          onChangeText={setPhone}
          editable={isEditing}
          keyboardType="phone-pad"
        />
      </View>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={isEditing ? saveProfile : toggleEdit}>
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Subtle off-white background
  },
  content: {
    flex: 1,
    top: 30,
    padding: 20,
    alignItems: 'center', // Center all items
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 140,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#007BFF',
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    fontSize: 16,
    padding: 12,
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editable: {
    backgroundColor: '#f9f9f9', // Lighter input when editable
  },
  nonEditable: {
    backgroundColor: '#f0f0f0', // Grayed-out background when non-editable
  },
  buttonContainer: {
    justifyContent: 'flex-end', 
    paddingBottom: 20, 
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 10,
    width: '70%',
    opacity: 0.9, // Slightly transparent for a modern feel
    alignSelf: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Red for logout
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
