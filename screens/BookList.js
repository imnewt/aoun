import React from "react"
import { FlatList } from "react-native"
import Container from "../components/Container"
import BookListItem from "../components/BookListItem"

export default function BookList(props) {
    const { filteredBooks, headerColor } = props.route.params;
    return (
        <Container>
            <FlatList
                data={filteredBooks}
                renderItem={({ item }) => (
                    <BookListItem book={item} headerColor={headerColor}/>
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ alignItems: "center", marginTop: 20 }}
            />
        </Container>
    )
}