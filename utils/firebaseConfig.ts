// Import the functions you need from the SDKs you need
import useUserStore from "@/app/store/userStore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const setLoadingUser = useUserStore.getState().setLoadingUser;

export async function signInWithEmail(email: string, password: string) {
  try {
    setLoadingUser(true);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  } finally {
    setLoadingUser(false);
  }
}

export async function signOutUser() {
  try {
    setLoadingUser(true);
    await signOut(auth);
  } catch (error) {
    throw error;
  } finally {
    setLoadingUser(false);
  }
}

export async function registerUser(
  email: string,
  password: string,
  newDisplayName: string
) {
  try {
    setLoadingUser(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: newDisplayName });
    const setUser = useUserStore.getState().setUser;
    setUser({ ...user, displayName: newDisplayName });
  } catch (error) {
    throw error;
  } finally {
    setLoadingUser(false);
  }
}
