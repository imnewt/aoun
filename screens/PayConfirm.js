import React, { useState, useEffect } from "react"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"
import Container from "../components/Container"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
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
        <Container pd={true}>
            <InputContainer>
                <Text style={styles.text}>Hi there, we need a little more information to complete your order.</Text>
                <Input 
                    label="Your address"
                    setValue={setAddress}
                    value={address}
                />
                <Input 
                    label="Your phone number"
                    setValue={setPhone}
                    value={phone}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={validate} title="agree"/>
        </Container>
    )
}

const styles = EStyleSheet.create({
    text: {
        marginBottom: "10rem",
        fontSize: "4.5rem"
    }
}) 