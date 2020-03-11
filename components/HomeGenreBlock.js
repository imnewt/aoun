import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native"

export default function HomeGenreBlock(props) {
    const navigation = useNavigation();
    const { bookGenre, allBooks } = props;

    const handlePressToBookList = (bookGenre, allBooks) => {
        const bookList = allBooks.filter(book => book.genre === bookGenre.name)
        navigation.navigate("BookList", { filteredBooks: bookList, headerColor: bookGenre.bgColor })
    }

    return (
        <TouchableOpacity 
            style={[styles.bookGenreCtn, { backgroundColor: bookGenre.bgColor }]}
            onPress={() => handlePressToBookList(bookGenre, allBooks)}    
        >
            <Image source={bookGenre.img} style={styles.bookGenreImg} />
            <Text style={styles.bookGenreName}>{bookGenre.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bookGenreCtn: {
        marginTop: 20,
        marginHorizontal: 10,
        width: 165,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookGenreName: {
        paddingTop: 20,
        textAlign: "center",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "700"
    },
    bookGenreImg: {
        height: 110,
        width: 110,
        borderRadius: 99
    }
})