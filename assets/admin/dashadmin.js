import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-250)).current; // Sidebar animation

  // Toggle Dark Mode
  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  // Toggle Sidebar
  const toggleSidebar = useCallback(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    setSidebarVisible((prev) => !prev);
  }, [sidebarVisible, sidebarAnim]);

  // Sidebar opacity transition
  const sidebarOpacity = sidebarAnim.interpolate({
    inputRange: [-250, 0],
    outputRange: [0, 1], // Sidebar fades in or out
  });

  const handleLogout = () => {
    console.log('User logged out');
    navigation.navigate('LogRes');
  };

  const styles = createStyles(darkMode);

  return (
    <View style={styles.container}>
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.hamburgerIcon}>
        <Ionicons name="menu" size={30} color={darkMode ? '#fff' : '#333'} />
      </TouchableOpacity>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnim }], opacity: sidebarOpacity },
        ]}
      >
        <Text style={styles.sidebarTitle}>Menu</Text>
        <SidebarButton icon="home" label="Dashboard" onPress={toggleSidebar} styles={styles} />
        <View style={styles.sidebarItem}>
          <Text style={styles.sidebarText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ true: '#4A90E2', false: '#CCC' }}
            thumbColor={darkMode ? '#fff' : '#4A90E2'}
          />
        </View>
        <SidebarButton
          icon="bicycle"
          label="Manage Bikes"
          onPress={() => navigation.navigate('BikeList')}
          styles={styles}
        />
        <SidebarButton
          icon="shirt"
          label="Manage Accessories"
          onPress={() => navigation.navigate('AccessoryList')}
          styles={styles}
        />
        <SidebarButton
          icon="log-out"
          label="Logout"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          styles={styles}
        />
      </Animated.View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Logo and Header */}
        <Image source={require('../img/logo.png')} style={styles.bannerImage} />
        <Text style={styles.greeting}>Welcome, Admin!</Text>

        {/* Stats Section */}
        <StatsCards styles={styles} />

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BikeList')}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="bicycle" size={40} color="#fff" />
              </View>
              <Text style={styles.cardText}>Manage Bikes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('AccessoryList')}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="shirt" size={40} color="#fff" />
              </View>
              <Text style={styles.cardText}>Manage Accessories</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// SidebarButton Component
const SidebarButton = ({ icon, label, onPress, buttonStyle, styles }) => (
  <TouchableOpacity onPress={onPress} style={[styles.sidebarItem, buttonStyle]}>
    <Ionicons name={icon} size={20} color={styles.iconColor.color} />
    <Text style={styles.sidebarText}>{label}</Text>
  </TouchableOpacity>
);

// StatsCards Component
const StatsCards = ({ styles }) => {
  const statsData = [
    { icon: 'bicycle', label: 'Active Bikes', value: '120' },
    { icon: 'people', label: 'Total Users', value: '850' },
    { icon: 'cash', label: 'Revenue', value: '$12,430' },
  ];

  return (
    <View style={styles.statsContainer}>
      {statsData.map((stat, index) => (
        <View style={styles.statCard} key={index}>
          <Ionicons name={stat.icon} size={40} color="#fff" />
          <Text style={styles.statText}>{stat.label}</Text>
          <Text style={styles.statValue}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
};

// Styles
const createStyles = (darkMode) => {
  const iconColor = darkMode ? '#FFF' : '#333';
  return StyleSheet.create({
    // General Styles
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#fff',
    },
    hamburgerIcon: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 2,
    },
    sidebar: {
      width: 250,
      backgroundColor: darkMode ? '#333' : '#f7f7f7',
      padding: 20,
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 2,
      paddingTop: 60,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    sidebarTitle: {
      fontSize: 24,
      color: darkMode ? '#FFF' : '#333',
      fontWeight: '700',
      marginBottom: 20,
    },
    sidebarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: darkMode ? '#444' : '#f0f0f0',
    },
    sidebarText: {
      color: darkMode ? '#FFF' : '#333',
      fontSize: 16,
      marginLeft: 10,
    },
    logoutButton: {
      backgroundColor: '#E53E3E', // Red for logout
    },
    mainContent: {
      flex: 1,
      padding: 20,
      marginTop: 100,
    },
    bannerImage: {
      width: '63%',
      height: 150,
      resizeMode: 'cover',
      marginBottom: 20,
      alignSelf: 'center',
    },
    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: darkMode ? '#FFF' : '#333',
      textAlign: 'center',
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: '#28A745',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    statText: {
      color: '#FFF',
      fontSize: 16,
      marginTop: 10,
    },
    statValue: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: '700',
    },
    quickActionsContainer: {
      width: '100%',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: darkMode ? '#FFF' : '#333',
      marginBottom: 25,
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: '#28A745',
      borderRadius: 10,
      alignItems: 'center',
      paddingVertical: 20,
      marginBottom: 15,
    },
    cardText: {
      color: '#FFF',
      fontSize: 16,
      marginTop: 10,
    },
    cardIcon: {
      marginBottom: 10,
    },
    iconColor: {
      color: iconColor,
    },
  });
};