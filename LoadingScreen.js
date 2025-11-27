import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = ({ message = 'Carregando...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
        color: 'white',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <CircularProgress
              size={60}
              sx={{
                color: 'white',
                mb: 3,
              }}
            />
          </motion.div>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            DressCode
          </Typography>
          
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {message}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;