import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';

export default function BookList({ route, navigation }) {
    const { filteredBooks } = route.params
    return (
        <View>
            <Text style={{fontSize: 20}}>BookList</Text>
            <FlatList
                data={filteredBooks}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  
});