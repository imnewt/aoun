import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function CartItem(props) {
    const { book, increaseAmount, decreaseAmount } = props;
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" style={styles.bookImg} source={{uri: book.imageUrl}}/>
            <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookPrice}>${book.price}</Text>   
                <View style={styles.quantityBlock}>
                    <TouchableOpacity style={styles.changeAmount} onPress={() => decreaseAmount(book)}>
                        <Ionicons name="md-remove" size={25}/>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{book.quantity}</Text>
                    <TouchableOpacity style={styles.changeAmount} onPress={() => increaseAmount(book)}>
                        <Ionicons name="md-add" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        height: 250,
        flexDirection: "row"
    },
    bookImg: {
        flex: 1,
        borderRadius: 10
    },
    bookInfo: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 20,
    },
    bookName: {
        fontSize: 22,
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: 15,
        fontSize: 18,
        color: "gray"
    },
    bookPrice: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "700"
    },
    quantityBlock: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    changeAmount: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: "#AAA"
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 18,
        fontWeight: "700"
    },
    sign: {
        fontSize: 20
    }
}) 