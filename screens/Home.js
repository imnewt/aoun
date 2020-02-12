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
import { FlatList } from 'react-native-gesture-handler';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.9:3000/api/books', {
            method: 'GET'
            //Request Type 
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
            //Success 
            this.setState({data: responseJson})
            // alert(JSON.stringify(responseJson));
            console.log(responseJson[1]);
        })
        .catch(error => console.error(error));
    }

    render() {
        const { navigation } = this.props
        const { data } = this.state 
        return (
            <View style={styles.container}>
                <Image source={Aoun} />
                <Text style={{fontSize: 20}}>Test</Text>
                <Icon name="ios-home" size={30} />
                <Button
                    title="to book list"
                    onPress={() => navigation.navigate('BookList')}
                />
                {/* <Button
                    title="test server data"
                    onPress={this.getDataUsingGet}
                /> */}
                {/* <Text>{data}</Text> */}
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    keyExtractor={(item) => `${item.id}`}
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