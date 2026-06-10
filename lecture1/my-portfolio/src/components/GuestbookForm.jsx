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

const ACCENT = '#7C6B5A'

const EMOJIS = ['😊', '😄', '🥹', '🤔', '🎉', '💎', '✨', '🌟', '💫', '🪨', '🙏', '👋']

const GuestbookForm = ({ onSubmitted }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [emoji, setEmoji] = useState('')
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
      emoji: emoji || null,
    })

    setLoading(false)

    if (supabaseError) {
      setError('작성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setSuccess(true)
    setName('')
    setMessage('')
    setEmoji('')
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

        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
            감정 표현 (선택)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {EMOJIS.map((e) => (
              <Box
                key={e}
                onClick={() => setEmoji(emoji === e ? '' : e)}
                sx={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: emoji === e ? ACCENT : 'divider',
                  backgroundColor: emoji === e ? `${ACCENT}18` : 'transparent',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                  '&:hover': { borderColor: ACCENT },
                }}
              >
                {e}
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !name.trim() || !message.trim()}
          sx={{
            backgroundColor: '#252220',
            color: '#fff',
            borderRadius: 0,
            py: 1.25,
            mt: 0.5,
            letterSpacing: '0.08em',
            fontSize: '0.8125rem',
            '&:hover': { backgroundColor: '#3D3A37' },
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
    '&:hover fieldset': { borderColor: '#7C6B5A' },
    '&.Mui-focused fieldset': { borderColor: '#7C6B5A' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#7C6B5A' },
  '& .MuiFormHelperText-root': { textAlign: 'right', mr: 0 },
}

export default GuestbookForm
