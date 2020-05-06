import React, { useState } from "react"
import { View, ScrollView, TextInput, Text } from "react-native"

import EStyleSheet from "react-native-extended-stylesheet"
import firebase from "firebase"

import CustomModal from "../components/CustomModal"
import LinearButton from "../components/LinearButton"

export default function Password() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const validate = () => {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            setErrMessage("Fields can not be blank!")
        }
        else if (newPassword !== confirmPassword) {
            setErrMessage("Passwords do not match!")
        }
        else {
            changePassword(currentPassword, newPassword)
        }
    }

    const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword)
        .then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword)
            .then(() => setModalVisible(true))
        })
        .catch(() => setErrMessage("Current password is incorrect!"))
    }   

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomModal 
                    title="update success"
                    content="Changes will be applied the next time you log in" 
                    btnText="ok" 
                    visible={modalVisible} 
                    onPress={setModalVisible} 
                    goBack={true}
                />
                <View style={styles.content}>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.label}>Current Password</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={currentPassword => setCurrentPassword(currentPassword)}
                            value={currentPassword}
                        />
                        <Text style={styles.label}>New Password</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={newPassword => setNewPassword(newPassword)}
                            value={newPassword}
                        />
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            value={confirmPassword}
                        />
                    </View>
                    <View style={styles.errorMessage}>
                        { errMessage && <Text style={styles.error}>{errMessage}</Text>}
                    </View>
                    <LinearButton onPress={validate} title="save"/>
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
        paddingTop: "20rem"
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
        aspectRatio: 1/.17,
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
    errorMessage: {
        height: "20rem",
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: "4rem"
    }
})