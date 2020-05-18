import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import firebase from "firebase"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import RegisterText from "../components/RegisterText"

export default function Register(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { from } = props.route.params;

    const handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName
            })
        })
        .then(() => setModalVisible(true))
        .catch(error => setErrMessage(error.message))
    }

    const navigate = () => {
        setModalVisible(false);
        from == "Settings"
        ? navigation.goBack()
        : navigation.navigate("HomeTabs")
    }

    return (
        <Container>
            <CustomModal 
                title="user created"
                btnText="ok"
                visible={modalVisible}
                onPress={navigate}
            />
            <InputContainer>
                <Input 
                    placeholder="Your Email"
                    setValue={setEmail}
                    value={email}
                />
                <Input
                    placeholder="Display Name"
                    setValue={setDisplayName}
                    value={displayName}
                />
                <Input 
                    isPassword={true}
                    placeholder="Password"
                    setValue={setPassword}
                    value={password}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={handleSignUp} title="register"/>
            <RegisterText/>
        </Container>
    )
}