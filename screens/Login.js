import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import firebase from "firebase"
import Container from "../components/Container"
import Logo from "../components/Logo"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import LoginText from "../components/LoginText"

export default function Login(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { from } = props.route.params;

    const handleLogIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => setModalVisible(true))
        .catch(error => setErrMessage(error.message))
    }

    const navigate = () => {
        setModalVisible(false);
        from == "Welcome" 
        ? navigation.navigate("HomeTabs")
        : navigation.goBack()
    }

    return (
        <Container pd={true}>
            <CustomModal 
                title="login success"
                btnText="ok"
                visible={modalVisible}
                onPress={navigate}
            />
            <Logo/>
            <InputContainer>
                <Input 
                    placeholder="Email Address"
                    setValue={setEmail}
                    value={email}
                />
                <Input 
                    isPassword={true}
                    placeholder="Password"
                    setValue={setPassword}
                    value={password}
                />
            </InputContainer>
            <ErrorBlock errMessage={errMessage}/>
            <LinearButton onPress={handleLogIn} title="log in"/>
            { from !== "Settings" && <LoginText from={from}/> }
        </Container>
    )
}