import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Container from "../components/Container"
import Logo from "../components/Logo"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import LoginText from "../components/LoginText"
import { handleLogin, navigateLogin } from "../functions"

export default function Login(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { from } = props.route.params;

    return (
        <Container pd={true}>
            <CustomModal 
                title="login success"
                btnText="ok"
                visible={modalVisible}
                onPress={() => navigateLogin(from, email, navigation, 
                    setEmail, setPassword, setErrMessage, setModalVisible)}
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
            <LinearButton 
                onPress={() => handleLogin(email, password, setErrMessage, setModalVisible)} 
                title="log in"/>
            { from !== "Settings" && <LoginText from={from}/> }
        </Container>
    )
}