import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'

const ACCENT = '#C9944A'

const EMAIL = 'kobo0067@gmail.com'
const GITHUB = 'https://github.com/kobohamster'

const CrystalDivider = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      my: 4,
      color: ACCENT,
    }}
  >
    <Box sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }} />
    <Typography sx={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: ACCENT }}>
      ◆ ◇ ◆
    </Typography>
    <Box sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }} />
  </Box>
)

const ContactInfo = () => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <EmailOutlinedIcon sx={{ fontSize: '1.125rem', color: ACCENT }} />
        <Typography
          component="a"
          href={`mailto:${EMAIL}`}
          variant="body2"
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            '&:hover': { color: ACCENT },
            transition: 'color 0.2s',
          }}
        >
          {EMAIL}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Tooltip title="GitHub">
        <IconButton
          component="a"
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: 'text.secondary',
            p: 0.75,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 0,
            '&:hover': { color: ACCENT, borderColor: ACCENT, backgroundColor: 'transparent' },
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          <GitHubIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
    </Box>

    <CrystalDivider />
  </Box>
)

export default ContactInfo
