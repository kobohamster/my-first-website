# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 설정
모든 답변은 한국어로 작성하고, 기술적 내용은 단계별로 친절하게 설명한다.

## 프로젝트 구조

```
my_ai_web/
├── CLAUDE.md                   ← 현재 파일 (전역 설정)
└── lecture1/
    ├── CLAUDE.md               ← 수업 단위 설정 + @docs 연결
    ├── docs/
    │   ├── design-system.md    ← 컬러·타이포·간격 기준
    │   ├── code-convention.md  ← 컴포넌트 구조·네이밍 규칙
    │   └── new_project.md      ← 신규 프로젝트 시작 가이드
    └── _template_settings/     ← 신규 프로젝트 복사 기반 템플릿
        └── src/
            ├── theme.js        ← MUI 테마 (색상·폰트·간격)
            └── main.jsx        ← ThemeProvider + CssBaseline 진입점
```

## 신규 프로젝트 생성

`_template_settings`를 복사해서 사용한다. `node_modules`는 복사하지 않고 `npm install`로 재설치한다.

```bash
cp -r lecture1/_template_settings lecture1/my-new-project
cd lecture1/my-new-project
npm install
npm run dev
```

## 개발 명령어 (lecture1/_template_settings 기준)

```bash
npm run dev      # 개발 서버 시작 → http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
```

## 아키텍처

- **진입점**: `src/main.jsx` — `ThemeProvider`와 `CssBaseline`이 앱 전체를 감싼다.
- **테마**: `src/theme.js` — MUI `createTheme`으로 색상·폰트·간격을 중앙 관리한다. 색상 변경은 이 파일만 수정한다.
- **라우팅**: `react-router-dom` 설치 완료. `src/App.jsx`에 `BrowserRouter` + `Routes`를 추가해서 사용한다.
- **스택**: Vite 5 + React 18 + MUI v9 + Emotion + React Router v7 (Node.js v20.11 환경)

## 코드 컨벤션 핵심

- 컴포넌트: PascalCase 파일명, 화살표 함수
- import 순서: React → MUI → 로컬
- Boolean 변수: `is`/`has`/`can` 접두사, 이벤트 핸들러: `handle` 접두사
- 전체 규칙: `@docs/code-convention.md` 참조

## 디자인 기준

- Primary `#1976d2`, Secondary `#dc004e`, spacing base 8px
- 전체 기준: `@docs/design-system.md` 참조
