import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Grid,
  Skeleton,
} from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeedPage = () => {
  // Mock data for demonstration
  const mockPosts = [
    {
      id: 1,
      user: {
        name: 'Ana Silva',
        username: '@anasilva',
        avatar: null,
      },
      image: null,
      title: 'Look casual para o fim de semana',
      description: 'Combinação perfeita para um passeio no parque! Calça jeans, blusa básica e tênis confortável.',
      likes: 24,
      comments: 5,
      isLiked: false,
      createdAt: '2 horas atrás',
    },
    {
      id: 2,
      user: {
        name: 'Marina Costa',
        username: '@marinac',
        avatar: null,
      },
      image: null,
      title: 'Elegância para o trabalho',
      description: 'Blazer estruturado + calça alfaiataria + scarpin. O poder do dress code corporativo!',
      likes: 56,
      comments: 12,
      isLiked: true,
      createdAt: '4 horas atrás',
    },
  ];

  const PostCard = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
        {/* User Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={post.user.avatar}
            sx={{
              width: 40,
              height: 40,
              mr: 2,
              bgcolor: 'primary.main',
            }}
          >
            {post.user.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {post.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.user.username} • {post.createdAt}
            </Typography>
          </Box>
        </Box>

        {/* Image Placeholder */}
        <Box
          sx={{
            height: 400,
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Imagem do Look
          </Typography>
        </Box>

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.description}
          </Typography>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color={post.isLiked ? 'error' : 'default'}
                sx={{ p: 0.5 }}
              >
                {post.isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {post.likes}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ p: 0.5 }}>
                <ChatBubbleOutline />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {post.comments}
              </Typography>
            </Box>
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Feed
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Tendências
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['#ModaInverno', '#StreetStyle', '#LookCasual', '#Sustentabilidade'].map(
                (trend, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {trend}
                  </Typography>
                )
              )}
            </Box>
          </Card>

          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Sugestões de Usuários
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Carla Moda', 'Style Hub', 'Fashion Trend'].map((user, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                    {user.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sugestão para você
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedPage;