import React from "react"
import { View, ScrollView, AsyncStorage } from "react-native"
import EmptyView from "../components/EmptyView"
import EmptyHeading from "../components/EmptyHeading"
import OrderItem from "../components/OrderItem"
import EmptyOrder from "../images/empty-order.jpg"
import { HOST } from "../env"

export default class Orders extends React.Component {
    state= {
        user: null,
        order: []
    }

    componentDidMount() {
        this.getData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.user === this.state.user && nextState.order === this.state.order){
            return false
        }
        if (nextState.order === this.state.order) {
            return false
        }
        return true
    }

    componentDidUpdate() {
        this.getData();
    }

    getData = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (userEmail) {
            await fetch(`${HOST}/api/users`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userEmail
                })
            }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({user: json.user[0]})
                }
            })
            const { user } = this.state;
            if (user) {
                this.getOrder();
            }
        }
        else {
            this.setState({
                user: null,
                order: []
            })
        }
    }

    getOrder = () => {
        const { user } = this.state
        fetch(`${HOST}/api/orders`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user
            })
        }).then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    order: json.message
                })
            }
        })
    }

    render() {
        const { user, order } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#FFF5F0" }}>
                { !user || order.length == 0
                ?   <EmptyView img={EmptyOrder} text="you have no order" textColor="#EC5F56"/>
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
}
// import React, { useState, useEffect } from "react"
// import { View, ScrollView, AsyncStorage } from "react-native"
// import EmptyView from "../components/EmptyView"
// import EmptyHeading from "../components/EmptyHeading"
// import OrderItem from "../components/OrderItem"
// import EmptyOrder from "../images/empty-order.jpg"
// import { HOST } from "../env"

// export default function Orders() {
//     const [user, setUser] = useState(null);
//     const [userEmail, setUserEmail] = useState("");
//     const [order, setOrder] = useState([]);
    
//     // useDidMountEffect(() => {
//     //     getData();
//     // })

//     useEffect(() => {
//         // setUser(null);
//         getData();
//         // console.log(userEmail);
//     }, [user])

//     const getData = async () => {
//         // CLEAR WHEN USER LOG OUT BUT FAIL ON LOG IN
//         const email = await AsyncStorage.getItem("userEmail");
//         setUserEmail(email);
//         if (userEmail !== "") {
//             console.log("co mail")
//             fetch(`${HOST}/api/users`, {
//                 method: "POST",
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     userEmail
//                 })
//             }).then(res => res.json())
//             .then(json => {
//                 if (json.success) {
//                     setUser(json.user[0]);
//                 }
//                 else {
//                     setErrMessage(json.message);
//                 }
//             })
//             if (user) {
//                 getOrder();
//             }
//         }
//         else {
//             setUser(null);
//             setOrder([]);
//         }
//     }

//     const getOrder = () => {
//         fetch(`${HOST}/api/orders`, {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 user
//             })
//         }).then(res => res.json())
//         .then(json => {
//             if (json.success) {
//                 setOrder(json.message);
//             }
//             else {
//                 setErrMessage(json.message);
//             }
//         })
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: "#FFF5F0" }}>
//             { !user || order.length == 0
//             ?   <EmptyView img={EmptyOrder} text="your cart is empty" textColor="#EC5F56"/>
//             :   <View style={{ flex: 1 }}>
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         <EmptyHeading text="your order"/>
//                         {
//                             order.map((item,index) => 
//                                 <OrderItem order={item} user={user} key={index}/>)
//                         }
//                     </ScrollView>
//                 </View>
//             }
//         </View>
//     )
// }