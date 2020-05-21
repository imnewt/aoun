import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"

export default function OrderItem(props) {
    const navigation = useNavigation()
    const { order, user } = props
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" source={{uri: order.cartItems[0].imageUrl}} style={styles.img}/>
            <View style={styles.info}>
                <View style={styles.block}>
                    <Text style={styles.title}>Order No:</Text>
                    <Text style={styles.content}>{order.no}</Text>
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Order Date:</Text>
                    <Text style={styles.content}>{order.date}</Text>
                </View>
                <View style={styles.block}>
                    <Text style={styles.title}>Status:</Text>
                    <Text style={styles.content}>{order.isChecked ? "Accepted" : "Pending"}</Text>
                </View>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#FF9966", "#FF5E62"]} style={styles.linearBtn}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("OrderDetail", { order, user })}>
                        <Text style={styles.btnText}>see details</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: "4rem",
        alignSelf: "center",
        padding: "2.5rem",
        width: "85%",
        aspectRatio: 1/.55,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    img: {
        flex: 1,
        borderRadius: 10
    },
    info: {
        flex: 2,
        marginLeft: "2rem"
    },
    block: {
        marginTop: "3rem",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: "4.2rem",
        fontWeight: "700"
    },
    content: {
        fontSize: "4.2rem",
        fontWeight: "normal"
    },
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.3,
        borderRadius: 20,
        backgroundColor: "#DDECFF",
        alignSelf: "center",
        marginTop: "3rem"
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        fontSize: "4rem",
        textTransform: "capitalize",
        fontWeight: "700",
        color: "#FFF"
    }
}) 