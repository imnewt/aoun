import React from "react"
import { View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function InputContainer(props){
    return (
        <View style={styles.form}>
            { props.children }
        </View>
    )
}

const styles = EStyleSheet.create({
    form: {
        paddingTop: "20rem",
        alignSelf: "center"
    },
}) 