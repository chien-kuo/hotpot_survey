import { useEffect, useState } from 'react';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { setUser, setIsAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAdmin(!user.isAnonymous);
        setLoading(false);
      } else {
        // No user, sign in anonymously
        signInAnonymously(auth).catch((err) => {
          console.error("Anonymous Auth Error:", err);
          setError(err.message);
          setLoading(false); // Stop loading on error
        });
      }
    });

    return () => unsubscribe();
  }, [setUser, setIsAdmin]);

  const loginAdmin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      console.error("Login Failed:", err);
      let msg = "登入失敗";
      if (err.code === 'auth/invalid-email') msg = '信箱格式不正確';
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') msg = '帳號或密碼錯誤';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // After logout, onAuthStateChanged will trigger with null, then sign in anonymously
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return { loading, error, loginAdmin, logout };
};
