# shadcn/ui 설치 + 라이트 테마 적용

**날짜:** 2026-05-08  
**범위:** 다크 테마 → 라이트 테마 전환, shadcn/ui 풀 설치, CSS 변수 체계 완전 이전  
**제약:** 섹션 구조/JSX 변경 없음 — 스타일만 교체

---

## 목표

1. `shadcn/ui`를 Tailwind v4 방식으로 설치한다.
2. `globals.css`의 커스텀 다크 테마 변수를 shadcn 표준 HSL 변수 체계(라이트)로 전면 교체한다.
3. DESIGN.md 컬러 토큰을 shadcn 변수에 1:1 매핑한다.
4. 필요한 shadcn 컴포넌트 7개를 추가하고, 기존 커스텀 컴포넌트를 교체한다.
5. 각 섹션 컴포넌트의 Tailwind 클래스를 라이트 테마 기준으로 교체한다.

---

## 1. shadcn/ui 설치

```bash
npx shadcn@latest init
```

- Style: Default
- Base color: Neutral (DESIGN.md 기준으로 수동 조정 예정)
- Tailwind v4 자동 감지

설치 후 추가할 컴포넌트:

```bash
npx shadcn@latest add button badge card input textarea label separator
```

---

## 2. CSS 변수 체계 전환 (globals.css)

현재 `@theme inline` 커스텀 변수를 shadcn 표준으로 교체. DESIGN.md 컬러 토큰 기준.

### 라이트 모드 변수 매핑

| shadcn 변수 | HSL 값 | Hex | DESIGN.md 토큰 |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#FFFFFF` | `--color-bg` |
| `--foreground` | `220 13% 13%` | `#111827` | `--color-text-primary` |
| `--card` | `0 0% 100%` | `#FFFFFF` | — |
| `--card-foreground` | `220 13% 13%` | `#111827` | — |
| `--primary` | `221 100% 56%` | `#1A6BFF` | `--color-primary` |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | — |
| `--secondary` | `220 14% 96%` | `#F9FAFB` | `--color-bg-subtle` |
| `--secondary-foreground` | `220 13% 13%` | `#111827` | — |
| `--muted` | `220 14% 96%` | `#F9FAFB` | — |
| `--muted-foreground` | `220 9% 46%` | `#6B7280` | `--color-text-secondary` |
| `--accent` | `221 100% 56%` | `#1A6BFF` | `--color-primary` |
| `--accent-foreground` | `0 0% 100%` | `#FFFFFF` | — |
| `--border` | `220 13% 91%` | `#E5E7EB` | `--color-border` |
| `--input` | `220 13% 91%` | `#E5E7EB` | — |
| `--ring` | `221 100% 56%` | `#1A6BFF` | `--color-primary` |
| `--radius` | `0.5rem` | — | — |

다크 모드 변수는 정의하지 않는다(라이트 전용).

---

## 3. 설치 컴포넌트 및 교체 대상

| shadcn 컴포넌트 | 파일 경로 | 교체/적용 대상 |
|---|---|---|
| `button` | `src/components/ui/button.tsx` | Hero CTA, Navbar, Contact 버튼 |
| `badge` | `src/components/ui/badge.tsx` | 기존 `Badge.tsx` 삭제 후 교체 |
| `card` | `src/components/ui/card.tsx` | `ProjectCard.tsx`에 적용 |
| `input` | `src/components/ui/input.tsx` | Contact/ExperienceForm |
| `textarea` | `src/components/ui/textarea.tsx` | Contact/ExperienceForm |
| `label` | `src/components/ui/label.tsx` | 폼 레이블 |
| `separator` | `src/components/ui/separator.tsx` | Experience 섹션 구분선 |

기존 `src/components/ui/Badge.tsx`는 shadcn badge로 대체 후 삭제.  
`ExperienceForm.tsx`는 shadcn Input/Textarea/Label/Button으로 내부 교체.

---

## 4. 섹션별 스타일 교체

### globals.css
- `@theme inline` 블록: 위 변수 매핑으로 전면 교체
- `html`: `background-color: white; color: #111827`
- 스크롤바: `border-color` 기반 subtle 스타일
- `::selection`: primary 색상

### Navbar
- 배경: `bg-background/90 backdrop-blur border-b border-border`
- 링크: `text-muted-foreground hover:text-foreground`
- 활성 링크: `text-primary`
- CTA: shadcn `Button variant="outline"` (rounded-full)

### Hero
- 제거: gradient 텍스트, accent blur 원, animate-bounce 아이콘
- 이름 헤드라인: `text-foreground font-extrabold`
- 직함: `text-primary font-semibold`
- CTA Primary: shadcn `Button` (기본 variant)
- CTA Secondary: shadcn `Button variant="outline"`
- 배경: white, `bg-background`

### About
- 카드/컨테이너: `bg-background border border-border rounded-2xl`
- 텍스트: `text-foreground` / `text-muted-foreground`

### Skills
- 기존 `Badge` → shadcn `Badge`
- 기술 태그: `variant="secondary"` (회색 배경)
- 주요 기술: `variant="default"` (primary 배경)

### Projects
- `ProjectCard`에 shadcn `Card`, `CardHeader`, `CardContent`, `CardFooter` 적용
- 테두리: `border-border`
- hover: `hover:shadow-md transition-shadow`
- 기술 태그: shadcn `Badge variant="secondary"`

### Experience
- `TimelineItem` 구분선: shadcn `Separator`
- 회사 링크: `text-primary hover:underline`
- 날짜: `text-muted-foreground text-xs`
- 태그: shadcn `Badge variant="outline"`

### Contact / ExperienceForm
- 입력 필드: shadcn `Input`
- 텍스트 영역: shadcn `Textarea`
- 레이블: shadcn `Label`
- 제출 버튼: shadcn `Button` (full-width)

---

## 5. 완료 기준

- [ ] `pnpm build` 에러 없음
- [ ] `pnpm type-check` 통과
- [ ] 모든 섹션이 라이트 테마로 렌더링됨
- [ ] 다크 테마 변수/클래스 잔재 없음
- [ ] shadcn 컴포넌트 7개 정상 동작
- [ ] 기존 `Badge.tsx`가 shadcn badge로 완전 교체됨
