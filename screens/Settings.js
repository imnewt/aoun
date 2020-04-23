import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from 'react-native-extended-stylesheet'
import Ionicons from "react-native-vector-icons/Ionicons"
import * as firebase from "firebase"

import SettingsTag from "../components/SettingsTag"
import SettingsOption from "../components/SettingsOption"

import Huyen from "../images/admin.jpg"
import bg from "../images/info-bg.jpg"

export default function Settings(){
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [logOutVisible, setLogOutVisible] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(() => {
            const user = firebase.auth().currentUser;
            user && setUser(user)
        })
    }, [user]);

    const handleSignOut = () => {
        firebase.auth().signOut();
        setLogOutVisible(true);
        setUser(null);
    }

    const navigateTo = (screen, user) => {
        navigation.navigate(screen, { from: "Settings", user });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={logOutVisible}
                >
                    <View style={styles.modalCtn}>
                        <View style={styles.modal}>
                            <Ionicons name="ios-checkmark-circle-outline" size={70} color="#109648"/>
                            <Text style={styles.modalText}>Logout Success!</Text>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                activeOpacity={.7}
                                onPress={() => setLogOutVisible(false)}
                            >
                                <Text style={styles.modalBtnText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.bgWrapper}>
                    <ImageBackground style={styles.bg} source={bg}>
                        <Image style={styles.avatar} source={Huyen}/>
                        { user 
                            ?   <View style={styles.greeting}>
                                    <Text style={styles.hi}>Welcome back,</Text>
                                    <Text style={styles.userName}>{user.displayName || "Aouner"}</Text>
                                </View>
                            :   <View style={styles.greeting}>
                                    <Text style={styles.hi}>Hi there!</Text>
                                </View>
                        } 
                    </ImageBackground>
                </View>
                <View style={styles.optionsCtn}>
                    <SettingsTag iconName="ios-contact" title="account" color="#4c6ffe"/>
                    {   user 
                    ?   <View>
                            <SettingsOption title="edit profile" func={() => navigateTo("Profile")}/>
                            <SettingsOption title="change password" func={() => navigateTo("Password")}/>
                            <SettingsOption title="log out" func={handleSignOut}/>
                        </View>
                    :   <View>
                            <SettingsOption title="log in" func={() => navigateTo("Login")}/>
                            <SettingsOption title="create new" func={() => navigateTo("Register")}/>
                        </View>
                    }
                    
                    <SettingsTag iconName="ios-settings" title="settings" color="#999"/>
                    <SettingsOption title="notifications"/>
                    <SettingsOption title="privacy policy"/>

                    <SettingsTag iconName="ios-call" title="contact" color="#5cb85c"/>
                    <SettingsOption title="support"/>
                    <SettingsOption title="about us"/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    },
    modalCtn: {
        flex: 1,
        backgroundColor: "#171718D1",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#FFF",
        width: "80%",
        aspectRatio: 1/.7,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    modalText: {
        fontSize: "5.5rem",
        fontWeight: "700",
        marginTop: "3rem"
    },
    modalBtn: {
        backgroundColor: "#84D9FA",
        marginTop: "6rem",
        paddingVertical: "3.5rem",
        paddingHorizontal: "10rem",
        borderRadius: 10
    },
    modalBtnText: {
        fontSize: "4rem",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    input: {
        marginTop: "3rem",
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
    bgWrapper: {
        marginTop: "5rem",
        width: "90%",
        alignSelf: "center",
        aspectRatio: 1/0.45, 
        borderRadius: 30, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
        overflow: "hidden"
    },
    bg: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    avatar: {
        width: "20rem",
        height: "20rem",
        borderRadius: 99,
        marginLeft: "8rem"
    },
    greeting: {
        marginLeft: "5rem"
    },
    hi: {
        fontSize: "5.2rem",
        fontStyle: "italic",
        fontWeight: "700"
    },
    userName: {
        fontSize: "7.2rem",
        fontWeight: "700"
    },
    optionsCtn: {
        marginBottom: "5rem"
    }
})