import { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const App = () => {
  const handleClick = (variant, color) => {
    alert(`클릭! variant: ${variant}, color: ${color}`)
  }

  const variants = ['contained', 'outlined', 'text']
  const colors = ['primary', 'secondary', 'error']

  const inputVariants = ['standard', 'outlined', 'filled']
  const [inputValues, setInputValues] = useState({ standard: '', outlined: '', filled: '' })

  const handleInputChange = (variant) => (e) => {
    setInputValues((prev) => ({ ...prev, [variant]: e.target.value }))
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        MUI Button 예제
      </Typography>

      {variants.map((variant) => (
        <Box key={variant} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
            variant: {variant}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {colors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                {color}
              </Button>
            ))}
          </Box>
        </Box>
      ))}

      <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
        MUI TextField 예제
      </Typography>

      {inputVariants.map((variant) => (
        <Box key={variant} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
            variant: {variant}
          </Typography>
          <TextField
            variant={variant}
            label={`${variant} 입력`}
            placeholder={`${variant} 텍스트를 입력하세요`}
            value={inputValues[variant]}
            onChange={handleInputChange(variant)}
            sx={{ width: 300 }}
          />
          {inputValues[variant] && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              입력값: {inputValues[variant]}
            </Typography>
          )}
        </Box>
      ))}
    </Container>
  )
}

export default App
