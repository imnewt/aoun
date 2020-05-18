import React from "react"
import { View, ScrollView } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function Container(props){
    const { pd } = props;
    return (
        <View style={[styles.container, pd && styles.hasPadding]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                { props.children }
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0"
    },
    hasPadding: {
        paddingHorizontal: "5rem"
    }
}) 