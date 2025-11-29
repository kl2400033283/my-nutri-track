'use client';
import {
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { firebaseConfig } from './config';
import { initializeApp, getApps } from 'firebase/app';

const getFriendlyAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'The email address is not valid. Please check and try again.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use a stronger password.';
    case 'auth/invalid-credential':
        return 'The email or password you entered is incorrect. Please try again.';
    case 'auth/popup-closed-by-user':
        return 'Sign-in process was cancelled. Please try again.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};


const createUserDocument = (user) => {
    if (getApps().length === 0) {
        initializeApp(firebaseConfig);
    }
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    return getDoc(userDocRef).then(docSnap => {
        if (!docSnap.exists()) {
            const userData = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: serverTimestamp(),
                id: user.uid,
            };
            return setDoc(userDocRef, userData);
        }
    }).catch(error => {
        console.error("Error creating user document: ", error);
        toast({
            variant: "destructive",
            title: "Database Error",
            description: "Could not save user data to the database.",
        });
    });
};


/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider)
    .then((userCredential) => {
        createUserDocument(userCredential.user);
    })
    .catch((error) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: message,
        });
    });
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance, email, password) {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential) => {
      createUserDocument(userCredential.user);
    })
    .catch((error) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Sign-Up Failed",
          description: message,
        });
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance, email, password) {
  signInWithEmailAndPassword(authInstance, email, password)
    .catch((error) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Sign-In Failed",
          description: message,
        });
    });
}

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance) {
    signInAnonymously(authInstance)
      .catch((error) => {
          const message = getFriendlyAuthErrorMessage(error);
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: message,
          });
      });
  }
