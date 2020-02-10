import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./screens/Home"
import BookListScreen from "./screens/BookList"
import BookDetailScreen from "./screens/BookDetail"

import CartScreen from "./screens/Cart"

import SettingsScreen from "./screens/Settings"

//import { CartProvider } from "./contexts/Cart"

// HOME TAB
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName = "Home" >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BookList" component={BookListScreen} />
      {/* <HomeStack.Screen name="BookDetail" component={BookDetailScreen} /> */}
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


// SETTING TAB
const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

// BOTTOM TAB NAVIGATION
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}