import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
    const { children, subTitle } = props
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 55,
        fontFamily: 'Roboto-Bold',
        color: '#e84118'
    },
    subTitle: {
        color: '#ffffffcc',
        fontSize: 20,
        fontFamily: 'Roboto-Light'
    }
})

export default Title
