import React, { useState, useEffect } from "react"
import { View, AsyncStorage } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import UserNameBlock from "../components/UserNameBlock"
import SettingsTag from "../components/SettingsTag"
import SettingsOption from "../components/SettingsOption"
import { useDidMountEffect } from "../functions"

export default function Settings(props){
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    useDidMountEffect(() => {
        const { email } = props.route.params;
        setUserEmail(email);
    }, [props.route.params])


    useEffect(() => {
        getUserEmail();
    })

    const getUserEmail = async () => {
        const email = await AsyncStorage.getItem("userEmail");
        email && setUserEmail(email);
    }

    const handleSignOut = async () => {
        setUserEmail("");
        await AsyncStorage.removeItem("userEmail");
        setModalVisible(true);
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
            <UserNameBlock userEmail={userEmail}/>
            <View style={styles.optionsCtn}>
                <SettingsTag iconName="ios-contact" title="account" color="#4c6ffe"/>
                {   userEmail
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
                {/* <SettingsOption title="notifications"/> */}
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