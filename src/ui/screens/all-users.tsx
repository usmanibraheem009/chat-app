import { setUsers } from '@/app/redux/slices/usersData/usersList';
import { useTheme } from '@/src/hooks/useTheme';
import { getAllUsers } from '@/src/services/firestore/firestoreServices';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const AllUsers = () => {

    const dispatch = useDispatch();
    const usersList = useSelector((state: any) => state.usersList.users);
    const { theme } = useTheme();
    const { user } = useSelector((state: any) => state.authReducer);

    useEffect(() => {
        if(!user?.uid) return;

        const fetchUsers = async () => {
            try{
                const users = await getAllUsers(user?.uid);
                dispatch(setUsers(users));
            }catch(error){
                console.log('Error fetching users: ', error);
            };
        }
        fetchUsers();
    }, [user?.uid]);

    return (
        <View style={[styles.container, {backgroundColor: theme.background.primary}]}>
            <FlatList 
            data={usersList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.userCard}>
                            <Image source={{uri: item.profileImage}} height={20} width={20} style={{borderRadius: 50}}/>

                            <View>
                                <Text style={styles.title}>{item.userName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userCard: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
    }
})

export default AllUsers