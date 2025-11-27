import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { EmojiEvents, Timer, People, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  // Mock data for demonstration
  const activeChallenges = [
    {
      id: 1,
      title: 'Look Casual da Semana',
      description: 'Mostre seu melhor look casual para o dia a dia',
      theme: 'casual',
      daysLeft: 3,
      participants: 45,
      prize: '1º lugar ganha destaque no feed',
      status: 'active',
    },
    {
      id: 2,
      title: 'Moda Sustentável',
      description: 'Looks criativos com peças sustentáveis ou reutilizadas',
      theme: 'sustentavel',
      daysLeft: 5,
      participants: 28,
      prize: 'Reconhecimento especial',
      status: 'active',
    },
  ];

  const pastWinners = [
    {
      id: 1,
      challenge: 'Street Style',
      winner: 'Ana Silva',
      avatar: null,
      votes: 156,
      week: 'Semana passada',
    },
    {
      id: 2,
      challenge: 'Look Profissional',
      winner: 'Marina Costa',
      avatar: null,
      votes: 134,
      week: '2 semanas atrás',
    },
  ];

  const ChallengeCard = ({ challenge }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          border: '2px solid',
          borderColor: challenge.daysLeft <= 2 ? 'error.main' : 'primary.main',
          position: 'relative',
        }}
      >
        {/* Challenge Status Badge */}
        <Chip
          label={challenge.daysLeft <= 2 ? 'Terminando!' : 'Ativo'}
          size="small"
          color={challenge.daysLeft <= 2 ? 'error' : 'primary'}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEvents sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {challenge.title}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {challenge.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Tempo restante
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {challenge.daysLeft} dias
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((7 - challenge.daysLeft) / 7) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: challenge.daysLeft <= 2 
                    ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'
                    : 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <People sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                {challenge.participants} participantes
              </Typography>
            </Box>
            <Chip
              label={challenge.theme}
              size="small"
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Prêmio:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {challenge.prize}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
              py: 1.5,
            }}
          >
            Participar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const WinnerCard = ({ winner }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 2, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={winner.avatar}
                sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}
              >
                {winner.winner.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {winner.winner}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {winner.challenge} • {winner.week}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star sx={{ color: 'warning.main', mr: 0.5, fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {winner.votes} votos
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
            mb: 1,
            background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Desafios de Moda
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Participe dos desafios semanais e mostre seu estilo único!
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Active Challenges */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Desafios Ativos
          </Typography>
          <Grid container spacing={3}>
            {activeChallenges.map((challenge, index) => (
              <Grid item xs={12} md={6} key={challenge.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ChallengeCard challenge={challenge} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ mt: 4, borderRadius: 3, bgcolor: 'grey.50' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Como Funciona
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          1
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Escolha um desafio
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          2
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Crie seu look
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #5A0A33 0%, #8B2E5A 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          3
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Receba votos
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Recent Winners */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Vencedores Recentes
          </Typography>
          {pastWinners.map((winner) => (
            <WinnerCard key={winner.id} winner={winner} />
          ))}

          {/* Stats */}
          <Card sx={{ mt: 3, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Suas Estatísticas
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Desafios Participados
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  0
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Vitórias
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  0
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Posição no Ranking
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  -
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChallengesPage;