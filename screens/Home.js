import React, { Component } from 'react';
import { ScrollView, View, Image, Text, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Logo from "../images/logo.png"
import History from "../images/history.jpg"
import Science from "../images/science.jpg"
import Life from "../images/life.jpg"
import Romance from "../images/romance.jpg"
import Guide from "../images/guide.jpg"
import Design from "../images/design.jpg"

import HomeGenreBlock from "../components/HomeGenreBlock"

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
                    img: History,
                    bgColor: "#EBDADF"
                },
                {
                    name: "Science",
                    img: Science,
                    bgColor: "#D1CFE2"
                },
                {
                    name: "Life",
                    img: Life,
                    bgColor: "#9CADCE"
                },
                {
                    name: "Romance",
                    img: Romance,
                    bgColor: "#7EC4CF"
                },
                {
                    name: "Guide",
                    img: Guide,
                    bgColor: "#52B2CF"
                },
                {
                    name: "Design",
                    img: Design,
                    bgColor: "#BFCDE0"
                },
            ],
            allBooks: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.7:3000/api/books', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({allBooks: responseJson})
        })
        .catch(error => console.error(error));
    }
    
    render() {
        const { bookGenres, allBooks } = this.state 
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={Logo} style={styles.logo}/>
                    <Text style={styles.sayHi}>Hey, what would you like to read today?</Text>
                    <FlatList
                        data={bookGenres}
                        renderItem={({ item }) => (
                            <HomeGenreBlock bookGenre={item} allBooks={allBooks}/>
                        )}
                        keyExtractor={item => item.name}
                        numColumns={2}
                        contentContainerStyle={{ alignItems: "space-between", marginVertical: 20 }}
                    />  
                </ScrollView>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    },
    logo: {
        alignSelf: "center",
        marginTop: "10rem",
        height: "45rem",
        width: "45rem"
    },
    sayHi: {
        marginTop: "5rem",
        textAlign: "center",
        fontSize: "5rem",
    }
})