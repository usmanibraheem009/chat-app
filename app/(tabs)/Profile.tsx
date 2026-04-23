import { useTheme } from '@/src/hooks/useTheme';
import { logoutUser } from '@/src/services/auth/authServices';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleButton } from '../components/Hoc/Buttons';
import { clearUser } from '../redux/slices/authSlice/authSlice';

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authReducer.user);
  const { theme } = useTheme();
  

  const logout = () => {
    logoutUser();
    dispatch(clearUser());
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <View style={[styles.card, { backgroundColor: theme.background.primary, borderColor: theme.border.primary }]}>
        <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: theme.text.primary }]}>{user?.userName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <Ionicons name='pencil-sharp' style={{ fontSize: 20, marginLeft: 20 }} />
      </View>
      <SimpleButton btnText='Logout' backgroundColor='blue' onPress={logout} />
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  email: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 500,
    maxWidth: 220,
  },
  textContainer: {
    paddingLeft: 20,
  }
});

export default Profile