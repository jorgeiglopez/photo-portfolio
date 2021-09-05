import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './DO_NOT_COMMIT_firebaseConfig';

const getSignUpURL = () =>
	'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='.concat(firebaseConfig.apiKey);
const getLoginURL = () =>
	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='.concat(firebaseConfig.apiKey);

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp, getSignUpURL, getLoginURL };
