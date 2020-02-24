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
                <View style={styles.errorMessage}>
                    { this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.logInBtn} onPress={this.handleLogIn}>
                    <Text style={styles.logInText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpBtn} onPress={()  => this.props.navigation.navigate("Register")}>
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
        marginTop: 70
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf: "center"
    },
    errorMessage: {
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
    },
    error: {
        color: "#F00",
        fontSize: 16
    },
    form: {
        margin: 30,
    },
    inputTitle: {
        textTransform: "uppercase",
        fontSize: 14
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    logInBtn: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: "tomato",
        borderRadius: 15,
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
        marginTop: 20
    },
    signUpText: {
        fontSize: 16,
    }
});