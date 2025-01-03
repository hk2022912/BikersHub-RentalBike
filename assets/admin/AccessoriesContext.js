import React, { createContext, useState } from 'react';

export const AccessoriesContext = createContext();

export const AccessoriesProvider = ({ children }) => {
  const [accessories, setAccessories] = useState([
    {
        id: 1,
        name: 'Wheels',
        price: 550,
        description: 'Our high-quality wheels are designed to provide a smooth and efficient ride on all types of terrain.',
        imageUrl: require('../img/wheelss.png'),
      },
      {
        id: 2,
        name: 'Gear',
        price: 330,
        description: 'Durable and precision-crafted gears ensure that your bike shifts smoothly and accurately, providing you with the best performance during your rides.',
        imageUrl: require('../img/gear.png'),
      },
      {
        id: 3,
        name: 'Bike Helmet',
        price: 235,
        description: 'Safety is paramount when cycling, and our high-performance bike helmet is engineered to protect your head during any ride.',
        imageUrl: require('../img/helmet.png'),
      },
      {
        id: 4,
        name: 'Bike Lights',
        price: 235,
        description: 'Illuminate your path with our bright, energy-efficient bike lights, specially designed for nighttime and low-light conditions.',
        imageUrl: require('../img/lights.png'),
      },
      {
        id: 5,
        name: 'Locks',
        price: 235,
        description: 'Our heavy-duty bike locks provide the ultimate security for your bike. Constructed from hardened steel and designed to withstand tampering.',
        imageUrl: require('../img/locks.png'),
      },
      {
        id: 6,
        name: 'Bearing',
        price: 30,
        description: 'Upgrade your bike’s performance with smooth, durable bearings that ensure maximum efficiency and minimal friction.',
        imageUrl: require('../img/bearing.png'),
      },

  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (accessory) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find(item => item.id === accessory.id);
      if (itemExists) {
        return prevCart.map(item => item.id === accessory.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...accessory, quantity: 1 }];
      }
    });
  };

  return (
    <AccessoriesContext.Provider value={{ accessories, setAccessories, addToCart, cart }}>
      {children}
    </AccessoriesContext.Provider>
  );
};
