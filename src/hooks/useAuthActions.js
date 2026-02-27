import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export const useAuthActions = () => {
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
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return { loginAdmin, logout };
};
