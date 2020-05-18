// import React, { useState, useEffect } from 'react'
// import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
// import EStyleSheet from 'react-native-extended-stylesheet'
// import firebase from "firebase"
// import EmptyView from "../components/EmptyView"
// import EmptyOrder from "../images/empty-order.jpg"
// import { FlatList } from 'react-native-gesture-handler'
// import { HOST } from "../env"

// export default class Orders extends React.Component {
//     // const [order, setOrder] = useState([]);
//     // const [user, setUser] = useState(null);
//     // const test = [];
//     // useEffect(() => {
//     state = {
//         order: [],
//         user: null
//     }
//     getData = () => {  
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 // this.setState({
//                 //     user: user
//                 // })
//                 fetch(`${HOST}/api/orders`, {
//                     method: 'GET',
//                     headers: new Headers({
//                         'Authorization': `Bearer ${user.uid}`,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     })
//                 })
//                 .then((response) => response.json())
//                 .then((responseJson) => {
//                     if (responseJson.success) {
//                         this.setState({
//                             order: responseJson.message
//                         })
//                     }
//                     else {
//                         console.log('error order');
//                         this.setState({
//                             user: null
//                         })
//                     }
//                 })
//                 .catch(error => console.error(error));
//             } else {
//                 console.log("dang xuat")
//                 this.setState({
//                     user: null,
//                     order: []
//                 })
//             }
//         })
//     }

//     componentDidMount = () => {
//         this.getData();
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         console.log('Next state: ', nextState);
//         console.log('Cur state: ', this.state);
//         if(this.state.order === nextState.order || this.state.user === nextState.user) {
//             return false;
//         }
//         return true;
//     }

//     componentDidUpdate = () => {
//         this.getData();
//     }

//     render() {
//         const { user, order } = this.state;
//     return (
//         <View style={styles.container}>
//             <EmptyView img={EmptyOrder} text="you have no orders" textColor="#EC5F56"/>
//             { user ? <FlatList
//                 data={order}
//                 renderItem={({ item }) => (
//                     <Text>{item.userId || "nothing here"}</Text>
//                 )}
//                 keyExtractor={item => item._id}
//             /> : null}
//         </View>
//     )
// }}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFF5F0"
//     }
// });

import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import firebase from "firebase"
import EmptyView from "../components/EmptyView"
import EmptyOrder from "../images/empty-order.jpg"
import { FlatList } from 'react-native-gesture-handler'
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
        <View style={styles.container}>
            <EmptyView img={EmptyOrder} text="you have no orders" textColor="#EC5F56"/>
            { user ? <FlatList
                data={order}
                renderItem={({ item }) => (
                    <Text>{item.userId || "nothing here"}</Text>
                )}
                keyExtractor={item => item._id}
            /> : null}
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    }
});