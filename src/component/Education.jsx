import React from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Divider,
  Chip,
  Avatar,
  Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import LinkIcon from '@mui/icons-material/Link';
import { motion } from 'framer-motion';

const education = [
  {
    id: 'ucsb-ms',
    institution: 'University of California, Santa Barbara (UCSB)',
    degree: 'M.S. in Computer Science',
    department: 'Department of Computer Science',
    location: 'Santa Barbara, CA, USA',
    period: 'Sep 2022 – March 2025',
    logo: 'https://zephyrz73.github.io/zephyr-front-page/logos/ucsb.png',
    highlights: [
      'Graduate Researcher, MOMENT Lab — mobile & rural networking research.',
      'Co-author, ACM SIGCOMM 2024 paper “The Efficacy of the Connect America Fund in Addressing US Internet Access Inequities.”',
      'Course Grader (TA) for CS111: Intro to Computational Science (Fall 2022).',
    ],
    links: {
      momentLab: 'https://moment.cs.ucsb.edu/',
      cs111: 'https://ucsb-cs111.github.io/',
      publication: 'https://doi.org/10.1145/3651890.3672272',
    },
  },
  {
    id: 'uw-bs',
    institution: 'University of Washington, Seattle',
    degree: 'B.S. in Computer Science',
    department: 'Paul G. Allen School of Computer Science & Engineering',
    location: 'Seattle, WA, USA',
    period: 'Sep 2018 – Jun 2021',
    logo: 'https://zephyrz73.github.io/zephyr-front-page/logos/uw.png',
    honors: ['Dean’s List (Sep 2020 – Jun 2021)'],
    highlights: [
      'Research Assistant, SEAL Lab; founded AeroSpec sub-group to prototype airborne-particulate sensor networks.',
      'Converted AeroSpec into a startup initiative; signed contract with Violett Inc., converting all team members into paid contractors.',
    ],
    links: {
      sealLab: 'https://www.uwseal.org/',
    },
  },
];

export default function EducationSection() {
  return (
    <Box sx={{ padding: '90px', height: '100vh', minHeight: 'fit-content' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>
      </motion.div>

      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Box mb={4} sx={{ display: 'flex', height: '300px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '300px',
                width: '300px',
              }}
            >
              <Avatar
                src={edu.logo}
                alt={edu.institution}
                sx={{ width: 'auto', height: '200px', width: '200px' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Stack>
                <Stack
                  direction="column"
                  sx={{ paddingLeft: '50px' }}
                  spacing={2}
                  alignItems="center"
                  height="fit-content"
                >
                  <Box width="100%">
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {edu.institution}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontStyle: 'italic' }}
                    >
                      {edu.degree}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontStyle: 'italic' }}
                    >
                      {edu.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.location} · {edu.period}
                    </Typography>
                  </Box>

                  {edu.honors && (
                    <Box mt={1} sx={{ width: '100%' }}>
                      {edu.honors.map((honor, i) => (
                        <Chip
                          key={i}
                          icon={<StarIcon />}
                          label={honor}
                          size="small"
                          sx={{ mr: 1, mt: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                  <List dense>
                    {edu.highlights.map((item, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon>
                          <SchoolIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
                {edu.links && (
                  <Box mt={1} sx={{ marginLeft: '50px' }}>
                    {Object.entries(edu.links).map(([key, url]) => (
                      <Link
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          mr: 2,
                        }}
                      >
                        <LinkIcon sx={{ mr: 0.5 }} fontSize="small" /> {key}
                      </Link>
                    ))}
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
          <Divider sx={{ mt: 3 }} />
        </motion.div>
      ))}
    </Box>
  );
}
