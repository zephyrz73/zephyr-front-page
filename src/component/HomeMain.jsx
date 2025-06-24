import React from 'react';
import { Avatar, Box, Typography, Stack, Link, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink } from 'react-router-dom';

export default function HomeMain() {
  return (
    <Box
      sx={{
        height: { sx: 'fit-content', md: '100vh' },
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          width: '70%',
          height: '100vh',
          backgroundImage: `url('${process.env.PUBLIC_URL}/zephyr-front-page/avatar.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)',
          display: {
            xs: 'none', // <600px 隐藏
            sm: 'none', // 600-899px 隐藏
            md: 'flex',
          },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        padding={{ xs: 2, md: 4, md: 8 }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/zephyr-front-page/avatar.JPG`}
          alt="Zephyr Zhou"
          sx={{
            width: 200, // 宽度一定要有
            height: 200, // 高度必须有，才能触发裁切
            borderRadius: '50%', // 圆形头像
            objectFit: 'cover', // 保证裁切效果
            display: { xs: 'block', md: 'none' },
          }}
        />

        {/* 👉 Text Block */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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

          {/* 👉 Contact row */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            mt={2}
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
              >
                github.com/zephyrz73
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">(253) 359-6692</Typography>
            </Stack>
          </Stack>

          {/* 👉 Buttons */}
          <Stack
            direction="row"
            spacing={2}
            mt={3}
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <Button variant="contained" component={RouterLink} to="/resume">
              View Resume
            </Button>
            <Button variant="outlined" component={RouterLink} to="/projects">
              Explore Projects and Experience
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
