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
import PROJECTS from '../data/Projects'; // 确保是数组
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null);

  function highlightTech(text, terms) {
    // 构造正则，按最长词优先匹配（防止 JWT 与 JUnit 冲突）
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
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Projects and Experiences
      </Typography>

      <Grid container spacing={4}>
        {PROJECTS.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              onClick={() =>
                setSelected({ ...project, tech: [...project.tech] })
              }
              sx={{
                cursor: 'pointer',
                width: { md: '45vw', lg: '30vw' },
                height: '450px',
                maxWidth: '800px',
                minWidth: '500px',
              }}
            >
              {project.thumbnail && (
                <CardMedia
                  component="img"
                  width={500}
                  height={200}
                  image={project.thumbnail}
                  alt={project.title}
                  sx={{
                    boxSizing: 'border-box',
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {project.period}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {project.company} · {project.role} · {project.id}
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
          </Grid>
        ))}
      </Grid>

      {/* Detail Dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="md"
      >
        {selected && (
          <>
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
                    {/* bullet 小圆点 */}
                    <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                      <FiberManualRecordIcon
                        sx={{ fontSize: 8, color: 'text.secondary' }}
                      />
                    </ListItemIcon>

                    {/* 正文 + 技术词高亮 */}
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
                    sx={{
                      display: 'block',
                      mt: 1,
                      width: 'fit-content',
                      marginRight: '10px',
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
