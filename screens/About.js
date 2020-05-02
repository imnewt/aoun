import React, { useState } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import InfoItem from "../components/InfoItem"
import EmployeeInfo from "../components/EmployeeInfo"

import E1 from "../images/employee1.jpg"
import E2 from "../images/employee2.jpg"
import E3 from "../images/employee3.jpg"
import E4 from "../images/employee4.jpg"

export default function About() {
    const [data] = useState([
        {   
            heading: "Values We Live By", 
            values: [
                { 
                    title: "Customer Commitment", 
                    content: "We develop relationships that make a positive difference in our customers' lives."
                },
                { 
                    title: "Quality", 
                    content: "We provide outstanding products and unsurpassed service that, together, deliver premium value to our customers."
                },
                { 
                    title: "Integrity", 
                    content: "We uphold the highest standards of integrity in all of our actions."
                },
                { 
                    title: "Teamwork", 
                    content: "We work together, across boundaries, to meet the needs of our customers and to help our Company win."
                },
                { 
                    title: "Respect for People", 
                    content: "We value our people, encourage their development and reward their performance."
                },
                { 
                    title: "Good Citizenship", 
                    content: "We are good citizens in the communities in which we live and work."
                },
                { 
                    title: "A Will to Win", 
                    content: "We exhibit a strong will to win in the marketplace and in every aspect of our business."
                },
                { 
                    title: "Personal Accountability", 
                    content: "We are personally accountable for delivering on our commitments."
                },
            ] 
        },
        { heading: "Meet Our Team" }
    ])
    
    const [employees] = useState([
        { name: "newt", position: "founder", imgUrl: E1 },
        { name: "john", position: "project manager", imgUrl: E2 },
        { name: "will", position: "designer", imgUrl: E3 },
        { name: "arthur", position: "developer", imgUrl: E4 },
    ])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <InfoItem data={item} />
                    )}
                    keyExtractor={item => item.heading}
                />
                <FlatList
                    data={employees}
                    renderItem={({ item }) => (
                        <EmployeeInfo employee={item} />
                    )}
                    keyExtractor={item => item.name}
                    numColumns={2}
                />
            </View>
        </ScrollView>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF5F0",
        paddingHorizontal: "5rem"
    }
})