import React from 'react'
import { View, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import Ionicons from "react-native-vector-icons/Ionicons"

export default function SettingsTag({ iconName, title, color }) {
    return (
        <View style={styles.container}>
            <Ionicons name={iconName} size={30} color={color}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "8rem",
        marginTop: "7rem",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: "3rem",
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        marginLeft: "3rem",
        fontSize: "5rem",
        textTransform: "capitalize"
    },
    arrow: {
        flex: 1,
        textAlign: "right"
    }
}) 