import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function CartItem(props) {
    const { book, increaseAmount, decreaseAmount, removeBook } = props;
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" style={styles.bookImg} source={{uri: book.imageUrl}}/>
            <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookPrice}>${book.price}</Text>
            </View>
            <View style={styles.quantityBlock}>
                <TouchableOpacity style={styles.changeAmount} onPress={() => decreaseAmount(book)}>
                    <Ionicons name="md-remove" size={25}/>
                </TouchableOpacity>
                <Text style={styles.quantity}>{book.quantity}</Text>
                <TouchableOpacity style={styles.changeAmount} onPress={() => increaseAmount(book)}>
                    <Ionicons name="md-add" size={25}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.remove} onPress={() => removeBook(book)}>
                <Ionicons name="md-close" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginHorizontal: 15,
        height: 180,
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookImg: {
        flex: 1,
        width: 90,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 10
    },
    bookInfo: {
        flex: 2
    },
    bookName: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: 20,
        fontSize: 16,
        color: "grey"
    },
    bookPrice: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "700"
    },
    quantityBlock: {
        position: "absolute",
        right: 10,
        bottom: 15,
        flexDirection: "row",
        justifyContent: "center"
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
        fontSize: 18,
        width: 35,
        textAlign: "center",
        fontWeight: "700"
    },
    remove: {
        position: "absolute",
        right: -10,
        top: -10,
        backgroundColor: "#ef5658",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    removeText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFF"
    }
}) 