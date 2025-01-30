import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import React from 'react'
import { Appbar, Menu, Tooltip } from 'react-native-paper'

import { Locales, TabBar, TabsHeader } from '@/lib'

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('titleHome'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
              <Tooltip title={Locales.t('titleSettings')}>
                <Appbar.Action
                  icon="cog"
                  onPress={() => router.push('/modals/settings')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              color={color}
              size={24}
              name={focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="health-monitoring"
        options={{
          title: 'Health Monitor',
          headerRight: () => (
            <Tooltip title={Locales.t('search')}>
              <Appbar.Action
                icon="magnify"
                onPress={() => router.push('/search')}
              />
            </Tooltip>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              color={color}
              size={24}
              name={focused ? 'heart-pulse' : 'heart-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          headerRight: () => (
            <Tooltip title={Locales.t('search')}>
              <Appbar.Action
                icon="magnify"
                onPress={() => router.push('/search')}
              />
            </Tooltip>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              color={color}
              size={24}
              name={focused ? 'calendar-clock' : 'calendar-clock-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          headerRight: () => (
            <Tooltip title="Call Emergency">
              <Appbar.Action
                icon="phone"
                onPress={() => {
                  /* Add emergency call handler */
                }}
              />
            </Tooltip>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              color={color}
              size={24}
              name={focused ? 'phone-alert' : 'phone-alert-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: Locales.t('profile'),
          headerRight: () => (
            <Tooltip title={Locales.t('titleSettings')}>
              <Appbar.Action
                icon="cog"
                onPress={() => router.push('/modals/settings')}
              />
            </Tooltip>
          ),
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              color={color}
              size={24}
              name={focused ? 'account' : 'account-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
