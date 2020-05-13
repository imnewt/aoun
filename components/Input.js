import React from "react"
import { TextInput } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function Input(props){
    const { isPassword } = props;

    return (
        <TextInput 
            secureTextEntry={isPassword ? true : false}
        />
    )
}

const styles = EStyleSheet.create({
    
}) 