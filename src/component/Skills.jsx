import React, { useState, useEffect } from 'react';
import {
  FaReact,
  FaAws,
  FaDatabase,
  FaJava,
  FaLock,
  FaTools,
  FaBug,
} from 'react-icons/fa';
import { BiLogoSpringBoot } from 'react-icons/bi';
import { SiApachekafka } from 'react-icons/si';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts';
import {
  Box,
  Typography,
  Stack,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const iconMap = {
  Language: <FaJava />,
  'Java/Spring': <BiLogoSpringBoot />,
  Cloud: <FaAws />,
  Database: <FaDatabase />,
  Messaging: <SiApachekafka />,
  Frontend: <FaReact />,
  Security: <FaLock />,
  'DevOps & Tools': <FaTools />,
  'Testing & Monitoring': <FaBug />,
};

const data = [
  {
    subject: 'Language',
    A: 100,
    skills: [
      'Java',
      'JavaScript',
      'TypeScript',
      'SQL',
      'HTML5 / CSS',
      'Python',
      'Ruby',
      'C / C++',
      'Dart',
      'Go',
    ],
  },
  {
    subject: 'Java/Spring',
    A: 100,
    skills: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Spring AOP',
      'Spring IoC',
      'Spring Cloud (Gateway, Config, Eureka)',
      'Hibernate',
      'JPA',
      'JDBC',
      'Servlets',
      'JSP',
    ],
  },
  {
    subject: 'Cloud',
    A: 100,
    skills: [
      'AWS ECS Fargate',
      'AWS EC2',
      'AWS Lambda',
      'AWS ECR',
      'AWS RDS',
      'AWS CloudWatch',
      'AWS API Gateway',
      'AWS IAM',
      'AWS DynamoDB',
      'AWS IoT',
    ],
  },
  {
    subject: 'Database',
    A: 100,
    skills: [
      'MySQL',
      'PostgreSQL',
      'MongoDB Atlas',
      'Amazon DynamoDB',
      'Oracle',
    ],
  },
  {
    subject: 'Messaging',
    A: 100,
    skills: ['Kafka', 'RabbitMQ', 'Redis Stream', 'ZooKeeper'],
  },
  {
    subject: 'Frontend',
    A: 100,
    skills: [
      'ReactJS',
      'Redux',
      'Angular',
      'TypeScript',
      'Material UI',
      'Bootstrap',
      'HTML',
      'CSS',
    ],
  },
  {
    subject: 'Security',
    A: 100,
    skills: ['JWT', 'RBAC', 'Spring Security', 'Jasypt', 'OAuth', 'SSO'],
  },
  {
    subject: 'DevOps & Tools',
    A: 100,
    skills: [
      'Docker',
      'Jenkins',
      'Git',
      'GitHub',
      'Kubernetes',
      'IntelliJ',
      'VS Code',
      'Eclipse',
      'Maven',
      'Postman',
      'Swagger(OpenAPI)',
      'Thymeleaf',
      'Markdown',
      'Splunk',
      'Jira',
      'Linux',
      'Bash Scripts',
      'MySQL Workbench',
    ],
  },
  {
    subject: 'Testing & Monitoring',
    A: 100,
    skills: [
      'JUnit 5',
      'Mockito',
      'Selenium',
      'Mocha',
      'Sinon',
      'React Testing Library',
      'Spring Boot Actuator',
      'Log4j',
      'Datadog APM',
      'ELK Stack',
      'Prometheus',
      'Grafana',
    ],
  },
];

export default function SkillsRadarWithDetail() {
  const [hovered, setHovered] = useState(null);
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.only('xs'));
  const [hoveredByClick, setHoveredByClick] = useState(false);

  const handleTooltipChange = (activePayload) => {
    if (activePayload && activePayload.length > 0) {
      const subject = activePayload[0].payload.subject;
      setHovered(data.find((d) => d.subject === subject));
    }
  };

  useEffect(() => {
    console.log('hovered changed:', hovered);
  }, [hovered]);

  return (
    <Grid
      container
      sx={{
        height: { md: '100vh', lg: '100vh' },
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: { xs: '80px', md: '0px' },
      }}
    >
      <Grid
        id="here"
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row', lg: 'row' },
          alignItems: 'center',
          height: { lg: '100vh' },
          justifyContent: 'center',
        }}
      >
        <Grid sx={{ flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <RadarChart
              outerRadius={isXS ? 75 : 120}
              width={isXS ? 375 : 450}
              height={isXS ? 375 : 450}
              data={data}
              onMouseLeave={() => {
                setHovered(null);
                setHoveredByClick(false);
              }}
            >
              <PolarGrid />
              <PolarAngleAxis
                dataKey="subject"
                radius={isXS ? 100 : 400}
                tick={({ payload, x, y, cx, cy }) => {
                  const angle = Math.atan2(y - cy, x - cx);
                  const distance = isXS ? 120 : 180;
                  const newX = cx + Math.cos(angle) * distance;
                  const newY = cy + Math.sin(angle) * distance;
                  const icon = iconMap[payload.value];

                  return (
                    <foreignObject
                      x={newX - 35}
                      y={newY - 30}
                      width={80}
                      height={80}
                    >
                      <div
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontSize: isXS ? 14 : 20,
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                        onClick={() => {
                          setHoveredByClick(true);
                          setHovered(
                            data.find((d) => d.subject === payload.value)
                          );
                        }}
                        onMouseEnter={() => {
                          setHoveredByClick(true);
                          setHovered(
                            data.find((d) => d.subject === payload.value)
                          );
                        }}
                      >
                        <div style={{ lineHeight: 1 }}>{icon}</div>
                        <div
                          style={{
                            fontSize: isXS ? 12 : 14,
                            fontWeight: isXS ? 'normal' : 'bold',
                          }}
                        >
                          {payload.value}
                        </div>
                      </div>
                    </foreignObject>
                  );
                }}
              />
              <Radar
                name="Skill"
                dataKey="A"
                stroke="#86c2f5"
                fill="#86c2f5"
                fillOpacity={0.6}
              />
              <Tooltip
                content={({ payload }) => {
                  handleTooltipChange(payload);
                  return null;
                }}
              />
            </RadarChart>
          </motion.div>
        </Grid>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: 'fit-content', flexShrink: 0, flexGrow: 0 }}
        >
          <Grid
            sx={{
              width: { sm: '60vw', md: '30vw' },
              boxSizing: 'border-box',
              height: 'fit-content',
              display: 'flex',
              justifyContent: 'center',
              padding: {
                lg: '0px 40px 0px 40px',
                md: '30px',
                sm: '30px',
                xs: '20px 30px 50px 30px',
              },
            }}
          >
            <Grid>
              <Typography variant="h4" gutterBottom>
                Owned Skills : {(hovered || data[0]).subject}{' '}
                {iconMap[(hovered || data[0]).subject]}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Hover over the chart to see detailed skills that I possessed.
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="flex-start"
              >
                {(hovered || data[0]).skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                  >
                    <Box margin="1px">
                      <Chip
                        label={skill}
                        variant="outlined"
                        sx={{ marginBottom: '10px', marginRight: '10px' }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>
    </Grid>
  );
}
