import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SafetyTips = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.tip}>1. Wear a Helmet</Text>
        <Text style={styles.tipDescription}>
          Always wear a helmet to protect your head in case of an accident.
        </Text>

        <Text style={styles.tip}>2. Check Your Bike</Text>
        <Text style={styles.tipDescription}>
          Ensure your bike is in good condition before riding—check brakes, tires, and other safety features.
        </Text>

        <Text style={styles.tip}>3. Use Hand Signals</Text>
        <Text style={styles.tipDescription}>
          Signal your turns to ensure other riders and drivers know your intentions.
        </Text>

        {/* Add more safety tips */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tip: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tipDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SafetyTips;
