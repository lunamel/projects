import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
// import { Timestamp } from '@firebase/firestore-types';
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({timestampsInSnapshots:true})
export default firebaseApp.firestore()


