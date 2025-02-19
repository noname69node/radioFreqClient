import { Box, Typography } from "@mui/material";
import Navigation from "../components/Navigation";
import FrequencyForm from "../components/FrequencyForm";
import { useAuth } from "../hooks/useAuth";

const AdminPage = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();

  return (
    <Box>
      <Navigation
        user={user}
        isAdmin={isAdmin}
        onLogin={loginWithGoogle}
        onLogout={logout}
      />
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">Admin Dashboard</Typography>
        {isAdmin ? (
          <FrequencyForm isAdmin={isAdmin} />
        ) : (
          <Typography color="error">
            Only admins can add frequencies.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminPage;
