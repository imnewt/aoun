import React, { useState } from 'react'
import { View, ScrollView, TextInput, Text, Modal, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from "react-native-vector-icons/Ionicons"
import * as firebase from "firebase"

export default function Password() {
    const navigation = useNavigation();
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalCtn}>
                        <View style={styles.modal}>
                            <Ionicons name="ios-checkmark-circle-outline" size={70} color="#109648"/>
                            <Text style={styles.modalText}>Update Success!</Text>
                            <Text style={styles.modalContent}>Changes will be applied the next time you log in.</Text>
                            <TouchableOpacity
                                style={styles.modalBtn}
                                activeOpacity={.7}
                                onPress={() => { setModalVisible(false); navigation.goBack() }}
                            >
                                <Text style={styles.modalBtnText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                    <LinearGradient 
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}} 
                        colors={["#ff9966", "#ff5e62"]} 
                        style={styles.linearBtn}
                    >
                        <TouchableOpacity 
                            style={styles.btn} 
                            onPress={() => validate()}
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
    modalCtn: {
        flex: 1,
        backgroundColor: "#171718D1",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#FFF",
        width: "80%",
        aspectRatio: 1/.85,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    modalText: {
        fontSize: "5.5rem",
        fontWeight: "700",
        marginTop: "3rem"
    },
    modalContent: {
        fontSize: "4rem",
        marginHorizontal: "3rem",
        textAlign: "center",
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
    },
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.18,
        alignSelf: "center",
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