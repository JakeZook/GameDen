import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Blackjack from "./screens/Blackjack";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer styles={styles.container}>
			<Stack.Navigator>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Home"
					component={HomeScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Blackjack"
					component={Blackjack}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
});
