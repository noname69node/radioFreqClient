import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import axios from "axios";

import { User, signInWithRedirect, getRedirectResult } from "firebase/auth";

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

  useEffect(() => {
    // Handle redirect result when the user returns to the app
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          checkAdmin(result.user);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
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
      await signInWithRedirect(auth, googleProvider);
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