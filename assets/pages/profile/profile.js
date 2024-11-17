import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* Avatar and Welcome Message */}
      <View style={styles.avatarRow}>
        <TouchableOpacity onPress={changeAvatar}>
          <Image
            source={avatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
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

      {/* Edit/Save Button */}
      <TouchableOpacity style={styles.button} onPress={isEditing ? saveProfile : toggleEdit}>
        <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  
    // Use result.cancelled instead of result.canceled
    if (!result.cancelled) {
      setAvatar({ uri: result.uri });
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  editable: {
    backgroundColor: '#f9f9f9',
  },
  nonEditable: {
    backgroundColor: '#eaeaea',
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
