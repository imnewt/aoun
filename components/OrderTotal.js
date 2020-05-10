import React from "react"
import { View, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function OrderTotal(props) {
    const { money, shipTax, tax, discount, total } = props;
    return ( 
        <View style={styles.container}>
            <View style={styles.block}>
                <Text style={styles.title}>subtotal:</Text>
                <Text style={styles.money}>$ {money}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.title}>shipping fee:</Text>
                <Text style={styles.money}>$ {shipTax}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.title}>tax fee:</Text>
                <Text style={styles.money}>$ {tax}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.title}>discount:</Text>
                <Text style={[styles.money, { color: "#85DDAD" }]}>$ {discount}</Text>
            </View>
            <View style={[styles.block, styles.totalBlock]}>
                <Text style={[styles.title, styles.total]}>total:</Text>
                <Text style={[styles.money, styles.total]}>$ {total}</Text>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        marginBottom: "4rem",
        padding: "3rem",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    block: {
        marginTop: "1rem",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        textTransform: "capitalize",
        fontSize: "4rem"
    },
    money: {
        fontSize: "4rem",
        fontWeight: "700"
    },
    totalBlock: {
        borderTopWidth: 1, 
        borderTopColor:"#EEE",
        marginTop: "2rem", 
        paddingTop: "2rem"
    },
    total: {
        fontWeight: "700",
        fontSize: "4.5rem"
    }
}) 