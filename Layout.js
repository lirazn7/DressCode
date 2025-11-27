import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import {
  AccountCircle,
  Home,
  Checkroom,
  Feed,
  EmojiEvents,
  ExitToApp,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../services/AuthContext';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const navigationItems = [
    { label: 'Feed', icon: <Feed />, path: '/feed' },
    { label: 'Closet', icon: <Checkroom />, path: '/closet' },
    { label: 'Desafios', icon: <EmojiEvents />, path: '/challenges' },
    { label: 'Perfil', icon: <Person />, path: '/profile' },
  ];

  const getCurrentNavIndex = () => {
    const currentPath = location.pathname;
    return navigationItems.findIndex(item => item.path === currentPath);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                cursor: 'pointer',
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              onClick={() => navigate('/feed')}
            >
              DressCode
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {/* User Menu */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar
              src={user?.profile_image_url}
              alt={user?.full_name}
              sx={{ width: 32, height: 32 }}
            >
              {user?.full_name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>
              <AccountCircle sx={{ mr: 1 }} />
              Meu Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Account for AppBar height
          pb: isMobile ? 7 : 2, // Account for BottomNavigation on mobile
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Container>
      </Box>

      {/* Bottom Navigation (Mobile) */}
      {isMobile && (
        <BottomNavigation
          value={getCurrentNavIndex()}
          onChange={(event, newValue) => {
            if (newValue !== -1) {
              navigate(navigationItems[newValue].path);
            }
          }}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
            '& .MuiBottomNavigationAction-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: 'white',
              },
            },
          }}
        >
          {navigationItems.map((item, index) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.icon}
                </motion.div>
              }
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
};

export default Layout;