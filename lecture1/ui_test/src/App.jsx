import { Box, Container, Typography } from '@mui/material'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          UI Test
        </Typography>

        {/* 섹션을 여기에 순차적으로 추가 */}

      </Container>
    </Box>
  )
}

export default App
