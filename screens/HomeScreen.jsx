import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	Pressable,
	View,
	StyleSheet,
} from "react-native";
import { auth } from "../firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

import { colors } from "../constants";

const HomeScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const navigation = useNavigation();

	// Check if user is already logged in on component mount
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true); // User is logged in
			} else {
				setLoggedIn(false); // User is not logged in
			}
		});

		// Clean up subscription on unmount
		return () => unsubscribe();
	}, []);

	const handleLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			// User successfully logged in
			console.log("User logged in:", userCredential.user);
			setLoggedIn(true);
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	const handleSignUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// User successfully signed up
			console.log("User signed up:", userCredential.user);
			setLoggedIn(true);
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	const handleBlackjack = () => {
		navigation.navigate("Blackjack");
	};

	// If user is logged in, show basic home page
	if (loggedIn) {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>Welcome to the GameDen!</Text>
				<View style={styles.roomContainer}>
					<Pressable onPress={() => handleBlackjack()} style={styles.button}>
						<Text style={styles.roomButton}>Blackjack</Text>
					</Pressable>
					<Pressable onPress={() => auth.signOut()} style={styles.button}>
						<Text style={styles.SignupButton}>Logout</Text>
					</Pressable>
				</View>
			</View>
		);
	}

	// If user is not logged in, show login and sign up UI
	return (
		<KeyboardAvoidingView style={styles.container}>
			<View>
				<Text style={styles.header}>GameDen</Text>
				<Text style={styles.sub}>Login Below!</Text>
			</View>
			<TextInput
				style={styles.textBox}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.textBox}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<View style={styles.buttonContainer}>
				<Pressable style={styles.LoginButton} onPress={handleLogin}>
					<Text>Login</Text>
				</Pressable>
				<Pressable style={styles.SignupButton} onPress={handleSignUp}>
					<Text>Sign Up</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 12,
		color: colors.primary,
		textAlign: "center",
	},
	sub: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.accent,
		marginBottom: 20,
		textAlign: "center",
	},
	textBox: {
		backgroundColor: colors.secondary,
		color: colors.white,
		padding: 10,
		margin: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	LoginButton: {
		backgroundColor: colors.green,
		padding: 10,
		margin: 10,
		textAlign: "center",
	},
	SignupButton: {
		backgroundColor: colors.red,
		padding: 10,
		margin: 10,
		textAlign: "center",
	},
	roomButton: {
		backgroundColor: colors.green,
		padding: 10,
		margin: 10,
		textAlign: "center",
	},
	roomContainer: {
		flexDirection: "column",
		justifyContent: "center",
	},
});

export default HomeScreen;
