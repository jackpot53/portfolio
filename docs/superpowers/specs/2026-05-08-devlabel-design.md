---
title: DevLabel 컴포넌트 설계
date: 2026-05-08
status: approved
---

## 목적

개발 중 페이지에서 각 React 컴포넌트의 이름과 파일 경로를 시각적으로 표시하고, 클릭 시 Claude Code가 컨텍스트를 파악할 수 있는 형식으로 클립보드에 복사한다.

## 컴포넌트 설계

### `src/components/ui/DevLabel.tsx`

- `"use client"` Client Component
- Props: `name: string`, `file: string`
- `process.env.NODE_ENV !== 'development'`이면 `null` 반환 (프로덕션 빌드에서 완전 제거)
- wrapper div 없이 `position: absolute` 뱃지로만 렌더링 — 기존 레이아웃에 영향 없음

**뱃지 스타일:**
- 위치: 좌상단 고정 (`top-1 left-1`)
- 배경: 반투명 검정 (`bg-black/80`)
- 텍스트: 흰색 모노스페이스, `text-xs`
- z-index: `z-[9999]`
- 호버 시 밝아짐 (`hover:bg-black`)
- 클릭 피드백: "✓ copied" 텍스트로 1.5초 전환

**클립보드 복사 형식:**
```
Component: Hero
File: src/components/sections/Hero.tsx
```

## 적용 대상

기존 컴포넌트 7개에 첫 번째 자식으로 삽입. 부모 요소에 `relative` 없으면 추가.

| 컴포넌트 | 파일 |
|---|---|
| Navbar | src/components/Navbar.tsx |
| Hero | src/components/sections/Hero.tsx |
| About | src/components/sections/About.tsx |
| Skills | src/components/sections/Skills.tsx |
| Projects | src/components/sections/Projects.tsx |
| Experience | src/components/sections/Experience.tsx |
| Contact | src/components/sections/Contact.tsx |

## CLAUDE.md 규칙

새 컴포넌트 생성 시 아래를 반드시 따른다:

1. `DevLabel`을 `src/components/ui/DevLabel.tsx`에서 import
2. 최상위 JSX 요소의 첫 번째 자식으로 `<DevLabel name="컴포넌트명" file="파일경로" />` 추가
3. 최상위 JSX 요소에 `relative` 클래스 확인, 없으면 추가

## 구현 순서

1. `src/components/ui/DevLabel.tsx` 생성
2. 기존 7개 컴포넌트에 DevLabel 적용
3. CLAUDE.md에 규칙 추가
