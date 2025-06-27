import React from 'react';
import { Box, Typography, Stack, Chip, Avatar, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const companies = [
  {
    name: 'Beaconfire Inc.',
    position: 'Java Full-Stack Contractor',
    location: 'Remote',
    period: 'Mar 2024 – Present',
    logo: 'https://zephyrz73.github.io/logos/beaconfire.png',
    projectId: 'forum-platform',
    description:
      'Worked on full-stack Java Spring Boot and Angular microservice applications as part of a consulting delivery pipeline.',
  },
  {
    name: 'Violett Inc.',
    position: 'Full-Stack Software Engineer',
    location: 'Seattle, WA',
    period: 'Sep 2020 – May 2024',
    logo: 'https://zephyrz73.github.io/logos/violett.png',
    projectId: 'air-quality-portal',
    description:
      'Built cross-platform customer portal and real-time IoT air quality visualization tools. Transitioned from university research startup (AeroSpec) to commercial pilot with full-stack AWS-hosted solution.',
    website: 'https://www.violett.io/',
  },
  {
    name: 'AppFolio',
    position: 'Software Engineer Intern',
    location: 'Santa Barbara, CA',
    period: 'Jun 2023 – Sep 2023',
    logo: 'https://zephyrz73.github.io/logos/appfolio.png',
    projectId: 'renters-insurance',
    description:
      'Improved renter insurance conversion through dynamic React UI, A/B testing, and backend performance optimization. Achieved 30% increase in conversion rate.',
    website: 'https://www.appfolio.com/',
  },
  {
    name: 'Mobility Management & Networking Lab, UCSB',
    position: 'Graduate Researcher',
    location: 'Santa Barbara, CA',
    period: 'Sep 2023 – Present',
    logo: 'https://zephyrz73.github.io/logos/mmnl.png',
    description:
      'Conducted broadband pricing inequality research with automated web crawlers and regression modeling. Published paper at ACM SIGCOMM 2024.',
    website: 'https://moment.cs.ucsb.edu/',
    projectId: 'broadband-pricing-crawler',
  },
  {
    name: 'Pulumi Corporation',
    position: 'Software Engineer Intern',
    location: 'Seattle, WA',
    period: 'Feb 2024 – Jun 2024',
    logo: 'https://zephyrz73.github.io/logos/pulumi.png',
    description:
      'Contributed to open-source infrastructure-as-code ecosystem. Built custom CMS integration on AWS with GitHub authentication, published technical guides and registry samples.',
    website: 'https://www.pulumi.com/',
    projectId: 'pulumi-cms',
  },
  {
    name: 'Aucean Technologies',
    position: 'Software Engineer',
    location: 'Zhejiang, China',
    period: 'Jan 2022 – Apr 2022',
    logo: 'https://zephyrz73.github.io/logos/aucean.png',
    projectId: 'auv-parking-vision',
    description:
      'Developed underwater base recognition system using traditional and ML-based computer vision techniques for Z3-Mini AUV docking in turbid lake environments.',
  },
];

export default function CompanySection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: { md: '90px', sm: '30px', xs: '30px' },
        paddingBottom: { xs: '80px', md: '0px' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" gutterBottom sx={{ marginBottom: '30px' }}>
          Company Overview
        </Typography>
      </motion.div>

      <Stack spacing={4}>
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              <Avatar
                src={company.logo}
                alt={company.name}
                sx={{ width: 70, height: 70 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {company.name}
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {company.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.location} · {company.period}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: { sm: '0px', xs: '0px', md: '92px' },
                marginTop: { sm: '10px', xs: '10px', md: '0px' },
              }}
            >
              <Typography variant="body1" sx={{ mt: 1 }}>
                {company.description}
              </Typography>
              <Link
                onClick={() =>
                  navigate(`/projects#${company.projectId}`, {
                    state: { sectionId: 4 },
                  })
                }
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  mt: 1,
                  cursor: 'pointer',
                }}
              >
                View Details
              </Link>
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
