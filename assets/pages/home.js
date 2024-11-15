import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '../pages/slider'; // Ensure Slider component is correctly implemented

const Home = ({ navigation }) => {
  const sliderItems = [
    {
      image: require('../img/logo.png'),
      title: 'Mountain Bike',
    },
    {
      image: require('../img/6.jpg'),
      title: 'Road Bike',
    },
    {
      image: require('../img/logo.png'),
      title: 'Basta Bike',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../img/logo.png')} style={styles.logoImage} />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../img/6.jpg')} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>HELLO, CYCLIST</Text>

      {/* Top Picks Section */}
      <Text style={styles.sectionPicks}>OUR TOP PICKS</Text>

      {/* Slider Component */}
      <Slider items={sliderItems} />

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <View style={[styles.infoSection, { backgroundColor: '#FFF7CC' }]}>
          <Text style={styles.infoTitle}>Did you know?</Text>
          <Text style={styles.infoText}>
            "A clean chain improves your bike's performance and prolongs its life. Wipe it down with a dry cloth every week."
          </Text>
          <Text style={styles.linkText}>Check Our Maintenance and Safety Tips →</Text>
        </View>
        <View style={[styles.infoSection, { backgroundColor: '#DBEFFF' }]}>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.infoTitle}>BikersHub</Text>
          <Text style={styles.infoText}>BikersHub connects bike enthusiasts with affordable rental options, making cycling accessible to everyone.</Text>
        </View>
      </View>

      {/* Footer */}
      <ScrollView contentContainerStyle={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color="#007BFF" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Rent')}>
        <Ionicons name="bicycle" size={24} color="#007BFF" />
        <Text style={styles.footerText}>Rent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Map')}>
        <Ionicons name="map" size={24} color="#007BFF" />
        <Text style={styles.footerText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Tips')}>
        <Ionicons name="bulb" size={24} color="#007BFF" />
        <Text style={styles.footerText}>Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Guides')}>
        <Ionicons name="book" size={24} color="#007BFF" />
        <Text style={styles.footerText}>Guides</Text>
      </TouchableOpacity>
    </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEFF2',
    marginTop: 20, // Add margin at the top
    marginHorizontal: 10, // Add margin to both sides
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    top: 40,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionPicks: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  infoSection: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    color: '#007BFF',
    marginTop: 3,
  },
  
});

export default Home;
