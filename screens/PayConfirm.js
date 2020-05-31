import React, { useState, useEffect } from "react"
import { Text, AsyncStorage } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import Container from "../components/Container"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import { HOST } from "../env"

export default function PayConfirm(props) {
    const navigation = useNavigation();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const { cartItems, totalMoney, clearCart } = props.route.params;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail");
        fetch(`${HOST}/api/users`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail
            })
        }).then(res => res.json())
        .then(json => {
            if (json.success) {
                setUser(json.user[0]);
                setEmail(json.user[0].email)
                setPhone(json.user[0].phone);
                setAddress(json.user[0].address);
            }
            else {
                setErrMessage(json.message);
            }
        })
    }

    const validate = () => {
        if (address === "" || phone === "") {
            setErrMessage("Fields can not be blank!")
        }
        if (phone.length !== 10) {
            setErrMessage("Phone number must has 10 numbers!!")
        }
        else {
            confirm()
        }
    }

    const confirm = () => {
        fetch(`${HOST}/api/users/update`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user, email, phone, address
            })
        }).then(res => res.json())
        .then(json => {
            if (json.success) {
                console.log(json)
            }
            else {
                setErrMessage(json.message);
            }
        })
        navigation.navigate("PaySuccess", { user, cartItems, totalMoney, clearCart });
    }

    return (
        <Container pd={true}>
            <InputContainer>
                <Text style={styles.text}>Hi there, we need a little more information to complete your order.</Text>
                <Input 
                    label="Your phone number"
                    isNumeric={true}
                    setValue={setPhone}
                    value={phone}
                />
                <Input 
                    label="Your address"
                    setValue={setAddress}
                    value={address}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={validate} title="confirm"/>
        </Container>
    )
}

const styles = EStyleSheet.create({
    text: {
        marginBottom: "10rem",
        fontSize: "4.5rem"
    }
}) 