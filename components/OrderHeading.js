import React from "react"
import { View, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function OrderHeading(props) {
    const { date, no, address } = props;
    return ( 
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Order Date</Text>
                <Text style={styles.content}>{date}</Text>
            </View>
            <View style={{ flex: 0.9 }}>
                <Text style={styles.title}>Order No</Text>
                <Text style={styles.content}>{no}</Text>
            </View>
            <View style={{ flex: 1.3 }}>
                <Text style={styles.title}>Shipping Address</Text>
                <Text style={styles.content} numberOfLines={1}>{address}</Text>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginTop: "4rem",
        padding: "3rem",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    title: {
        fontSize: "4rem",
        fontWeight: "700"
    },
    content: {
        marginTop: "1rem"
    }
}) 