/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName, Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import StoreList from '../screens/StoreList';
import CartScreen from '../screens/CartScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import PaymentScreen from '../screens/PaymentScreen';
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="StoreList"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="StoreList"
        component={StoreList}
        options={() => ({
          title: 'Loja',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Image
              source={require('../assets/images/SW-Logo.png')}
              name="Logo"
              style={{ width: 60, height: 60, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          headerRight: () => (
            <Image
              source={require('../assets/images/SW-Logo.png')}
              name="Logo"
              style={{ width: 60, height: 60, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="PurchaseHistoryScreen"
        component={PurchaseHistoryScreen}
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          headerRight: () => (
            <Image
              source={require('../assets/images/SW-Logo.png')}
              name="Logo"
              style={{ width: 60, height: 60, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="Pagamento" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}
