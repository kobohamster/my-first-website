# GitHub CLI (gh) 스킬

## 계정 정보
- 사용자명: kobohamster
- 이메일: kobo0067@gmail.com
- 로그인 방식: HTTPS
- 토큰 권한: repo, read:org, gist

## 자주 쓰는 명령어

### 저장소 관리
```bash
gh repo list                        # 내 저장소 목록
gh repo create <이름>               # 새 저장소 생성
gh repo create <이름> --public      # 공개 저장소 생성
gh repo create <이름> --private     # 비공개 저장소 생성
gh repo clone <사용자명>/<저장소>   # 저장소 복제
gh repo view                        # 현재 저장소 정보
```

### Pull Request
```bash
gh pr list                          # PR 목록
gh pr create                        # PR 생성
gh pr create --title "제목" --body "내용"
gh pr view <번호>                   # PR 상세 보기
gh pr merge <번호>                  # PR 병합
gh pr checkout <번호>               # PR 브랜치로 전환
```

### Issue
```bash
gh issue list                       # 이슈 목록
gh issue create                     # 이슈 생성
gh issue create --title "제목" --body "내용"
gh issue view <번호>                # 이슈 상세 보기
gh issue close <번호>               # 이슈 닫기
```

### 인증
```bash
gh auth status                      # 로그인 상태 확인
gh auth login                       # 로그인
gh auth logout                      # 로그아웃
```

## 프로젝트 연동 워크플로우

### 새 React 프로젝트를 GitHub에 올리는 순서
```bash
# 1. _template_settings 복사 후 프로젝트 생성
cp -r lecture1/_template_settings lecture1/<프로젝트명>
cd lecture1/<프로젝트명>
npm install

# 2. git 초기화 및 초기 커밋
git init
git add .
git commit -m "feat: 프로젝트 초기 설정"

# 3. GitHub 저장소 생성 및 연결
gh repo create <프로젝트명> --public --source=. --remote=origin --push
```

### 기존 프로젝트 업로드
```bash
git add .
git commit -m "커밋 메시지"
git push origin main
```

## 주의사항
- `gh auth login` 은 대화형 명령이므로 터미널에서 직접 실행 (`! gh auth login`)
- Windows 환경에서는 PowerShell 사용 권장
- 토큰은 keyring에 안전하게 저장됨 (텍스트 파일에 저장 금지)
