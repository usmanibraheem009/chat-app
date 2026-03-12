import { useTheme } from '@/src/hooks/useTheme';
import { loginUser } from '@/src/services/auth/authServices';
import { initialValues, validationSchema } from '@/src/utils/auth-forms';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import facebookLogo from '../../assets/images/facebook.svg';
import googleLogo from '../../assets/images/google.svg';
import ErrorText from '../components/Error Text/ErrorText';
import { SimpleButton, SocialBtn } from '../components/Hoc/Buttons';
import MyInputTab from '../components/Input Tab/MyInputTab';
import { setUser } from '../redux/slices/authSlice/authSlice';
const logo = require('../../assets/images/icon.png');


const LoginScreen = () => {

    const { theme } = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const onSubmitFunc = async (values: any) => {
        setLoading(true)
        try {
            const profile = await loginUser({
                email: values.email,
                password: values.password
            });
            dispatch(setUser(profile));
        } catch (error) {
            console.log('Error logging in user: ', error)
        } finally {

            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background.primary }]}>
                    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
                        <Image source={logo} style={styles.image} />
                        <Text style={styles.welcomeText}>Let's unlock a global world!</Text>

                        <Formik initialValues={initialValues.login} onSubmit={onSubmitFunc} validationSchema={validationSchema.login}>
                            {({ values, handleSubmit, handleChange, touched, errors }: any) => {
                                return (
                                    <View style={styles.container}>
                                        <MyInputTab placeholderText='Email' value={values.email} onChangeText={handleChange('email')} />
                                        {touched.email && errors.email && (<ErrorText errorText={errors.email} />)}

                                        <MyInputTab placeholderText='Password' value={values.password} onChangeText={handleChange('password')} />
                                        {touched.password && errors.password && (<ErrorText errorText={errors.password} />)}

                                        <View style={styles.passContainer}>
                                            <Pressable onPress={() => router.push('/screens/forgotPassword')}>
                                                <Text style={styles.passResetText}>Forgot Password?</Text>
                                            </Pressable>
                                        </View>

                                        <SimpleButton btnText={loading ? <ActivityIndicator size={'large'} color={theme.text.primary} /> : 'Login'} backgroundColor='blue' onPress={handleSubmit} />

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 5, paddingLeft: 30 }}>
                                            <Text style={styles.passResetText}>Not registered yet?</Text>
                                            <Pressable onPress={() => router.push('/screens/signupScreen')}>
                                                <Text style={{ color: theme.text.secondary, fontSize: 14, fontWeight: 500 }}>SignUp here</Text>
                                            </Pressable>
                                        </View>

                                        <View style={styles.dividerContainer}>
                                            <View style={[styles.divider, { backgroundColor: theme.text.tertiary }]} />
                                            <Text style={[styles.dividerText, { color: theme.text.tertiary }]}>or</Text>
                                            <View style={[styles.divider, { backgroundColor: theme.text.tertiary }]} />
                                        </View>

                                        <SocialBtn btnContext='Continue with google' SvgImage={googleLogo} onPress={() => { }} backgroundColor='white' />
                                        <SocialBtn btnContext='Continue with Facebook' SvgImage={facebookLogo} onPress={() => { }} backgroundColor='white' />
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    image: {
        height: 160,
        width: 160,
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 500,
        alignSelf: 'center',
        color: 'grey'
    },
    dividerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 20
    },
    divider: {
        flex: 1,
        height: 1.5,
    },
    dividerText: {
        fontSize: 16,
        color: 'purple',
        fontWeight: 500,
        paddingHorizontal: 20
    },
    passContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        marginRight: 30,
        gap: 5
    },
    passResetText: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 500
    }

})

export default LoginScreen