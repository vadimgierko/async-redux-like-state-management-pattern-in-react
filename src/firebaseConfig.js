// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBw_97Hn4rdu652ikqPPCD9RVHsVp8VGoE",
	authDomain: "redux-like-pattern-todo-app.firebaseapp.com",
	databaseURL:
		"https://redux-like-pattern-todo-app-default-rtdb.firebaseio.com",
	projectId: "redux-like-pattern-todo-app",
	storageBucket: "redux-like-pattern-todo-app.appspot.com",
	messagingSenderId: "657010584050",
	appId: "1:657010584050:web:6f96b6e1fd9ff2698be36b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
