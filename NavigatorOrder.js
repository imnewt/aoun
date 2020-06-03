import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from "react-native-linear-gradient"
import OrdersScreen from "./screens/Orders"
import OrderDetailScreen from "./screens/OrderDetail"

const OrderStack = createStackNavigator();

export default function OrderStackScreen() {
  return (
    <OrderStack.Navigator 
      initialRouteName="Orders"
      screenOptions={{
        headerTitle: null,
        headerTransparent: true,
        headerTintColor: "#36413E",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 19,
          color: "#FFF"
        },
        headerBackImage: () => <Ionicons name="ios-arrow-back" size={25}/>
      }} 
    >
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
      <OrderStack.Screen name="OrderDetail" component={OrderDetailScreen} 
        options={{
          headerTitle: "Details",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
    </OrderStack.Navigator>
  );
}