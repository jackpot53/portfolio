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

## Database

**DB 작업 전 반드시 `docs/db/` 폴더를 먼저 확인할 것.**

- ERD 및 테이블 설계: `docs/db/schema.md`
- Drizzle 스키마 정의: `src/db/schema.ts`
- DB 클라이언트: `src/db/index.ts` (`import { db } from '@/db'`)
- Drizzle 설정: `drizzle.config.ts` (`.env.local` 자동 로드)

**스키마 변경 절차:**
1. `docs/db/schema.md` ERD 먼저 수정
2. `src/db/schema.ts` 반영
3. `pnpm db:push`로 Supabase에 적용

**클라이언트 사용 위치:**
- Server Component / Route Handler: `src/utils/supabase/server.ts`
- Client Component (`"use client"`): `src/utils/supabase/client.ts`
- 직접 DB 쿼리 (Drizzle): `src/db/index.ts`

```bash
pnpm db:push      # 스키마 → Supabase 반영
pnpm db:generate  # 마이그레이션 파일 생성
pnpm db:studio    # Drizzle Studio GUI
```

## TypeScript

- `strict: true` 적용
- `any` 사용 금지 — 타입 불명확 시 `unknown` 후 narrowing
- 컴포넌트 props는 `interface`로 정의 (type alias 아닌 interface 선호)

## DevLabel 규칙

새 컴포넌트를 생성할 때 반드시 DevLabel을 추가한다.

1. `import DevLabel from '@/components/ui/DevLabel'`
2. 최상위 JSX 요소의 **첫 번째 자식**으로 삽입:
   ```tsx
   <DevLabel name="컴포넌트명" file="src/components/경로/파일명.tsx" />
   ```
3. 최상위 JSX 요소에 `relative` 클래스가 없으면 추가한다.

DevLabel은 `NODE_ENV === 'development'`일 때만 렌더링되므로 프로덕션에 영향 없음.
