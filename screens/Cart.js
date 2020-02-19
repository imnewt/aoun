import React, { Component } from 'react'
import { View, SafeAreaView, ScrollView, Image, StyleSheet, Text, TouchableOpacity} from "react-native"
//import { vh, vw } from "react-native-viewport-units"
import { CartContext } from "../contexts/Cart"
import CartItem from "../components/CartItem"

import EmptyCart from "../images/empty-cart.png"

export default class CartScreen extends Component {

    roundTo(n, digits) {
        if (digits === undefined) {
            digits = 0;
        }

        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CartContext.Consumer>
                    {({ totalAmount, totalMoney, cartItems, increaseAmount, decreaseAmount }) =>  !totalAmount    
                    ?   <View style={styles.emptyCart}>
                            <Image source={EmptyCart} style={{height: "100%"}} />
                        </View> 
                    :   <ScrollView>
                            <View style={styles.content}>
                                {cartItems.map((item,index) => 
                                    <CartItem 
                                        book={item} 
                                        key={index} 
                                        increaseAmount={increaseAmount} 
                                        decreaseAmount={decreaseAmount}
                                    />)}
                                <View style={styles.moneyCtn}>
                                    <Text style={styles.money}>Total: ${this.roundTo(totalMoney,2)}</Text>
                                </View>
                                <TouchableOpacity style={styles.pay}>
                                    <Text style={styles.payText}>Check out</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>}
                </CartContext.Consumer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9"
    },
    emptyCart: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    moneyCtn: {
        marginTop: 20,
        alignItems: "center"
    },
    money: {
        fontSize: 24,
        fontWeight: "700"
    },
    pay: {
        margin: 20,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5562"
    },
    payText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF"
    }
}) 