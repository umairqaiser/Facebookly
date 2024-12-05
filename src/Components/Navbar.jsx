import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logout from './Logout';

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation(); // Hook to get the current location

  const button = {
    marginRight: '20px',
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '0.3rem 1.4rem',
  };

  return (
    <AppBar sx={{ bgcolor: '#333' }}>
      <Toolbar>
        {/* App Name */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          FaceBookly
        </Typography>

        {/* Show Logout button only if on Home page */}
        {isLoggedIn && location.pathname === "/home" && (
          <Logout setIsLoggedIn={setIsLoggedIn} />
        )}

        {/* Show Login and Signup buttons if the user is not logged in */}
        {!isLoggedIn && location.pathname !== "/home" && (
          <>
            <Button
              variant="contained"
              style={button}
              color="error"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              variant="contained"
              style={button}
              color="success"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
