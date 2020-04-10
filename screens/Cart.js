import React from 'react'
import { View, SafeAreaView, ScrollView, Image, Text, TouchableOpacity} from "react-native"
import firebase from "firebase"

import LinearGradient from 'react-native-linear-gradient'
import EStyleSheet from 'react-native-extended-stylesheet'

import { CartContext } from "../contexts/Cart"
import CartItem from "../components/CartItem"

import EmptyCart from "../images/empty-cart.png"

export default function Cart(props){

    const roundTo = (n, digits) => {
        if (digits === undefined) {
            digits = 0;
        }

        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    const handleCheckOut = (cartItems) => {
        const { navigation } = props;
        const user = firebase.auth().currentUser;
        if (user) {
            navigation.navigate("PayConfirm", { cartItems: cartItems });
        }
        else {
            navigation.navigate("Login", { from: "Cart"});
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <CartContext.Consumer>
                {({ totalAmount, totalMoney, cartItems, increaseAmount, decreaseAmount, removeBook }) =>  !totalAmount    
                ?   <View style={styles.emptyCart}>
                        <Image resizeMode="contain" source={EmptyCart} style={{height: 300, width: 400}} />
                    </View> 
                :   <View style={{ flex:1 }}>
                        <ScrollView>
                            <Text style={styles.your}>your cart</Text>
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
                        <View style={styles.footer}>
                            <View style={styles.moneyCtn}>
                                <Text style={styles.money}>Subtotal:</Text>
                                <Text style={[styles.money, {textAlign: "right"}]}>${roundTo(totalMoney,2)}</Text>
                            </View>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={styles.linearBtn}>
                                <TouchableOpacity style={styles.btn} onPress={() => handleCheckOut(cartItems)}>
                                    <Text style={styles.payText}>Check out</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>}
            </CartContext.Consumer>
        </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    },
    emptyCart: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    your: {
        marginTop: "12rem",
        marginBottom: "6rem",
        marginLeft: "10rem",
        color: "#FF5A5A",
        fontSize: "6rem",
        fontWeight: "700",
        fontStyle: "italic",
        textTransform: "uppercase"
    },
    moneyCtn: {
        flexDirection: "row",
        marginTop: "2rem",
        marginHorizontal: "10rem",
        alignSelf: "flex-end",
    },
    money: {
        flex: 1,
        fontSize: "5.5rem",
        fontWeight: "700"
    },
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.18,
        alignSelf: "center",
        marginVertical: "3rem",
        marginHorizontal: "3rem",
        borderRadius: 30
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    payText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "4rem",
        fontWeight: "700"
    },
    footer: {
        backgroundColor: "#FFF",
        borderTopColor: "#EEE",
        borderTopWidth: 1
    }
}) 