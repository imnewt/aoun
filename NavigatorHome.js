import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from "react-native-linear-gradient"
import HomeScreen from "./screens/Home"
import BookListScreen from "./screens/BookList"
import BookDetailScreen from "./screens/BookDetail"

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 19,
          color: "#FFF"
        },
        headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
        headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen 
        name="BookList" 
        component={BookListScreen} 
        options={({ route }) => 
        ({  
          headerTitle: route.params.headerTitle,
        })} />
      <HomeStack.Screen 
        name="BookDetail" 
        component={BookDetailScreen}
        options={{ headerTitle: "Details" }} 
      />
    </HomeStack.Navigator>
  )
}