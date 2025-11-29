'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { firebaseConfig } from './config';
import { initializeApp, getApps } from 'firebase/app';

const getFriendlyAuthErrorMessage = (error: FirebaseError): string => {
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
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance)
    .catch((error: FirebaseError) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: message,
        });
    });
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential: UserCredential) => {
      // After user is created in Auth, save data to Firestore
      const user = userCredential.user;
      if (getApps().length === 0) {
        initializeApp(firebaseConfig);
      }
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      
      const userData = {
        email: user.email,
        createdAt: serverTimestamp(),
        id: user.uid,
      };

      setDoc(userDocRef, userData)
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast({
            variant: "destructive",
            title: "Database Error",
            description: "Could not save user data to the database.",
          });
        });
    })
    .catch((error: FirebaseError) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Sign-Up Failed",
          description: message,
        });
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .catch((error: FirebaseError) => {
        const message = getFriendlyAuthErrorMessage(error);
        toast({
          variant: "destructive",
          title: "Sign-In Failed",
          description: message,
        });
    });
}
