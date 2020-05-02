import React from 'react'
import { View, Image, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export default function EmployeeInfo(props) {
    const { employee } = props
    return (
        <View style={styles.container}>
            <Image source={employee.imgUrl} style={styles.img} />
            <View style={styles.info}>
                <Text style={styles.name}>{employee.name}</Text>
                <Text style={styles.position}>{employee.position}</Text>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginTop: "3rem",
        marginBottom: "8rem",
        alignItems: "center"
    },
    img: {
        width: "35rem",
        height: "35rem",
        borderRadius: 10
    },
    info: {
        alignItems: "center"
    },
    name: {
        marginTop: "5rem",
        fontSize: "4.8rem",
        fontWeight: "700",
        textTransform: "capitalize"
    },
    position: {
        marginTop: "2rem",
        color: "#AAA",
        textTransform: "capitalize"
    }
})