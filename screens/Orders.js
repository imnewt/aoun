import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import firebase from "firebase"
import EmptyView from "../components/EmptyView"
import EmptyOrder from "../images/empty-order.jpg"
import { FlatList } from 'react-native-gesture-handler'

export default function Orders() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                fetch('http://192.168.1.7:3000/api/orders', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    const data = responseJson;
                    if (user.uid === "Wbthx7q7xJXohFu4VuhXDPPLEPw1") {
                        const filteredOrders = data.filter(item => item.isChecked === false);
                        setOrder(filteredOrders);
                    }
                    else {
                        const filteredOrders = data.filter(item => item.userId === user.uid);
                        setOrder(filteredOrders);
                    }
                })
                .catch(error => console.error(error));
            }
            else {
                setOrder([]);
            }
        })
    })

    return (
        <View style={styles.container}>
            <EmptyView img={EmptyOrder} text="you have no orders" textColor="#EC5F56"/>
            <FlatList
                data={order}
                renderItem={({ item }) => (
                    <Text>{item.userId || "nothing here"}</Text>
                )}
                keyExtractor={item => item._id}
            />
                {/* { order.length ? <Text>{order.length}</Text> : null} */}
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    }
});