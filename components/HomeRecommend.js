import React from "react"
import { Text, FlatList, View, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function HomeRecommend(props) {
    const navigation = useNavigation();
    const { books } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recommendations</Text>
            <FlatList
                data={books}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.book}
                        activeOpacity={.7}
                        onPress={() => navigation.navigate("BookDetail", { book: item })}    
                    >
                        <Image resizeMode="stretch" source={{ uri:item.imageUrl }} style={styles.img} />
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
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden"
    },
    img: {
        height: "50rem",
        width: "35rem"
    }
})