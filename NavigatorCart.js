import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from "react-native-linear-gradient"
import CartScreen from "./screens/Cart"
import PayConfirmScreen from "./screens/PayConfirm"
import PaySuccessScreen from "./screens/PaySuccess"
import LoginScreen from "./screens/Login"
import RegisterScreen from "./screens/Register"

const CartStack = createStackNavigator();

export default function CartStackScreen() {
  return (
    <CartStack.Navigator 
      initialRouteName="Cart"
      screenOptions={{
        headerTitle: null,
        headerTransparent: true,
        headerTintColor: "#36413E",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 19,
          color: "#FFF"
        }
      }}
    >
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="PayConfirm" component={PayConfirmScreen} 
        options={{
          headerTitle: "Confirm",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
      <CartStack.Screen name="PaySuccess" component={PaySuccessScreen} options={{ headerLeft: null }} />
      <CartStack.Screen name="Login" component={LoginScreen} />
      <CartStack.Screen name="Register" component={RegisterScreen} 
        options={{
          headerTitle: "Create New Account",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
    </CartStack.Navigator>
  );
}