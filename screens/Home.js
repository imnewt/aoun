import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Logo from "../images/logo.png"
import History from "../images/history.jpg"
import Science from "../images/science.jpg"
import Life from "../images/life.jpg"
import Romance from "../images/romance.jpg"
import Guide from "../images/guide.jpg"
import Design from "../images/design.jpg"

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

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
        fetch('http://192.168.1.52:3000/api/books', {
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
        navigation.navigate("BookList", { filteredBooks: bookList, name: bookGenre })
    }

    render() {
        const { bookGenres } = this.state 
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <Image source={Logo} style={styles.logo}/>
                        <Text style={styles.sayHi}>Hey, what would you like to read today?</Text>
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
        backgroundColor: "#F6F2F9"
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
});