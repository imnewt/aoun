import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function SettingsOption({ iconName, title, color }) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <Ionicons name={iconName} size={30} color={color}/>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Ionicons style={styles.arrow} name="ios-arrow-forward" size={25} color="#AAA"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        //height: 250,
        //borderColor: "red",
        //borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        marginLeft: 15,
        fontSize: 18
    },
    arrow: {
        flex: 1,
        textAlign: "right"
    }
}) 