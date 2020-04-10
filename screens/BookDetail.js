import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Rating } from "react-native-elements"

import { CartContext } from "../contexts/Cart"

export default function BookDetail(props) {
    const { book } = props.route.params;
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bookMainInfo}>
                    <Image resizeMode="stretch" style={styles.bookImg} source={{uri: book.imageUrl}} />
                    <Text style={styles.bookName}>{book.name}</Text>
                    <Text style={styles.bookAuthor}>by {book.author}</Text>
                    <View style={styles.bookRating}>
                        <Rating 
                            imageSize={20}
                            readonly
                            startingValue={book.rating}
                        />
                        <Text style={{ color: "gray", marginLeft: 10 }}>{book.rating}/5</Text>
                    </View>
                    <Text style={styles.bookDescription}>{book.description}</Text>
                </View>
                <CartContext.Consumer>
                    {({ addToCart }) => (
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={styles.linearBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => addToCart(book)}>
                                <Text style={styles.btnText}>Add To Cart (${book.price})</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                </CartContext.Consumer>
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    },
    bookMainInfo: {
        alignItems: "center",
        paddingVertical: "4rem",
        paddingHorizontal: "2rem",
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    bookImg: {
        width: "40rem",
        aspectRatio: 1/1.8,
        borderRadius: 10
    },
    bookName: {
        marginTop: "4rem",
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: "6rem",
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: "3rem",
        fontSize: "4.5rem",
        color: "gray"
    },
    bookRating: {
        flexDirection: "row", 
        alignItems: "center",
        marginTop: "3rem"
    },
    bookDescription: {
        marginTop: "6rem",
        marginHorizontal: "4rem",
        fontSize: "4.5rem"
    },
    linearBtn: {
        width: "80%",
        aspectRatio: 1/0.2,
        alignSelf: "center",
        marginVertical: "3rem",
        marginHorizontal: "3rem",
        borderRadius: 30
    },
    btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: "4rem",
        fontWeight: "700"
    }
})