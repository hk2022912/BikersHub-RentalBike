// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarCard = ({ image, title, description, price, discount }) => {
  return (
    <View style={styles.carCard}>
      <Image source={image} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{title}</Text>
        <Text style={styles.carDescription}>{description}</Text>
        <Text style={styles.carPrice}>₱ {price} - per day</Text>
        <Text style={styles.carDiscount}>{discount}</Text>
        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const hotDeals = [
    {
      id: '1',
      image: require('../img/logo.png'),
      title: 'Honda Amaze',
      description: 'Manual / Automatic',
      price: '80.00',
      discount: '30% Off',
    },
    {
      id: '2',
      image: require('../img/logo.png'),
      title: 'Toyota Innova Crysta',
      description: 'Automatic',
      price: '80.00',
      discount: '20% Off',
    },
    {
      id: '3',
      image: require('../img/logo.png'),
      title: 'Suzuki Swift',
      description: 'Manual',
      price: '100.00',
      discount: '25% Off',
    },
    {
      id: '4',
      image: require('../img/logo.png'),
      title: 'Hyundai Creta',
      description: 'Automatic',
      price: '50.00',
      discount: '15% Off',
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
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notification')} // Navigate to Notification page
          >
            <Ionicons name="notifications" size={24} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Profile')} // Navigate to the Profile page
            >
              <Image source={require('../img/logo.png')} style={styles.avatar} />
            </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Ride With Offers Section */}
      <View style={styles.offerContainer}>
        <Image source={require('../img/sales.jpg')} style={styles.bannerImage} />
      </View>


     {/* Our Services Section */}
<View style={styles.servicesContainer}>
  <Text style={styles.sectionTitle}>Our Services</Text>
  <View style={styles.servicesRow}>
    <TouchableOpacity style={styles.serviceItem}>
      <Text style={styles.serviceText}>City Bike</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.serviceItem}>
      <Text style={styles.serviceText}>Mountain Bike</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.serviceItem}>
      <Text style={styles.serviceText}>Hybrid Bike</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.serviceItem}>
      <Text style={styles.serviceText}>Accessories</Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Hot Deals Section */}
<View style={styles.hotDealsContainer}>
  <Text style={styles.sectionTitle}>Hot Deals</Text>
  <View style={styles.cardGrid}>
    {hotDeals.map(deal => (
      <CarCard
        key={deal.id}
        image={deal.image}
        title={deal.title}
        description={deal.description}
        price={deal.price}
        discount={deal.discount}
      />
    ))}
  </View>
</View>

      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Rent')}>
          <Ionicons name="bicycle-outline" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map-outline" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Tips')}>
          <Ionicons name="bulb-outline" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Guides')}>
          <Ionicons name="book-outline" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Guides</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  logoImage: { width: 40, height: 20 },
  rightIcons: { flexDirection: 'row' },
  iconButton: { marginHorizontal: 5 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  
  offerContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
},
bannerImage: {
    width: '100%',       // Adds some padding on the sides
    height: 200,        // Set a fixed height for the banner to ensure it is displayed correctly
    borderRadius: 10,
},


  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  servicesContainer: { marginBottom: 20 },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


servicesContainer: {
  marginBottom: 80,
},
servicesRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
},

serviceItem: {
  backgroundColor: '#f0f0f0',       // Light gray background for button appearance
  paddingVertical: 15,              // Increased vertical padding for a larger button
  borderRadius: 10,                 // Rounded corners for button appearance
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,                          // Allows flexible width to span across
  marginHorizontal: 5,              // Space between buttons
  marginVertical: 5,                // Space above and below each button
  minWidth: '40%',                  // Minimum width to ensure consistent size
  maxWidth: '48%',                  // Maximum width to prevent oversizing
  elevation: 2,                     // Shadow effect on Android
  shadowColor: '#000',              // Shadow properties for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
},
serviceText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',                    // Text color for readability
  textAlign: 'center',              // Center-align text inside button
},

  hotDealsContainer: { paddingVertical: 10 },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '48%',
    marginTop: 10,
    overflow: 'hidden',
    elevation: 5,
    paddingBottom: 5,
    paddingTop: 10,
  },

carImage: {
  width: '100%',
  height: 140,
  resizeMode: 'cover', // Ensures the image scales proportionally
},

  carInfo: { padding: 10 },
  carTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  carDescription: { fontSize: 12, color: '#6c6c6c', marginBottom: 5 },
  
  carPrice: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  
  
  carDiscount: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#28a745',
    padding: 3,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  rentButton: {
    paddingVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  rentButtonText: { color: '#fff', fontSize: 14 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#007BFF' },
});
