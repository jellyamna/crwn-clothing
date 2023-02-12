import {initializeApp}  from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration  
const firebaseConfig = {
  apiKey: "AIzaSyBsf6MWKjYzAaInDnl2AkyT5_n4_ojQPvM",
  authDomain: "crwn-clothing-db-2fdb3.firebaseapp.com",
  projectId: "crwn-clothing-db-2fdb3",
  storageBucket: "crwn-clothing-db-2fdb3.appspot.com",
  messagingSenderId: "1084090173227",
  appId: "1:1084090173227:web:84518c1acb609d9be0e76e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  //berikan saya dokument dalam "db" data under users collection yakni yang userauthid ini.

  console.log(`userDocRef : ${userDocRef}`);

  const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
















