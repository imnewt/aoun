import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { acceptOrder, deleteOrder } from "../functions"

export default function OrderButton(props) {
    const { order, user, setAptModalVisible, setDclModalVisible } = props;
    return (
        <View>
            {   user.uid === "Wbthx7q7xJXohFu4VuhXDPPLEPw1" 
                ?   <View style={styles.navBlock}>
                        <TouchableOpacity 
                            style={[styles.btn, { backgroundColor: "#4AD560" }]} 
                            activeOpacity={.7} 
                            onPress={() => { acceptOrder(order); setAptModalVisible(true); }}
                        >
                            <Text style={styles.btnText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btn} 
                            activeOpacity={.7} 
                            onPress={() => { deleteOrder(order); setDclModalVisible(true); }}
                        >
                            <Text style={styles.btnText}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                :   !order.isChecked 
                    ?   <TouchableOpacity 
                            style={[styles.btn, { alignSelf: "center" }]} 
                            activeOpacity={.7} 
                            onPress={() => { deleteOrder(order); setDclModalVisible(true); }}
                        >
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                    : null
            }
        </View>
    ) 
}

const styles = EStyleSheet.create({
    navBlock: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: "3rem"
    },
    btn: {
        width: "47%",
        aspectRatio: 1/0.30,
        borderRadius: 20,
        backgroundColor: "#F8392E",
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        fontSize: "5rem",
        fontWeight: "700",
        color: "#FFF"
    }
}) 