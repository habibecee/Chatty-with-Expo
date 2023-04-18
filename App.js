import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-native-paper';

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

export const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = app.auth();

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
	const navigation = useNavigation();
	useEffect(() => {
		const isLoggedIn = false;

		if (!isLoggedIn) {
			navigation.navigate('SignUp');
		}
	}, []);

	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					return (
						<Ionicons
							name={route.name === 'ChatList' ? 'chatbubbles' : 'settings'}
							color={color}
							size={size}
						/>
					);
				},
			})}>
			<Tabs.Screen
				name='ChatList'
				component={ChatList}
			/>
			<Tabs.Screen
				name='Settings'
				component={Settings}
			/>
		</Tabs.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Provider>
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
