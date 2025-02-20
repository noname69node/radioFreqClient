import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@mui/material";
import { Home, AdminPanelSettings, Login, Logout, Settings } from "@mui/icons-material";

import { Link } from "react-router-dom";

import { User } from "firebase/auth";

interface NavigationProps {
  user: User | null;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  isAdmin,
  onLogin,
  onLogout,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Home Button */}
        <IconButton color="inherit" component={Link} to="/">
          <Home />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Frequency Tracker
        </Typography>

        

        {/* User Info (Full Name & Avatar) */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
            <Avatar
              src={user.photoURL || ""}
              alt={user.displayName || "User"}
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="body1">{user.displayName}</Typography>
          </Box>
        )}

        {/* Admin Button (visible only if user is admin) */}
        {isAdmin && (
          <IconButton color="inherit" component={Link} to="/admin">
            <AdminPanelSettings />
          </IconButton>
        )}

        {user && (
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        )}

        {/* Login/Logout Button */}
        {user ? (
          <IconButton color="inherit" onClick={onLogout}>
            <Logout />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={onLogin}>
            <Login />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
