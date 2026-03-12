import { setUsers } from '@/app/redux/slices/usersData/usersList';
import { useTheme } from '@/src/hooks/useTheme';
import { getAllUsers } from '@/src/services/firestore/firestoreServices';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const AllUsers = () => {

    const dispatch = useDispatch();
    const usersList = useSelector((state: any) => state.usersList.users);
    const { theme } = useTheme();
    const user  = useSelector((state: any) => state.authReducer.user);

    useEffect(() => {
        if (!user?.id) return;

        const fetchUsers = async () => {
            try {
                const users = await getAllUsers(user?.id);
                dispatch(setUsers(users));
            } catch (error) {
                console.log('Error fetching users: ', error);
            };
        }
        fetchUsers();
    }, [user?.uid]);

    const handlePress = (userItem: any) => {
        router.push({
            pathname: '/screens/chatScreen',
            params: {
                userId: userItem.id,
                name: userItem.userName,
                photo: userItem.profileImage,
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.primary }}>
                <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
                    <FlatList
                        data={usersList.filter((u: any) => u.id !== user?.uid)}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return ( 
                                <TouchableOpacity onPress={() => handlePress(item)}>
                                    <View style={styles.userCard}>
                                        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />

                                        <View style={styles.textContainer}>
                                            <Text style={[styles.title, { color: theme.text.primary }]}>{item.userName}</Text>
                                            <Text style={styles.subTitle}>Tap here to start chat</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileImage: {
        height: 55,
        width: 55,
        borderRadius: 50,
        marginLeft: 10,
    },
    userCard: {
        height: 'auto',
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 500,
        color: 'grey',
    },
    textContainer: {
        marginLeft: 13,
        justifyContent: 'space-between',
        gap: 6
    }
})

export default AllUsers