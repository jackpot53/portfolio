# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 포트폴리오 사이트. TypeScript, App Router, Tailwind CSS, pnpm 사용.

## Commands

```bash
pnpm dev          # 개발 서버 (localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm lint         # ESLint 실행
pnpm type-check   # tsc --noEmit
```

## Architecture

**App Router 구조** (`src/app/` 또는 `app/` 디렉토리):
- `layout.tsx` — 전체 공통 레이아웃 (폰트, 메타데이터, 네비게이션 포함)
- `page.tsx` — 각 라우트의 진입점
- `components/` — 재사용 컴포넌트
- `lib/` 또는 `utils/` — 유틸리티 함수

**컴포넌트 기본 원칙:**
- Server Component 우선 — 인터랙션이 필요한 경우에만 `"use client"` 추가
- 데이터 페칭은 Server Component에서 직접 `async/await` 사용

**Tailwind:**
- 인라인 클래스 우선, 반복되는 패턴은 `cn()` 유틸리티(`clsx` + `tailwind-merge`)로 조합
- 글로벌 스타일은 `globals.css`에 최소한으로 유지

## TypeScript

- `strict: true` 적용
- `any` 사용 금지 — 타입 불명확 시 `unknown` 후 narrowing
- 컴포넌트 props는 `interface`로 정의 (type alias 아닌 interface 선호)
