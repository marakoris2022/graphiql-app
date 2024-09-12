import { app } from '@/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export async function signInWithEmail(email: string, password: string) {
  try {
    const credential = await signInWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    const idToken = await credential.user.getIdToken();

    await fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
}
