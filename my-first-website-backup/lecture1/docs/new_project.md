# 새 프로젝트 시작 가이드 (New Project Guide)

## 프로젝트 생성 순서

### 1. 템플릿에서 프로젝트 복사

```bash
# _template_settings를 새 프로젝트명으로 복사
cp -r _template_settings my-new-project
cd my-new-project
```

### 2. package.json 수정

```json
{
  "name": "my-new-project",
  "version": "0.1.0"
}
```

### 3. 개발 서버 시작

```bash
npm run dev
```

### 4. 기본 구조 설정

```bash
mkdir -p src/components src/pages src/hooks src/utils src/constants src/assets
```

## 필수 확인 사항

- [ ] `src/theme.js` - 프로젝트 색상 커스터마이징
- [ ] `src/main.jsx` - ThemeProvider 적용 확인
- [ ] `index.html` - 타이틀 변경
- [ ] `vite.config.js` - 포트 설정 (기본: 5173)

## 라우터 설정 (React Router)

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## MUI 컴포넌트 자주 사용하는 패턴

```jsx
import { Box, Container, Grid, Typography, Button } from '@mui/material'

// 레이아웃
<Container maxWidth="lg">
  <Box sx={{ mt: 4, mb: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* 콘텐츠 */}
      </Grid>
    </Grid>
  </Box>
</Container>
```

## 배포 빌드

```bash
npm run build
# dist/ 폴더에 빌드 결과물 생성
```
