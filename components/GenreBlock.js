import React from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function GenreBlock(props) {
    const navigation = useNavigation();
    const { bookGenre, allBooks } = props;

    const handlePressToBookList = (bookGenre, allBooks) => {
        const bookList = allBooks.filter(book => book.genre === bookGenre.name)
        navigation.navigate("BookList", 
        { 
            filteredBooks: bookList, 
            headerColor: bookGenre.bgColor, 
            headerTitle: bookGenre.name 
        })
    }

    return (
        <TouchableOpacity 
            style={[styles.bookGenreCtn, { backgroundColor: bookGenre.bgColor }]}
            activeOpacity={.7}
            onPress={() => handlePressToBookList(bookGenre, allBooks)}    
        >
            <Image source={bookGenre.img} style={styles.bookGenreImg} />
            <Text style={styles.bookGenreName}>{bookGenre.name}</Text>
        </TouchableOpacity>
    )
}

const styles = EStyleSheet.create({
    bookGenreCtn: {
        marginTop: "5rem",
        marginHorizontal: "2rem",
        width: "45%",
        aspectRatio: 1/1.3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    bookGenreName: {
        paddingTop: "5rem",
        textAlign: "center",
        fontSize: "4.5rem",
        textTransform: "uppercase",
        fontWeight: "700"
    },
    bookGenreImg: {
        height: "25rem",
        width: "25rem",
        borderRadius: 99
    }
})