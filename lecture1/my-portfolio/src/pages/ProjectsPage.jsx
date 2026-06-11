import { useEffect, useState } from 'react'
import {
  Box, Container, Typography, Grid, Card, CardMedia,
  CardContent, CardActions, Chip, Button, Skeleton,
  Alert, Stack,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import GitHubIcon from '@mui/icons-material/GitHub'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { supabase } from '../lib/supabaseClient'

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.01)',
          boxShadow: '0 12px 32px rgba(26,26,46,0.14)',
        },
      }}
    >
      {/* 썸네일 */}
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
        {imgError ? (
          <Box
            sx={{
              height: 200,
              bgcolor: 'background.default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="text.disabled">
              미리보기 없음
            </Typography>
          </Box>
        ) : (
          <CardMedia
            component="img"
            height={200}
            image={project.thumbnail_url}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{ objectFit: 'cover', transition: 'transform 0.25s ease', '&:hover': { transform: 'scale(1.04)' } }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* 제목 */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: 'text.primary', mb: 1, fontSize: '1.1rem', lineHeight: 1.4 }}
        >
          {project.title}
        </Typography>

        {/* 설명 */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </Typography>

        {/* 소요기간 */}
        {project.duration && (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
            <AccessTimeIcon sx={{ fontSize: '0.85rem', color: 'text.disabled' }} />
            <Typography variant="caption" color="text.disabled">
              {project.duration}
            </Typography>
          </Stack>
        )}

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {project.tech_stack?.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(114,114,176,0.1)',
                color: 'secondary.dark',
                borderColor: 'secondary.light',
                border: '1px solid',
                fontSize: '0.7rem',
                height: 22,
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </CardContent>

      {/* 버튼 */}
      <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          href={project.detail_url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
          sx={{
            fontSize: '0.75rem',
            py: 0.5,
            px: 1.5,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 2px 8px rgba(201,148,74,0.35)' },
          }}
        >
          Live Demo
        </Button>

        {project.github_url && (
          <Button
            size="small"
            variant="outlined"
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              fontSize: '0.75rem',
              py: 0.5,
              px: 1.5,
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': { borderColor: 'text.secondary', bgcolor: 'rgba(26,26,46,0.04)' },
            }}
          >
            GitHub
          </Button>
        )}

        <Button
          size="small"
          variant="text"
          href={project.detail_url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<InfoOutlinedIcon sx={{ fontSize: '0.85rem !important' }} />}
          sx={{
            fontSize: '0.75rem',
            py: 0.5,
            px: 1,
            textTransform: 'none',
            color: 'text.disabled',
            ml: 'auto',
            '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}

const SkeletonCard = () => (
  <Card sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width={60} height={22} />
        <Skeleton variant="rounded" width={60} height={22} />
        <Skeleton variant="rounded" width={60} height={22} />
      </Box>
    </CardContent>
    <CardActions sx={{ px: 2, pb: 2 }}>
      <Skeleton variant="rounded" width={80} height={30} />
      <Skeleton variant="rounded" width={80} height={30} />
    </CardActions>
  </Card>
)

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setProjects(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{ color: 'primary.main', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', mb: 2 }}
          >
            Portfolio
          </Typography>
          <Typography variant="h1" sx={{ color: 'text.primary', fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            직접 기획하고 개발한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 에러 */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            프로젝트를 불러오는 중 오류가 발생했습니다: {error}
          </Alert>
        )}

        {/* 그리드 */}
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <SkeletonCard />
                </Grid>
              ))
            : projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
        </Grid>

        {!loading && projects.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="text.disabled">등록된 프로젝트가 없습니다.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default ProjectsPage
