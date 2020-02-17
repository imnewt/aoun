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

export default class BookDetail extends Component {

    

    render() {
        const { book } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>{book.description}</Text>
                </View>
            </SafeAreaView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    bookImage: {
        
    }
});