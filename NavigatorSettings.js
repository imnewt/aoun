import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from "react-native-linear-gradient"
import SettingsScreen from "./screens/Settings"
import LoginScreen from "./screens/Login"
import RegisterScreen from "./screens/Register"
import ProfileScreen from "./screens/Profile"
import PasswordScreen from "./screens/Password"
import PolicyScreen from "./screens/Policy"
import SupportScreen from "./screens/Support"
import AboutScreen from "./screens/About"

const SettingsStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator 
      initialRouteName="Settings"
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
      <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
      <SettingsStack.Screen name="Login" component={LoginScreen}/>
      <SettingsStack.Screen name="Register" component={RegisterScreen}
        options={{
          headerTitle: "Create New Account",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} 
        options={{
          headerTitle: "Edit Profile",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }} 
      />
      <SettingsStack.Screen name="Password" component={PasswordScreen} 
        options={{
          headerTitle: "Change Password",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
      <SettingsStack.Screen name="Policy" component={PolicyScreen} 
        options={{
          headerTitle: "Privacy Policy",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
      <SettingsStack.Screen name="Support" component={SupportScreen} 
        options={{
          headerTitle: "Support",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
      <SettingsStack.Screen name="About" component={AboutScreen} 
        options={{
          headerTitle: "About Us",
          headerTransparent: false,
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
          headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
        }}
      />
    </SettingsStack.Navigator>
  );
}