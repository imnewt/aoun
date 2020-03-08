import React from 'react';
import { 
    View, 
    SafeAreaView, 
    Image, Text, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native"

import WelcomeImg from "../images/welcome.jpg"

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Image resizeMode="stretch" source={WelcomeImg} style={styles.welcomeImg}/>
            <View style={styles.content}>
                <Text style={styles.sayHi}>Welcome to Aoun</Text>
                <Text style={styles.present}>Join our community to approach huge collections of books and enjoy the world's best books with no effort.</Text>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
    },
    content: {
        paddingHorizontal: 20,
    },
    welcomeImg: {
        height: 400,
        width: "100%",
        borderColor: "#EEE",
        borderWidth: 1
    },
    sayHi: {
        marginTop: 30,
        fontSize: 32,
        fontWeight: "700"
    },
    present: {
        marginTop: 20,
        fontSize: 18
    },
    navBlock: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "space-between"
    },
    btnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#242424"
    },
    linearBtn: {
        width: 170,
        borderRadius: 20,
        backgroundColor: "#ddecff"
    },
    btn: {
        flex: 1,
        padding: 28,
        alignItems: "center",
        justifyContent: "center"
    }
});