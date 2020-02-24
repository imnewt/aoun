import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Avatar } from "react-native-elements";
import * as firebase from "firebase"

import SettingsOption from "../components/SettingsOption"

export default class Settings extends Component {
    state = {
        //user: null,
        email: "",
        displayName: "",
        //avatar: ""
    }

    // componentDidMount() {
    //     const { email, displayName} = firebase.auth().currentUser;
    //     console.log(email, displayName)
    //     this.setState({ email, displayName })
    // }

    handleSignOut = () => {
        firebase.auth().signOut();
        // await this.setState({email: "", displayName: ""})
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.userInfo}>
                            <Avatar
                                rounded
                                size="xlarge"
                                source={{
                                    uri: 'https://acrossmag.com/wp-content/uploads/2018/11/image3-6.jpg',
                                    // uri: this.state.avatar ? avatar : 'https://acrossmag.com/wp-content/uploads/2018/11/image3-6.jpg',
                                }}
                                //showEditButton
                            />
                            {/* { this.state.email="" && <Text style={styles.name}>{this.state.displayName}</Text>} */}
                        </View>
                        <View style={styles.options}>
                            <SettingsOption iconName="ios-contact" title="Account Detail" color="#788EEC" />
                            <SettingsOption iconName="ios-call" title="Contact Us" color="lightgreen" />
                        </View>
                        <TouchableOpacity style={styles.signOut} onPress={this.handleSignOut}>
                            <Text style={styles.textSignOut}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9"
    },
    content: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    userInfo: {
        margin: 20,
        alignItems: "center"
    },
    name: {
        paddingTop: 20,
        fontSize: 20
    },
    signOut: {
        margin: 20,
        padding: 15,
        alignItems: "center",
        backgroundColor: "#FF5562",
        borderRadius: 10
    },
    textSignOut: {
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "700",
        color: "#FFF"
    }
});