import { Box, Typography } from '@mui/material';

export default function ProjectsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Projects
      </Typography>
      <Typography>
        (List and describe your projects here, or render them dynamically.)
      </Typography>
    </Box>
  );
}
