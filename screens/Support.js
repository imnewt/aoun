import React from "react"
import { View, ScrollView, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function Support() {
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ flex:1 }} 
        >
            <View style={styles.container}>
                <Text style={styles.text}>For further information or any support, please contact us via:</Text>
                <Text style={styles.info}>Email: <Text style={{ fontWeight: "normal" }}>newt@aoun.com</Text></Text>
                <Text style={styles.info}>Phone: <Text style={{ fontWeight: "normal" }}>+84 85 437 4769</Text></Text>
            </View>
        </ScrollView>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "5rem",
        justifyContent: "center"
    },
    text: {
        fontSize: "4.8rem",
        fontStyle: "italic"
    },
    info: {
        marginTop: "3rem",
        fontWeight: "700",
        fontSize: "4.5rem"
    }
})