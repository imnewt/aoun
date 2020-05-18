import React, { useState } from "react"
import firebase from "firebase"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"

export default function Password() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const validate = () => {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            setErrMessage("Fields can not be blank!")
        }
        else if (newPassword !== confirmPassword) {
            setErrMessage("Passwords do not match!")
        }
        else {
            changePassword(currentPassword, newPassword)
        }
    }

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword)
        .then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword)
            .then(() => setModalVisible(true))
        })
        .catch(() => setErrMessage("Current password is incorrect!"))
    }   

    return (
        <Container pd={true}>
            <CustomModal 
                title="update success"
                content="Changes will be applied the next time you log in" 
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