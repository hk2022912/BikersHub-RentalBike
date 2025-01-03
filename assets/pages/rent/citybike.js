import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBikeContext } from '../../admin/BikeContext';

const CityBikes = () => {
  const navigation = useNavigation();
  const { cityBikes } = useBikeContext(); // Access bike data from context

  const handlePress = (bike) => {
    if (bike.status === 'available') {
      navigation.navigate('BikeDetails', { bike });
    }
  };

  const renderItem = ({ item }) => {
    const isAvailable = item.status === 'available';
    const statusStyle =
      item.status === 'available'
        ? styles.statusAvailable
        : item.status === 'not available'
        ? styles.statusNotAvailable
        : styles.statusMaintenance;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={[styles.bikeCard, !isAvailable && styles.disabledCard]}
        disabled={!isAvailable}
      >
        <Image source={item.imageUrl} style={styles.bikeImage} />
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikePrice}>₱{item.price}</Text>
        <Text style={[styles.bikeStatus, statusStyle]}>
          {item.status.replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cityBikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bikeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  disabledCard: {
    backgroundColor: '#f2f2f2',
  },
  bikeImage: {
    width: 130,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bikePrice: {
    fontSize: 14,
    color: '#2ecc71',
  },
  bikeStatus: {
    fontSize: 12,
    marginTop: 5,
  },
  statusAvailable: {
    color: '#2ecc71',
  },
  statusNotAvailable: {
    color: '#e74c3c',
  },
  statusMaintenance: {
    color: '#f39c12',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default CityBikes;
