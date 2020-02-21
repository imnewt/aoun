import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from "react-native-elements"

import { CartContext } from "../contexts/Cart"

export default class BookDetail extends Component {
    render() {
        const { book } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.bookDetail}>
                            <Image resizeMode="stretch" style={styles.bookImg} source={{uri: book.imageUrl}} />
                            <View style={styles.bookMainInfo}>
                                <Text style={styles.bookName}>{book.name}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                                <Text style={styles.bookPrice}>${book.price}</Text>
                                <Rating 
                                    imageSize={20}
                                    readonly
                                    startingValue={book.rating}
                                    style={styles.bookRating}
                                />
                            </View>
                        </View>
                        <View style={styles.bookAbout}>
                            {/* <Text style={styles.bookGenre}>GENRE: {book.genre}</Text> */}
                            <Text style={styles.bookDescription}>   {book.description}</Text>
                        </View>
                        <CartContext.Consumer>
                            {({ addToCart }) => (
                                <TouchableOpacity style={styles.button} onPress={() => addToCart(book)}>
                                    <Text style={styles.add}>Add to cart</Text>
                                </TouchableOpacity>
                            )}
                        </CartContext.Consumer>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9"
    },
    content: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookDetail: {
        flexDirection: "row",
        margin: 20,
    },
    bookImg: {
        flex: 1,
        height: 250,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        // elevation: 1
    },
    bookMainInfo: {
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
        fontSize: 18
    },
    bookRating: {
        alignSelf: "flex-start",
        marginTop: 15
    },
    bookAbout: {
        margin: 20,
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderTopColor: "#8A8F9E"
    },
    bookDescription: {
        fontSize: 18
    },
    button: {
        margin: 20,
        padding: 15,
        backgroundColor: "#FF5562",
        alignItems: "center",
        borderRadius: 10
    },
    add: {
        color: "#FFF",
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 18
    }
});