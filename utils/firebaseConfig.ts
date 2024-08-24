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
  apiKey: "AIzaSyCH8ZjFgODi1cB0bYIrMPM6u_APKqoWDl8",
  authDomain: "test-61726.firebaseapp.com",
  projectId: "test-61726",
  storageBucket: "test-61726.appspot.com",
  messagingSenderId: "592557607961",
  appId: "1:592557607961:web:eb6a0cf723a49291076e88",
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
