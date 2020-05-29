import React, { useState, useEffect } from "react"
import { Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import Container from "../components/Container"
import OrderHeading from "../components/OrderHeading"
import OrderTotal from "../components/OrderTotal"
import SuccessItem from "../components/SuccessItem"
import LinearButton from "../components/LinearButton"
import { roundTo, getNo, getDate, createOrder } from "../functions"

export default function PaySuccess(props) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const { totalMoney } = props.route.params;

    useEffect(() => {
        const { user, clearCart, cartItems } = props.route.params;
        clearCart();
        setUser(user);
        setCartItems(cartItems);
        createOrder(user, date, no, totalMoney, cartItems);
    }, [])

    // ORDER HEADING DATA
    const date = getDate();
    const no = getNo();

    // ORDER TOTAL DATA
    const money = roundTo(totalMoney);
    const shipTax = roundTo(money * 0.12);
    const tax = roundTo(money * 0.05);
    const discount = roundTo(money * 0.04);
    const total = roundTo(money + shipTax + tax - discount);

    const goBackHome = () => {
        navigation.popToTop();
        navigation.navigate("Home");
        navigation.popToTop();
        navigation.navigate("HomeTabs");
    }

    return (
        <Container pd={true}>
            <Text style={styles.heading}>your order confirmed.</Text>
            <Text style={styles.greeting}>Hello {user ? user.email.split("@")[0] : ""},</Text>
            <Text style={styles.content}>Your order has been confirmed and will be shipping within the next days.</Text>    
            <OrderHeading date={date} no={no} address={user ? user.address : ""}/>
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
            <Text style={styles.content}>We'll be sending a shipping confirmation mail to {user ? user.email : ""} when the items shipped successfully.</Text>
            <Text style={styles.greeting}>Thank you for shopping with us!</Text>
            <LinearButton onPress={() => goBackHome()} title="go back home" />
        </Container>
    ) 
}

const styles = EStyleSheet.create({
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