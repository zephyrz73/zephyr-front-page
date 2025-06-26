import React, { useRef, useState, useEffect } from 'react';
import HomeMain from '../component/HomeMain.jsx';
import Skills from '../component/Skills.jsx';
import Timeline from '../component/Timeline.jsx';
import Education from '../component/Education.jsx';
import WorkExperience from '../component/WorkExperience.jsx';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

export default function Home() {
  const [animationKey, setAnimationKey] = useState(0);
  const [sectionId, setSection] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [sectionId]);

  useEffect(() => {
    if (location.state?.sectionId !== undefined) {
      setSection(location.state.sectionId);
    }
  }, [location.state]);

  const sections = [
    {
      id: 'about',
      ref: useRef(null),
      component: <HomeMain key={animationKey} />,
      name: 'About Me',
      icon: <HomeIcon />,
    },
    {
      id: 'skills',
      ref: useRef(null),
      component: <Skills key={animationKey} />,
      name: 'My Skills',
      icon: <BuildIcon />,
    },
    {
      id: 'timeline',
      ref: useRef(null),
      component: <Timeline key={animationKey} setSection={setSection} />,
      name: 'My Journey',
      icon: <TimelineIcon />,
    },
    {
      id: 'education',
      ref: useRef(null),
      component: <Education key={animationKey} />,
      name: 'My Academic Degrees',
      icon: <SchoolIcon />,
    },
    {
      id: 'experience',
      ref: useRef(null),
      component: <WorkExperience key={animationKey} />,
      name: 'My Work Experience',
      icon: <WorkIcon />,
    },
  ];

  useEffect(() => {
    const threshold = 300;
    let lastScroll = 0;
    const idRef = { current: sectionId };

    idRef.current = sectionId;

    const handleScrollOrArrow = (e) => {
      const now = Date.now();
      if (now - lastScroll < threshold) return;

      const scrollNext = () => {
        if (idRef.current < sections.length - 1) {
          setSection((prev) => {
            lastScroll = now;
            return prev + 1;
          });
        }
      };

      const scrollPrev = () => {
        if (idRef.current > 0) {
          setSection((prev) => {
            lastScroll = now;
            return prev - 1;
          });
        }
      };

      let scrollTimeout = null;

      if (e.type === 'wheel') {
        const dx = Math.abs(e.deltaX);
        const dy = Math.abs(e.deltaY);

        if (dx > dy) {
          clearTimeout(scrollTimeout);

          scrollTimeout = setTimeout(() => {
            if (e.deltaX > 0) scrollNext();
            else if (e.deltaX < 0) scrollPrev();
          }, 1000);
        }
      }

      if (e.type === 'keydown') {
        if (['ArrowDown', 'ArrowRight'].includes(e.key)) scrollNext();
        if (['ArrowUp', 'ArrowLeft'].includes(e.key)) scrollPrev();
      }
    };

    window.addEventListener('wheel', handleScrollOrArrow, { passive: true });
    window.addEventListener('keydown', handleScrollOrArrow);

    return () => {
      window.removeEventListener('wheel', handleScrollOrArrow);
      window.removeEventListener('keydown', handleScrollOrArrow);
    };
  }, [sectionId, sections.length]);

  return (
    <>
      <Box sx={{ marginRight: '10px' }}>
        {sections.map((s, i) => (
          <div
            id={s.id}
            key={i}
            ref={s.ref}
            style={{
              minHeight: '100vh',
              display: sectionId === i ? 'block' : 'none',
            }}
          >
            {s.component}
          </div>
        ))}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          zIndex: 1000,
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}
      >
        {sections.map((s, i) => (
          <Box
            key={s.name}
            onClick={() => setSection(i)}
            sx={{
              color: sectionId === i ? 'primary.main' : 'white',
              fontSize: 32,
              transition: 'transform 0.3s, color 0.3s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          >
            {React.cloneElement(s.icon, { fontSize: 'inherit' })}
          </Box>
        ))}
      </Box>
    </>
  );
}
