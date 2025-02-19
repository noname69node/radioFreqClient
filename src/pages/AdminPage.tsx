import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { auth, googleProvider } from "../firebaseConfig";
import axios from "axios";
import FrequencyForm from "../components/FrequencyForm";

const AdminPage = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        checkAdmin(user);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkAdmin = async (user: firebase.User) => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Error verifying admin:", error);
      setIsAdmin(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      if (user) {
        setUser(user);
        checkAdmin(user);
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setIsAdmin(false);
    });
  };

  return (
    <div>
      <Navigation
        user={user}
        isAdmin={isAdmin}
        onLogin={loginWithGoogle}
        onLogout={handleLogout}
      />
      {isAdmin && (
        <>
          <h1>Admin Dashboard</h1>
          <FrequencyForm isAdmin={isAdmin} />
        </>
      )}
    </div>
  );
};

export default AdminPage;
