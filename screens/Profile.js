import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import EStyleSheet from 'react-native-extended-stylesheet'
import { useNavigation } from "@react-navigation/native"
import * as firebase from "firebase"

export default function Profile() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setEmail(user.email);
        setDisplayName(user.displayName);
    }, []);

    const updateProfile = (newEmail, newName) => {
        const user = firebase.auth().currentUser;
        user.updateEmail(newEmail);
        user.updateProfile({ displayName: newName });
        navigation.navigate("Settings");
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.content}>
                    <Text style={styles.heading}>Edit Profile</Text>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.label}>Your Email</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => setEmail(email)}
                            value={email}
                        />
                        <Text style={styles.label}>Display Name</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={displayName => setDisplayName(displayName)}
                            value={displayName}
                        />
                    </View>
                    <LinearGradient 
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}} 
                        colors={["#ff9966", "#ff5e62"]} 
                        style={styles.linearBtn}
                    >
                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={() => updateProfile(email, displayName)}
                            activeOpacity={.7}
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        alignItems: "center"
    },
    content: {
        paddingTop: "30rem"
    },
    heading: {
        alignSelf: "flex-start",
        marginBottom: "6rem",
        marginLeft: "10rem",
        color: "#FF5A5A",
        fontSize: "6rem",
        fontWeight: "700",
        fontStyle: "italic",
        textTransform: "uppercase"
    },
    label: {
        marginLeft: "5rem",
        marginTop: "6rem",
        fontSize: "4.2rem",
        fontWeight: "700",
        fontStyle: "italic"
    },
    input: {
        marginTop: "3rem",
        width: "95%",
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
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.18,
        alignSelf: "center",
        marginTop: "14rem",
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
    }
})