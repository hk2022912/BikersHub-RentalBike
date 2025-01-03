import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library for a modern touch

export default function Dashboard({ navigation }) {
  // Create animated value for scaling effect
  const scale = new Animated.Value(1);

  // Function to animate button scaling on press
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Slightly shrink the button
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Reset the button size
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.buttonContainer}>
        {/* Manage Bikes Button */}
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={styles.buttonContent}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => navigation.navigate('BikeList')}
          >
            <Ionicons name="bicycle" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Manage Bikes</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Manage Accessories Button */}
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={styles.buttonContent}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => navigation.navigate('AccessoryList')}
          >
            <Ionicons name="shirt" size={40} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Manage Accessories</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7', // A soft light background for a modern feel
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 40,
    color: '#333', // Dark text for better readability
    textAlign: 'center',
    fontFamily: 'Arial', // Custom font for style
  },
  buttonContainer: {
    width: '100%',
    gap: 20, // Maintain space between buttons
  },
  button: {
    width: 260, // Consistent button width
    height: 200, // Square buttons
    backgroundColor: '#4A90E2', // A unique blue shade to add flair
    borderRadius: 20, // Rounded corners for a smooth effect
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Slight shadow for depth
    marginHorizontal: 'auto', // Center buttons horizontally
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff', // White text for contrast
    marginTop: 10, // Space between the icon and text
    textAlign: 'center',
    fontFamily: 'Arial', // Matching font for text
  },
  icon: {
    marginBottom: 10, // Space between the icon and text
  },
});
