import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Text, Image, Pressable, View, StyleSheet } from "react-native";
import axios from "axios";

import { colors } from "../constants";

//TODO - Turns, styling, dealer 2nd card backwards, ace fix, betting, reshuffle, back button, stats, other players

const Blackjack = () => {
	const [dealer, setDealer] = useState(0);
	const [player, setPlayer] = useState(0);
	const [deck, setDeck] = useState(null);
	const [dealerCards, setDealerCards] = useState([]);
	const [playerCards, setPlayerCards] = useState([]);
	const [handState, setHandSate] = useState("Idle"); //Idle, playing, over

	//Get a brand new shuffled deck
	useEffect(() => {
		const getDeck = async () => {
			try {
				const response = await axios.get(
					"https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
				);
				setDeck(response.data);
			} catch (error) {
				console.error("Error fetching deck:", error);
			}
		};

		getDeck();
	}, []);

	//Load deck
	useEffect(() => {
		if (deck) {
			console.log("Deck ID:", deck.deck_id);
		}
	}, [deck]);

	//Add up value of cards when new ones are dealt
	useEffect(() => {
		//Set value to 0 to add them all up
		setDealer(0);
		setPlayer(0);
		for (let card of dealerCards) {
			if (
				card.value === "KING" ||
				card.value === "QUEEN" ||
				card.value === "JACK"
			) {
				setDealer((prev) => prev + 10);
			} else if (card.value === "ACE") {
				if (dealer + 11 >= 24) {
					setDealer((prev) => prev + 1);
				} else {
					setDealer((prev) => prev + 11);
				}
			} else {
				setDealer((prev) => prev + parseInt(card.value));
			}
		}
		for (let card of playerCards) {
			if (
				card.value === "KING" ||
				card.value === "QUEEN" ||
				card.value === "JACK"
			) {
				setPlayer((prev) => prev + 10);
			} else if (card.value === "ACE") {
				//If going to bust with ace, change value to 1
				if (player + 11 >= 24) {
					setPlayer((prev) => prev + 1);
				} else {
					setPlayer((prev) => prev + 11);
				}
			} else {
				setPlayer((prev) => prev + parseInt(card.value));
			}
		}
	}, [dealerCards, playerCards]);

	useEffect(() => {
		//Check win when new cards are added
		checkForWin();
	}, [player, dealer]);

	//Draw initial cards at start of game
	const drawStartCards = async () => {
		try {
			const response = await axios.get(
				`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`
			);
			const cards = response.data.cards;
			setDealerCards([cards[0], cards[2]]);
			setPlayerCards([cards[1], cards[3]]);
			setHandSate("Playing");
		} catch (error) {
			console.error("Error drawing start cards:", error);
		}
	};

	//Draw 1 card
	const drawCard = async () => {
		try {
			const response = await axios.get(
				`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
			);
			const card = response.data.cards[0];
			setPlayerCards((prevCards) => [...prevCards, card]);
		} catch (error) {
			console.error("Error drawing card:", error);
		}
	};

	//Check for bust or blackjack
	const checkForWin = () => {
		if (dealer > 21) {
			console.log("Dealer Bust");
			setHandSate("Over");
		}
		if (dealer === 21) {
			console.log("Dealer Blackjack");
			setHandSate("Over");
		}
		if (player > 21) {
			console.log("Player bust");
			setHandSate("Over");
		}
		if (player === 21) {
			console.log("Player Blackjack");
			setHandSate("Over");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>BLACKJACK</Text>
			<View style={styles.board}>
				<View style={styles.userContainer}>
					<Text style={styles.dealer}>Dealer: {dealer}</Text>
					<View style={styles.cardContainer}>
						{dealerCards.map((card, index) => (
							<Image
								key={index}
								source={{ uri: card.image }}
								style={styles.card}
							/>
						))}
					</View>
				</View>
				<View>
					<Text style={styles.player}>Player: {player}</Text>
					<View style={styles.cardContainer}>
						{playerCards.map((card, index) => (
							<Image
								key={index}
								source={{ uri: card.image }}
								style={styles.card}
							/>
						))}
					</View>
				</View>
				{handState === "Idle" ? (
					<Pressable onPress={() => drawStartCards()}>
						<Text>BET</Text>
					</Pressable>
				) : (
					<Pressable onPress={() => drawCard()}>
						<Text>HIT</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgb(17 69 35)",
		alignItems: "center",
	},
	title: {
		color: colors.white,
		fontSize: 24,
	},
	board: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	dealer: {
		color: colors.red,
		textAlign: "center",
	},
	player: {
		color: colors.primary,
		textAlign: "center",
	},
	userContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
	},
	cardContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	card: {
		width: 60,
		height: 90,
		margin: 5,
	},
});

export default Blackjack;
