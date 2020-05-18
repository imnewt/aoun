import React from "react"
import { View, ImageBackground, Image, Text } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import User from "../images/user.jpg"
import bg from "../images/info-bg.jpg"

export default function UserNameBlock(props){
    const { user } = props;
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bg} source={bg}>
                <Image style={styles.avatar} source={User}/>
                { user 
                    ?   <View style={styles.greeting}>
                            <Text style={styles.hi}>Welcome back,</Text>
                            <Text style={styles.userName}>{user.displayName || "new member"}</Text>
                        </View>
                    :   <View style={styles.greeting}>
                            <Text style={styles.hi}>Hi there!</Text>
                        </View>
                } 
            </ImageBackground>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        marginTop: "10rem",
        width: "90%",
        alignSelf: "center",
        aspectRatio: 1/0.45, 
        borderRadius: 30, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
        overflow: "hidden"
    },
    bg: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    avatar: {
        width: "20rem",
        height: "20rem",
        borderRadius: 99,
        marginLeft: "8rem"
    },
    greeting: {
        marginLeft: "5rem",
        marginRight: "2rem",
        flexShrink: 1
    },
    hi: {
        fontSize: "5.2rem",
        fontStyle: "italic",
        fontWeight: "700"
    },
    userName: {
        fontSize: "7.2rem",
        fontWeight: "700"
    },
}) 