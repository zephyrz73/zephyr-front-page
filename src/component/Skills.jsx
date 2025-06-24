// SkillsRadarWithDetail.jsx
import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
      ' Python',
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
    skills: [' JWT', 'RBAC', 'Spring Security', 'Jasypt', 'OAuth', 'SSO'],
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

  const handleTooltipChange = (activePayload) => {
    if (activePayload && activePayload.length > 0) {
      const subject = activePayload[0].payload.subject;
      setHovered(data.find((d) => d.subject === subject));
    } else {
      setHovered(null);
    }
  };

  return (
    <Grid
      container
      sx={{
        width: '100vw',
        height: { xs: 'fit-content', sm: 'fit-content', md: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'center', sm: 'flex-start' },
        alignItems: 'center',
      }}
    >
      <Grid>
        {/* <ResponsiveContainer width="90%" height="90%"> */}
        <RadarChart
          outerRadius={isXS ? 75 : 170}
          width={isXS ? 375 : 700}
          height={isXS ? 375 : 600}
          data={data}
          onMouseLeave={() => setHovered(null)}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            radius={isXS ? 100 : 400}
            tick={({ payload, x, y, cx, cy }) => {
              const angle = Math.atan2(y - cy, x - cx); // 与中心点连线角度
              const distance = isXS ? 120 : 250; // 控制向外的距离，默认大约是 120 左右

              // 计算新的位置
              const newX = cx + Math.cos(angle) * distance;
              const newY = cy + Math.sin(angle) * distance;

              return (
                <text
                  x={newX}
                  y={newY}
                  dy={6}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={isXS ? 11 : 16}
                  fontWeight={isXS ? 'normal' : 'bold'}
                >
                  {payload.value}
                </text>
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
            content={({ active, payload }) => {
              handleTooltipChange(payload);
              return null; // Tooltip 内容我们另渲染在右侧
            }}
          />
        </RadarChart>
        {/* </ResponsiveContainer> */}
      </Grid>

      {/* 👉 Hover 右侧展示技能组 */}
      <Grid
        sx={{
          minWidth: 250,
          maxWidth: 400,
          height: '50vh',
          minHeight: 300,
          padding: '20px',
        }}
      >
        {hovered ? (
          <>
            <Typography variant="h4" gutterBottom>
              Skills : {hovered.subject}
            </Typography>
            <Stack direction="row" flexWrap="wrap" justifyContent="flex-start">
              {hovered.skills.map((skill) => (
                <Box margin="1px">
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  />
                </Box>
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Skills : {data[0].subject}
            </Typography>
            <Stack direction="row" flexWrap="wrap" justifyContent="flex-start">
              {data[0].skills.map((skill) => (
                <Box margin="1px">
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  />
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Grid>
    </Grid>
  );
}
