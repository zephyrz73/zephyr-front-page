import { Box, Typography } from '@mui/material';

export default function ResumePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Resume
      </Typography>
      <Typography>
        (You can embed your PDF here or link to a downloadable resume.)
      </Typography>
    </Box>
  );
}
