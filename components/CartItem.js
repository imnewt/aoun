import React from 'react'
import { View, Image, Text, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from "react-native-vector-icons/Ionicons"

export default function CartItem(props) {
    const { book, increaseAmount, decreaseAmount, removeBook } = props;
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" style={styles.img} source={{uri: book.imageUrl}}/>
            <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookPrice}>${book.price}</Text>
            </View>
            <View style={styles.quantityBlock}>
                <TouchableOpacity style={styles.changeAmount} onPress={() => decreaseAmount(book)}>
                    <Ionicons name="md-remove" size={20}/>
                </TouchableOpacity>
                <Text style={styles.quantity}>{book.quantity}</Text>
                <TouchableOpacity style={styles.changeAmount} onPress={() => increaseAmount(book)}>
                    <Ionicons name="md-add" size={20}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.remove} onPress={() => removeBook(book)}>
                <Ionicons name="md-close" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        marginBottom: "4rem",
        marginHorizontal: "3rem",
        width: "90%",
        aspectRatio: 1/.5,
        flexDirection: "row",
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
        margin: "3rem"
    },
    bookInfo: {
        flex: 2,
        marginTop: "2rem"
    },
    bookName: {
        marginTop: "4rem",
        fontSize: "4.5rem",
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: "4rem",
        fontSize: "4.5rem",
        color: "grey"
    },
    bookPrice: {
        marginTop: "4rem",
        fontSize: "4.5rem",
        fontWeight: "700"
    },
    quantityBlock: {
        position: "absolute",
        right: "4rem",
        bottom: "4rem",
        flexDirection: "row",
        justifyContent: "center"
    },
    changeAmount: {
        alignItems: "center",
        justifyContent: "center",
        width: "7rem",
        height: "7rem",
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: "#AAA"
    },
    quantity: {
        fontSize: "5rem",
        width: "8rem",
        textAlign: "center",
        fontWeight: "700"
    },
    remove: {
        position: "absolute",
        right: -10,
        top: -10,
        backgroundColor: "#EF5658",
        paddingHorizontal: "2.4rem",
        paddingVertical: "1.2rem",
        borderRadius: 10
    }
}) 