import React, { useState } from 'react'
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import EStyleSheet from 'react-native-extended-stylesheet'
import { useNavigation } from "@react-navigation/native"
import * as firebase from "firebase"

import Logo from "../images/logo.png"

export default function Login(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);

    const handleLogIn = () => {
        const { from } = props.route.params;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            from === "Welcome" 
            ? navigation.navigate("HomeTabs")
            : navigation.goBack()
        })
        .catch(error => setErrMessage(error.message));
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={Logo} style={styles.logo}/>
                <View style={{ alignSelf: "center" }}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Email Address"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </View>
                <View style={styles.errorMessage}>
                    { errMessage && <Text style={styles.error}>{errMessage}</Text>}
                </View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={styles.linearBtn}>
                    <TouchableOpacity style={styles.logInBtn} onPress={handleLogIn}>
                        <Text style={styles.logInText}>Log In</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>
                        New to Aoun? <Text style={{ color: "#E9446A" }}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "3rem"
    },
    logo: {
        marginTop: "15rem",
        marginBottom: "10rem",
        height: "40rem",
        width: "40rem",
        alignSelf: "center"
    },
    input: {
        marginTop: "5rem",
        width: "90%",
        aspectRatio: 1/.18,
        fontSize: "4rem",
        backgroundColor: "#FFF",
        borderRadius: 30,
        paddingLeft: "5rem",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    errorMessage: {
        marginTop: "6rem",
        height: "4rem"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: "4rem"
    },
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.2,
        alignSelf: "center",
        marginTop: "8rem",
        marginBottom: "4rem",
        marginHorizontal: "3rem",
        borderRadius: 30
    },
    logInBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logInText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "4rem",
        fontWeight: "700"
    },
    signUpBtn: {
        marginVertical: "4rem",
        alignSelf: "center"
    },
    signUpText: {
        fontSize: "4rem"
    }
})