import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const LoadingIndicator = () => {
    return (
        <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'rgba(48,48,46,0.8)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
})
