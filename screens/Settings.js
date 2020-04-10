import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  ImageBackground
} from 'react-native';
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from 'react-native-extended-stylesheet'
import * as firebase from "firebase"
import Huyen from "../images/admin.jpg"
import SettingsTag from "../components/SettingsTag"
import SettingsOption from "../components/SettingsOption"
import bg from "../images/info-bg.jpg"


export default function Settings(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(() => {
            const user = firebase.auth().currentUser;
            user && setUser(user)
        })
    });

    const handleSignOut = () => {
        firebase.auth().signOut();
        setUser(null);
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bgWrapper}>
                    <ImageBackground style={styles.bg} source={bg}>
                        <Image style={styles.avatar} source={Huyen}/>
                        { user 
                            ?   <View style={styles.greeting}>
                                    <Text style={styles.hi}>Welcome back,</Text>
                                    <Text style={styles.userName}>{user.displayName}</Text>
                                </View>
                            :   <View style={styles.greeting}>
                                    <Text style={styles.hi}>Hi there!</Text>
                                </View>
                        } 
                    </ImageBackground>
                </View>
                <View style={styles.optionsCtn}>
                    { user && 
                        <View>
                            <SettingsTag iconName="ios-contact" title="accounts" color="#4c6ffe" />
                            <SettingsOption title="edit profile" />
                            <SettingsOption title="change password" />
                            <SettingsOption title="log out" func={handleSignOut} />
                        </View>
                    }
                    
                    <SettingsTag iconName="ios-settings" title="settings" color="#999" />
                    <SettingsOption title="notifications" />
                    <SettingsOption title="privacy policy" />

                    <SettingsTag iconName="ios-call" title="contact" color="#5cb85c" />
                    <SettingsOption title="support" />
                    <SettingsOption title="about us" />
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
        marginLeft: "12rem"
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