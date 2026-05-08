# Design System

포트폴리오 사이트 디자인 시스템. 컴포넌트 구현 시 이 문서를 기준으로 한다.

---

## Color

### Palette

| Token | Hex | Tailwind | 용도 |
|-------|-----|----------|------|
| `--color-primary` | `#1A6BFF` | `blue-600` | 주요 버튼, 링크, 강조 |
| `--color-primary-hover` | `#1558E6` | `blue-700` | hover 상태 |
| `--color-bg` | `#FFFFFF` | `white` | 페이지 배경 |
| `--color-bg-subtle` | `#F9FAFB` | `gray-50` | 섹션 구분 배경 |
| `--color-text-primary` | `#111827` | `gray-900` | 본문, 제목 |
| `--color-text-secondary` | `#6B7280` | `gray-500` | 부제목, 설명, 메타 |
| `--color-text-muted` | `#9CA3AF` | `gray-400` | 플레이스홀더, 보조 레이블 |
| `--color-text-accent` | `#C4C4C4` | `gray-300` | 히어로 장식용 대형 텍스트 |
| `--color-border` | `#E5E7EB` | `gray-200` | 구분선, 카드 테두리 |
| `--color-tag-ux-bg` | `#EEF2FF` | `indigo-50` | UX 태그 배경 |
| `--color-tag-ux-text` | `#4338CA` | `indigo-700` | UX 태그 텍스트 |
| `--color-tag-brand-bg` | `#FDF4FF` | `fuchsia-50` | Branding 태그 배경 |
| `--color-tag-brand-text` | `#A21CAF` | `fuchsia-700` | Branding 태그 텍스트 |

### 사용 원칙

- 배경은 흰색 또는 `gray-50`만 사용 — 채도 있는 배경 금지
- Primary 컬러(`blue-600`)는 CTA 버튼·링크·active 상태에만 사용
- 장식용 대형 텍스트(히어로 섹션 키워드)는 `gray-300`으로 처리해 대비 낮춤

---

## Typography

### Font Stack

```css
/* 제목/디스플레이 */
font-family: 'Inter', 'Pretendard', system-ui, sans-serif;
font-weight: 700 | 800;

/* 본문 */
font-family: 'Inter', 'Pretendard', system-ui, sans-serif;
font-weight: 400 | 500;
```

### Scale

| Token | Size | Weight | Line-height | Tailwind | 용도 |
|-------|------|--------|-------------|----------|------|
| `display-xl` | 56–64px | 800 | 1.1 | `text-6xl font-extrabold leading-tight` | 히어로 헤드라인 |
| `display-lg` | 40–48px | 700 | 1.15 | `text-5xl font-bold leading-tight` | 섹션 헤드라인 |
| `display-md` | 28–32px | 700 | 1.2 | `text-3xl font-bold` | 서브 섹션 제목 |
| `heading` | 18–20px | 600 | 1.3 | `text-xl font-semibold` | 카드 제목 |
| `body` | 14–16px | 400 | 1.6 | `text-sm` / `text-base` | 본문 설명 |
| `caption` | 12px | 400 | 1.5 | `text-xs` | 메타 정보, 날짜 |
| `label` | 13px | 500 | — | `text-sm font-medium` | 내비게이션, 버튼 |
| `nav` | 14px | 400 | — | `text-sm` | 내비게이션 링크 |

### 혼합 색상 헤드라인 패턴

섹션 제목에서 키워드를 장식용 회색으로 표현:

```tsx
// "Explore My Offerings for You" → "My Offerings" 를 회색으로
<h2 className="text-5xl font-bold text-gray-900">
  Explore{' '}
  <span className="text-gray-300">My Offerings</span>
  {' '}for You
</h2>
```

---

## Spacing

8px 베이스 그리드. Tailwind 기본 스케일 사용.

| 용도 | 값 | Tailwind |
|------|----|----------|
| 컴포넌트 내부 패딩 (소) | 12px | `p-3` |
| 컴포넌트 내부 패딩 (중) | 24px | `p-6` |
| 섹션 수직 패딩 | 80–96px | `py-20` / `py-24` |
| 컬럼 갭 | 32px | `gap-8` |
| 인라인 요소 간격 | 8–16px | `gap-2` / `gap-4` |
| 컨테이너 수평 패딩 | 24–32px | `px-6` / `px-8` |

---

## Layout

### Container

```tsx
<div className="mx-auto max-w-6xl px-6 lg:px-8">
```

Max-width: `1152px` (Tailwind `max-w-6xl`). 중앙 정렬.

### Grid

```tsx
// 서비스 카드: 3열
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

// 히어로 이미지: 비대칭 2열
<div className="grid grid-cols-5 gap-4">
  <div className="col-span-2"> {/* 작은 이미지 */} </div>
  <div className="col-span-3"> {/* 큰 이미지 */} </div>
</div>

// 경험 항목: 2열 (제목 / 설명)
<div className="grid grid-cols-2 gap-8 items-start">
```

---

## Components

### Button

```tsx
// Primary — 파란 배경, 화살표 아이콘 포함
<button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
  Let's Talk <ArrowRight className="h-4 w-4" />
</button>

// Secondary (Outline)
<button className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
  Our Services
</button>

// Ghost / Nav CTA — 테두리만, 작은 크기
<button className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
  Contact
</button>
```

### Navbar

```tsx
<nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <Logo />
    <ul className="flex items-center gap-8 text-sm text-gray-600">
      {/* 활성 링크: text-blue-600 */}
    </ul>
    <GhostButton>Contact</GhostButton>
  </div>
</nav>
```

- 상단 고정(`sticky top-0`), 반투명 blur 배경
- 로고는 좌측, 링크는 중앙, CTA는 우측
- 활성 링크: `text-blue-600`, 비활성: `text-gray-600`

### Service Card

```tsx
<div className="flex flex-col gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-blue-600">
    <Icon className="h-5 w-5" />
  </div>
  <h3 className="text-base font-semibold text-gray-900">Card Title</h3>
  <p className="text-sm leading-relaxed text-gray-500">Description text...</p>
</div>
```

- 배경 없음, 테두리 없음 — 아이콘 컨테이너에만 border
- 아이콘: 40×40, `rounded-lg`, `border-gray-200`, 아이콘 색상 `text-blue-600`

### Experience / Timeline Item

```tsx
<div className="border-t border-gray-100 py-6">
  <div className="grid grid-cols-2 gap-8">
    <div>
      <a className="text-sm font-medium text-blue-600 hover:underline">Company Name</a>
      <p className="mt-1 text-xs text-gray-400">• Month Year – Present</p>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-600">Role, Location. Description...</p>
      <div className="flex gap-2">
        <Tag>UX</Tag>
        <Tag variant="branding">Branding</Tag>
      </div>
    </div>
  </div>
</div>
```

### Tag / Badge

```tsx
// UX 태그
<span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
  UX
</span>

// Branding 태그
<span className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700">
  Branding
</span>
```

### Section Header

```tsx
<div className="mb-12 text-center">
  <h2 className="text-5xl font-bold text-gray-900">
    Explore{' '}
    <span className="text-gray-300">My Offerings</span>
    {' '}for You
  </h2>
  <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
    Subtitle text here.
  </p>
</div>
```

### CTA Section (텍스트 + 버튼 2열)

```tsx
<section className="py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="grid grid-cols-2 gap-12 items-center">
      <h2 className="text-4xl font-bold leading-tight text-gray-900">
        Experiences with{' '}
        <span className="text-gray-300">Passion, Precision, and Purpose</span>
      </h2>
      <div className="flex flex-col gap-6">
        <p className="text-sm text-gray-500 leading-relaxed">...</p>
        <PrimaryButton>Let's Talk →</PrimaryButton>
      </div>
    </div>
  </div>
</section>
```

---

## Image Treatments

- 포트폴리오 이미지: `rounded-2xl overflow-hidden`, 그림자 없음
- 히어로 이미지 그리드: 비대칭 배치, 작은 이미지와 큰 이미지 조합
- object-fit: `object-cover`

```tsx
<div className="overflow-hidden rounded-2xl">
  <Image src={src} alt={alt} className="h-full w-full object-cover" />
</div>
```

---

## Motion & Interaction

- 전환: `transition-colors duration-150` (버튼, 링크)
- 호버: 색상/배경 변화만 — transform/scale 사용 자제
- 스크롤 애니메이션: 필요 시 `opacity + translateY` 조합, 과하지 않게

---

## Do / Don't

| Do | Don't |
|----|-------|
| 흰 배경 + 충분한 여백 | 채도 높은 배경색 |
| 단일 primary 컬러(blue) | 여러 강조 색 남용 |
| 시스템 폰트 + Inter | 장식적 serif |
| 얇은 border(`gray-200`) | 두꺼운 선, 큰 그림자 |
| rounded-full 버튼 | 각진 버튼(`rounded-none`) |
| 정보 밀도 낮게, 여백 크게 | 콘텐츠 빽빽하게 채우기 |
