import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"
import Container from "../components/Container"
import CustomModal from "../components/CustomModal"
import OrderHeading from "../components/OrderHeading"
import OrderTotal from "../components/OrderTotal"
import OrderButton from "../components/OrderButton"
import SuccessItem from "../components/SuccessItem"
import { roundTo } from "../functions"

export default function OrderDetail(props) {
    const navigation = useNavigation();
    const [aptModalVisible, setAptModalVisible] = useState(false);
    const [dclModalVisible, setDclModalVisible] = useState(false);
    const { order, user } = props.route.params;

    const money = roundTo(order.totalMoney);
    const shipTax = roundTo(money * 0.12);
    const tax = roundTo(money * 0.05);
    const discount = roundTo(money * 0.04);
    const total = roundTo(money + shipTax + tax - discount);

    return (
        <Container pd={true}>   
            <CustomModal 
                title="order accepted"
                btnText="ok"
                visible={aptModalVisible}
                onPress={() => navigation.goBack()}
            />
            <CustomModal 
                title="order deleted"
                btnText="ok"
                visible={dclModalVisible}
                onPress={() => navigation.goBack()}
            />
            <OrderHeading 
                date={order.date}
                no={order.no}
                address={order.address}
            />
            <FlatList
                data={order.cartItems}
                renderItem={({ item }) => (
                    <SuccessItem book={item}/>
                )}
                keyExtractor={item => item._id}
            />
            <OrderTotal 
                money={money}
                shipTax={shipTax}
                tax={tax}
                discount={discount}
                total={total}
            />
            <OrderButton 
                order={order}
                user={user}
                setAptModalVisible={setAptModalVisible}
                setDclModalVisible={setDclModalVisible}
            />
        </Container>
    ) 
}