import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './assets/pages/login';  // Adjust the path if necessary
import Register from './assets/pages/register';  // Adjust the path if necessary
import Welcome from './assets/pages/welcome';  // Make sure the path is correct
import Home from './assets/pages/home'; // Import the Home screen
import UserMap from './assets/pages/map/map'; // Import the Map screen
import Rent from './assets/pages/rent/rent'; // Import the Rent screen
import CityBikes from './assets/pages/rent/citybike'; // Import the CityBikes screen
import MountainBikes from './assets/pages/rent/mountainbike';
import HybridBikes from './assets/pages/rent/hybridbike';
import Tips from './assets/pages/tips/tips';  // Import Tips page
import SafetyTips from './assets/pages/tips/safetytips';  // Import SafetyTips page
import MaintenanceTips from './assets/pages/tips/maintenancetips';  // Import MaintenanceTips page
import Guide from './assets/pages/guides/guides'; // Import the Guide screen
import Wheels from './assets/pages/guides/wheels'; // Import the Wheels screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }} // Hides the header for Welcome screen
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true, // Shows the header for Login screen
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} // Hides the header for Register screen
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // Hides the header for Home screen
            headerTitle: null,  // Removes the title text in the header
          }}
        />
        {/* Rent screen with centered title */}
        <Stack.Screen
          name="Rent"
          component={Rent}
          options={{
            title: 'Select Your Category', // Title for the Rent screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* CityBikes screen with centered title */}
        <Stack.Screen
          name="CityBikes"
          component={CityBikes}
          options={{
            title: 'City Bikes',  // Title for the CityBikes screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="MountainBikes"
          component={MountainBikes}
          options={{
            title: 'Mountain Bikes',  // Title for the MountainBikes screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="HybridBikes"
          component={HybridBikes}
          options={{
            title: 'Hybrid Bikes',  // Title for the HybridBikes screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Map screen with centered title */}
        <Stack.Screen
          name="Map"
          component={UserMap}
          options={{
            title: 'Map',  // Title for the Map screen
            headerShown: true,  // If you want a header on the map screen
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Tips Screen with centered title */}
        <Stack.Screen
          name="Tips"
          component={Tips}
          options={{
            title: 'Safety & Maintenance Tips',  // Title for the Tips screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Wheels screen with centered title */}
        <Stack.Screen
          name="Wheels"
          component={Wheels}
          options={{
            title: 'How to Fix a Wheel',  // Title for the Wheels screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* SafetyTips screen with centered title */}
        <Stack.Screen
          name="Guides"
          component={Guide}
          options={{
            title: 'Guide & Tutorials',  // Title for the SafetyTips screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* MaintenanceTips screen with centered title */}
        <Stack.Screen
          name="MaintenanceTips"
          component={MaintenanceTips}
          options={{
            title: 'Maintenance Tips',  // Title for the MaintenanceTips screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="SafetyTips"
          component={SafetyTips}
          options={{
            title: 'Safety Tips',  // Title for the MaintenanceTips screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Guide screen with centered title */}
        <Stack.Screen
          name="Guide"
          component={Guide}
          options={{
            title: 'Guide & Tutorials',  // Title for the Guide screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
