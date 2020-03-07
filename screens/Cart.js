import React, { Component } from 'react'
import { View, SafeAreaView, ScrollView, Image, StyleSheet, Text, TouchableOpacity} from "react-native"
import firebase from "firebase"

import LinearGradient from 'react-native-linear-gradient';

import { CartContext } from "../contexts/Cart"
import CartItem from "../components/CartItem"

import EmptyCart from "../images/empty-cart.png"

export default class Cart extends Component {

    roundTo(n, digits) {
        if (digits === undefined) {
            digits = 0;
        }

        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    handleCheckOut = (cartItems) => {
        const { navigation } = this.props;
        const user = firebase.auth().currentUser;
        if (user) {
            navigation.navigate("PayConfirm", { cartItems: cartItems });
        }
        else {
            navigation.navigate("Login", { from: "Cart"});
        }
    }

    render() {
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
                                    <Text style={[styles.money, {textAlign: "right"}]}>${this.roundTo(totalMoney,2)}</Text>
                                </View>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={styles.linearBtn}>
                                    <TouchableOpacity style={styles.btn} onPress={() => this.handleCheckOut(cartItems)}>
                                        <Text style={styles.payText}>Check out</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>}
                </CartContext.Consumer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
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
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 50,
        color: "#ff5a5a",
        fontSize: 24,
        fontWeight: "700",
        fontStyle: "italic",
        textTransform: "uppercase"
    },
    moneyCtn: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 50,
        alignSelf: "flex-end",
    },
    money: {
        flex: 1,
        fontSize: 20,
        fontWeight: "700"
    },
    linearBtn: {
        marginHorizontal: 50,
        marginBottom: 10,
        borderRadius: 30,
        padding: 10
    },
    btn: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    payText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "700"
    },
    footer: {
        backgroundColor: "#FFF",
        borderTopColor: "#EEE",
        borderTopWidth: 1
    }
}) 