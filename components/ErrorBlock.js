import React from "react"
import { View, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function ErrorBlock(props){
    const { errMessage } = props;

    return (
        <View style={styles.container}>
            { errMessage && <Text style={styles.error}>{errMessage}</Text>}
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        height: "20rem",
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        textAlign: "center",
        color: "#F00",
        fontSize: "4rem"
    },
}) 