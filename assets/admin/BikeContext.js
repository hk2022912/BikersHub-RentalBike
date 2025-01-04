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

  const [hybridBikes, setHybridBikes] = useState([
    {
      id: 1,
      name: 'Royce Union RMT Mens Bike',
      price: 70,
      imageUrl: require('../img/hybrid1.jpg'),
      description: 'Durable and lightweight aluminum frame, perfect for tackling rugged trails and smooth urban roads.',
    },
    {
      id: 2,
      name: 'Mongoose Malus Bike with Disc Brakes',
      price: 80,
      imageUrl: require('../img/hybrid2.jpg'),
      description: 'Equipped with fat tires and reliable disc brakes for superior control on sandy or snowy terrains.',
    },
    {
      id: 3,
      name: 'Rocky Mountain Bike',
      price: 60,
      imageUrl: require('../img/hybrid3.jpg'),
      description: 'Engineered for extreme off-road performance, featuring shock-absorbing suspension for a smoother ride.',
    },
    {
      id: 4,
      name: 'Folding Mountain Bike',
      price: 90,
      imageUrl: require('../img/hybrid4.jpg'),
      description: 'Compact and foldable design, ideal for adventurers seeking portability without compromising performance.',
    },
    {
      id: 5,
      name: 'Kent T-29 Men’s Mountain Bike',
      price: 80,
      imageUrl: require('../img/hybrid5.jpg'),
      description: '29-inch wheels with a sleek design, delivering stability and speed for both trails and urban exploration.',
    },
    {
      id: 6,
      name: 'Hiland Aluminum Hybrid Fitness Road Bike',
      price: 70,
      imageUrl: require('../img/hybrid6.jpg'),
      description: 'A versatile hybrid bike with a lightweight frame, perfect for fitness rides and long-distance commuting.',
    },
  ]);

  const [mountainBikes, setMountainBikes] = useState([
    {
      id: 1,
      name: 'Trek Dual Sport 2',
      price: 60,
      imageUrl: require('../img/mountain1.jpg'),
      description: 'A versatile hybrid bike with front suspension, perfect for commuting and light trail rides, offering a smooth and comfortable experience.',
    },
    {
      id: 2,
      name: 'Giant Talon 3',
      price: 85,
      imageUrl: require('../img/mountain2.jpg'),
      description: 'Designed for light trails and city streets, this bike features a lightweight aluminum frame and excellent handling for a smooth ride.',
    },
    {
      id: 3,
      name: 'Rockrider ST100',
      price: 95,
      imageUrl: require('../img/mountain3.jpg'),
      description: 'An affordable and reliable mountain bike, ideal for beginners and leisure riders who enjoy both paved paths and gentle trails.',
    },
    {
      id: 4,
      name: 'Co-op Cycles DRT 1.1',
      price: 75,
      imageUrl: require('../img/mountain4.jpg'),
      description: 'Built for durability and control, this bike is great for casual trail riding and commuting, offering a stable and comfortable ride.',
    },
    {
      id: 5,
      name: 'Marin Bolinas Ridge 1',
      price: 85,
      imageUrl: require('../img/mountain5.jpg'),
      description: 'Perfect for leisure and commuting, this bike features wide tires for grip and a sturdy frame for lasting durability.',
    },
    {
      id: 6,
      name: 'Schwinn High Timber',
      price: 65,
      imageUrl: require('../img/mountain6.jpg'),
      description: 'A classic mountain bike with a comfortable seat and wide tires, ideal for both casual rides and everyday commutes.',
    },
  ]);

  const updateBikeStatus = (id, status, category) => {
    if (category === 'city') {
      setCityBikes((prevBikes) =>
        prevBikes.map((bike) => (bike.id === id ? { ...bike, status } : bike))
      );
    } else if (category === 'hybrid') {
      setHybridBikes((prevBikes) =>
        prevBikes.map((bike) => (bike.id === id ? { ...bike, status } : bike))
      );
    } else if (category === 'mountain') {
      setMountainBikes((prevBikes) =>
        prevBikes.map((bike) => (bike.id === id ? { ...bike, status } : bike))
      );
    }
  };

  const addBike = (newBike, category) => {
    if (category === 'city') {
      setCityBikes((prevBikes) => [...prevBikes, newBike]);
    } else if (category === 'hybrid') {
      setHybridBikes((prevBikes) => [...prevBikes, newBike]);
    } else if (category === 'mountain') {
      setMountainBikes((prevBikes) => [...prevBikes, newBike]);
    }
  };

  const removeBike = (bikeId, category) => {
    if (category === 'city') {
      setCityBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
    } else if (category === 'hybrid') {
      setHybridBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
    } else if (category === 'mountain') {
      setMountainBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
    }
  };

  return (
    <BikeContext.Provider
      value={{
        cityBikes,
        hybridBikes,
        mountainBikes,
        addBike,
        updateBikeStatus,
        removeBike,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = () => useContext(BikeContext);
