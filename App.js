import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, Provider } from 'react-native-paper';

import Settings from './Screen/Settings';
import ChatList from './Screen/ChatList';
import Chat from './Screen/Chat';
import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAIhwq8IPyAaeZhBvplBdjOcTBrlncFwJQ',
	authDomain: 'chatty-aa80a.firebaseapp.com',
	projectId: 'chatty-aa80a',
	storageBucket: 'chatty-aa80a.appspot.com',
	messagingSenderId: '821205100596',
	appId: '1:821205100596:web:12d852679101b8a7094261',
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
	const navigation = useNavigation();
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				navigation.navigate('SignUp');
			}
		});
	}, []);

	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					return (
						<Ionicons
							name={route.name === 'ChatList' ? 'chatbubbles' : 'settings'}
							color={route.name === 'ChatList' ? '#B1B2FF' : '#9ED2C6'}
							size={size}
						/>
					);
				},
				tabBarActiveTintColor: '#7E7474',
				tabBarInactiveTintColor: '#C4B6B6',
			})}>
			<Tabs.Screen
				name='ChatList'
				component={ChatList}
				color='#B1B2FF'
			/>
			<Tabs.Screen
				name='Settings'
				component={Settings}
				color='#9ED2C6'
			/>
		</Tabs.Navigator>
	);
};

const theme = {
	...DefaultTheme,
	roundness: 5,

	colors: {
		primary: '#B1AFFF',
		onPrimary: 'rgb(255, 255, 255)',
		primaryContainer: 'rgb(240, 219, 255)',
		onPrimaryContainer: 'rgb(44, 0, 81)',
		secondary: '#FFB4B4',
		onSecondary: 'rgb(255, 255, 255)',
		secondaryContainer: 'rgb(237, 221, 246)',
		onSecondaryContainer: 'rgb(33, 24, 42)',
		tertiary: 'rgb(128, 81, 88)',
		onTertiary: 'rgb(255, 255, 255)',
		tertiaryContainer: 'rgb(255, 217, 221)',
		onTertiaryContainer: 'rgb(50, 16, 23)',
		error: 'rgb(186, 26, 26)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 214)',
		onErrorContainer: 'rgb(65, 0, 2)',
		background: 'rgb(255, 251, 255)',
		onBackground: 'rgb(29, 27, 30)',
		surface: 'rgb(255, 251, 255)',
		onSurface: 'rgb(29, 27, 30)',
		surfaceVariant: 'rgb(233, 223, 235)',
		onSurfaceVariant: 'rgb(74, 69, 78)',
		outline: 'rgb(124, 117, 126)',
		outlineVariant: 'rgb(204, 196, 206)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(50, 47, 51)',
		inverseOnSurface: 'rgb(245, 239, 244)',
		inversePrimary: 'rgb(220, 184, 255)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(248, 242, 251)',
			level2: 'rgb(244, 236, 248)',
			level3: 'rgb(240, 231, 246)',
			level4: 'rgb(239, 229, 245)',
			level5: 'rgb(236, 226, 243)',
		},
		surfaceDisabled: 'rgba(29, 27, 30, 0.12)',
		onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)',
		backdrop: 'rgba(51, 47, 55, 0.4)',
		custom0: 'rgb(120, 69, 172)',
		onCustom0: 'rgb(255, 255, 255)',
		custom0Container: 'rgb(240, 219, 255)',
		onCustom0Container: 'rgb(44, 0, 81)',
	},
};

const App = () => {
	return (
		<NavigationContainer>
			<Provider theme={theme}>
				<Stack.Navigator>
					<Stack.Screen
						name='Main'
						component={TabsNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Chat'
						component={Chat}
					/>
					<Stack.Screen
						name='SignIn'
						component={SignIn}
						options={{ presentation: 'fullScreenModal' }}
					/>
					<Stack.Screen
						name='SignUp'
						component={SignUp}
						options={{ presentation: 'fullScreenModal' }}
					/>
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	);
};

export default App;
