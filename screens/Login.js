import React, { useState } from "react"
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"
import CustomModal from "../components/CustomModal"
import LinearButton from "../components/LinearButton"
import Logo from "../images/logo.jpg"

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
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomModal 
                    title="login success"
                    btnText="ok"
                    visible={modalVisible}
                    onPress={navigate}
                />
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
                <LinearButton onPress={handleLogIn} title="log in"/>
                {
                    from !== "Settings" &&
                    <TouchableOpacity 
                        style={styles.signUpBtn} 
                        onPress={() => navigation.navigate("Register", { from: "Login" })}
                    >
                        <Text style={styles.signUpText}>
                            New to Aoun? <Text style={{ color: "#E9446A" }}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                }
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
        marginTop: "30rem",
        marginBottom: "10rem",
        height: "40rem",
        width: "40rem",
        alignSelf: "center"
    },
    input: {
        marginTop: "5rem",
        width: "95%",
        aspectRatio: 1/.17,
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
        height: "20rem",
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: "4rem"
    },
    signUpBtn: {
        marginVertical: "4rem",
        alignSelf: "center"
    },
    signUpText: {
        fontSize: "4rem"
    }
})