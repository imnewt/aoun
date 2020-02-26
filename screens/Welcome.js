import React, { Component } from 'react';
import { View, SafeAreaView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import WelcomeImg from "../images/welcome.jpg"

export default class Welcome extends Component {

    render() {
        const { navigate } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
                    <Image resizeMode="stretch" source={WelcomeImg} style={styles.welcomeImg}/>
                    <View style={styles.content}>
                        <Text style={styles.sayHi}>Welcome to Aoun</Text>
                        <Text style={styles.present}>Join our community to approach huge collections of books and enjoy the world's best books with no effort.</Text>
                        <View style={styles.navBlock}> 
                            <TouchableOpacity style={styles.btn} onPress={() => navigate("HomeTabs")}>
                                <Text style={styles.btnText}>Get started</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {backgroundColor: "#FF6253"}]} onPress={() => navigate("Login", { from: "Welcome" })}>
                                <Text style={[styles.btnText, {color: "#FFF"}]}>Log in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        height: "100%",
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
    btn: {
        width: 170,
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#ddecff"
    },
    btnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    }
});