import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Image, Text, Button, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Logo from "../images/logo.png"
import History from "../images/history.jpg"
import Science from "../images/science.jpg"
import Life from "../images/life.jpg"
import Romance from "../images/romance.jpg"
import Guide from "../images/guide.jpg"
import Design from "../images/design.jpg"
//import { SafeAreaView } from 'react-native-safe-area-context';

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
            data: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.9:3000/api/books', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data: responseJson})
        })
        .catch(error => console.error(error));
    }

    render() {
        const { navigation } = this.props
        const { data, bookGenres } = this.state 
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <Image source={Logo} style={styles.logo}/>
                        <FlatList
                            data={bookGenres}
                            renderItem={({ item }) => (
                                <View style={styles.bookGenreCtn}>
                                    <Image source={item.img} style={styles.bookGenreImg} />
                                    <Text style={styles.bookGenreName}>{item.name}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.name}
                            horizontal={false}
                            numColumns={2}
                        />
                        <Button
                            title="to book list"
                            onPress={() => navigation.navigate('BookList')}
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
        paddingTop: 20
    },
    content: {
        alignItems: "center"
    },
    logo: {
    },
    bookGenreCtn: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    bookGenreName: {
        paddingTop: 10,
        fontSize: 20
    },
    bookGenreImg: {
        height: 200,
        width: 150
    }
});