import React, { useState, useEffect } from "react"
import { AsyncStorage } from "react-native"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import { HOST } from "../env"

export default function Password() {
    const [user, setUser] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
            }
            else {
                setErrMessage(json.message);
            }
        })
    }

    const validate = () => {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            setErrMessage("Fields can not be blank!")
        }
        else if (newPassword !== confirmPassword) {
            setErrMessage("Passwords do not match!")
        }
        else {
            updatePassword()
        }
    }

    const updatePassword = () => {
        if (currentPassword === user.password) {
            fetch(`${HOST}/api/users/updatePassword`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user, newPassword
                })
            }).then(res => res.json())
            .then(json =>
                json.success 
                ?   setModalVisible(true)
                :   setErrMessage(json.message))
        }
        else {
            setErrMessage("Your password is incorrect!")
        }
    }

    return (
        <Container pd={true}>
            <CustomModal 
                title="update success"
                btnText="ok" 
                visible={modalVisible} 
                onPress={setModalVisible}
                goBack={true}
            />
            <InputContainer>
                <Input 
                    label="Current Password"
                    isPassword={true}
                    setValue={setCurrentPassword}
                    value={currentPassword}
                />
                <Input 
                    label="New Password"
                    isPassword={true}
                    setValue={setNewPassword}
                    value={newPassword}
                />
                <Input 
                    label="Confirm Password"
                    isPassword={true}
                    setValue={setConfirmPassword}
                    value={confirmPassword}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={validate} title="save"/>
        </Container>
    )
}