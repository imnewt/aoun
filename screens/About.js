import React, { useState } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import InfoItem from "../components/InfoItem"

export default function About() {
    const [data] = useState([
        { heading: "About The Company", content: "1" },
        { heading: "Values We Live By", content: "2" },
        { heading: "Our Team", content: "3" },
        
    ])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <InfoItem data={item} />
                    )}
                    keyExtractor={item => item.heading}
                />
            </ScrollView>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "5rem"
    }
})