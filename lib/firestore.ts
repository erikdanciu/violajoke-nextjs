import { db, auth } from '@/lib/firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isPremium: boolean;
  createdAt: any;
  updatedAt: any;
  favoriteJokes: number[];
  jokesUsedToday: number;
  lastJokeDate: string; // YYYY-MM-DD
}

// Get or create user profile
export async function getUserProfile(user: User): Promise<UserProfile> {
  if (!user) throw new Error('User not authenticated');

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }

  // Create new user profile
  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    isPremium: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    favoriteJokes: [],
    jokesUsedToday: 0,
    lastJokeDate: new Date().toDateString(),
  };

  await setDoc(userRef, newProfile);
  return newProfile;
}

// Update user premium status (admin only - call from your backend)
export async function setPremiumStatus(uid: string, isPremium: boolean) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    isPremium,
    updatedAt: serverTimestamp(),
  });
}

// Add favorite joke
export async function addFavoriteJoke(user: User, jokeId: number) {
  if (!user) throw new Error('User not authenticated');
  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    favoriteJokes: arrayUnion(jokeId),
    updatedAt: serverTimestamp(),
  });
}

// Remove favorite joke
export async function removeFavoriteJoke(user: User, jokeId: number) {
  if (!user) throw new Error('User not authenticated');
  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    favoriteJokes: arrayRemove(jokeId),
    updatedAt: serverTimestamp(),
  });
}

// Increment jokes used today
export async function incrementJokesToday(user: User) {
  if (!user) throw new Error('User not authenticated');

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  const today = new Date().toDateString();

  if (!userDoc.exists()) {
    throw new Error('User profile not found');
  }

  const userData = userDoc.data() as UserProfile;
  const isNewDay = userData.lastJokeDate !== today;

  await updateDoc(userRef, {
    jokesUsedToday: isNewDay ? 1 : userData.jokesUsedToday + 1,
    lastJokeDate: today,
    updatedAt: serverTimestamp(),
  });
}

// Get jokes remaining today
export async function getJokesRemaining(user: User): Promise<number> {
  if (!user) return 10; // Free user default

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return 10;
  }

  const userData = userDoc.data() as UserProfile;

  // Premium users get unlimited
  if (userData.isPremium) {
    return 999; // Effectively unlimited
  }

  // Check if it's a new day
  const today = new Date().toDateString();
  if (userData.lastJokeDate !== today) {
    return 10; // New day, reset to 10
  }

  return Math.max(0, 10 - userData.jokesUsedToday);
}
