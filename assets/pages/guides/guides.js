import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons icon set

const Guide = ({ navigation }) => {
  const tutorials = [
    {
      title: 'Wheels',
      description: 'Learn how to maintain and replace wheels',
      icon: require('../../img/6.jpg'), // Update this to the correct path for your image
      screen: 'Wheels', // Add the corresponding screen name for navigation
    },
    {
      title: 'Handlebars',
      description: 'Discover how to adjust and replace handlebars',
      icon: require('../../img/6.jpg'), // Replace with actual image path if different
      screen: 'Handlebars', // Corresponding screen for handlebars
    },
    {
      title: 'Brakes',
      description: 'Troubleshooting common brake issues',
      icon: require('../../img/6.jpg'), // Replace with actual image path if different
      screen: 'Brakes', // Corresponding screen for brakes
    },
    // Add more tutorials as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tutorials List */}
      <View style={styles.tutorialsList}>
        {tutorials.map((tutorial, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(tutorial.screen)}>
            <View style={styles.tutorialItem}>
              {/* Tutorial image */}
              <Image source={tutorial.icon} style={styles.tutorialIcon} />
              <View style={styles.tutorialInfo}>
                <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                <Text style={styles.tutorialDescription}>{tutorial.description}</Text>
              </View>
              {/* Chevron-right icon */}
              <Icon name="chevron-forward" size={20} color="#333" style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures content grows and fills the screen
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  tutorialsList: {
    flex: 1,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // Reduced padding
    borderBottomWidth: 0, // No bottom border line
    marginBottom: 0, // No bottom margin
  },
  tutorialIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  tutorialInfo: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tutorialDescription: {
    fontSize: 14,
    color: '#666',
  },
  rightArrow: {
    marginLeft: 10, // Adjust the spacing as needed
  },
});

export default Guide;
