import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {
	List,
	Avatar,
	Divider,
	FAB,
	Portal,
	Dialog,
	Button,
	TextInput,
} from 'react-native-paper';

import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [email, setEmail] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [chats, setChats] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setEmail(user?.email ?? '');
		});
	}, []);

	const createChat = async () => {
		if (!email || !userEmail) return;
		setIsLoading(true);
		const response = await firebase
			.firestore()
			.collection('chats')
			.add({
				users: [email, userEmail],
			});
		setIsLoading(false);
		setIsDialogVisible(false);
		navigation.navigate('Chat', { chatId: response.id });
	};

	useEffect(() => {
		return firebase
			.firestore()
			.collection('chats')
			.where('users', 'array-contains', email)
			.onSnapshot((querySnapShot) => {
				setChats(querySnapShot.docs);
			});
	}, [email]);

	return (
		<View style={{ flex: 1, paddingHorizontal: 12 }}>
			{chats.map((chat) => (
				<React.Fragment>
					<List.Item
						key={chat.id}
						title={chat.data().users.find((x) => x !== email)}
						description={(chat.data().messages ?? [])[0]?.text ?? undefined}
						left={() => (
							<Avatar.Text
								label={chat
									.data()
									.users.find((x) => x !== email)
									.split(' ')
									.reduce((prev, current) => prev + current[0], '')}
								size={56}
							/>
						)}
						onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
					/>

					<Divider inset />
				</React.Fragment>
			))}

			<Portal>
				<Dialog
					visible={isDialogVisible}
					onDismiss={() => setIsDialogVisible(false)}>
					<Dialog.Title>New Chat</Dialog.Title>
					<Dialog.Content>
						<TextInput
							label='Enter user email'
							value={userEmail}
							onChangeText={(text) => setUserEmail(text)}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() => {
								setIsDialogVisible(false);
							}}>
							Cancel
						</Button>
						<Button
							onPress={() => createChat()}
							loading={isLoading}>
							Save
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<FAB
				icon='plus'
				style={{
					position: 'absolute',
					bottom: 16,
					right: 16,
					borderRadius: 28,
				}}
				onPress={() => {
					setIsDialogVisible(true);
				}}
			/>
		</View>
	);
};

export default ChatList;
