import React, { useState } from 'react'
import { Text, View, Switch, TouchableOpacity } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import Ionicons from "react-native-vector-icons/Ionicons"

export default function SettingsOption({ title, func }) {
    const [switchValue, setSwitchValue] = useState(false);
    return (
        <View>
            { title !== "notifications" 
            ?   <TouchableOpacity 
                    style={styles.container} 
                    onPress={func}
                    activeOpacity={.5}
                >
                    <Text style={styles.title}>{title}</Text>
                    <Ionicons style={styles.arrow} name="ios-arrow-forward" size={25} color="#AAA"/>
                </TouchableOpacity>
            :   <View style={styles.container} onPress={func}>
                    <Text style={[styles.title, { flex:1 }]}>{title}</Text> 
                    <Switch 
                        thumbColor="tomato"
                        onValueChange={() => setSwitchValue(!switchValue)}
                        value={switchValue}/>
                </View>  
            }
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "8rem",
        marginTop: "5rem",
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: "4.5rem",
        color: "#AEAEAE",
        textTransform: "capitalize"
    },
    arrow: {
        flex: 1,
        textAlign: "right"
    }
}) 