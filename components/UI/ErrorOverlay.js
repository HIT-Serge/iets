import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { GlobalStyles } from '../../constants/styles';

const ErrorOverlay = ({ message, onConfirm }) => {
    // console.log('errorOverlay', message);
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.message}>{message}</Text>
            <Button style={styles.text} onPress={onConfirm}>Okay</Button>

        </View>
    );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
        color: 'white',
        marginBottom: 8,
    },
}
)