import { Box, Container, Typography } from '@mui/material'

const ProjectsPage = () => (
  <Box
    sx={{
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: 'background.default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: { xs: 3, md: 6 },
      py: 10,
    }}
  >
    <Container maxWidth="md">
      <Typography
        variant="caption"
        sx={{
          color: 'text.disabled',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'block',
          mb: 3,
        }}
      >
        Projects Page
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: 'text.primary',
          fontSize: { xs: '2rem', md: '3rem' },
          mb: 4,
        }}
      >
        Projects 페이지가 개발될 공간입니다.
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        포트폴리오 작품들이 들어갈 예정입니다.
      </Typography>
    </Container>
  </Box>
)

export default ProjectsPage
