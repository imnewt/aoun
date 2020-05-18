import React from "react"
import { Image } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import img from "../images/logo.jpg"

export default function Logo(props) {
    const { isHome } = props
    return <Image source={img} style={[styles.logo, isHome ? styles.home : styles.login]}/>
}

const styles = EStyleSheet.create({
    logo: {
        alignSelf: "center",
        height: "45rem",
        width: "45rem"
    },
    home: {
        marginTop: "10rem",
    },
    login: {
        marginTop: "30rem",
        marginBottom: "-10rem"
    }
}) 
