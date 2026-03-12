import { useTheme } from '@/src/hooks/useTheme'
import { db } from '@/src/services/firebaseConfig'
import { getUserChats } from '@/src/services/firestore/firestoreServices'
import { formattedDate } from '@/src/utils/formatted-date-time'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '../redux/slices/chat-slice/chat-slice'

const index = () => {

  const { theme } = useTheme()
  const dispatch = useDispatch()
  const usersList = useSelector((state: any) => state.usersList.users)
  const user = useSelector((state: any) => state.authReducer.user)
  const chats = useSelector((state: any) => state.chatReducer.chats)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!user?.id) return

    const unsubscribeChats = getUserChats(user.id, async (chatData: any) => {

      const mappedChats = await Promise.all(chatData.map(async (chat: any) => {
        const otherUserId = chat.participants.find((id:any) => id !== user.id);

        const userDoc = await getDoc(doc(db, "users", otherUserId));
        if (!userDoc.exists()) return null;

        return {
          id: otherUserId,
          ...userDoc.data(),
          lastMessage: chat.lastMessage,
          lastMessageTime: chat.lastMessageTime,
        };
      }));


      dispatch(setChats(mappedChats));
      setLoading(false);
    })

    return () => unsubscribeChats()

  }, [user?.id, usersList])

  if (loading) {
    return (
      <View style={{backgroundColor: theme.background.primary, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.text.primary} />
        <Text style={[styles.emptyText, {color: theme.text.primary}]}>Loading Chats...</Text>
      </View>
    )
  }

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
    <View style={{ flex: 1, backgroundColor: theme.background.primary }}>

      <StatusBar backgroundColor={theme.background.primary} />

      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: theme.surface.primary }]}
        onPress={() => router.push('/screens/allUsers')}
      >
        <Ionicons name='person-add' size={24} color={theme.text.primary} />
      </TouchableOpacity>

      {
        chats.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <Text style={[styles.emptyText, {color: theme.text.primary}]}>No Recent chats yet</Text>
          </View>
        ): (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
    
                <View style={styles.userCard}>
    
                  <Image source={{ uri: item.profileImage }} style={styles.image} />
    
                  <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: theme.text.primary }]}>
                      {item.userName}
                    </Text>
    
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {item.lastMessage || 'Start conversation'}
                    </Text>
                  </View>
    
                  <Text style={styles.subTitle}>
                    {formattedDate(item.lastMessageTime)}
                  </Text>
    
                </View>
    
              </TouchableOpacity>
    
            )}
          />
        )
      }


    </View>
  )
}

const styles = StyleSheet.create({

  userCard: {
    width: '95%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  image: {
    height: 55,
    width: 55,
    borderRadius: 50
  },

  textContainer: {
    flex: 1,
    marginLeft: 12
  },

  title: {
    fontSize: 18,
    fontWeight: '500'
  },

  subTitle: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 500
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  emptyText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500
  }

})

export default index