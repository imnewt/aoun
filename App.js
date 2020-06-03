import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import WelcomeScreen from "./screens/Welcome"
import HomeTabs from "./NavigatorBottomTab"
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'; 

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 100});

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName="Welcome"
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
        <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}