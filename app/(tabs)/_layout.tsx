import { useTheme } from '@/src/hooks/useTheme';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import MyStore from '../redux/store/MyStore';

const tabRoot = () => {

  const {theme} = useTheme();

  return (
    <Provider store={MyStore}>
      <Tabs screenOptions={{
        tabBarStyle:{backgroundColor: theme.background.primary},
        headerStyle: {backgroundColor: theme.background.primary},
        headerTintColor: theme.text.primary,
        
      }}>
        <Tabs.Screen name='index' options={{
          title: 'Home', 
          tabBarIcon: ({ color }) => (
            <Ionicons name='home' style={{ fontSize: 20 }} color={color} />
          ),
        }} />
        <Tabs.Screen name='Profile' options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' style={{ fontSize: 20 }} color={color} />
          )
        }} />
        <Tabs.Screen name='settings' options={{
          title: 'Settings',
          tabBarIcon: ({color}) => ( 
            <FontAwesome name='gear' style = {{fontSize: 20}} color={color} />
          )
        }} />
      </Tabs>
    </Provider>
  )
}

export default tabRoot