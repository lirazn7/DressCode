import React from 'react';
import { useAuth } from '../services/AuthContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import { Edit, Settings, Favorite, People } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const mockStats = {
    posts: 12,
    followers: 45,
    following: 32,
    likes: 156,
  };

  const mockRecentActivity = [
    { type: 'post', content: 'Novo look casual compartilhado', time: '2 horas atrás' },
    { type: 'like', content: 'Curtiu o look de @marina', time: '5 horas atrás' },
    { type: 'follow', content: 'Começou a seguir @fashionista', time: '1 dia atrás' },
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
          {/* Cover Image */}
          <Box
            sx={{
              height: 200,
              background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
              position: 'relative',
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <Settings />
            </IconButton>
          </Box>

          <CardContent sx={{ p: 3, mt: -6, position: 'relative' }}>
            {/* Avatar */}
            <Avatar
              src={user?.profile_image_url}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              {user?.full_name?.charAt(0)?.toUpperCase()}
            </Avatar>

            {/* User Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {user?.full_name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                @{user?.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {user?.bio || 'Apaixonada por moda e estilo ✨'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label="Moda" size="small" />
                <Chip label="Estilo" size="small" />
                <Chip label="Inspiração" size="small" />
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                sx={{ borderRadius: 2 }}
              >
                Editar Perfil
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={4}>
        {/* Stats */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {mockStats.posts}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {mockStats.followers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seguidores
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {mockStats.following}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seguindo
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                    {mockStats.likes}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Curtidas
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Recent Looks Grid */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Looks Recentes
            </Typography>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={6} sm={4} key={item}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: item * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box
                      sx={{
                        aspectRatio: '1',
                        backgroundColor: 'grey.100',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 25px rgba(90, 10, 51, 0.15)',
                        },
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Look {item}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Account Info */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Informações da Conta
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {user?.email}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Membro desde
                  </Typography>
                  <Typography variant="body1">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label="Ativo"
                    size="small"
                    color="success"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Atividade Recente
                </Typography>
                {mockRecentActivity.map((activity, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        {activity.type === 'post' && <Edit sx={{ fontSize: 16, color: 'white' }} />}
                        {activity.type === 'like' && <Favorite sx={{ fontSize: 16, color: 'white' }} />}
                        {activity.type === 'follow' && <People sx={{ fontSize: 16, color: 'white' }} />}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {activity.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      </Box>
                    </Box>
                    {index < mockRecentActivity.length - 1 && (
                      <Divider sx={{ mb: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;