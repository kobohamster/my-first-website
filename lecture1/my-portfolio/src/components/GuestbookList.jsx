import { useState, useEffect, useCallback } from 'react'
import { Box, Typography, CircularProgress, IconButton, TextField, Tooltip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { supabase } from '../lib/supabaseClient'

const ACCENT = '#C9944A'
const PAGE_SIZE = 10

const formatDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

const GuestbookList = ({ refreshTrigger }) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)
  const [deletingId, setDeletingId] = useState(null)

  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const fetchEntries = useCallback(async (reset = false) => {
    setLoading(true)
    const currentPage = reset ? 0 : page

    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .range(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)

    setLoading(false)
    if (error || !data) return

    if (reset) {
      setEntries(data.slice(0, PAGE_SIZE))
      setPage(0)
    } else {
      setEntries((prev) => [...prev, ...data.slice(0, PAGE_SIZE)])
    }
    setHasMore(data.length > PAGE_SIZE)
  }, [page])

  useEffect(() => {
    fetchEntries(true)
  }, [refreshTrigger])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchEntries()
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    const { error } = await supabase.from('guestbook').delete().eq('id', id)
    setDeletingId(null)
    if (!error) {
      setEntries((prev) => prev.filter((e) => e.id !== id))
    }
  }

  const handleAdminLogin = () => {
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowPasswordInput(false)
      setPasswordInput('')
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  const handleLockClick = () => {
    if (isAdmin) {
      setIsAdmin(false)
      setShowPasswordInput(false)
    } else {
      setShowPasswordInput((v) => !v)
      setPasswordError(false)
      setPasswordInput('')
    }
  }

  if (loading && entries.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={24} sx={{ color: ACCENT }} />
      </Box>
    )
  }

  if (!loading && entries.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="body2" sx={{ color: 'text.disabled', letterSpacing: '0.05em' }}>
          아직 방명록이 없습니다. 첫 번째로 남겨주세요 ✨
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {entries.map((entry, idx) => (
          <Box
            key={entry.id}
            sx={{
              borderTop: idx === 0 ? '1px solid' : 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 3,
              px: { xs: 0, md: 0.5 },
              display: 'flex',
              gap: 1.5,
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}
                >
                  {entry.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', ml: 'auto', flexShrink: 0 }}
                >
                  {formatDate(entry.created_at)}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {entry.message}
              </Typography>
            </Box>

            {isAdmin && (
              <Tooltip title="삭제" placement="left">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(entry.id)}
                  disabled={deletingId === entry.id}
                  sx={{
                    flexShrink: 0,
                    mt: 0.25,
                    p: 0.5,
                    color: 'text.disabled',
                    borderRadius: 0,
                    border: '1px solid transparent',
                    '&:hover': {
                      color: '#c62828',
                      borderColor: '#c62828',
                      backgroundColor: 'transparent',
                    },
                    transition: 'all 0.15s',
                  }}
                >
                  {deletingId === entry.id
                    ? <CircularProgress size={14} sx={{ color: 'text.disabled' }} />
                    : <DeleteOutlinedIcon sx={{ fontSize: '1rem' }} />
                  }
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ))}
      </Box>

      {hasMore && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            onClick={handleLoadMore}
            variant="caption"
            sx={{
              color: ACCENT,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderBottom: '1px solid',
              borderColor: ACCENT,
              pb: 0.25,
              '&:hover': { opacity: 0.7 },
            }}
          >
            {loading ? '불러오는 중...' : '더 보기'}
          </Typography>
        </Box>
      )}

      {/* 관리자 영역 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 3, gap: 1 }}>
        {showPasswordInput && !isAdmin && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              type="password"
              placeholder="관리자 비밀번호"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false) }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              error={passwordError}
              helperText={passwordError ? '비밀번호가 틀렸습니다' : ''}
              autoFocus
              sx={{
                width: 180,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  fontSize: '0.8125rem',
                  '& fieldset': { borderColor: 'divider' },
                  '&.Mui-focused fieldset': { borderColor: ACCENT },
                  '&.Mui-error fieldset': { borderColor: '#d32f2f' },
                },
                '& .MuiFormHelperText-root': { fontSize: '0.7rem', mt: 0.25 },
              }}
            />
            <Box
              onClick={handleAdminLogin}
              sx={{
                px: 1.5, py: 0.75,
                border: '1px solid', borderColor: ACCENT,
                cursor: 'pointer', fontSize: '0.75rem', color: ACCENT,
                letterSpacing: '0.05em', flexShrink: 0,
                '&:hover': { backgroundColor: `${ACCENT}18` },
              }}
            >
              확인
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {isAdmin && (
            <Typography variant="caption" sx={{ color: ACCENT, fontSize: '0.7rem', letterSpacing: '0.05em' }}>
              관리자 모드
            </Typography>
          )}
          <Tooltip title={isAdmin ? '관리자 모드 종료' : '관리자'} placement="left">
            <IconButton
              onClick={handleLockClick}
              size="small"
              sx={{
                p: 0.5,
                color: isAdmin ? ACCENT : 'text.disabled',
                opacity: isAdmin ? 1 : 0.4,
                '&:hover': { color: ACCENT, opacity: 1, backgroundColor: 'transparent' },
                transition: 'all 0.2s',
              }}
            >
              {isAdmin
                ? <LockOpenOutlinedIcon sx={{ fontSize: '0.875rem' }} />
                : <LockOutlinedIcon sx={{ fontSize: '0.875rem' }} />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default GuestbookList
