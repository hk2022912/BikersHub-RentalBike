import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AccessoriesProvider } from './assets/admin/AccessoriesContext'; // Make sure the path is correct
import { BikeProvider } from './assets/admin/BikeContext';
import Login from './assets/pages/login/login'; 
import Register from './assets/pages/register/register';
import LogRes from './assets/pages/register/logres';
import Welcome from './assets/pages/welcome/welcome'; 
import Home from './assets/pages/home'; 
import UserMap from './assets/pages/map/map'; 
import Rent from './assets/pages/rent/rent'; 
import CityBikes from './assets/pages/rent/citybike'; 
import MountainBikes from './assets/pages/rent/mountainbike';
import HybridBikes from './assets/pages/rent/hybridbike';
import Tips from './assets/pages/tips/tips';  
import SafetyTips from './assets/pages/tips/safetytips';  
import MaintenanceTips from './assets/pages/tips/maintenancetips';  
import Guide from './assets/pages/guides/guides'; 
import Wheels from './assets/pages/guides/wheels'; 
import Handlebars from './assets/pages/guides/Handlebars'; 
import Brakes from './assets/pages/guides/Brakes'; 
import Frame from './assets/pages/guides/Frame'; 
import Fork from './assets/pages/guides/Fork'; 
import Saddle from './assets/pages/guides/Saddle'; 
import Drivetrain from './assets/pages/guides/Drivetrain'; 
import Gears from './assets/pages/guides/Gears'; 
import Suspension from './assets/pages/guides/Suspension'; 
import Accessories from './assets/pages/guides/Accessories'; 
import Recovery from './assets/pages/recovery'; 
import Profile from './assets/pages/profile/profile'; 
import Notification from './assets/pages/notification/notification'; 
import BikeDetails from './assets/pages/rent/bikedetails'; 
import AccessoriesBike from './assets/pages/accessories/BikeAccessories';
import AccessoriesDetails from './assets/pages/accessories/AccessoriesDetails';
import Cart from './assets/pages/cart'; 
import CheckoutDetails from './assets/pages/accessories/checkoutdetails';
import Admin from './assets/admin/dashadmin';
import bikeCategories from './assets/admin/bikecategories';
import BikeCategoryDetails from './assets/admin/detailsbike';
import AccessoryList from './assets/admin/AccessoryList'; 
import AdminLogin from './assets/admin/adminlogin';
import Dashboard from './assets/admin/dashadmin';
import BikeList from './assets/admin/bikecategories';

const Stack = createStackNavigator();

export default function App() {
  return (
    <BikeProvider>  
      <AccessoriesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false, 
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="LogRes"
              component={LogRes}
              options={{
                headerShown: false, 
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                headerTitle: null, 
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Profile',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Recovery"
              component={Recovery}
              options={{
                title: 'Recovery',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Rent"
              component={Rent}
              options={{
                title: 'Select Your Category',
                headerShown: true,
                headerTitleAlign: 'center',
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
                title: 'Notifications',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="CityBikes"
              component={CityBikes}
              options={{
                title: 'CityBikes',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="MountainBikes"
              component={MountainBikes}
              options={{
                title: 'Mountain Bikes',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="HybridBikes"
              component={HybridBikes}
              options={{
                title: 'Hybrid Bikes',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Map"
              component={UserMap}
              options={{
                title: 'Map',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Tips"
              component={Tips}
              options={{
                title: 'Safety & Maintenance Tips',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Wheels"
              component={Wheels}
              options={{
                title: 'How to Fix a Wheel',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Brakes"
              component={Brakes}
              options={{
                title: 'How to handle your Brakes',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Handlebars"
              component={Handlebars}
              options={{
                title: 'How to handle Handlebars',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Frame"
              component={Frame}
              options={{
                title: 'Assembling your Frame',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Fork"
              component={Fork}
              options={{
                title: 'Repairing your Fork',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Saddle"
              component={Saddle}
              options={{
                title: 'Adjusting your Saddle (Seat)',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Drivetrain"
              component={Drivetrain}
              options={{
                title: 'Upgrading your Drivetrain',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Gears"
              component={Gears}
              options={{
                title: 'Upgrading your Gears',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Suspension"
              component={Suspension}
              options={{
                title: 'Upgrading your Suspension',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Accessories"
              component={Accessories}
              options={{
                title: 'Upgrading your Bicycle with Accessories',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Guides"
              component={Guide}
              options={{
                title: 'Guide & Tutorials',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="MaintenanceTips"
              component={MaintenanceTips}
              options={{
                title: 'Maintenance Tips',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="SafetyTips"
              component={SafetyTips}
              options={{
                title: 'Safety Tips',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="AccessoriesDetails"
              component={AccessoriesDetails}
              options={{
                title: 'Accessories Details',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="AccessoriesBike"
              component={AccessoriesBike}
              options={{
                title: 'Bike Accessories',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                title: 'Your Cart',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="CheckoutDetails"
              component={CheckoutDetails}
              options={{
                title: 'Checkout Details',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{
                title: 'Admin Panel',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BikeCategoryDetails"
              component={BikeCategoryDetails}
              options={{
                title: 'Bike Category Details',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="AccessoryList"
              component={AccessoryList}
              options={{
                title: 'Accessory List',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="AdminLogin"
              component={AdminLogin}
              options={{
                title: 'Admin Login',
                headerShown: false,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen 
              name="AdminDashboard" 
              component={Dashboard} 
              options={{ title: 'Dashboard', headerShown: false, }} 
            />
              <Stack.Screen 
              name="BikeList" 
              component={BikeList} 
              options={{ title: 'Bike Categories' }} 
            />
            <Stack.Screen
              name="bikeCategories"
              component={bikeCategories}
              options={{
                title: 'Bike Category Details',
                headerShown: true,
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AccessoriesProvider>
    </BikeProvider>  
  );
}
