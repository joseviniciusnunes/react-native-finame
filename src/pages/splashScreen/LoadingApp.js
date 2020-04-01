import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';

export default function LoadingApp() {
    return (
        <View style={styles.viewRoot}>
            <Text style={styles.textLoading}>Carregando...</Text>
            <ProgressBarAndroid style={styles.progress} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    textLoading: {
        fontSize: 22
    },
    progress: {
        marginTop: 25,
        color: '#6200ee',
    }
});
