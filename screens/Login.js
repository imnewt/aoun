import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as firebase from "firebase";

import Logo from "../images/logo.png"

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogIn = () => {
        const { email, password } = this.state;
        const { navigation } = this.props;
        const { from } = this.props.route.params;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            if (from === "Welcome"){
                navigation.navigate("HomeTabs")
            }
            else {
                navigation.goBack()
            }
        })
        .catch(error => this.setState({ errorMessage: error.message }));
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Logo} style={styles.logo}/>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Email Address"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.errorMessage}>
                    { this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <TouchableOpacity style={styles.logInBtn} onPress={this.handleLogIn}>
                    <Text style={styles.logInText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpBtn} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>
                        New to Aoun? <Text style={{ color: "#E9446A" }}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F2F9",
        marginTop: 80
    },
    logo: {
        height: 180,
        width: 180,
        alignSelf: "center"
    },
    form: {
        marginHorizontal: 30,
        marginTop: 30
    },
    input: {
        marginTop: 20,
        height: 60,
        fontSize: 18,
        backgroundColor: "#FFF",
        borderRadius: 30,
        paddingLeft: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    errorMessage: {
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        marginVertical: 10
    },
    error: {
        color: "#F00",
        fontSize: 16
    },
    logInBtn: {
        marginHorizontal: 50,
        backgroundColor: "tomato",
        borderRadius: 30,
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    logInText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "700"
    },
    signUpBtn: {
        alignSelf: "center", 
        marginTop: 30
    },
    signUpText: {
        fontSize: 16,
    }
});