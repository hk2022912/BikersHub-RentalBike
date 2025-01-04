import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const styles = createStyles(darkMode);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {darkMode ? 'Good Evening, Admin!' : 'Good Morning, Admin!'}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ true: '#4A90E2', false: '#CCC' }}
            thumbColor={darkMode ? '#fff' : '#4A90E2'}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="bicycle" size={40} color="#fff" />
            <Text style={styles.statText}>Active Bikes</Text>
            <Text style={styles.statValue}>120</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="people" size={40} color="#fff" />
            <Text style={styles.statText}>Total Users</Text>
            <Text style={styles.statValue}>850</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={40} color="#fff" />
            <Text style={styles.statText}>Revenue</Text>
            <Text style={styles.statValue}>$12,430</Text>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BikeList')}
            >
              <Ionicons name="bicycle" size={40} color="#fff" />
              <Text style={styles.cardText}>Manage Bikes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('AccessoryList')}
            >
              <Ionicons name="shirt" size={40} color="#fff" />
              <Text style={styles.cardText}>Manage Accessories</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('UserManagement')}
            >
              <Ionicons name="people" size={40} color="#fff" />
              <Text style={styles.cardText}>Manage Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Analytics')}
            >
              <Ionicons name="stats-chart" size={40} color="#fff" />
              <Text style={styles.cardText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (darkMode) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: darkMode ? '#1E1E1E' : '#F7F7F7',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: darkMode ? '#FFF' : '#333',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginHorizontal: 5,
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
      marginBottom: 10,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    cardText: {
      color: '#FFF',
      fontSize: 16,
      marginTop: 10,
    },
  });
