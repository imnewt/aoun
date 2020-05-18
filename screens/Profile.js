import React, { useState, useEffect } from "react"
import firebase from "firebase"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"

export default function Profile() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setEmail(user.email);
        setDisplayName(user.displayName);
    }, []);

    const validate = () => {
        (email === "" || displayName === "" || password === "") 
        ?   setErrMessage("Fields can not be blank!")
        :   updateProfile(email, displayName, password)
    }

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const updateProfile = (newEmail, newName, password) => {
        reauthenticate(password)
        .then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail)
            user.updateProfile({ displayName: newName });
            setModalVisible(true)
        })
        .catch(() => setErrMessage("Your password is incorrect!"))
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
                    label="Your Email"
                    setValue={setEmail}
                    value={email}
                />
                <Input 
                    label="Display Name"
                    setValue={setDisplayName}
                    value={displayName}
                />
                <Input 
                    label="Your Password"
                    isPassword={true}
                    setValue={setPassword}
                    value={password}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={validate} title="save"/>
        </Container>
    )
}