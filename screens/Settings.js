import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  StatusBar,
  Button,
  StyleSheet
} from 'react-native';
import { Avatar } from "react-native-elements";
import * as firebase from "firebase"

export default class Settings extends Component {
    state = {
        user: null,
        email: "",
        userName: "",
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{
                                uri:
                                'https://acrossmag.com/wp-content/uploads/2018/11/image3-6.jpg',
                            }}
                            showEditButton
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center"
  }
});