import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native"

export default function HomeGenreBlock(props) {
    const navigation = useNavigation();
    const { bookGenre, allBooks } = props;

    const handlePressToBookList = (bookGenre, allBooks) => {
        const bookList = allBooks.filter(book => book.genre === bookGenre)
        navigation.navigate("BookList", { filteredBooks: bookList, name: bookGenre })
    }

    return (
        <TouchableOpacity 
            style={styles.bookGenreCtn}
            onPress={() => handlePressToBookList(bookGenre.name, allBooks)}    
        >
            <Image source={bookGenre.img} style={styles.bookGenreImg} />
            <Text style={styles.bookGenreName}>{bookGenre.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bookGenreCtn: {
        marginTop: 30,
        marginHorizontal: 10,
        width: 160,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookGenreName: {
        paddingTop: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600"
    },
    bookGenreImg: {
        height: 110,
        width: 110,
        borderRadius: 99
    }
})