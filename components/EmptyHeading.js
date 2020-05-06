import React from "react"
import { Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function HeadingEmpty(props){
    const { text } = props;
    return (
        <Text style={styles.text}>{text}</Text>
    )
}

const styles = EStyleSheet.create({
    text: {
        marginTop: "12rem",
        marginBottom: "6rem",
        marginLeft: "10rem",
        color: "#FF5A5A",
        fontSize: "6rem",
        fontWeight: "700",
        fontStyle: "italic",
        textTransform: "uppercase"
    }
}) 