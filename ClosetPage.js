import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fab,
  IconButton,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ClosetPage = () => {
  // Mock data for demonstration
  const mockLooks = [
    {
      id: 1,
      title: 'Look Executivo',
      category: 'Formal',
      tags: ['blazer', 'calça social', 'sapato'],
      likes: 15,
      isPublic: true,
      createdAt: '1 dia atrás',
    },
    {
      id: 2,
      title: 'Casual Weekend',
      category: 'Casual',
      tags: ['jeans', 'camiseta', 'tênis'],
      likes: 8,
      isPublic: true,
      createdAt: '3 dias atrás',
    },
    {
      id: 3,
      title: 'Night Out',
      category: 'Festa',
      tags: ['vestido', 'salto', 'bolsa'],
      likes: 23,
      isPublic: false,
      createdAt: '1 semana atrás',
    },
  ];

  const LookCard = ({ look }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(90, 10, 51, 0.15)',
          },
        }}
      >
        {/* Image Placeholder */}
        <Box
          sx={{
            height: 300,
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            position: 'relative',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Foto do Look
          </Typography>
          
          {/* Privacy indicator */}
          {!look.isPublic && (
            <Chip
              label="Privado"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {look.title}
          </Typography>
          
          <Chip
            label={look.category}
            size="small"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              mb: 1,
            }}
          />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {look.tags.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Favorite sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                {look.likes} curtidas
              </Typography>
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              {look.createdAt}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'error.main' }}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Meu Closet
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {mockLooks.length} looks salvos
          </Typography>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {mockLooks.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total de Looks
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {mockLooks.filter(look => look.isPublic).length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Públicos
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {mockLooks.reduce((sum, look) => sum + look.likes, 0)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total de Curtidas
              </Typography>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                3
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Categorias
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Looks Grid */}
      <Grid container spacing={3}>
        {mockLooks.map((look, index) => (
          <Grid item xs={12} sm={6} md={4} key={look.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <LookCard look={look} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, md: 16 },
            right: 16,
            background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
          }}
          onClick={() => console.log('Add new look')}
        >
          <Add />
        </Fab>
      </motion.div>
    </Box>
  );
};

export default ClosetPage;