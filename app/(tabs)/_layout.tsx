import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { CommonActions } from "@react-navigation/native";
import { Tabs, router } from "expo-router";
import React from "react";
import {
  Appbar,
  BottomNavigation,
  IconButton,
  Tooltip,
} from "react-native-paper";

const TabLayout = () => (
  <Tabs
    screenOptions={{
      tabBarHideOnKeyboard: true,
      header: (props) => {
        const title = getHeaderTitle(props.options, props.route.name);

        return (
          <Appbar.Header style={{ gap: 16, paddingHorizontal: 16 }}>
            <Appbar.Content title={title} />

            {props.options.headerRight
              ? props.options.headerRight({})
              : undefined}
          </Appbar.Header>
        );
      },
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.title;

          return label;
        }}
      />
    )}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "home" : "home-outline"}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        headerRight: () => (
          <Tooltip title="Info">
            <IconButton
              icon="information"
              onPress={() => router.push("/modal")}
            />
          </Tooltip>
        ),
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "cog" : "cog-outline"}
          />
        ),
      }}
    />
  </Tabs>
);

export default TabLayout;
