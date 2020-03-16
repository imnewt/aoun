import React from 'react';
import { 
    View, 
    SafeAreaView, 
    Image, Text, 
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from "@react-navigation/native"

import WelcomeImg from "../images/welcome.jpg"

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" source={WelcomeImg} style={styles.welcomeImg}/>
            <View style={styles.content}>
                <Text style={styles.sayHi}>Welcome to Aoun</Text>
                <Text style={styles.present}>Aoun is the place to discover fun, exciting books for your life. Let's join our community to approach a huge collection of books and enjoy the world's best books with no effort.</Text>
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
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
    },
    welcomeImg: {
        width: "100%",
        height: "55%",
        borderColor: "#EEE",
        borderWidth: 1
    },
    content: {
        height: "45%",
        paddingHorizontal: "1.5rem",
    },
    sayHi: {
        flex: 2,
        fontSize: "1.8rem",
        fontWeight: "700",
        textAlignVertical: "center"
    },
    present: {
        flex: 3,
        fontSize: ".9rem"
    },
    navBlock: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    linearBtn: {
        width: "48%",
        height: "60%",
        borderRadius: 20,
        backgroundColor: "#DDECFF"
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        fontSize: ".9rem",
        fontWeight: "700",
        color: "#242424"
    }
});