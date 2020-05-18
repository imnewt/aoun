import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Container from "../components/Container"
import LinearGradient from "react-native-linear-gradient"
import EStyleSheet from "react-native-extended-stylesheet"

import WelcomeImg from "../images/welcome.jpg"

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <Container>
            <View style={styles.imgCtn}>
                <Image source={WelcomeImg} style={styles.img}/>
            </View>
            <View style={styles.content}>
                <Text style={styles.sayHi}>Welcome to Aoun</Text>
                <Text style={styles.present}>Aoun is the place to discover fun, exciting and colorful books for your life. Join our community to approach a huge collection of books, meet new friends and enjoy the world's best books with no effort.</Text>
                <View style={styles.navBlock}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#83a4d4", "#b6fbff"]} style={styles.linearBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("HomeTabs")}>
                            <Text style={styles.btnText}>Get started</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#FF9966", "#FF5E62"]} style={styles.linearBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login", { from: "Welcome" })}>
                            <Text style={[styles.btnText, { color: "#FFF" }]}>Log in</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Container>
    )
}

const styles = EStyleSheet.create({
    imgCtn: {
        width: "100%",
        aspectRatio: 1/1,
    },
    img: {
        width: "100%",
        height: "100%"
    },
    content: {
        flex: 1,
        paddingHorizontal: "5rem",
    },
    sayHi: {
        flex: 2,
        fontSize: "10rem",
        fontWeight: "700",
        textAlignVertical: "center",
        marginTop: "4rem"
    },
    present: {
        flex: 4,
        fontSize: "5.5rem",
        marginVertical: "2rem"
    },
    navBlock: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "3rem",
        marginBottom: "5rem"
    },
    linearBtn: {
        width: "47%",
        aspectRatio: 1/0.45,
        borderRadius: 20,
        backgroundColor: "#DDECFF"
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        fontSize: "5rem",
        fontWeight: "700",
        color: "#242424"
    }
})