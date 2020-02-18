import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

export default class BookList extends Component {

    handlePressToBookDetail = (book) => {
        const { navigation } = this.props;
        navigation.navigate("BookDetail", { book })
    }

    render() {
        const { filteredBooks } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <FlatList
                        data={filteredBooks}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.bookImageCtn} onPress={() => this.handlePressToBookDetail(item)}>
                                <Image style={styles.bookImage} source={{uri: item.imageUrl}} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.name}
                        horizontal={false}
                        numColumns={3}
                    />
                </View>
            </SafeAreaView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F6F2F9"
    },
    bookImageCtn: {
        margin: 5,
        borderRadius: 5,
        borderColor: "#DDD",
        borderWidth: 1
    },
    bookImage: {
        height: 200,
        width: 120
    }
});