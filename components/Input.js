import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function Input(props){
    const [passwordShow, setPasswordShow] = useState(false);
    const { label, placeholder, value, setValue, isPassword, isNumeric } = props;

    const toggleIcon = () => {
        passwordShow ? setPasswordShow(false) : setPasswordShow(true)
    }

    return (
        <View style={styles.container}>
            { label && <Text style={styles.label}>{label}</Text> }  
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                autoCapitalize="none"
                keyboardType={isNumeric ? "numeric" : "default"}
                maxLength={isNumeric && 10}
                secureTextEntry={isPassword ? passwordShow ? false : true : false}
                onChangeText={value => setValue(value)}
                value={value}
            />
            { isPassword && 
                <TouchableOpacity 
                    style={styles.icon}
                    activeOpacity={.7}
                    onPress={toggleIcon}
                >
                    <Ionicons name={passwordShow ? "ios-eye" : "ios-eye-off"} size={20} />
                </TouchableOpacity> 
            }
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        position: "relative", 
        alignSelf: "center"
    },
    label: {
        marginLeft: "5rem",
        marginTop: "6rem",
        fontSize: "4.2rem",
        fontWeight: "700",
        fontStyle: "italic"
    },
    input: {
        marginTop: "5rem",
        width: "98%",
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
    icon: {
        position: "absolute",
        width: "10rem",
        height: "10rem",
        alignItems: "center",
        justifyContent: "center",
        right: "3rem",
        bottom: "3rem",
        borderRadius: 10,
        elevation: 2
    }
}) 