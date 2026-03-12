import { useTheme } from '@/src/hooks/useTheme'
import { registerUser } from '@/src/services/auth/authServices'
import { initialValues, validationSchema } from '@/src/utils/auth-forms'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import ErrorText from '../components/Error Text/ErrorText'
import { SimpleButton } from '../components/Hoc/Buttons'
import MyInputTab from '../components/Input Tab/MyInputTab'
import { setUser } from '../redux/slices/authSlice/authSlice'
import { clearImage, setImageUrl } from '../redux/slices/imageSlice/imageSlice'

const SignupScreen = () => {

    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const imageUrl = useSelector((state: any) => state.imagePicker.imageUrl)

    const onSubmitFunc = async (values: any) => {
        setLoading(true)
        try {
            const profile = await registerUser({
                email: values.email,
                password: values.password,
                userName: values.name,
                profileImageUrl: imageUrl,
            });
            router.replace('/(tabs)');
            dispatch(clearImage());
            dispatch(setUser(profile));
        } catch (error) {
            console.log('Error registering user: ', error)
        } finally {
            setLoading(false)
        }
    };

    const pickImageFunc = async () => {

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Permission required');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        if (!result.canceled) {
            dispatch(setImageUrl(result.assets[0].uri))
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={{ backgroundColor: theme.background.primary }}>
                <ScrollView>
                    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
                        <Pressable onPress={pickImageFunc}>
                            {imageUrl ? (
                                <View style={[styles.avatar, { backgroundColor: 'green' }]}>
                                    <Image source={{ uri: imageUrl }} style={styles.image} />
                                </View>
                            ) : (
                                <View style={styles.avatar}>
                                    <Ionicons name='camera' style={{ fontSize: 40, }} />
                                    <ErrorText errorText='Pick Image' />
                                </View>
                            )}
                        </Pressable>
                        <Formik initialValues={initialValues.signup} validationSchema={validationSchema.signup} onSubmit={onSubmitFunc} >

                            {({ values, handleChange, handleSubmit, errors, touched }: any) => {
                                return (
                                    <View style={styles.container}>

                                        <Text style={styles.labelText}>Email</Text>
                                        <MyInputTab placeholderText='Email' value={values.email} onChangeText={handleChange('email')} />
                                        {touched.email && errors.email && (<ErrorText errorText={errors.email} />)}

                                        <Text style={styles.labelText}>Name</Text>
                                        <MyInputTab placeholderText='Name' value={values.name} onChangeText={handleChange('name')} />
                                        {touched.email && errors.name && (<ErrorText errorText={errors.name} />)}

                                        <Text style={styles.labelText}>Password</Text>
                                        <MyInputTab placeholderText='Password' value={values.password} onChangeText={handleChange('password')} />
                                        {touched.email && errors.password && (<ErrorText errorText={errors.password} />)}

                                        <Text style={styles.labelText}>Confirm Password</Text>
                                        <MyInputTab placeholderText='Confirm Password' value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} />
                                        {touched.email && errors.confirmPassword && (<ErrorText errorText={errors.confirmPassword} />)}

                                        <SimpleButton btnText={loading ? <ActivityIndicator size={'large'} color={theme.text.primary} /> : 'Login'} backgroundColor='blue' onPress={handleSubmit} />

                                    </View>
                                )
                            }}
                        </Formik>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 5, paddingLeft: 30 }}>
                            <Text style={styles.loginText}>Already have an account?</Text>
                            <Pressable onPress={() => router.push('/screens/LoginScreen')}>
                                <Text style={{ color: theme.text.secondary, fontSize: 14, fontWeight: 500 }}>Login here</Text>
                            </Pressable>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
        paddingTop: 40
    },
    avatar: {
        height: 140,
        width: 140,
        borderRadius: 20,
        backgroundColor: 'grey',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 20,
        borderWidth: .8,
        borderColor: 'grey',
    },
    loginText: {
        fontSize: 14,
        color: 'grey',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontWeight: 500
    },
    labelText: {
        fontSize: 18,
        color: 'grey',
        alignSelf: 'flex-start',
        paddingLeft: 30,
        fontWeight: 'bold'
    }
})

export default SignupScreen