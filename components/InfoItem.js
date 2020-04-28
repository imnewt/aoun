import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export default function InfoItem(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{props.data.heading}</Text>
            <Text style={styles.content}>{props.data.content}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        marginVertical: "5rem"
    },
    heading: {
        fontWeight: "700",
        fontSize: "5.2rem"
    },
    content: {
        marginTop: "1.5rem",
        fontSize: "4.2rem"
    }
})