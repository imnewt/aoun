import React from "react"
import { View, ScrollView, AsyncStorage } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { CartContext } from "../contexts/Cart"
import EmptyView from "../components/EmptyView"
import EmptyHeading from "../components/EmptyHeading"
import CartItem from "../components/CartItem"
import CheckOut from "../components/CheckOut"
import EmptyCart from "../images/empty-cart.jpg"

export default function Cart(){
    const navigation = useNavigation();
    const handleCheckOut = async (cartItems, totalMoney, clearCart) => {
        const userEmail = await AsyncStorage.getItem("userEmail");
        userEmail 
        ?   navigation.navigate("PayConfirm", { cartItems, totalMoney, clearCart })
        :   navigation.navigate("Login", { from: "Cart"})
    }

    return (
        <CartContext.Consumer>
            {({ totalAmount, totalMoney, cartItems, increaseAmount, decreaseAmount, removeBook, clearCart }) =>  !totalAmount    
            ?   <EmptyView img={EmptyCart} text="your cart is empty" textColor="#FFCA55"/>
            :   <View style={{ flex: 1, backgroundColor: "#FFF5F0" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <EmptyHeading text="your cart"/>
                        {
                            cartItems.map((item,index) => 
                                <CartItem 
                                    book={item} 
                                    key={index} 
                                    increaseAmount={increaseAmount} 
                                    decreaseAmount={decreaseAmount}
                                    removeBook={removeBook}
                                />)
                        }
                    </ScrollView>
                    <CheckOut totalMoney={totalMoney} onPress={() => handleCheckOut(cartItems, totalMoney, clearCart)}/>
                </View>}
        </CartContext.Consumer>
    )
}