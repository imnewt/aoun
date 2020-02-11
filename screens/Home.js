import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  Button,
  StyleSheet
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons"

import Aoun from "../images/aoun.jpg"

export default class Home extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Image source={Aoun} />
                <Text style={{fontSize: 20}}>Test</Text>
                <Icon name="ios-home" size={30} />
                <Button
                    title="to book list"
                    onPress={() => navigation.navigate('BookList')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center"
  }
});