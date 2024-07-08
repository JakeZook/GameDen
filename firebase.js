import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDDIqi0kLI3MbDj5dlk9pK-UZbKoi8_ZOg",
	authDomain: "gameden-9b1c3.firebaseapp.com",
	databaseURL: "https://gameden-9b1c3-default-rtdb.firebaseio.com",
	projectId: "gameden-9b1c3",
	storageBucket: "gameden-9b1c3.appspot.com",
	messagingSenderId: "416396571538",
	appId: "1:416396571538:web:ed40680a6c00133b14c74b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth instance

export { auth };
