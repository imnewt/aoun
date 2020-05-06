import React from "react"
import { View, Text, FlatList } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default function InfoItem(props) {
    const { data } = props
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{data.heading}</Text>
            { data.content && <Text style={styles.content}>{data.content}</Text> }
            { data.values && 
                <FlatList
                    data={data.values}
                    renderItem={({ item }) => (
                        <Text style={[styles.content, { fontStyle: "italic" }]}>{item.title}: <Text style={styles.content}>{item.content}</Text>
                        </Text>
                    )}
                    keyExtractor={item => item.title}
                />
            }
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        marginVertical: "4rem"
    },
    heading: {
        fontWeight: "700",
        fontSize: "5.2rem"
    },
    content: {
        marginTop: "1.5rem",
        fontSize: "4.2rem",
        fontStyle: "normal"
    },
    value: {
        marginTop: "1.5rem",
        fontSize: "4.2rem"
    }
})