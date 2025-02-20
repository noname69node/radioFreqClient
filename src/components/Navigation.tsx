import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Home, AdminPanelSettings, Login, Logout } from "@mui/icons-material";
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

        {/* Admin Button (visible only if user is admin) */}
        {isAdmin && (
          <IconButton color="inherit" component={Link} to="/admin">
            <AdminPanelSettings />
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
