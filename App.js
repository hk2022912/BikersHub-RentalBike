import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './assets/pages/login/login'; // Adjust path if necessary
import Register from './assets/pages/register/register';
import LogRes from './assets/pages/register/logres';
import Welcome from './assets/pages/welcome/welcome'; // Make sure the path is correct
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
import Handlebars from './assets/pages/guides/Handlebars'; // Import Handlebars screen
import Brakes from './assets/pages/guides/Brakes'; // Import Brakes screen
import Frame from './assets/pages/guides/Frame'; // Import Frame screen
import Fork from './assets/pages/guides/Fork'; // Import Fork screen
import Saddle from './assets/pages/guides/Saddle'; // Import Saddle screen
import Drivetrain from './assets/pages/guides/Drivetrain'; // Import Drivetrain screen
import Gears from './assets/pages/guides/Gears'; // Import Gears screen
import Suspension from './assets/pages/guides/Suspension'; // Import Suspension screen
import Accessories from './assets/pages/guides/Accessories'; // Import Accessories screen
import Recovery from './assets/pages/recovery'; // Adjust path if necessary
import Profile from './assets/pages/profile/profile'; // Adjust path if necessary
import Notification from './assets/pages/notification/notification'; // Import Notification screen
import BikeDetails from './assets/pages/rent/bikedetails'; // Import BikeDetails screen
import AccessoriesBike from './assets/pages/accessories/BikeAccessories';
import AccessoriesDetails from './assets/pages/accessories/AccessoriesDetails';


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
          name="LogRes"
          component={LogRes}
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
        <Stack.Screen
          name="Profile"
          component={Profile}  // Link to the Profile screen
          options={{
            title: 'Profile',  // Title for the Profile screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="Recovery"
          component={Recovery}  // Link to the Profile screen
          options={{
            title: 'Recovery',  // Title for the Profile screen
            headerShown: true,  // Show header
            headerTitleAlign: 'center', // Center the title
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
        <Stack.Screen
          name="BikeDetails"
          component={BikeDetails}
          options={{
            title: 'Bike Details',
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            title: 'Notifications', // Title for the Notification screen
            headerShown: true, // Show header
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
        {/* Brakes screen with centered title */}
        <Stack.Screen
          name="Brakes"
          component={Brakes}
          options={{
            title: 'How to handle your Brakes',  // Title for the Brakes screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="Handlebars"
          component={Handlebars}
          options={{
            title: 'How to handle Handlebars',  // Title for the Brakes screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Frame screen with centered title */}
        <Stack.Screen
          name="Frame"
          component={Frame}
          options={{
            title: 'Assembling your Frame',  // Title for the Frame screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Fork screen with centered title */}
        <Stack.Screen
          name="Fork"
          component={Fork}
          options={{
            title: 'Repairing your Fork',  // Title for the Fork screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Saddle screen with centered title */}
        <Stack.Screen
          name="Saddle"
          component={Saddle}
          options={{
            title: 'Adjusting your Saddle (Seat)',  // Title for the Saddle screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Drivetrain screen with centered title */}
        <Stack.Screen
          name="Drivetrain"
          component={Drivetrain}
          options={{
            title: 'Upgrading your Drivetrain',  // Title for the Drivetrain screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Gears screen with centered title */}
        <Stack.Screen
          name="Gears"
          component={Gears}
          options={{
            title: 'Upgrading your Drivetrain',  // Title for the Gears screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Suspension screen with centered title */}
        <Stack.Screen
          name="Suspension"
          component={Suspension}
          options={{
            title: 'Upgrading your Suspension',  // Title for the Suspension screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Accessories screen with centered title */}
        <Stack.Screen
          name="Accessories"
          component={Accessories}
          options={{
            title: 'Upgrading your Bicycle with Accessories',  // Title for the Accessories screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Guides screen with centered title */}
        <Stack.Screen
          name="Guides"
          component={Guide}
          options={{
            title: 'Guide & Tutorials',  // Title for the Guides screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        {/* Maintenance Tips screen with centered title */}
        <Stack.Screen
          name="MaintenanceTips"
          component={MaintenanceTips}
          options={{
            title: 'Maintenance Tips',  // Title for the Maintenance Tips screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
        <Stack.Screen
          name="SafetyTips"
          component={SafetyTips}
          options={{
            title: 'Safety Tips',  // Title for the Maintenance Tips screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
         <Stack.Screen
          name="AccessoriesDetails"
          component={AccessoriesDetails}
          options={{
            title: 'Accessories Details',  // Title for the Accessories screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
         <Stack.Screen
          name="AccessoriesBike"
          component={AccessoriesBike}
          options={{
            title: 'Bike Accessories',  // Title for the Accessories screen
            headerShown: true,
            headerTitleAlign: 'center', // Center the title
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}