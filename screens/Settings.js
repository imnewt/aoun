import React, { useState, useEffect } from "react"
import { View, ScrollView, Image, Text, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"
import CustomModal from "../components/CustomModal"
import SettingsTag from "../components/SettingsTag"
import SettingsOption from "../components/SettingsOption"
import User from "../images/user.jpg"
import bg from "../images/info-bg.jpg"

export default function Settings(){
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(() => {
            const user = firebase.auth().currentUser;
            user && setUser(user);
        })
    }, [user]);

    const handleSignOut = () => {
        firebase.auth().signOut();
        setModalVisible(true);
        setUser(null);
    }

    const navigateTo = (screen, user) => {
        navigation.navigate(screen, { from: "Settings", user });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomModal 
                    title="logout success"
                    btnText="ok"
                    visible={modalVisible}
                    onPress={setModalVisible}
                />
                <View style={styles.bgWrapper}>
                    <ImageBackground style={styles.bg} source={bg}>
                        <Image style={styles.avatar} source={User}/>
                        { user 
                            ?   <View style={styles.greeting}>
                                    <Text style={styles.hi}>Welcome back,</Text>
                                    <Text style={styles.userName}>{user.displayName || "new member"}</Text>
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
                    <SettingsOption title="privacy policy" func={() => navigateTo("Policy")}/>

                    <SettingsTag iconName="ios-call" title="contact" color="#5cb85c"/>
                    <SettingsOption title="support" func={() => navigateTo("Support")}/>
                    <SettingsOption title="about us" func={() => navigateTo("About")}/>
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
        marginTop: "10rem",
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
        marginLeft: "5rem",
        marginRight: "2rem",
        flexShrink: 1
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
        marginBottom: "10rem"
    }
})