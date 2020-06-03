import React from "react"
import { Text, FlatList, View, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function HomeCategory(props) {
    const navigation = useNavigation();
    const { categories, allBooks } = props;

    const handlePressToBookList = (bookGenre, allBooks) => {
        const bookList = allBooks.filter(book => book.genre === bookGenre.name)
        navigation.navigate("BookList", 
        { 
            filteredBooks: bookList,
            headerTitle: bookGenre.header 
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose by category</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.book}
                        activeOpacity={.7}
                        onPress={() => handlePressToBookList(item, allBooks)}    
                    >
                        <Image resizeMode="stretch" source={item.img} style={styles.img} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.name}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginBottom: "4rem"
    },
    heading: {
        marginLeft: "5rem",
        marginTop: "10rem",
        marginBottom: "4rem",
        fontSize: "5.5rem",
        fontWeight: "700"
    },
    book: {
        marginHorizontal: "3rem",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden"
    },
    img: {
        height: "50rem",
        width: "35rem"
    }
})