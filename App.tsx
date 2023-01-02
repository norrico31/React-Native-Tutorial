/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, type PropsWithChildren } from 'react';
import {
	Alert,
	Button,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import uuidV4 from 'react-native-uuid';

const initState = [
	{
		id: '1',
		name: 'gerald',
	},
	{
		id: '2',
		name: 'norrico',
	},
	{
		id: '3',
		name: 'makima',
	},
];

export type SelectedUser = {
	id: string
	name: string
} | undefined

const Section: React.FC<
	PropsWithChildren<{
		title: string;
	}>
> = ({ children, title }) => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}>
				{children}
			</Text>
		</View>
	);
};

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const [text, onChangeText] = useState('');
	// const [modalVisible, setModalVisible] = useState(false);
	const [items, setItems] = useState(initState);
	const [selectedUser, setSelectedUser] = useState<SelectedUser>(undefined);
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	function editUser(user: SelectedUser) {
		onChangeText(user!.name);
		setSelectedUser(user);
	}

	function deleteUser(id: string) {
		const filteredItms = items.filter((itm) => itm.id !== id);
		setItems(filteredItms);
		setSelectedUser(undefined);
	}

	function closeModal() {
		// setModalVisible(false);
		setSelectedUser(undefined);
	}

	const btnAlertDelete = (user: SelectedUser) => {
		Alert.alert(
			'Delete',
			`wanna delete user ${user?.name}?`,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'Delete', onPress: () => deleteUser(user!.id) },
			]
		);
	};

	console.log(selectedUser);

	function onSubmit(evt: React.FormEvent) {
		evt.preventDefault();
		if (selectedUser) {
			const existingUser = items.map((itm) => itm.id !== selectedUser.id ? itm : { ...selectedUser, name: text });
			setItems(existingUser);
			setSelectedUser(undefined);
		} else {
			setItems([...items, { name: text, id: uuidV4.v4().toString() }]);
		}
		onChangeText('');
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}>
				<Header />
				<View
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						backgroundColor: isDarkMode ? Colors.black : Colors.white,
						paddingVertical: 20,
					}}>
					<Section title="Android TypeScript!">
						<Text style={styles.highlight}>Hello World</Text>
					</Section>
					<TextInput
						style={styles.input}
						onChangeText={onChangeText}
						onSubmitEditing={onSubmit}
						value={text}
					/>
					{items.map((itm: { id: string; name: string }) => (
						<View key={itm.id} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly', marginVertical: 10 }}>
							<Text style={styles.name}>{itm.name}</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 150, alignItems: 'center' }}>
								<Button title="Edit" onPress={() => editUser(itm)} />
								<Button title="Delete" onPress={() => btnAlertDelete(itm)} />
							</View>
						</View>
					))}
				</View>
				{/* <Modal isModal={modalVisible} closeModal={closeModal} selectedUser={selectedUser} deleteUser={deleteUser} /> */}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		paddingHorizontal: 24,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	name: {
		paddingHorizontal: 24,
		fontSize: 24,
		fontWeight: '700',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default App;
