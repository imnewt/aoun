import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

export default function Register() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);

    const handleSignUp = () => {
        firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    return userCredentials.user.updateProfile({
                        displayName: name
                    })
                })
                .then(navigation.navigate("HomeTabs"))
                .catch(error => setErrMessage(error.message))
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.create}>Create new account</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Your Email"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Full Name"
                        onChangeText={name => setName(name)}
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
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
                    <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.warnText}>
                    "By <Text style={{ color: "#E9446A" }}>clicking Register</Text>
                    , you agree to our Terms of Services."
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "1.2rem"
    },
    create: {
        marginTop: "3rem",
        marginLeft: ".7rem",
        fontSize: "1.8rem",
        fontWeight: "700",
        fontStyle: "italic",
        color: "#ff5a5a"
    },
    form: {
        height: "16rem"
    },
    input: {
        marginTop: "1rem",
        height: "3rem",
        fontSize: ".9rem",
        backgroundColor: "#FFF",
        borderRadius: 30,
        paddingLeft: "1.1rem",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    errorMessage: {
        height: "4rem",
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: ".9rem"
    },
    linearBtn: {
        height: "2.7rem",
        marginHorizontal: "1.8rem",
        borderRadius: 30
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "1rem",
        fontWeight: "700"
    },
    warnText: {
        marginTop: "1rem",
        marginHorizontal: "1rem",
        fontSize: ".9rem",
        color: "#858383",
        textAlign: "center"
    }
});