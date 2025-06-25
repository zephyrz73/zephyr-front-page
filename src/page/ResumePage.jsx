import { Box, Typography } from '@mui/material';

export default function ResumePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Resume
      </Typography>
      <iframe
        src="/zephyr-front-page/resume.pdf"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
        title="My Resume"
      />
    </Box>
  );
}
