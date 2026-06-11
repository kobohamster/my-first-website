import { useState } from 'react'
import { Box, Container, Typography, Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import ContactInfo from '../components/ContactInfo'
import GuestbookForm from '../components/GuestbookForm'
import GuestbookList from '../components/GuestbookList'

const SectionLabel = ({ children }) => (
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
    {children}
  </Typography>
)

const SectionDivider = () => (
  <Divider sx={{ borderColor: 'divider' }} />
)

const ACCENT = '#C9944A'

const HomePage = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
  <Box>
    {/* ───── 1. HERO ───── */}
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: { xs: 3, md: 6 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="md">
        <SectionLabel>Hero Section</SectionLabel>
        <Typography
          variant="h1"
          sx={{
            color: 'text.primary',
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem', lg: '4.5rem' },
            mb: 3,
          }}
        >
          여기는 Hero 섹션입니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: '560px', mx: 'auto', mb: 5 }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>

    <SectionDivider />

    {/* ───── 2. ABOUT ME ───── */}
    <Box
      sx={{
        minHeight: '70vh',
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: 12 },
            alignItems: 'center',
          }}
        >
          {/* 프로필 이미지 플레이스홀더 */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '180px', md: '240px' },
              height: { xs: '180px', md: '240px' },
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: { xs: 'auto', md: 0 },
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center', px: 2 }}>
              프로필 이미지
            </Typography>
          </Box>

          {/* 텍스트 */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <SectionLabel>About Me</SectionLabel>
            <Typography variant="h2" sx={{ color: 'text.primary', mb: 3 }}>
              여기는 About Me 섹션입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
              간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/about"
              sx={{
                borderColor: 'var(--color-button-ghost-border)',
                color: 'var(--color-primary)',
                px: 4,
                '&:hover': { backgroundColor: 'var(--color-button-ghost-hover)' },
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>

    <SectionDivider />

    {/* ───── 3. SKILLS ───── */}
    <Box
      sx={{
        minHeight: '60vh',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <SectionLabel>Skills</SectionLabel>
        <Typography variant="h2" sx={{ color: 'text.primary', mb: 3 }}>
          여기는 Skills 섹션입니다.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, maxWidth: '560px' }}>
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>

        {/* 스킬 카드 플레이스홀더 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {['Frontend', 'Backend', 'Tools', 'Design'].map((category) => (
            <Box
              key={category}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                minHeight: '140px',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                p: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {category}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                기술 스택이 들어갈 예정입니다.
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>

    <SectionDivider />

    {/* ───── 4. PROJECTS ───── */}
    <Box
      sx={{
        minHeight: '70vh',
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 8,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
          }}
        >
          <Box>
            <SectionLabel>Projects</SectionLabel>
            <Typography variant="h2" sx={{ color: 'text.primary' }}>
              여기는 Projects 섹션입니다.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/projects"
            sx={{
              flexShrink: 0,
              borderColor: 'var(--color-button-ghost-border)',
              color: 'var(--color-primary)',
              px: 4,
              '&:hover': { backgroundColor: 'var(--color-button-ghost-hover)' },
            }}
          >
            더 보기
          </Button>
        </Box>

        {/* 프로젝트 썸네일 플레이스홀더 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {[1, 2, 3].map((n) => (
            <Box
              key={n}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)' },
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: 'var(--color-secondary)' },
              }}
            >
              {/* 썸네일 영역 */}
              <Box
                sx={{
                  height: '200px',
                  backgroundColor: 'background.default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  프로젝트 {n} 썸네일
                </Typography>
              </Box>
              {/* 텍스트 영역 */}
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, mb: 1 }}>
                  Project {n}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  대표작 설명이 들어갈 예정입니다.
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>

    <SectionDivider />

    {/* ───── 5. CONTACT ───── */}
    <Box
      sx={{
        backgroundColor: 'background.default',
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="sm">
        {/* 섹션 헤더 */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              color: ACCENT,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 2,
            }}
          >
            ◆ Contact
          </Typography>
          <Typography variant="h2" sx={{ color: 'text.primary', mb: 2 }}>
            함께 이야기해요
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            작업 문의나 협업 제안은 언제든 환영합니다.
          </Typography>
        </Box>

        {/* 연락처 정보 */}
        <ContactInfo />

        {/* 방명록 헤더 */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: ACCENT,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 1.5,
            }}
          >
            ◇ Guestbook
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            방문 흔적을 남겨주세요. 모든 글은 소중히 읽겠습니다.
          </Typography>
        </Box>

        {/* 방명록 폼 */}
        <GuestbookForm onSubmitted={() => setRefreshKey((k) => k + 1)} />

        {/* 방명록 목록 */}
        <GuestbookList refreshTrigger={refreshKey} />
      </Container>
    </Box>
  </Box>
  )
}

export default HomePage
