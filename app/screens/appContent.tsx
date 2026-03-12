import { useTheme } from "@/src/hooks/useTheme";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

function AppContent() {
    const { theme } = useTheme();

    const user = useSelector((state: any) => state.authReducer.user);
    const authChecked = useSelector((state: any) => state.authReducer.authChecked);

    useEffect(() => {

        if (!authChecked) return;

        if (user) {
            router.replace('/(tabs)');
        } else {
            router.replace('/screens/LoginScreen');
        }

    }, [authChecked, user]);

    return (
        <GestureHandlerRootView>
            <Stack screenOptions={{
                headerStyle: { backgroundColor: theme.background.primary },
                headerTintColor: theme.text.primary,
            }}>
                <Stack.Screen name="index" options={{ headerShown: false, }} />
                <Stack.Screen name="screens/SplashScreen" options={{ headerShown: false }} />
                <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
                <Stack.Screen name="screens/signupScreen" options={{ headerShown: false }} />
                <Stack.Screen name="screens/chatScreen" options={{ headerShown: false }} />
                <Stack.Screen name="screens/allUsers" options={{ title: 'Add User' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    )
};

export default AppContent;