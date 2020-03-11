import React from 'react';
import { SafeAreaView, ScrollView, FlatList } from 'react-native';
import BookListItem from "../components/BookListItem"

export default function BookList(props) {
    const { filteredBooks, headerColor } = props.route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5F0" }}>
            <ScrollView>
                <FlatList
                    data={filteredBooks}
                    renderItem={({ item }) => (
                        <BookListItem book={item} headerColor={headerColor}/>
                    )}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ alignItems: "center", marginTop: 20 }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}