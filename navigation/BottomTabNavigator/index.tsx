import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../../constants/Colors';
import HomeScreen from '../../screens/HomeScreen';
import TransactionScreen from '../../screens/TransactionScreen';
import SettingScreen from '../../screens/SettingScreen';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import { useTheme } from '../../theme';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const colorScheme:ColorSchemeName = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Welcome back !',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarShowLabel: false,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerShadowVisible: true,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TransactionScreen}
        options={{
          title: 'Transactions',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="swap" color={color} />,
          headerShadowVisible: true,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={SettingScreen}
        options={{
          title: 'Settings',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />,
          headerShadowVisible: true,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
