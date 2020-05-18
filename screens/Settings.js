import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import UserNameBlock from "../components/UserNameBlock"
import SettingsTag from "../components/SettingsTag"
import SettingsOption from "../components/SettingsOption"

export default function Settings(){
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            user && setUser(user);
        })
    })

    const handleSignOut = () => {
        firebase.auth().signOut();
        setModalVisible(true);
        setUser(null);
    }

    const navigateTo = (screen, user) => {
        navigation.navigate(screen, { from: "Settings", user });
    }

    return (
        <Container>
            <CustomModal 
                title="logout success"
                btnText="ok"
                visible={modalVisible}
                onPress={setModalVisible}
            />
            <UserNameBlock user={user}/>
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
        </Container>
    )
}

const styles = EStyleSheet.create({
    optionsCtn: {
        marginBottom: "10rem"
    }
})