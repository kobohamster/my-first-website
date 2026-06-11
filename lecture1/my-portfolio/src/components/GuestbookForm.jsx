import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import { supabase } from '../lib/supabaseClient'

const ACCENT = '#C9944A'

const GuestbookForm = ({ onSubmitted }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setLoading(true)
    setError('')

    const { error: supabaseError } = await supabase.from('guestbook').insert({
      name: name.trim(),
      message: message.trim(),
    })

    setLoading(false)

    if (supabaseError) {
      setError('작성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setSuccess(true)
    setName('')
    setMessage('')
    onSubmitted?.()

    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: { xs: 3, md: 4 },
        backgroundColor: 'background.paper',
        mb: 5,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: ACCENT,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'block',
          mb: 3,
        }}
      >
        방명록 남기기
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 0, fontSize: '0.8125rem' }}>
          방명록이 등록되었습니다. 감사합니다! 🌟
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 0, fontSize: '0.8125rem' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          size="small"
          inputProps={{ maxLength: 30 }}
          sx={fieldSx}
        />

        <TextField
          label="메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          multiline
          rows={3}
          inputProps={{ maxLength: 300 }}
          helperText={`${message.length} / 300`}
          sx={fieldSx}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !name.trim() || !message.trim()}
          sx={{
            backgroundColor: '#C9944A',
            color: '#fff',
            borderRadius: 0,
            py: 1.25,
            mt: 0.5,
            letterSpacing: '0.08em',
            fontSize: '0.8125rem',
            '&:hover': { backgroundColor: '#E0B86A' },
            '&.Mui-disabled': { backgroundColor: 'divider', color: 'text.disabled' },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : '방명록 남기기'}
        </Button>
      </Box>
    </Box>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: '#C9944A' },
    '&.Mui-focused fieldset': { borderColor: '#C9944A' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#C9944A' },
  '& .MuiFormHelperText-root': { textAlign: 'right', mr: 0 },
}

export default GuestbookForm
