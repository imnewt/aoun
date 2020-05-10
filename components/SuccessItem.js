import React from "react"
import { View, Image, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function SuccessItem(props) {
    const { book } = props;

    const roundTo = (n, digits) => {
        digits === undefined && (digits = 0);    
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        var test =(Math.round(n) / multiplicator);
        return +(test.toFixed(digits));
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image resizeMode="stretch" style={styles.img} source={{uri: book.imageUrl}}/>
                <View style={styles.main}>
                    <Text style={styles.name}>{book.name}</Text>
                    <Text style={styles.quantity}>Quantity: {book.quantity}</Text>
                </View>
            </View>
            <Text style={styles.price}>$ {roundTo(book.price * book.quantity,2)}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1
    },
    info: {
        flex: 1,
        flexDirection: "row"
    },
    img: {
        width: "20rem",
        height: "30rem",
        margin: "3rem"
    },
    main: {
        marginTop: "8rem",
        flex: 1
    },
    name: {
        fontSize: "4.1rem",
        fontWeight: "700",
    },
    quantity: {
        marginTop: "4rem",
        fontSize: "4rem",
        color: "grey"
    },
    price: {
        marginTop: "8rem",
        marginHorizontal: "3rem",
        fontSize: "4.1rem",
        fontWeight: "700"
    }
}) 