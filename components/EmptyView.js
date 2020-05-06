import React from "react"
import { View, Image, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function EmptyView(props){
    const { img, text, textColor } = props
    return (
        <View style={styles.container}>
            <Image resizeMode="contain" source={img} style={styles.img} />
            <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: "100rem",
        height: "100rem"
    },
    text: {
        fontSize: "7rem",
        fontWeight: "700",
        textTransform: "uppercase"
    }
}) 