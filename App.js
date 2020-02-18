import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";

import HomeScreen from "./screens/Home"
import BookListScreen from "./screens/BookList"
import BookDetailScreen from "./screens/BookDetail"

import CartScreen from "./screens/Cart"

import OrdersScreen from "./screens/Orders"

import SettingsScreen from "./screens/Settings"
import LoadingScreen from "./screens/Loading"
import LoginScreen from "./screens/Login"
import RegisterScreen from "./screens/Register"
import MainScreen from "./screens/Main"

//import { CartProvider } from "./contexts/Cart"

var firebaseConfig = {
  apiKey: "AIzaSyAcD_b5Z3GWIJpYl4ZJKGy--2QerLDeivg",
  authDomain: "aoun-27f28.firebaseapp.com",
  databaseURL: "https://aoun-27f28.firebaseio.com",
  projectId: "aoun-27f28",
  storageBucket: "aoun-27f28.appspot.com",
  messagingSenderId: "182184946839",
  appId: "1:182184946839:web:e945961e6c433a685b0dd2",
  measurementId: "G-Z1Y8JF7ZNM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// HOME TAB
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
      initialRouteName = "Home" 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF5562',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="BookList" component={BookListScreen} options={({ route }) => ({ title: `${route.params.name } Books` })}/>
      <HomeStack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Details" }}/>
    </HomeStack.Navigator>
  );
}

// CART TAB
const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator initialRouteName="Cart">
      <CartStack.Screen name="Cart" component={CartScreen} />
    </CartStack.Navigator>
  );
}

// ORDERS TAB
const OrderStack = createStackNavigator();

function OrderStackScreen() {
  return (
    <OrderStack.Navigator initialRouteName="Order">
      <OrderStack.Screen name="Order" component={OrdersScreen} />
    </OrderStack.Navigator>
  );
}

// SETTING TAB
const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Loading">
      <SettingsStack.Screen name="Loading" component={LoadingScreen} />
      <SettingsStack.Screen name="Login" component={LoginScreen} />
      <SettingsStack.Screen name="Main" component={MainScreen} />
      <SettingsStack.Screen name="Register" component={RegisterScreen} />
    </SettingsStack.Navigator>
  );
}

// BOTTOM TAB NAVIGATION
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Cart') {
                iconName = 'ios-cart';
            } else if (route.name === 'Orders') {
              iconName = 'ios-wallet';
            } else if (route.name === 'Settings') {
                iconName = 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: '#FF5562',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
        <Tab.Screen name="Orders" component={OrderStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}