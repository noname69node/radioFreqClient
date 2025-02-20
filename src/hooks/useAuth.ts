import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import axios from "axios";

import { User, signInWithPopup } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) checkAdmin(user);
      else setIsAdmin(false);
    });

    return () => unsubscribe();
  }, []);

  const checkAdmin = async (user: User) => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get(
        "https://radiofreq-production.up.railway.app/api/auth/check",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Error verifying admin:", error);
      setIsAdmin(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        setUser(user);
        checkAdmin(user);
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setIsAdmin(false);
    });
  };

  return { user, isAdmin, loginWithGoogle, logout };
};
