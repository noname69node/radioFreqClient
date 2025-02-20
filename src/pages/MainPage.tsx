import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useAuth } from "../hooks/useAuth";

const MainPage = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const [frequencies, setFrequencies] = useState({
    frequency_37: "",
    frequency_38: "",
  });

  useEffect(() => {
    fetchFrequencies();
  }, []);

  const fetchFrequencies = async () => {
    try {
      const response = await axios.get(
        "https://radiofreq-production.up.railway.app/api/frequencies/latest"
      );
      setFrequencies(response.data);
    } catch (error) {
      console.error("Error fetching frequencies:", error);
    }
  };

  return (
    <Box>
      <Navigation
        user={user}
        isAdmin={isAdmin}
        onLogin={loginWithGoogle}
        onLogout={logout}
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
        sx={{
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" fontWeight={700} color="#333" mb={2}>
          You can find me here:
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem", // Adds spacing between 3,7 and 3,8
            mt: 2, // Adds some margin on top
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "3rem", // Bigger text
              fontWeight: "bold", // Bold text
              color: "#00796b",
              letterSpacing: "2px",
            }}
          >
            3.7{frequencies.frequency_37}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: "3rem", // Bigger text
              fontWeight: "bold", // Bold text
              color: "#00796b",
              letterSpacing: "2px",
            }}
          >
            3.8{frequencies.frequency_38}
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default MainPage;
