import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import axios from "axios"

import Icon from "react-native-vector-icons/Ionicons"

import Aoun from "../images/aoun.jpg"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: ''
        }
    }

    componentDidMount() {
        axios.get('/api/helloworld')
            .then(res => this.setState({greeting: res.data.sayHi}))
    }

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
                <Text>{this.state.greeting}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center"
  }
});