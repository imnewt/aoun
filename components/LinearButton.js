import React from "react"
import { Text, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import EStyleSheet from "react-native-extended-stylesheet"

export default function LinearButton(props){
    const { onPress, title, price } = props
    return (
        <LinearGradient 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors={["#ff9966", "#ff5e62"]} 
            style={styles.container}
        >
            <TouchableOpacity 
                style={styles.btn} 
                onPress={onPress}
                activeOpacity={.7}
            >
                <Text style={styles.text}>{title} {price && `($${price})`}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = EStyleSheet.create({
    container: {
        width: "80%",
        aspectRatio: 1/0.18,
        alignSelf: "center",
        marginVertical: "3rem",
        marginHorizontal: "3rem",
        borderRadius: 30
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "4rem",
        fontWeight: "700"
    }
}) 