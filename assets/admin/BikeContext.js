import React, { createContext, useState, useContext } from 'react';

const BikeContext = createContext();

export const BikeProvider = ({ children }) => {
  const [cityBikes, setCityBikes] = useState([
    {
      id: 1,
      name: 'Black Velo Sport Bike',
      price: 35,
      imageUrl: require('../img/city1.jpg'),
      description: 'A sleek and lightweight city bike designed for speed and efficiency, perfect for urban commuting and leisure rides.',
      status: 'available',
    },
    {
      id: 2,
      name: 'Green Road Bike',
      price: 50,
      imageUrl: require('../img/city2.png'),
      description: 'Lightweight and durable, ideal for long rides.',
      status: 'under maintenance',
    },
    {
      id: 3,
      name: 'Blue Hybrid Bike',
      price: 45,
      imageUrl: require('../img/city3.png'),
      description: 'Versatile hybrid bike designed for both streets and trails.',
      status: 'not available',
    },
    {
      id: 4,
      name: 'Sixthreezero EVRYjourney Hybrid Cruiser',
      price: 40,
      imageUrl: require('../img/city4.jpg'),
      description: 'A stylish, comfortable bike with a step-through frame, ideal for relaxed city rides and short commutes.',
      status: 'available',
    },
    {
      id: 5,
      name: 'Priority Classic Plus',
      price: 40,
      imageUrl: require('../img/city5.jpg'),
      description: 'A reliable commuter bike with excellent comfort.',
      status: 'available',
    },
    {
      id: 6,
      name: 'Retrospec Beaumont City Bike',
      price: 40,
      imageUrl: require('../img/city6.png'),
      description: 'Comfortable and affordable bike for everyday use.',
      status: 'available',
    },
  ]);

  const updateBikeStatus = (id, status) => {
    setCityBikes((prevBikes) =>
      prevBikes.map((bike) => (bike.id === id ? { ...bike, status } : bike))
    );
  };

  const addBike = (newBike) => {
    setCityBikes((prevBikes) => [...prevBikes, newBike]);
  };

  const removeBike = (bikeId) => {
    setCityBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
  };

  return (
    <BikeContext.Provider value={{ cityBikes, addBike, updateBikeStatus, removeBike }}>
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = () => useContext(BikeContext);