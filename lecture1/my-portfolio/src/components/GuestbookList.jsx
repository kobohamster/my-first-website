import { useState, useEffect, useCallback } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { supabase } from '../lib/supabaseClient'

const ACCENT = '#7C6B5A'
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

  const fetchEntries = useCallback(async (reset = false) => {
    setLoading(true)
    const currentPage = reset ? 0 : page

    const { data, error } = await supabase
      .from('guestbook')
      .select('id, name, message, emoji, is_private, created_at')
      .order('created_at', { ascending: false })
      .range(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)

    setLoading(false)
    if (error || !data) return

    if (reset) {
      setEntries(data.slice(0, PAGE_SIZE))
    } else {
      setEntries((prev) => [...prev, ...data.slice(0, PAGE_SIZE)])
    }
    setHasMore(data.length > PAGE_SIZE)
    if (reset) setPage(0)
  }, [page])

  useEffect(() => {
    fetchEntries(true)
  }, [refreshTrigger])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchEntries()
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
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.disabled', letterSpacing: '0.05em' }}>
          아직 방명록이 없습니다. 첫 번째로 남겨주세요 ✨
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {entries.map((entry, idx) => (
          <Box
            key={entry.id}
            sx={{
              borderTop: idx === 0 ? '1px solid' : 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 3,
              px: { xs: 0, md: 0.5 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: entry.is_private ? 0 : 1.5,
              }}
            >
              {entry.emoji && (
                <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{entry.emoji}</Typography>
              )}
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

            {entry.is_private ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
                <LockOutlinedIcon sx={{ fontSize: '0.75rem', color: 'text.disabled' }} />
                <Typography variant="caption" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
                  비밀글입니다.
                </Typography>
              </Box>
            ) : (
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
    </Box>
  )
}

export default GuestbookList
