import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import EStyleSheet from 'react-native-extended-stylesheet'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import * as firebase from "firebase"

export default function Register(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { from } = props.route.params;

    const handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName, phoneNumber
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
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalCtn}>
                        <View style={styles.modal}>
                            <Ionicons name="ios-checkmark-circle-outline" size={70} color="#109648"/>
                            <Text style={styles.modalText}>User Created!</Text>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                activeOpacity={.7}
                                onPress={navigate}
                            >
                                <Text style={styles.modalBtnText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.create}>Create new account</Text>
                <View style={{ alignSelf: "center" }}>
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
                        onChangeText={displayName => setDisplayName(displayName)}
                        value={displayName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        autoCapitalize="none"
                        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                        value={phoneNumber}
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
    modalCtn: {
        flex: 1,
        backgroundColor: "#171718D1",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: "80%",
        aspectRatio: 1/.7,
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    modalText: {
        fontSize: "5.5rem",
        fontWeight: "700",
        marginTop: "3rem",
        marginBottom: "6rem"
    },
    modalBtn: {
        backgroundColor: "#84D9FA",
        paddingVertical: "3.5rem",
        paddingHorizontal: "10rem",
        borderRadius: 10
    },
    modalBtnText: {
        fontSize: "4rem",
        fontWeight: "700",
        textTransform: "uppercase"
    },
    create: {
        marginTop: "20rem",
        marginBottom: "6rem",
        marginLeft: "6rem",
        color: "#FF5A5A",
        fontSize: "6rem",
        fontWeight: "700",
        fontStyle: "italic",
        textTransform: "uppercase"
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
        aspectRatio: 1/0.18,
        alignSelf: "center",
        marginTop: "8rem",
        marginBottom: "4rem",
        marginHorizontal: "3rem",
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
        fontSize: "4rem",
        fontWeight: "700"
    },
    warnText: {
        marginVertical: "4rem",
        marginHorizontal: "4rem",
        fontSize: "4.45rem",
        color: "#858383",
        textAlign: "center"
    }
})