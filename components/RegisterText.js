import React from "react"
import { Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function RegisterText() {
    return (
        <Text style={styles.container}>
            "By <Text style={{ color: "#E9446A" }}>clicking Register</Text>
            , you agree to our Terms of Services."
        </Text>
    )
}

const styles = EStyleSheet.create({
    container: {
        marginVertical: "4rem",
        marginHorizontal: "10rem",
        fontSize: "4rem",
        color: "#858383",
        textAlign: "center"
    }
}) 