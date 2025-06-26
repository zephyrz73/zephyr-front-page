import React from 'react';
import { Avatar, Box, Typography, Stack, Link, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeMain() {
  return (
    <Box
      sx={{
        minHeight: { xs: 'fit-content', md: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 0 },
        gap: { xs: 4, md: 8 },
        paddingRight: { xs: 0, md: '100px' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: 200, md: 300 },
            height: { xs: 200, md: 300 },
            marginRight: 0,
          }}
        >
          <Avatar
            src={`https://zephyrz73.github.io/zephyr-front-page/avatar.JPG`}
            alt="Zephyr Zhou"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 600 }}>
          <Typography variant="h4" gutterBottom>
            Hi! 👋 I'm
          </Typography>
          <Typography variant="h1" gutterBottom>
            Zephyr Zhou
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            Full Stack Software Engineer · Java · Spring · React · AWS · SQL
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            I design and build scalable systems — from RESTful APIs and
            microservices to full-featured websites and mobile apps — with a
            strong focus on performance, reliability, and clean architecture.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            gap={2}
            mt={2}
            sx={{ display: 'flex', flexWrap: 'wrap' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Link href="mailto:xzhou1551@gmail.com" underline="hover">
                xzhou1551@gmail.com
              </Link>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <GitHubIcon fontSize="small" />
              <Link
                href="https://github.com/zephyrz73"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/zephyrz73
              </Link>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              minWidth="100px"
            >
              <PhoneIcon fontSize="small" />
              <Typography variant="link">(253) 359-6692</Typography>
            </Stack>
          </Stack>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Stack
              direction="row"
              spacing={2}
              mt={3}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button variant="contained" component={RouterLink} to="/resume">
                View Resume
              </Button>
              <Button variant="outlined" component={RouterLink} to="/projects">
                Explore Projects and Experience
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
