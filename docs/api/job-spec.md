# Job API Spec

JSearch (RapidAPI) 연동 스펙. 공고 목록 섹션 구현의 기준 문서.

---

## 외부 API — JSearch v2

### Endpoint

```
GET https://jsearch.p.rapidapi.com/search-v2
```

### 필수 헤더

| 헤더 | 값 |
|------|----|
| `x-rapidapi-host` | `jsearch.p.rapidapi.com` |
| `x-rapidapi-key` | `process.env.RAPIDAPI_KEY` |
| `Content-Type` | `application/json` |

### Query Parameters

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `query` | string | `"AI ML engineer jobs"` | 검색 쿼리 |
| `num_pages` | number | `1` | 가져올 페이지 수 (1페이지 = 최대 10건) |
| `country` | string | `"us"` | 국가 코드 (ISO 3166-1 alpha-2) |
| `date_posted` | string | `"month"` | `all` \| `today` \| `3days` \| `week` \| `month` |

### 응답 스키마 (200 OK)

```ts
interface JSearchResponse {
  status: string          // "OK"
  request_id: string
  parameters: {
    query: string
    date_posted: string
    country: string
    language: string
  }
  data: {
    jobs: Job[]
    cursor: string        // 다음 페이지 커서
  }
}

interface Job {
  job_id: string
  employer_name: string
  employer_logo: string | null
  employer_website: string | null
  job_publisher: string
  job_title: string
  job_description: string
  job_employment_type: "FULLTIME" | "PARTTIME" | "CONTRACTOR" | "INTERN"
  job_apply_link: string
  job_posted_at_datetime_utc: string   // ISO 8601
  job_city: string | null
  job_state: string | null
  job_country: string
  job_required_skills: string[] | null
  job_highlights: {
    Qualifications?: string[]
    Responsibilities?: string[]
    Benefits?: string[]
  } | null
}
```

---

## 내부 API Route — `/api/jobs`

외부 API 키를 클라이언트에 노출하지 않기 위해 Next.js Route Handler로 프록시.

### Endpoint

```
GET /api/jobs
```

### Query Parameters

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `query` | string | `"AI ML engineer jobs"` | 검색 쿼리 |
| `country` | string | `"us"` | 국가 코드 |
| `date_posted` | string | `"month"` | 기간 필터 |
| `num_pages` | number | `1` | 페이지 수 |

### 응답 스키마 (200 OK)

JSearch 응답에서 필요한 필드만 추출해 반환:

```ts
interface JobsResponse {
  jobs: JobItem[]
}

interface JobItem {
  id: string
  title: string
  company: string
  companyLogo: string | null
  employmentType: string
  location: string           // "{city}, {country}" 형태로 조합
  postedAt: string           // ISO 8601
  applyLink: string
  skills: string[]           // job_required_skills, 없으면 []
}
```

### 오류 응답

```ts
// 4xx / 5xx
{ error: string }
```

---

## 환경 변수

`.env.local`에 반드시 추가:

```env
RAPIDAPI_KEY=<your-key>
```

`NEXT_PUBLIC_` 접두사 없이 서버 전용으로 관리.
