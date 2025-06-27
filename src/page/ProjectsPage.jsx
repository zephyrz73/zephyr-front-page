import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { motion, AnimatePresence } from 'framer-motion';
import PROJECTS from '../data/Projects';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = useLocation();
  const fromSectionId =
    location.state && location.state.sectionId ? location.state.sectionId : 0;

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const project = PROJECTS.find((p) => p.id === hash);
    if (project) {
      setSelected(project);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 或 behavior: 'auto'
  }, []);

  function highlightTech(text, terms) {
    const escaped = [...terms]
      .sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    if (!escaped.length) return text;
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');

    return text.split(regex).map((chunk, idx) =>
      terms.some((term) => term.toLowerCase() === chunk.toLowerCase()) ? (
        <Box
          key={idx}
          component="span"
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.dark',
            fontWeight: 600,
            px: 0.5,
            borderRadius: '4px',
            mx: 0.25,
          }}
        >
          {chunk}
        </Box>
      ) : (
        chunk
      )
    );
  }

  return (
    <Box
      sx={{
        padding: { lg: '90px', md: '60px', sm: '30px', xs: '30px' },
        boxSizing: 'border-box',
        width: '100vw',
        height: 'fit-content',
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          <Typography variant="h3">Projects & Experiences</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate('/', { state: { sectionId: fromSectionId } })
            }
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              fontWeight: 500,
              height: 'fit-content',
              width: 'fit-content',
              flexShrink: 0,
              flexGrow: 0,
              textWrap: 'nowrap',
            }}
          >
            Return to Home
          </Button>
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="left"
        display="flex"
        flexDirection="row"
        alignItems="stretch"
      >
        {PROJECTS.map((project, index) => (
          <Grid item key={project.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{ height: '100%', width: '100%' }}
            >
              <Card
                onClick={() =>
                  setSelected({ ...project, tech: [...project.tech] })
                }
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  height: '100%',
                }}
              >
                {project.thumbnail && (
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%' },
                      height: 200,
                      objectFit: 'cover',
                    }}
                    image={project.thumbnail}
                    alt={project.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {project.period}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {project.company} · {project.role}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {project.description}
                  </Typography>
                  <Box
                    sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                  >
                    {project.tech.slice(0, 8).map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                    {project.tech.length > 8 && (
                      <Chip
                        label={`+${project.tech.length - 8} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <AnimatePresence>
        {selected && (
          <Dialog
            open={!!selected}
            onClose={() => setSelected(null)}
            fullWidth
            maxWidth="md"
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, y: -100, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 100, scale: 0.9 },
              transition: { duration: 0.4 },
            }}
            sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          >
            <DialogTitle>{selected.title}</DialogTitle>
            <DialogContent dividers>
              <Typography
                sx={{ mb: 3 }}
                variant="h5"
                color="text.secondary"
                gutterBottom
              >
                {selected.company} · {selected.role} · {selected.period}
              </Typography>
              <Box sx={{ mb: 2 }}>
                {selected.tech.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {highlightTech(selected.description, selected.tech)}
              </Typography>
              <List dense sx={{ mt: 1 }}>
                {selected.details.map((line, i) => (
                  <ListItem
                    key={i}
                    alignItems="flex-start"
                    disablePadding
                    sx={{ mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                      <FiberManualRecordIcon
                        sx={{ fontSize: 8, color: 'text.secondary' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: 'pre-wrap' }}
                        >
                          {highlightTech(line, selected.tech)}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex' }}>
                {Object.entries(selected.links).map(([label, url]) => (
                  <Button
                    variant="contained"
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() =>
                  navigate('/', { state: { sectionId: fromSectionId } })
                }
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  fontWeight: 500,
                }}
              >
                Return to Home
              </Button>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
}
