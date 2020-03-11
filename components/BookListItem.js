import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { Rating } from "react-native-elements"
import Ionicons from "react-native-vector-icons/Ionicons"

export default function BookListItem(props) {
    const navigation = useNavigation();
    const { book, headerColor } = props;

    const handlePressToBookDetail = (book) => {
        navigation.navigate("BookDetail", { book, headerColor })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePressToBookDetail(book)}>
            <Image style={styles.bookImage} source={{uri: book.imageUrl}} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Rating 
                    imageSize={20}
                    readonly
                    startingValue={book.rating}
                    style={styles.bookRating}
                />
            </View>
            <Ionicons name="ios-arrow-forward" size={25} color={headerColor} style={styles.icon}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 360,
        height: 180,
        marginBottom: 20,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookImage: {
        flex: 1,
        borderColor: "#DDD",
        borderWidth: 1,
        width: 90,
        margin: 10,
    },
    bookInfo: {
        flex: 2,
        justifyContent: "center",
        marginLeft: 5
    },
    bookName: {
        fontSize: 20,
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: 15,
        fontSize: 18,
        color: "gray"
    },
    bookRating: {
        alignSelf: "flex-start",
        marginTop: 15
    },
    icon: {
        position: "absolute",
        right: 20,
        bottom: 20
    }
})