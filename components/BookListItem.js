import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Rating } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

export default function BookListItem(props) {
    const navigation = useNavigation();
    const { book, headerColor } = props;

    const handlePressToBookDetail = (book) => {
        navigation.navigate("BookDetail", { book, headerColor })
    }

    return (
        <TouchableOpacity 
            style={styles.container} 
            activeOpacity={.9}
            onPress={() => handlePressToBookDetail(book)}
        >
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

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        width: "17.5rem",
        height: "10rem",
        marginBottom: "1rem",
        padding: ".5rem",
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    bookImage: {
        flex: 1,
        borderColor: "#DDD",
        borderWidth: 1
    },
    bookInfo: {
        flex: 2,
        justifyContent: "center",
        marginLeft: ".6rem"
    },
    bookName: {
        fontSize: "1rem",
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: "1rem",
        fontSize: ".8rem",
        color: "gray"
    },
    bookRating: {
        alignSelf: "flex-start",
        marginTop: "1rem"
    },
    icon: {
        position: "absolute",
        right: "1rem",
        bottom: "1rem"
    }
})