import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import firebase from "firebase"
import EmptyView from "../components/EmptyView"
import EmptyOrder from "../images/empty-order.jpg"
import { FlatList } from 'react-native-gesture-handler'

export default function Orders() {
    const [user, setUser] = useState(null);
    const [received, setReceived] = useState([]);
    const [order, setOrder] = useState([]);

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         setOrder([]);
    //         if (user) {
    //             setUser(user);
                
    //             // GET DATA
    //             fetch('http://192.168.43.110:3000/api/orders', {
    //                 method: 'GET'
    //             })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 setOrder(responseJson);
    //                 // console.log(responseJson)
    //             })
    //             .catch(error => console.error(error));

    //             // CHECK ISADMIN
    //             if (user.uid === "Wbthx7q7xJXohFu4VuhXDPPLEPw1") {
    //                 const filtered = order.filter(item => item.isChecked === false);
    //                 // console.log("Is admin")
    //                 setOrder(filtered);
    //                 // console.log("isadin")
    //             }
    //             else {
    //                 const filtered = order.filter(item => item.userId === user.uid);
    //                 // console.log(filtered)
    //                 if (filtered.length > 0) {
    //                     setOrder(filtered);
    //                     // console.log("Is user and has data")
    //                 }
    //                 // else {
    //                 //     console.log("Is user and doesnt has data")
    //                 // }
    //                 // console.log("isuser")
    //             }
    //         }
    //         // else {
    //         //     console.log("Is anonymous", order)
    //         //     // console.log("is any")
    //         // }
    //     })
    // }, [user])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            user && setUser(user);
            if (user) {
                fetch('http://192.168.43.110:3000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user
                    }),
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.success) {
                        console.log(responseJson)
                        // setOrder(responseJson)
                    } else {
                        console.log('Error get order');
                    }
                })
                .catch(error => console.error(error));
            }
        })
    }, [user])
    

    return (
        <View style={styles.container}>
            <EmptyView img={EmptyOrder} text="you have no orders" textColor="#EC5F56"/>
            {/* <FlatList
                data={order}
                renderItem={({ item }) => (
                    <Text>{item.userId || "nothing here"}</Text>
                )}
                keyExtractor={item => item._id}
                /> */}
                { order.length ? <Text>{order.length}</Text> : null}
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    }
});