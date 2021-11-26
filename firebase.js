import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
	apiKey: "AIzaSyCjDBrag1Pi5oGMBY9TXxQ_wdJnT_4e3VE",
	authDomain: "insta-clone-e34b0.firebaseapp.com",
	projectId: "insta-clone-e34b0",
	storageBucket: "insta-clone-e34b0.appspot.com",
	messagingSenderId: "265301968209",
	appId: "1:265301968209:web:f08fb9faf72e56f0a9ff70"
};

//Retrieve existing app if available, otherwise initialize app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage};
