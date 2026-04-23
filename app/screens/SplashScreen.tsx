import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
const SplashImage = require('../../assets/images/logo.png');

const SplashScreen = () => {

    const user = useSelector((state: any) => state.authReducer.user);
    const loading = useSelector((state: any) => state.authReducer.loading);
    const authChecked = useSelector((state:any) => state.authReducer.authChecked);

    console.log('user: ', user)
    console.log('loading: ', loading)

    useEffect(() => {
        // if(!authChecked) return;

        const timer = setTimeout(() => {
            if (user?.uid) {
                router.replace('/(tabs)');
            } else {
                router.replace('/screens/LoginScreen');
            }
        }, 2000); // 2 second timeout

        return () => clearTimeout(timer);
    }, [user, authChecked]);
    return (
        <View style={styles.container}>
            <Image source={SplashImage} style={styles.image} />
            <Text style={styles.text}>Talksy</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 200,
        width: 200,
    },
    text: {
        fontSize: 23,
        color: '#ffff',
        fontWeight: 500,
    }
})

export default SplashScreen