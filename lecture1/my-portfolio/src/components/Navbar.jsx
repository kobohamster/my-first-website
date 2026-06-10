import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
]

const Navbar = () => {
  const location = useLocation()

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, minHeight: '64px' }}>
        <Typography
          component={Link}
          to="/"
          variant="body1"
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.15em',
            fontSize: '0.875rem',
          }}
        >
          PORTFOLIO
        </Typography>

        <Box component="nav" sx={{ display: 'flex', gap: 0.5 }}>
          {NAV_ITEMS.map(({ label, path }) => {
            const isActive = location.pathname === path
            return (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: isActive ? 'primary.main' : 'text.secondary',
                  borderBottom: isActive ? '1px solid' : '1px solid transparent',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  fontSize: '0.8125rem',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'text.primary',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {label}
              </Button>
            )
          })}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
