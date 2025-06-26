import React, { userState } from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const events = [
  {
    title: 'University of California, Santa Barbara',
    start: new Date('2022-10-01'),
    end: new Date('2025-04-01'),
    color: '#69a9c5',
    type: 'education',
  },
  {
    title: 'University of Washington, Seattle',
    start: new Date('2018-10-01'),
    end: new Date('2021-07-01'),
    color: '#3f75a8',
    type: 'education',
  },
  {
    title: 'Mobility Management & Networking Lab, UCSB',
    start: new Date('09-01-2023'),
    end: new Date('01-01-2025'),
    color: '#7b9ff8',
    offset: 270,
    type: 'experience',
    projectId: 'broadband-pricing-crawler',
  },
  {
    title: 'Pulumi Corporation (Seattle, WA)',
    start: new Date('2020-07-01'),
    end: new Date('2020-10-01'),
    color: '#747492',
    offset: 270,
    type: 'experience',
    projectId: 'pulumi-cms',
  },
  {
    title: 'Aucean Technologies (Zhejiang, China)',
    start: new Date('2021-07-01'),
    end: new Date('2022-10-01'),
    color: '#5675aa',
    offset: 270,
    type: 'experience',
    projectId: 'auv-parking-vision',
  },
  {
    title: 'AppFolio (Santa Barbara, CA)',
    start: new Date('2023-07-01'),
    end: new Date('2023-10-01'),
    color: '#4e5a65',
    offset: 270,
    type: 'experience',
    projectId: 'renters-insurance',
  },
  {
    title: 'Violett Inc. (Seattle, WA)',
    start: new Date('2020-10-01'),
    end: new Date('2024-06-01'),
    color: '#527698',
    offset: 80,
    type: 'experience',
    projectId: 'air-quality-portal',
  },
  {
    title: 'Beaconfire Inc. (Remote)',
    start: new Date('2025-04-01'),
    end: new Date('2025-07-01'),
    color: '#8ea9ad',
    offset: 80,
    type: 'experience',
    projectId: 'forum-platform',
  },
];
const startYear = 2018;
const endYear = 2025;
const yearHeight = 200;
const timelineHeight = (endYear - startYear + 1) * yearHeight;

export default function TimeLine(props) {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: '90px' }}>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h5">My Journey</Typography>
      </Box>
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: `${timelineHeight}px`,
          margin: '50px auto',
          background: '#111',
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-1px)',
            width: '2px',
            height: '100%',
            backgroundColor: '#aaa',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {[...new Set(events.flatMap((e) => [e.start, e.end]))].map(
          (date, idx) => {
            const top =
              ((date.getFullYear() + date.getMonth() / 12 - startYear) /
                (endYear - startYear + 1)) *
              timelineHeight;

            const label = date.toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            });

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: `${top}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '1px',
                    backgroundColor: '#ccc',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: `${top - 6}px`,
                    left: 'calc(50% + 15px)',
                    fontSize: '12px',
                    color: '#ccc',
                  }}
                >
                  {label}
                </div>
              </motion.div>
            );
          }
        )}

        {events.map((event, i) => {
          const yStart =
            ((event.start.getFullYear() +
              event.start.getMonth() / 12 -
              startYear) /
              (endYear - startYear + 1)) *
            timelineHeight;

          const yEnd =
            ((event.end.getFullYear() + event.end.getMonth() / 12 - startYear) /
              (endYear - startYear + 1)) *
            timelineHeight;

          const height = yEnd - yStart;
          const isEducation = event.type === 'education';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.2)',
                zIndex: 5,
                cursor: 'pointer',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                position: 'absolute',
                top: `${yStart}px`,
                left: isEducation
                  ? 'calc(50% - 260px)'
                  : `calc(50% + ${event.offset}px)`,
                width: '180px',
                padding: '10px',
                height: `${height}px`,
                backgroundColor: event.color,
                borderRadius: '6px',
                color: 'white',
                fontSize: '15px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                textAlign: 'left',
              }}
              onClick={() => {
                if (event.projectId) {
                  navigate(`/projects#${event.projectId}`, {
                    state: { sectionId: 2 },
                  });
                } else {
                  props.setSection(3);
                }
              }}
            >
              {event.title}
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
}
