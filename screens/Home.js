import React, { useState, useEffect } from "react"
import { Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import Container from "../components/Container"
import Logo from "../components/Logo"
import HomeRecommend from "../components/HomeRecommend"
import HomeCategory from "../components/HomeCategory"
import General from "../images/general.jpg"
import Psychology from "../images/psychology.jpg"
import Religion from "../images/religion.jpg"
import Languages from "../images/languages.jpg"
import Science from "../images/science.jpg"
import Technology from "../images/technology.jpg"
import Art from "../images/art.jpg"
import Literature from "../images/literature.jpg"
import History from "../images/history.jpg"
import { HOST } from "../env"

export default function Home() {
    const [bookGenres] = useState([
        {
            header: "General Knowledge",
            name: "General",
            img: General
        },
        {
            header: "Philosophy & Psychology",
            name: "Psychology",
            img: Psychology
        },
        {
            header: "Religion",
            name: "Religion",
            img: Religion
        },
        {
            header: "Languages",
            name: "Languages",
            img: Languages
        },
        {
            header: "Science",
            name: "Science",
            img: Science
        },
        {
            header: "Technology",
            name: "Technology",
            img: Technology
        },
        {
            header: "Art & Recreation",
            name: "Art",
            img: Art
        },
        {
            header: "Literature",
            name: "Literature",
            img: Literature
        },
        {
            header: "History & Georaphy",
            name: "History",
            img: History
        }
    ]);
    const [allBooks, setAllBooks] = useState([]);
    
    useEffect(() => {
        fetch(`${HOST}/api/books`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setAllBooks(responseJson)
        })
        .catch(error => console.error(error));
    }, [])

    return (
        <Container>
            <Logo isHome={true}/>
            <Text style={styles.greeting}>Hey, what would you like to read today?</Text>
            <HomeRecommend books={allBooks} />
            <HomeCategory categories={bookGenres} allBooks={allBooks}/>
        </Container>
    )
}

const styles = EStyleSheet.create({
    greeting: {
        marginTop: "5rem",
        textAlign: "center",
        fontSize: "5rem",
    }
})