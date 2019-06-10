import React from 'react'
import { Platform, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, lightPurp, purple } from '../utils/colors'

export default function ActionButton({children, onPress, style={}}) {
    return (
        <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, style]}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});
