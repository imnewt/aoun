import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from "firebase";

export default class Register extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        const { email, password } = this.state;
        firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    return userCredentials.user.updateProfile({
                        displayName: this.state.name
                    })
                })
                .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.create}>Create new account</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Full Name"
                            onChangeText={name => this.setState({name})}
                            value={this.state.name}
                        />
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Your Email"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            autoCapitalize="none"
                            onChangeText={phone => this.setState({phone})}
                            value={this.state.phone}
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
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={styles.linearBtn}>
                        <TouchableOpacity style={styles.btn} onPress={this.handleSignUp}>
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={styles.warnText}>
                        "By <Text style={{ color: "#E9446A" }}>clicking Register</Text>
                        , you agree to our Terms of Services."
                    </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingTop: 80,
        marginHorizontal: 30,
    },
    create: {
        fontSize: 32,
        marginBottom: 24,
        fontWeight: "700",
        fontStyle: "italic",
        color: "#ff5a5a"
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
        marginVertical: 10
    },
    error: {
        color: "#F00",
        fontSize: 16
    },
    linearBtn: {
        marginHorizontal: 20,
        borderRadius: 30,
    },
    btn: {
        flex: 1,
        padding: 18,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: "#FFF",
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "700"
    },
    warnText: {
        marginTop: 20,
        marginHorizontal: 40,
        fontSize: 16,
        color: "#858383",
        textAlign: "center"
    }
});