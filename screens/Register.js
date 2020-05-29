import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import InputContainer from "../components/InputContainer"
import Input from "../components/Input"
import ErrorBlock from "../components/ErrorBlock"
import LinearButton from "../components/LinearButton"
import RegisterText from "../components/RegisterText"
import { createUser, navigateRegister } from "../functions"

export default function Register(props) {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { from } = props.route.params;

    return (
        <Container pd={true}>
            <CustomModal 
                title="user created"
                btnText="ok"
                visible={modalVisible}
                onPress={() => navigateRegister(from, email, navigation, 
                    setEmail, setPassword, setPhone, setErrMessage, setModalVisible)}
            />
            <InputContainer>
                <Input 
                    placeholder="Your Email"
                    setValue={setEmail}
                    value={email}
                />
                <Input
                    isNumeric={true}
                    placeholder="Phone number"
                    setValue={setPhone}
                    value={phone}
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
                onPress={() => createUser(email, password, phone, setErrMessage, setModalVisible)}
                title="register"
            />
            <RegisterText/>
        </Container>
    )
}