import React, { useState, useEffect } from "react"
import { View, ScrollView, Text, FlatList, BackHandler } from "react-native"
import { useNavigation } from "@react-navigation/native"

import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"
import moment from 'moment'

import OrderHeading from "../components/OrderHeading"
import OrderTotal from "../components/OrderTotal"
import SuccessItem from "../components/SuccessItem"
import LinearButton from "../components/LinearButton"

export default function PaySuccess(props) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const { address, phone, totalMoney } = props.route.params

    useEffect(() => {
        const { clearCart, cartItems } = props.route.params
        clearCart();
        setCartItems(cartItems);
        const user = firebase.auth().currentUser;
        setUser(user);
        BackHandler.addEventListener('hardwareBackPress', () => true);
    })

    const getRandomString = () => {
        var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var result = "";
        for ( var i = 0; i < 8; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const roundTo = (n, digits) => {
        digits === undefined && (digits = 0);    
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    // ORDER HEADING DATA
    const date = moment()
      .utcOffset('+07:00')
      .format('DD MMM, YYYY');

    const no = getRandomString();

    // ORDER TOTAL DATA
    const money = roundTo(totalMoney, 2);
    const shipTax = roundTo(money * 0.12, 2);
    const tax = roundTo(money * 0.05, 2);
    const discount = roundTo(money * 0.04, 2);
    const total = roundTo(money + shipTax + tax - discount, 2);

    const finish = () => {
        // Create new order
        fetch('http://192.168.1.7:3000/api/orders/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.uid,
                phone,
                address,
                date,
                no,
                totalMoney,
                cartItems
            })
        }).then(res => res.json())
        .then(json => console.log(json));

        // Navigate
        // navigation.popToTop();
        // navigation.navigate("Orders");
        
        // navigation.popToTop();
        // navigation.navigate("Home");
        // navigation.popToTop();
        // navigation.navigate("HomeTabs");
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>your order confirmed.</Text>
                <Text style={styles.greeting}>Hello {user ? user.displayName : ""},</Text>
                <Text style={styles.content}>Your order has been confirmed and will be shipping within the next days.</Text>    
                <OrderHeading date={date} no={no} address={address}/>
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <SuccessItem book={item}/>
                    )}
                    keyExtractor={item => item._id}
                />
                <OrderTotal 
                    money={money}
                    shipTax={shipTax}
                    tax={tax}
                    discount={discount}
                    total={total}
                />
                <Text style={styles.content}>We'll be sending a shipping confirmation message to {phone} when the items shipped successfully.</Text>
                <Text style={styles.greeting}>Thank you for shopping with us!</Text>
                <LinearButton onPress={finish} title="go back home" />
            </ScrollView>
        </View>
    ) 
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "5rem"
    },
    heading: {
        marginTop: "5rem",
        fontSize: "7rem",
        fontWeight: "700",
        color: "#52535E",
        textTransform: "capitalize"
    },
    greeting: {
        marginVertical: "3rem",
        fontWeight: "700",
        fontSize: "5rem",
        color: "#52535E"
    },
    content: {
        fontSize: "4rem"
    } 
}) 