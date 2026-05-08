const svgMap: Record<string, () => React.ReactElement> = {

  /* LLM RAG 검색 — 노드 네트워크 + 펄스 */
  'llm-rag': () => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 연결선 */}
      <line x1="30" y1="50" x2="60" y2="25" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>
      <line x1="30" y1="50" x2="60" y2="75" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>
      <line x1="60" y1="25" x2="90" y2="50" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>
      <line x1="60" y1="75" x2="90" y2="50" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>
      <line x1="60" y1="25" x2="60" y2="75" stroke="currentColor" strokeOpacity=".15" strokeWidth="1"/>

      {/* 펄스 이동 (선 위 원) */}
      <circle r="3" fill="#10b981" fillOpacity=".9">
        <animateMotion dur="2s" repeatCount="indefinite" path="M30,50 Q45,37 60,25 Q75,37 90,50" />
      </circle>
      <circle r="2.5" fill="#10b981" fillOpacity=".6">
        <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s" path="M30,50 Q45,62 60,75 Q75,62 90,50" />
      </circle>

      {/* 노드 */}
      {[
        { cx: 30, cy: 50, r: 8, color: '#10b981' },
        { cx: 60, cy: 25, r: 6, color: '#6366f1' },
        { cx: 60, cy: 75, r: 6, color: '#6366f1' },
        { cx: 90, cy: 50, r: 8, color: '#10b981' },
      ].map(({ cx, cy, r, color }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r + 4} fill={color} fillOpacity=".08">
            <animate attributeName="r" values={`${r + 4};${r + 7};${r + 4}`} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values=".08;.18;.08" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity=".2" stroke={color} strokeWidth="1.5" />
        </g>
      ))}

      {/* 검색 아이콘 */}
      <circle cx="90" cy="50" r="4" fill="none" stroke="#10b981" strokeWidth="1.5"/>
      <line x1="93" y1="53" x2="97" y2="57" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  /* 고객 이탈 예측 — 바 차트 + 트렌드선 */
  'churn-prediction': () => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 격자 */}
      {[20, 40, 60, 80].map(y => (
        <line key={y} x1="15" y1={y} x2="115" y2={y} stroke="currentColor" strokeOpacity=".08" strokeWidth="1" />
      ))}
      {/* 축 */}
      <line x1="20" y1="10" x2="20" y2="85" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>
      <line x1="20" y1="85" x2="115" y2="85" stroke="currentColor" strokeOpacity=".2" strokeWidth="1"/>

      {/* 바 */}
      {[
        { x: 28, h: 30, color: '#f59e0b' },
        { x: 48, h: 50, color: '#f59e0b' },
        { x: 68, h: 35, color: '#ef4444' },
        { x: 88, h: 60, color: '#ef4444' },
      ].map(({ x, h, color }, i) => (
        <rect key={i} x={x} y={85 - h} width="14" height={h} rx="2" fill={color} fillOpacity=".7">
          <animate attributeName="height" values={`0;${h}`} dur="1s" begin={`${i * 0.15}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
          <animate attributeName="y" values={`85;${85 - h}`} dur="1s" begin={`${i * 0.15}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
        </rect>
      ))}

      {/* 트렌드선 */}
      <polyline points="35,72 55,56 75,62 95,40" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset="80">
        <animate attributeName="stroke-dashoffset" values="80;0" dur="1.5s" begin="0.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      </polyline>
      {[
        [35, 72], [55, 56], [75, 62], [95, 40],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#10b981" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${0.9 + i * 0.2}s`} fill="freeze"/>
        </circle>
      ))}
    </svg>
  ),

  /* 감성 분석 — 웨이브 + 감정 게이지 */
  'sentiment-api': () => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* 웨이브폼 */}
      {[-1, 0, 1].map((offset, layer) => (
        <path
          key={layer}
          stroke={layer === 0 ? '#6366f1' : '#6366f1'}
          strokeOpacity={layer === 0 ? '.7' : '.2'}
          strokeWidth={layer === 0 ? '1.8' : '1'}
          fill="none"
          d="M10,50 C20,50 20,25 30,25 C40,25 40,75 50,75 C60,75 60,35 70,35 C80,35 80,65 90,65 C100,65 100,45 110,45"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${offset * 5},0;${offset * 5 - 20},0;${offset * 5},0`}
            dur={`${2.5 + layer * 0.5}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* 긍정/부정 레이블 */}
      <rect x="8" y="12" width="26" height="12" rx="6" fill="#10b981" fillOpacity=".15"/>
      <text x="21" y="21" textAnchor="middle" fontSize="6" fill="#10b981" fontWeight="600">긍정</text>

      <rect x="86" y="74" width="26" height="12" rx="6" fill="#ef4444" fillOpacity=".15"/>
      <text x="99" y="83" textAnchor="middle" fontSize="6" fill="#ef4444" fontWeight="600">부정</text>

      {/* 중앙 점 (현재 포인트) */}
      <circle cx="60" cy="50" r="4" fill="#6366f1" fillOpacity=".3">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values=".3;.1;.3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="50" r="2.5" fill="#6366f1"/>
    </svg>
  ),
}

interface ProjectSvgProps {
  projectId: string
}

export default function ProjectSvg({ projectId }: ProjectSvgProps) {
  const Svg = svgMap[projectId]
  if (!Svg) return null
  return (
    <div className="flex h-[90px] w-[130px] shrink-0 items-center justify-center text-foreground">
      <Svg />
    </div>
  )
}
