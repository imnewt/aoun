import React, { useState, useEffect } from "react"
import { View, ScrollView } from "react-native"
import firebase from "firebase"
import EmptyView from "../components/EmptyView"
import EmptyHeading from "../components/EmptyHeading"
import OrderItem from "../components/OrderItem"
import EmptyOrder from "../images/empty-order.jpg"
import { HOST } from "../env"

export default function Orders() {
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                fetch(`${HOST}/api/orders`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': `Bearer ${user.uid}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success) {
                        setOrder(responseJson.message);
                    }
                })
                .catch(error => console.error(error));
            }
            else {
                setUser(null);
            }
        })
    })

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF5F0" }}>
            { !user || order.length == 0
            ?   <EmptyView img={EmptyOrder} text="your cart is empty" textColor="#EC5F56"/>
            :   <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <EmptyHeading text="your order"/>
                        {
                            order.map((item,index) => 
                                <OrderItem order={item} user={user} key={index}/>)
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}