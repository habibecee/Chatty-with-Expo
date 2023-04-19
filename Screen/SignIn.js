import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, Subheading } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const navigation = useNavigation();

	const logIn = async () => {
		// console.warn('Created Account');
		setIsLoading(true);
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			navigation.popToTop();
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
			// alert(error.message);
		}
	};

	return (
		<View style={{ margin: 16 }}>
			{!!error && (
				<Subheading
					style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>
					{error}
				</Subheading>
			)}

			<TextInput
				label='Email'
				style={{ marginTop: 12 }}
				value={email}
				onChangeText={(text) => setEmail(text)}
				keyboardType='email-address'
			/>
			<TextInput
				label='Password'
				style={{ marginTop: 12 }}
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 16,
				}}>
				<Button
					compact
					onPress={() => navigation.navigate('SignUp')}>
					Sign Up
				</Button>
				<Button
					mode='contained'
					onPress={() => logIn()}
					loading={isLoading}>
					Sign In
				</Button>
			</View>
		</View>
	);
};

export default SignIn;
