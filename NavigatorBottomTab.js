import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"
import CartIconWithBadge from "./components/CartIconWithBadge"
import { CartProvider } from "./contexts/Cart"
import HomeStackScreen from "./NavigatorHome"
import CartStackScreen from "./NavigatorCart"
import OrderStackScreen from "./NavigatorOrder"
import SettingsStackScreen from "./NavigatorSettings"

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "md-home";
            } else if (route.name === "Cart") {
              return <CartIconWithBadge name="ios-cart" size={25} color={color} />
            } else if (route.name === "Orders") {
              iconName = "ios-wallet";
            } else if (route.name === "Settings") {
                iconName = "ios-list";
            }
            return <Ionicons name={iconName} size={25} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: "#DD5A5A",
          inactiveTintColor: "gray",
          style: { height: 60 },
          labelStyle: {
            fontSize: 14,
            paddingBottom: 3
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
        <Tab.Screen name="Orders" component={OrderStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </CartProvider>
  )
}