import React from "react"
import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

import bg from "../images/welcome.jpg"

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <ImageBackground resizeMode="stretch" style={styles.bg} source={bg}>
            <View style={styles.container}>
                <View style={styles.empty}></View>
                <View style={styles.content}>
                    <Text style={styles.greeting}>Welcome to Aoun</Text>
                    <Text style={styles.text}>Aoun is the place to discover fun, exciting and colorful books for your life. Join our community to approach a huge collection of books, meet new friends and enjoy the world's best books with no effort.</Text>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={.7}
                    onPress={() => navigation.navigate("HomeTabs")}
                >
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = EStyleSheet.create({
    bg: {
        flex: 1,
        alignItems: "center",
        position: "relative"
    },
    container: {
        alignItems: "center",
        position: "absolute",
        bottom: "8rem"
    },
    empty: {
        width: "95%",
        height: "85rem",
        opacity: .5,
        position: "relative",
        backgroundColor: "#FFF",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    content: {
        position: "absolute"
    },
    greeting: {
        color: "#3A3335",
        fontWeight: "700",
        fontSize: "10rem",
        textAlign: "center",
        marginVertical: "4rem"
    },
    text: {
        color: "#3A3335",
        fontWeight: "700",
        fontSize: "6rem",
        marginHorizontal: "7rem"
    },
    btn: {
        width: "95%",
        aspectRatio: 1/0.17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF5F0",
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    btnText: {
        color: "#DD5A5A",
        fontSize: "5rem",
        fontWeight: "700"
    }
})