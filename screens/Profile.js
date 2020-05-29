import React, { useState, useEffect } from "react"
import { AsyncStorage } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import {HOST} from "../env"

export default function Profile() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        if (email === "" || phone === "" || address === "") {
            setErrMessage("Fields can not be blank!")
        }
        else if (password === "") {
            setErrMessage("Password is requied!")
        }
        else {
            updateProfile()
        }
    }

    const updateProfile = async () => {
        if (password === user.password) {
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
                    setModalVisible(true);
                }
                else {
                    setErrMessage(json.message)
                }  
            })
            await AsyncStorage.setItem("userEmail", email);
        }
        else {
            setErrMessage("Your password is incorrect!")
        }
    }

    const goBackWithEmail = () => {
        setModalVisible(false);
        navigation.navigate("Settings", { email })
    }

    return (
        <Container pd={true}>
            <CustomModal 
                title="update success"
                btnText="ok"
                visible={modalVisible}
                onPress={goBackWithEmail}
            />
            <Input 
                label="Your Email"
                setValue={setEmail}
                value={email}
            />
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
            <Input 
                label="Your Password"
                isPassword={true}
                setValue={setPassword}
                value={password}
            />
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={validate} title="save"/>
        </Container>
    )
}