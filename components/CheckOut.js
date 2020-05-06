import React from 'react'
import { View, Text } from "react-native"

import EStyleSheet from 'react-native-extended-stylesheet'

import LinearButton from "../components/LinearButton"

export default function CheckOut(props){
    const { totalMoney, onPress } = props;

    const roundTo = (n, digits) => {
        digits === undefined && (digits = 0);    
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    return (
        <View style={styles.container}>
            <View style={styles.moneyCtn}>
                <Text style={styles.money}>Subtotal:</Text>
                <Text style={[styles.money, { textAlign: "right" }]}>${roundTo(totalMoney,2)}</Text>
            </View>
            <LinearButton onPress={onPress} title="check out"/>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderTopColor: "#EEE",
        borderTopWidth: 1
    },
    moneyCtn: {
        flexDirection: "row",
        marginTop: "2rem",
        marginHorizontal: "10rem",
        alignSelf: "flex-end",
    },
    money: {
        flex: 1,
        fontSize: "5.5rem",
        fontWeight: "700"
    }
}) 