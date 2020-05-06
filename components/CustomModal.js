import React from "react"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import EStyleSheet from "react-native-extended-stylesheet"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function CustomModal(props){
    const { title, content, btnText, visible, onPress, goBack } = props;
    const navigation = useNavigation();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={[styles.modal, { aspectRatio: content ? 1/.85 : 1/.7 }]}>
                    <Ionicons name="ios-checkmark-circle-outline" size={70} color="#109648"/>
                    <Text style={styles.title}>{title}!</Text>
                    { content && <Text style={styles.content}>{content}.</Text> }
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={.7}
                        onPress={() => { onPress(false); goBack && navigation.goBack() }}
                    >
                        <Text style={styles.btnText}>{btnText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171718D1",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#FFF",
        width: "80%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: "5.5rem",
        fontWeight: "700",
        marginTop: "3rem",
        textTransform: "capitalize"
    },
    content: {
        fontSize: "4rem",
        marginHorizontal: "3rem",
        textAlign: "center",
        marginTop: "3rem"
    }, 
    btn: {
        backgroundColor: "#84D9FA",
        marginTop: "6rem",
        paddingVertical: "3.5rem",
        paddingHorizontal: "10rem",
        borderRadius: 10
    },
    btnText: {
        fontSize: "4rem",
        fontWeight: "700",
        textTransform: "uppercase",
    }
})