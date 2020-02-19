import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

export default class BookDetail extends Component {

    

    render() {
        const { book } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.bookDetail}>
                        <Image resizeMode="stretch" style={styles.bookImg} source={{uri: book.imageUrl}} />
                        <View style={styles.bookMainInfo}>
                            <Text style={styles.bookName}>{book.name}</Text>
                            <Text style={styles.bookAuthor}>{book.author}</Text>
                        </View>
                    </View>
                    <View style={styles.bookDescription}>
                        <Text style={styles.description}>{book.description}</Text>
                    </View>
                        {/* <View style={styles.priceContainer}>
                            <Text style={styles.phonePrice}>$ {book.price}</Text>
                        </View>
                        {/* <CartContext.Consumer>
                            {({ addToCart }) => (
                                <Button
                                    title="Chọn mua"
                                    color="red" 
                                    onPress={() => addToCart(data)}>
                                </Button>
                            )}
                        </CartContext.Consumer> */}
                        
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9",
        margin: 10
    },
    bookDetail: {
        flexDirection: "row",
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#8A8F9E"
    },
    bookImg: {
        flex: 2,
        height: 250,
        borderColor: "#DDD",
        borderWidth: 1
    },
    bookMainInfo: {
        flex: 3,
        marginLeft: 20,
    },
    bookName: {
        fontSize: 22,
        fontWeight: "700"
    },
    bookAuthor: {
        marginTop: 10,
        fontSize: 18,
        color: "gray"
    },
    bookDescription: {
        marginTop: 20
    }
});