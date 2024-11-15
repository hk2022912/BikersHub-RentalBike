// Slider.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Slider = ({ items }) => {
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.sliderItem}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  sliderItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 150,
    height: 170,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    // Adding shadow effects
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Slider;
