import React from "react"
import { View, Text, Image } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { Rating } from "react-native-elements"

export default function BookDetailItem(props) {
    const { book } = props;
    return (
        <View style={styles.container}>
            <Image resizeMode="stretch" style={styles.img} source={{uri: book.imageUrl}} />
            <Text style={styles.name}>{book.name}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            <View style={styles.rating}>
                <Rating 
                    imageSize={20}
                    readonly
                    startingValue={book.rating}
                />
                <Text style={{ color: "gray", marginLeft: 10 }}>{book.rating}/5</Text>
            </View>
            <Text style={styles.description}>{book.description}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: "4rem",
        paddingHorizontal: "2rem",
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2
    },
    img: {
        width: "40rem",
        aspectRatio: 1/1.8,
        borderRadius: 10
    },
    name: {
        marginTop: "4rem",
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: "6rem",
        fontWeight: "700"
    },
    author: {
        marginTop: "3rem",
        fontSize: "4.5rem",
        color: "gray"
    },
    rating: {
        flexDirection: "row", 
        alignItems: "center",
        marginTop: "3rem"
    },
    description: {
        marginTop: "6rem",
        marginHorizontal: "4rem",
        fontSize: "4.5rem"
    }
})