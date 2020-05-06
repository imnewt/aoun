import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'

import EmptyView from "../components/EmptyView"
import EmptyOrder from "../images/empty-order.jpg"

export default function Orders() {
    return (
        <View style={styles.container}>
            <EmptyView img={EmptyOrder} text="you have no orders" textColor="#EC5F56"/>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    }
});