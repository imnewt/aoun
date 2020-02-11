import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  Button,
  StyleSheet
} from 'react-native';

import Aoun from "../images/aoun.jpg"

export default class Orders extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Image source={Aoun} />
                <Text style={{fontSize: 20}}>Orders</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center"
  }
});