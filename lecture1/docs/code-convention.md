# 코드 컨벤션 (Code Convention)

## 파일 및 컴포넌트 네이밍

- 컴포넌트 파일: PascalCase (`UserProfile.jsx`)
- 일반 파일: camelCase (`apiUtils.js`)
- 스타일 파일: 컴포넌트명과 동일 (`UserProfile.css`)
- 상수 파일: SCREAMING_SNAKE_CASE (`API_CONSTANTS.js`)

## 컴포넌트 구조

```jsx
// 1. Import 순서: React → 라이브러리 → 로컬
import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { ComponentName } from './components'

// 2. 컴포넌트 선언 (화살표 함수)
const ComponentName = ({ prop1, prop2 }) => {
  // 3. State 선언
  const [state, setState] = useState(null)

  // 4. Effect
  useEffect(() => {
    // 로직
  }, [])

  // 5. 핸들러 함수
  const handleAction = () => {
    // 로직
  }

  // 6. Return (JSX)
  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  )
}

export default ComponentName
```

## 변수 네이밍 규칙

- 변수/함수: camelCase
- 상수: UPPER_SNAKE_CASE
- Boolean: is/has/can 접두사 (`isLoading`, `hasError`)
- 이벤트 핸들러: handle 접두사 (`handleClick`, `handleSubmit`)

## Props 정의 규칙

- 명확한 이름 사용
- Boolean props는 기본값 true 생략 가능
- 구조분해 할당 사용

## 디렉토리 구조

```
src/
├── components/     # 재사용 컴포넌트
├── pages/          # 페이지 컴포넌트
├── hooks/          # 커스텀 훅
├── utils/          # 유틸리티 함수
├── constants/      # 상수
├── assets/         # 이미지, 폰트 등
└── theme.js        # MUI 테마 설정
```

## Git 커밋 메시지

- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포매팅
- refactor: 리팩토링
- test: 테스트 추가
