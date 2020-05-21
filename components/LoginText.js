import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function LoginText(props) {
    const navigation = useNavigation();
    const { from } = props;
    return (
        <TouchableOpacity 
            style={styles.btn} 
            activeOpacity={.7}
            onPress={() => navigation.navigate("Register", { from })}
        >
            <Text style={styles.text}>
                New to Aoun? <Text style={{ color: "#E9446A" }}>Sign up</Text>
            </Text>
        </TouchableOpacity>
    )
}

const styles = EStyleSheet.create({
    btn: {
        marginVertical: "4rem",
        alignSelf: "center"
    },
    text: {
        fontSize: "4rem"
    }
}) 