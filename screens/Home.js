import React, { useState, useEffect } from "react"
import { Text, FlatList, BackHandler } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import Container from "../components/Container"
import Logo from "../components/Logo"
import GenreBlock from "../components/GenreBlock"
import History from "../images/history.jpg"
import Science from "../images/science.jpg"
import Life from "../images/life.jpg"
import Romance from "../images/romance.jpg"
import Guide from "../images/guide.jpg"
import Design from "../images/design.jpg"
import { HOST } from "../env"

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

export default function Home() {
    const [bookGenres] = useState([
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
        }])
    const [allBooks, setAllBooks] = useState([])
    
    useEffect(() => {
        fetch(`${HOST}/api/books`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setAllBooks(responseJson)
        })
        .catch(error => console.error(error));
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, [])

    return (
        <Container>
            <Logo isHome={true}/>
            <Text style={styles.text}>Hey, what would you like to read today?</Text>
            <FlatList
                data={bookGenres}
                renderItem={({ item }) => (
                    <GenreBlock bookGenre={item} allBooks={allBooks}/>
                )}
                keyExtractor={item => item.name}
                numColumns={2}
                contentContainerStyle={{ alignItems: "space-between", marginVertical: 20 }}
            />
        </Container>
    )
}

const styles = EStyleSheet.create({
    text: {
        marginTop: "5rem",
        textAlign: "center",
        fontSize: "5rem",
    }
})