import { Box, Typography, Button } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function ResumePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
        <Typography variant="h3" gutterBottom>
          Resume
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/', { state: { sectionId: 0 } })}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 2,
            fontWeight: 500,
            marginBottom: '30px',
            height: 'fit-content',
          }}
        >
          Return to Home
        </Button>
      </Box>
      <iframe
        src="https://zephyrz73.github.io/zephyr-front-page/resume.pdf"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
        title="My Resume"
      />
    </Box>
  );
}
