# 포트폴리오 사이트 디자인 스펙

**날짜:** 2026-05-08  
**스택:** Next.js (App Router) · TypeScript · Tailwind CSS · pnpm

---

## 목표 & 대상

채용 담당자 / 헤드헌터를 대상으로 한 AI/ML 엔지니어 포트폴리오 사이트.  
스크롤 한 번으로 지원자의 역량과 프로젝트를 빠르게 파악할 수 있도록 구성한다.

---

## 구조

단일 페이지 스크롤 구조. 모든 섹션이 한 URL(`/`)에 위치한다.

**섹션 순서**
```
Hero → About → Skills → Projects → Experience → Contact
```

**공통 레이아웃**
- 최대 너비 1100px, 가운데 정렬
- 섹션 상하 여백: `py-24`
- 상단 고정 네비게이션: 현재 스크롤 위치에 따라 활성 섹션 하이라이트

---

## 디자인 시스템

**톤:** 생동감 / 볼드

| 항목 | 값 |
|------|-----|
| 배경 | `#0a0a0a` (다크) |
| 강조색 | 퍼플 계열 + 흰색 텍스트 |
| 섹션 제목 | 크고 굵게, 일부에 그라디언트 효과 |
| 인터랙션 | 카드·태그 hover 시 애니메이션 |

---

## 섹션 상세

### Hero
- 전체 화면 높이(`100vh`)
- 왼쪽 정렬 텍스트:
  - "안녕하세요,"
  - "[이름]입니다." — 이름 또는 다음 줄 직군 텍스트에 그라디언트 적용
  - "AI / ML 엔지니어"
- 오른쪽: 글로우 원 또는 간단한 SVG 애니메이션 (AI 분위기 장식)
- 하단 스크롤 유도 아이콘(`↓`)

### About
- 2단 구성: 왼쪽 프로필 사진 · 오른쪽 소개 텍스트
- 사진 없을 경우 이니셜 아바타로 대체
- 소개 텍스트 하단에 이메일 / GitHub / LinkedIn 아이콘 링크

### Skills
- 카테고리별 태그 그룹:
  - 언어 (Python, SQL 등)
  - 프레임워크 (PyTorch, TensorFlow, scikit-learn 등)
  - MLOps (MLflow, Docker, Kubernetes 등)
  - 클라우드 (AWS, GCP 등)
- pill 형태 배지, 카테고리마다 강조색 변화
- hover 시 살짝 떠오르는 효과

### Projects
- 카드 그리드: 데스크탑 2열 / 모바일 1열
- 카드 내용: 프로젝트명 · 한 줄 설명 · 기술 태그(3~4개) · GitHub/데모 버튼
- 카드 hover: 테두리 그라디언트 글로우
- 대표 프로젝트 1개는 전체 너비 카드로 상단에 강조

### Experience
- 타임라인 형태 (왼쪽 세로선 + 오른쪽 항목)
- 경력과 학력을 시간 역순으로 통합
- 타임라인 포인트(●)에 강조색 적용

### Contact
- 짧은 초대 문구
- 이메일 복사 버튼 + GitHub / LinkedIn 아이콘
- 푸터: 이름, 제작 연도

---

## 언어

한국어 단일.

---

## 컴포넌트 구조

```
src/
  app/
    layout.tsx        # 폰트, 메타데이터, Navbar
    page.tsx          # 섹션 조합 (Hero, About, Skills, Projects, Experience, Contact)
  components/
    Navbar.tsx
    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
    ui/
      Badge.tsx       # 스킬 태그 pill
      ProjectCard.tsx
      TimelineItem.tsx
  lib/
    data.ts           # 콘텐츠 데이터 (이름, 소개, 스킬 목록, 프로젝트, 경력)
```

**데이터 전략:** 초기에는 `lib/data.ts`에 정적 데이터로 관리. CMS 연동은 다루지 않는다.

---

## 반응형

| 브레이크포인트 | 변경 사항 |
|---------------|-----------|
| `md` (768px) 이하 | Projects 그리드 1열, About 단일 컬럼 |
| `sm` (640px) 이하 | Hero 텍스트 크기 축소, Navbar 햄버거 메뉴 |
