import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MaintenanceTips = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.tip}>1. Clean Your Bike Regularly</Text>
        <Text style={styles.tipDescription}>
          Keep your bike clean to prevent dirt and grime from affecting its performance.
        </Text>

        <Text style={styles.tip}>2. Lubricate the Chain</Text>
        <Text style={styles.tipDescription}>
          Regularly lubricate your bike chain to keep it running smoothly.
        </Text>

        <Text style={styles.tip}>3. Check Tire Pressure</Text>
        <Text style={styles.tipDescription}>
          Ensure your tires are properly inflated to avoid flats and ensure optimal performance.
        </Text>

        {/* Add more maintenance tips */}
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

export default MaintenanceTips;
