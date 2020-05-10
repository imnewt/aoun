import React, { useState, useEffect } from "react"
import { View, ScrollView, Text, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"

import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"

import LinearButton from "../components/LinearButton"


export default function PayConfirm(props) {
    const { cartItems, totalMoney, clearCart } = props.route.params
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errMessage, setErrMessage] = useState(null);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
        //REMOVE
        setAddress("28 Hung Vuong");
        setPhone("0854374769");
    }, []);

    const validate = () => {
        if (address === "" || phone === "") {
            setErrMessage("Fields can not be blank!")
        }
        else {
            confirm(user, address, phone)
        }
    }

    const confirm = () => {
        navigation.navigate("PaySuccess", { address, phone, cartItems, totalMoney, clearCart });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.text}>Hi there, we need a little more information to complete your order.</Text>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.label}>Your address</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={address => setAddress(address)}
                            value={address}
                        />
                        <Text style={styles.label}>Your phone number</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={phone => setPhone(phone)}
                            value={phone}
                        />
                    </View>
                    <View style={styles.errorMessage}>
                        { errMessage && <Text style={styles.error}>{errMessage}</Text>}
                    </View>
                    <LinearButton onPress={validate} title="confirm"/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        alignItems: "center"
    },
    content: {
        paddingTop: "20rem"
    },
    text: {
        marginLeft: "6rem",
        marginBottom: "10rem",
        fontSize: "4.5rem"
    },
    label: {
        marginLeft: "5rem",
        marginTop: "6rem",
        fontSize: "4.2rem",
        fontWeight: "700",
        fontStyle: "italic"
    },
    input: {
        marginTop: "3rem",
        width: "95%",
        aspectRatio: 1/.17,
        fontSize: "4rem",
        backgroundColor: "#FFF",
        borderRadius: 30,
        paddingLeft: "5rem",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    errorMessage: {
        height: "20rem",
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: "4rem"
    }
}) 