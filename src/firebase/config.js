import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {firebaseConfig} from './DO_NOT_COMMIT_firebaseConfig'


firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
