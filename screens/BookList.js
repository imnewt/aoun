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
import { Rating } from "react-native-elements"

export default class BookList extends Component {

    handlePressToBookDetail = (book) => {
        const { navigation } = this.props;
        navigation.navigate("BookDetail", { book })
    }

    render() {
        const { filteredBooks } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <FlatList
                            data={filteredBooks}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.bookImageCtn} onPress={() => this.handlePressToBookDetail(item)}>
                                    <Image style={styles.bookImage} source={{uri: item.imageUrl}} />
                                    <View style={styles.bookMainInfoCtn}>
                                        <View style={styles.bookMainInfo}>
                                            <Text style={styles.bookName}>{item.name}</Text>
                                            <Text style={styles.bookAuthor}>{item.author}</Text>
                                            <Rating 
                                                imageSize={20}
                                                readonly
                                                startingValue={item.rating}
                                                style={styles.bookRating}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.name}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9",
    },
    content: {
        alignItems: "center",
        marginVertical: 10,
    },
    bookImageCtn: {
        marginVertical: 10,
        flexDirection: "row",
        width: 360,
    },
    bookImage: {
        flex: 1,
        height: 250,
        borderRadius: 10,
        borderRadius: 5,
        borderColor: "#DDD",
        borderWidth: 1
    },
    bookMainInfoCtn: {
        flex: 1,
        width: 200,
        justifyContent: "center",
    },
    bookMainInfo: {
        paddingVertical: 30,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    bookName: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: "700",
        color: "#FF5562"
    },
    bookAuthor: {
        marginLeft: 15,
        marginTop: 15,
        fontSize: 16,
        color: "gray"
    },
    bookRating: {
        alignSelf: "flex-start",
        marginLeft: 15,
        marginTop: 15
    }
});