

import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCDcySTO6vUlphnyME9rc0YK_zgRkcPb8U",
    authDomain: "clothing-ecommerce-9f61a.firebaseapp.com",
    projectId: "clothing-ecommerce-9f61a",
    storageBucket: "clothing-ecommerce-9f61a.appspot.com",
    messagingSenderId: "614983719217",
    appId: "1:614983719217:web:5e8ac730191529405b3810"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // tell is data exist in db or not 
    // console.log(userSnapshot.exists());


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        //  if user data don't exist
        //create /set the document with the data from userAuth in my collection

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });

        } catch (error) {
            console.log('error', error.message)
        }
    }

    //if user Data exist
    //return userDocRef
    return userDocRef;

}

export const CreateUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}