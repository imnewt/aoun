import React, { Component } from 'react'
import { View, SafeAreaView, ScrollView, Image, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native"
import firebase from "firebase"


export default class PayConfirm extends Component {
    state ={
        cartItems: [],
        user: null,
        isFocused: false,
        address: ""
    }

    

    componentDidMount() {
        const { cartItems } = this.props.route.params;
        const user = firebase.auth().currentUser;
        this.setState({ cartItems, user })
    }

    handleFocus = () => {
        this.setState({ isFocused: true })
        // if (this.props.onFocus)
    }

    handleBlur = () => {
        this.setState({ isFocused: false })
        // if (this.props.onFocus)
    }

    handleConfirm = () => {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.content}>
                        {/* <TextInput 
                            onChangeText={address => this.setState({ address })}
                            value={this.state.address}
                        /> */}
                        <View style={styles.form}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.inputTitle}>Deliver to:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your address here..."
                                    selectionColor="#FF5562"
                                    underlineColorAndroid={
                                        this.state.isFocused ? "#FF5562" : "gray"
                                    }
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    //autoCapitalize="none"
                                    onChangeText={address => this.setState({address})}
                                    value={this.state.address}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.handleConfirm(this.state.cartItems)}>
                            <Text style={styles.buttonText}>Confirm</Text>
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
    form: {
        marginBottom: 48,
        marginHorizontal: 20
    },
    inputBlock: {
        //flex: 1,
        //flexDirection: "row",
        //alignItems: "center"
    },
    inputTitle: {
        flex: 1,
        textTransform: "uppercase",
        fontSize: 15
    },
    input: {
        flex: 3,
        //borderBottomColor: "#8A8F9E",
        //borderBottomWidth: StyleSheet.hairlineWidth,
        //height: 40,
        //fontSize: 15,
        height: 40,
        //paddingLeft: 6
        //color: "#161F3D"
    },
    button: {
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#FF5562"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#FFF"
    }
}) 