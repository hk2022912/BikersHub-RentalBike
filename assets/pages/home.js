import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const bikes = [
    {
      id: '1',
      imageUrl: require('../img/city1.jpg'),
      name: 'Black Velo Sport Bike',
      price: '35',
      description:
        'A sleek and lightweight city bike designed for speed and efficiency, perfect for urban commuting and leisure rides.',
      discount: '20% OFF',
      category: 'City Bike',
    },
    {
      id: '2',
      imageUrl: require('../img/hybrid4.jpg'),
      name: 'Folding Mountain Bike',
      price: '90',
      description:
        'Compact and foldable design, ideal for adventurers seeking portability without compromising performance.',
      discount: '15% OFF',
      category: 'Hybrid Bike',
    },
    {
      id: '3',
      imageUrl: require('../img/mountain3.jpg'),
      name: 'Rockrider ST100',
      price: '95',
      description:
        'Engineered for extreme off-road performance, featuring shock-absorbing suspension for a smoother ride.',
      discount: '25% OFF',
      category: 'Mountain Bike',
    },
    {
      id: '4',
      imageUrl: require('../img/mountain5.jpg'),
      name: 'Marin Bolinas Ridge1',
      price: '85',
      description:
        'Perfect for leisure and commuting, this bike features wide tires for grip and a sturdy frame for lasting durability.',
      discount: '10% OFF',
      category: 'Mountain Bike',
    },
  ];

  // Function to handle navigation to BikeDetails
  const handlePress = (item) => {
    navigation.navigate('BikeDetails', { bike: item });
  };

  // Render individual bike cards
  const renderItem = ({ item }) => (
    <View style={styles.bikeCard}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      <Image source={item.imageUrl} style={styles.bikeImage} />
      <View style={styles.bikeDetails}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikeDescription}>{item.description}</Text>
        <Text style={styles.bikePrice}>₱{item.price}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handlePress(item)}
        >
          <Text style={styles.detailsButtonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../img/logo.png')} style={styles.logoImage} />
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons name="notifications" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../img/profileicon.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <FlatList
        data={bikes}
        ListHeaderComponent={
          <>
            <View style={styles.offerContainer}>
              <Image
                source={require('../img/sales.jpg')}
                style={styles.bannerImage}
              />
            </View>

            {/* Our Services Section */}
            <View style={styles.servicesContainer}>
              <Text style={styles.sectionTitle}>Our Services</Text>
              <View style={styles.servicesRow}>
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate('CityBikes')}
                >
                  <Text style={styles.serviceText}>City Bike</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate('MountainBikes')}
                >
                  <Text style={styles.serviceText}>Mountain Bike</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate('HybridBikes')}
                >
                  <Text style={styles.serviceText}>Hybrid Bike</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate('AccessoriesBike')}
                >
                  <Text style={styles.serviceText}>Accessories</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Hot Deals</Text>
          </>
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.cardGrid}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image source={require('../img/home.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('Rent')}
        >
          <Image source={require('../img/bicycle.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('Map')}
        >
          <Image source={require('../img/map.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('Tips')}
        >
          <Image source={require('../img/tips.png')} style={styles.footerImage} />
          <Text style={styles.footerText}>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('Guides')}
        >
          <Image source={require('../img/guides.png')} style={styles.footerImage} />
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
    marginTop: 20,
  },
  logoImage: { width: 50, height: 40 },
  rightIcons: { flexDirection: 'row' },
  iconButton: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 50, height: 40, borderRadius: 15 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  offerContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  bannerImage: { width: '100%', height: 200, borderRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bikeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '48%',
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    position: 'relative',
  },
  bikeImage: { width: '100%', height: 140, resizeMode: 'cover' },
  bikeDetails: { padding: 10 },
  bikeName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  bikeDescription: { fontSize: 12, color: '#666', marginBottom: 5 },
  bikePrice: { fontSize: 14, fontWeight: 'bold', color: '#007BFF' },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5252',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    zIndex: 1,
  },
  discountText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#28A745',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  servicesContainer: { marginVertical: 20, paddingHorizontal: 15 },
  servicesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  serviceText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#007BFF' },

  footerImage: {
    width: 40,
    height: 40,
    marginBottom: 4, // Adjust spacing between image and text
  },
  
});