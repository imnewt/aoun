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
        backgroundColor: "#FFF5F0",
    },
    bookMainInfo: {
        alignItems: "center",
        paddingVertical: "1rem",
        paddingHorizontal: ".5rem",
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    bookImg: {
        width: "8rem",
        height: "14rem",
        borderRadius: 10
    },
    bookName: {
        marginTop: ".8rem",
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: "1.2rem",
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: ".4rem",
        fontSize: ".8rem",
        color: "gray"
    },
    bookRating: {
        flexDirection: "row", 
        alignItems: "center",
        marginTop: ".4rem"
    },
    bookDescription: {
        marginTop: "1.5rem",
        marginHorizontal: ".5rem",
        fontSize: ".85rem"
    },
    linearBtn: {
        height: "2.7rem",
        marginVertical: "1rem",
        marginHorizontal: "1.8rem",
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
        fontSize: "1rem",
        fontWeight: "700"
    }
})