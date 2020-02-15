import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Logo from "../images/logo.png"
import History from "../images/history.jpg"
import Science from "../images/science.jpg"
import Life from "../images/life.jpg"
import Romance from "../images/romance.jpg"
import Guide from "../images/guide.jpg"
import Design from "../images/design.jpg"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookGenres: [
                {
                    name: "History",
                    img: History
                },
                {
                    name: "Science",
                    img: Science
                },
                {
                    name: "Life",
                    img: Life
                },
                {
                    name: "Romance",
                    img: Romance
                },
                {
                    name: "Guide",
                    img: Guide
                },
                {
                    name: "Design",
                    img: Design
                },
            ],
            allBooks: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.9:3000/api/books', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({allBooks: responseJson})
        })
        .catch(error => console.error(error));
    }

    _handlePressToBookList = (bookGenre) => {
        const { allBooks } = this.state;
        const { navigation } = this.props;
        const bookList = allBooks.filter(book => book.genre === bookGenre)
        navigation.navigate("BookList", { filteredBooks: bookList })
    }

    render() {
        const { bookGenres } = this.state 
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={styles.sayHi}>Hi there! Which books do you want for today?</Text>
                        <FlatList
                            data={bookGenres}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.bookGenreCtn}
                                    onPress={() => this._handlePressToBookList(item.name)}    
                                >
                                    <Image source={item.img} style={styles.bookGenreImg} />
                                    <Text style={styles.bookGenreName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.name}
                            horizontal={false}
                            numColumns={2}
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
        backgroundColor: "#FFF",
    },
    content: {
        paddingVertical: 20,
        alignItems: "center"
    },
    logo: {
        height: 150,
        width: 150
    },
    sayHi: {
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 20,
    },
    bookGenreCtn: {
        marginTop: 30,
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: "#C0E0DE",
        borderRadius: 10,
        overflow: "hidden"
    },
    bookGenreName: {
        paddingVertical: 5,
        textAlign: "center",
        width: "100%",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "300"
    },
    bookGenreImg: {
        height: 200,
        width: 150
    }
});