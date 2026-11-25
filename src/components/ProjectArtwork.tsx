import type { ReactNode } from 'react'
import type { ProjectVisual } from '../data/portfolio'

const INK = '#050505'
const PAPER = '#FFFCF9'
const DISPLAY = "var(--display, 'Space Grotesk', sans-serif)"
const MONO = "var(--mono, 'IBM Plex Mono', monospace)"

type Tone = 'ink' | 'muted' | 'paper'

function Text({ x, y, children, size = 20, tone = 'ink', weight = 400, mono = false }: {
  x: number
  y: number
  children: ReactNode
  size?: number
  tone?: Tone
  weight?: number
  mono?: boolean
}) {
  return <text x={x} y={y} fontSize={size} fontFamily={mono ? MONO : DISPLAY} fontWeight={weight}
    fill={tone === 'paper' ? PAPER : INK} fillOpacity={tone === 'muted' ? 0.58 : 1}>{children}</text>
}

function Panel({ x, y, width, height, dark = false, soft = false, radius = 12 }: {
  x: number
  y: number
  width: number
  height: number
  dark?: boolean
  soft?: boolean
  radius?: number
}) {
  return <rect x={x} y={y} width={width} height={height} rx={radius} fill={dark || soft ? INK : PAPER}
    fillOpacity={soft ? 0.045 : 1} stroke={INK} strokeOpacity={dark ? 1 : 0.18} strokeWidth={1.2} />
}

function Rule({ x1, x2, y, dark = false }: { x1: number; x2: number; y: number; dark?: boolean }) {
  return <path d={`M${x1} ${y}H${x2}`} stroke={dark ? PAPER : INK} strokeOpacity={0.18} />
}

function Arrow({ x, y, light = false }: { x: number; y: number; light?: boolean }) {
  return <path d={`M${x} ${y + 12}h18m-6-6 6 6-6 6`} stroke={light ? PAPER : INK} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
}

function Action({ x, y, width, label, dark = true }: { x: number; y: number; width: number; label: string; dark?: boolean }) {
  return <g>
    <Panel x={x} y={y} width={width} height={42} dark={dark} radius={21} />
    <Text x={x + 18} y={y + 27} size={17} tone={dark ? 'paper' : 'ink'}>{label}</Text>
    <Arrow x={x + width - 40} y={y + 9} light={dark} />
  </g>
}

function FileMark({ x, y, dark = false, size = 24 }: { x: number; y: number; dark?: boolean; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`} stroke={dark ? PAPER : INK} strokeWidth={1.5} fill="none" strokeLinejoin="round">
    <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h6" />
  </g>
}

function WindowFrame({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <rect width={1000} height={620} fill={PAPER} />
    <Panel x={24} y={24} width={952} height={572} radius={18} />
    <g fill={INK}>
      <circle cx={52} cy={56} r={4} fillOpacity={0.75} />
      <circle cx={68} cy={56} r={4} fillOpacity={0.35} />
      <circle cx={84} cy={56} r={4} fillOpacity={0.18} />
    </g>
    <Text x={114} y={64} size={23} weight={550}>{title}</Text>
    <Text x={760} y={62} size={14} tone="muted" mono>Interface concept</Text>
    <Rule x1={24} x2={976} y={88} />
    {children}
  </>
}

function SideNav({ items, active = 0, dark = false }: { items: string[]; active?: number; dark?: boolean }) {
  return <g>
    <Panel x={36} y={100} width={186} height={484} dark={dark} soft={!dark} radius={12} />
    <Text x={58} y={142} size={16} tone={dark ? 'paper' : 'muted'} mono>Workspace</Text>
    {items.map((item, index) => {
      const selected = index === active
      const y = 165 + index * 54
      return <g key={item}>
        {selected && <rect x={48} y={y} width={162} height={42} rx={8} fill={dark ? PAPER : INK} />}
        <rect x={62} y={y + 15} width={11} height={11} rx={2} fill="none"
          stroke={selected ? dark ? INK : PAPER : dark ? PAPER : INK} strokeOpacity={selected ? 1 : 0.6} />
        <Text x={86} y={y + 27} size={18} tone={selected ? dark ? 'ink' : 'paper' : dark ? 'paper' : 'muted'}>{item}</Text>
      </g>
    })}
    <Rule x1={58} x2={200} y={514} dark={dark} />
    <Text x={58} y={548} size={16} tone={dark ? 'paper' : 'muted'}>Settings</Text>
  </g>
}

function MentoraArtwork() {
  return <WindowFrame title="Mentora">
    <SideNav items={['Overview', 'Courses', 'Assignments', 'Messages']} dark />
    <Text x={252} y={143} size={32} weight={500}>Academic workspace</Text>
    <Text x={252} y={177} size={18} tone="muted">Courses and assignments, in one place.</Text>
    <Action x={748} y={112} width={190} label="Open calendar" dark={false} />
    {[
      { x: 252, title: 'Software design', detail: 'Course workspace' },
      { x: 606, title: 'Data structures', detail: 'Course workspace' },
    ].map(course => <g key={course.title}>
      <Panel x={course.x} y={210} width={332} height={154} />
      <FileMark x={course.x + 22} y={233} />
      <Text x={course.x + 22} y={293} size={25} weight={500}>{course.title}</Text>
      <Text x={course.x + 22} y={329} size={17} tone="muted">{course.detail}</Text>
      <Arrow x={course.x + 276} y={319} />
    </g>)}
    <Text x={252} y={411} size={25} weight={500}>Assignments</Text>
    {['Design review', 'Practice set', 'Topic notes'].map((label, index) => <g key={label}>
      <Rule x1={252} x2={938} y={431 + index * 44} />
      <Text x={270} y={461 + index * 44} size={19}>{label}</Text>
      <Text x={725} y={461 + index * 44} size={16} tone="muted">Open assignment</Text>
      <Arrow x={907} y={447 + index * 44} />
    </g>)}
  </WindowFrame>
}

function TransportArtwork() {
  return <WindowFrame title="Transport demand">
    <Text x={60} y={146} size={34} weight={500}>Route planning</Text>
    <g>
      <Action x={618} y={112} width={92} label="Bus" />
      <Action x={722} y={112} width={94} label="Rail" dark={false} />
      <Action x={828} y={112} width={94} label="Air" dark={false} />
    </g>
    <Panel x={60} y={185} width={526} height={354} soft />
    <Text x={86} y={225} size={20} weight={500}>Demand schematic</Text>
    <Text x={86} y={255} size={16} tone="muted">Compare routes and service patterns</Text>
    <g stroke={INK} strokeOpacity={0.1}>
      {[304, 360, 416, 472].map(y => <path key={y} d={`M92 ${y}H552`} />)}
    </g>
    <g fill={INK}>
      {[88, 158, 119, 188, 147, 207].map((height, index) => <rect key={index} x={102 + index * 72} y={475 - height} width={34} height={height} rx={5} fillOpacity={index === 3 ? 1 : 0.22} />)}
    </g>
    <Rule x1={92} x2={552} y={475} />
    <Text x={94} y={511} size={16} tone="muted" mono>Route comparison · illustrative</Text>
    <Text x={626} y={212} size={25} weight={500}>Plan a service</Text>
    {[
      { label: 'Route', value: 'Choose a route' },
      { label: 'Service', value: 'Choose a service' },
      { label: 'Time slot', value: 'Choose a time' },
    ].map((field, index) => <g key={field.label}>
      <Text x={626} y={253 + index * 86} size={17} tone="muted">{field.label}</Text>
      <Panel x={626} y={266 + index * 86} width={310} height={48} radius={8} />
      <Text x={644} y={296 + index * 86} size={18}>{field.value}</Text>
      <path d={`m905 ${285 + index * 86} 6 6 6-6`} stroke={INK} strokeWidth={1.5} fill="none" />
    </g>)}
    <Action x={626} y={539} width={310} label="Explore demand model" />
  </WindowFrame>
}

function Headphones() {
  return <g transform="translate(590 149)" stroke={INK} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 211v-74C26 57 72 16 136 16s110 41 110 121v74" strokeWidth={12} />
    <path d="M47 139C47 71 80 37 136 37s89 34 89 102" strokeWidth={3} strokeOpacity={0.45} />
    <path d="M27 176c-18 0-28 11-28 28v79c0 18 10 28 28 28h17V176H27ZM245 176c18 0 28 11 28 28v79c0 18-10 28-28 28h-17V176h17Z" fill={INK} strokeWidth={3} />
    <rect x={42} y={164} width={47} height={160} rx={22} fill={PAPER} strokeWidth={3} />
    <rect x={183} y={164} width={47} height={160} rx={22} fill={PAPER} strokeWidth={3} />
    <path d="M58 186v114M198 186v114M94 328c26 22 58 25 79 6" strokeWidth={2} strokeOpacity={0.35} />
    <ellipse cx={136} cy={382} rx={152} ry={15} fill={INK} fillOpacity={0.05} stroke="none" />
  </g>
}

function GoodFindArtwork() {
  return <WindowFrame title="GoodFind">
    <Text x={62} y={127} size={18}>Catalog</Text>
    <Text x={161} y={127} size={18} tone="muted">Collections</Text>
    <Text x={782} y={127} size={17} tone="muted">Search</Text>
    <Text x={881} y={127} size={17}>Bag</Text>
    <Rule x1={60} x2={940} y={151} />
    <Panel x={525} y={176} width={416} height={373} soft radius={14} />
    <Text x={62} y={231} size={18} tone="muted" mono>Audio collection</Text>
    <Text x={62} y={294} size={47} weight={500}>Everyday</Text>
    <Text x={62} y={349} size={47} weight={500}>listening.</Text>
    <Text x={62} y={401} size={21} tone="muted">Over-ear headphones</Text>
    <Action x={62} y={444} width={245} label="Explore collection" />
    <Headphones />
    <Rule x1={60} x2={940} y={567} />
  </WindowFrame>
}

function DocviewerArtwork() {
  return <WindowFrame title="docviewer">
    <SideNav items={['Library', 'PDF tools', 'Images', 'Text editor']} active={3} />
    <Text x={252} y={141} size={29} weight={500}>Document workspace</Text>
    <Action x={779} y={112} width={155} label="Export file" />
    <Panel x={252} y={172} width={686} height={54} soft radius={8} />
    <Text x={273} y={206} size={18}>Text</Text>
    <path d="M332 186v25M561 186v25M755 186v25" stroke={INK} strokeOpacity={0.18} />
    <Text x={354} y={206} size={18} weight={600}>B</Text>
    <text x={397} y={206} fontFamily={DISPLAY} fontSize={19} fill={INK} fontStyle="italic">I</text>
    <Text x={442} y={206} size={18}>Paragraph</Text>
    <Text x={583} y={206} size={18}>Insert</Text>
    <Text x={776} y={206} size={18} tone="muted">View</Text>
    <Panel x={252} y={244} width={686} height={323} soft radius={8} />
    <Panel x={356} y={260} width={480} height={307} radius={3} />
    <Text x={392} y={317} size={30} weight={500}>Project notes</Text>
    <Text x={392} y={354} size={18} tone="muted">Implementation outline</Text>
    <g stroke={INK} strokeOpacity={0.2} strokeWidth={2} strokeLinecap="round">
      {[374, 398, 422, 446].map((y, index) => <path key={y} d={`M392 ${y}h${[398, 359, 382, 256][index]}`} />)}
    </g>
    <Text x={392} y={490} size={22} weight={500}>Next steps</Text>
    <g fill={INK} fillOpacity={0.16}>
      <rect x={392} y={510} width={170} height={5} rx={2} />
      <rect x={392} y={531} width={257} height={5} rx={2} />
    </g>
  </WindowFrame>
}

function HandOutline() {
  return <g transform="translate(33 88) scale(.94)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
    <path d="M198 470v-43c-30-19-52-51-68-81l-40-73c-12-23-8-42 9-46 16-4 29 11 40 27l35 54V140c0-23 10-34 25-34s26 12 26 34v122V86c0-23 12-36 27-36 16 0 28 14 28 36v172-142c0-22 11-36 26-36 17 0 28 14 28 36v160-107c0-22 11-36 25-36 16 0 27 14 27 36v147c0 40-11 77-38 104v50" strokeWidth={3} />
    <path d="M191 319c31-13 68-11 95 1M189 358c34 25 79 28 113 15M198 452h150M184 197h31M236 156h32M291 185h31M345 226h28" strokeWidth={1.5} strokeOpacity={0.28} />
    {[[198, 136], [252, 83], [306, 112], [359, 164], [108, 253]].map(([cx, cy]) => <g key={cx}>
      <circle cx={cx} cy={cy} r={10} fill={PAPER} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill={INK} stroke="none" />
    </g>)}
  </g>
}

function RehabilitationArtwork() {
  return <WindowFrame title="Hand rehabilitation">
    <Panel x={54} y={113} width={430} height={459} soft radius={14} />
    <HandOutline />
    <Text x={79} y={551} size={17} tone="muted" mono>Sensor placement concept</Text>
    <Text x={528} y={163} size={34} weight={500}>Movement feedback</Text>
    <Text x={528} y={199} size={18} tone="muted">Engineering prototype interface</Text>
    <Rule x1={528} x2={930} y={225} />
    <Text x={528} y={267} size={23} weight={500}>Finger movement</Text>
    <Text x={528} y={299} size={16} tone="muted" mono>Illustrative range</Text>
    <Panel x={528} y={325} width={400} height={30} radius={15} />
    <rect x={534} y={331} width={218} height={18} rx={9} fill={INK} />
    <circle cx={755} cy={340} r={16} fill={PAPER} stroke={INK} strokeWidth={2} />
    <Text x={528} y={410} size={23} weight={500}>Feedback control</Text>
    <Panel x={528} y={434} width={400} height={64} radius={10} />
    <Text x={550} y={473} size={20}>Calibrate sensors</Text>
    <Arrow x={886} y={451} />
    <Text x={528} y={549} size={17} tone="muted">Sensor → firmware → companion app</Text>
  </WindowFrame>
}

function SyllabusArtwork() {
  return <WindowFrame title="Syllabus AI">
    <Text x={60} y={146} size={34} weight={500}>Learning path</Text>
    <Action x={745} y={114} width={190} label="Add syllabus" />
    <g>
      <Panel x={60} y={184} width={872} height={94} soft />
      <FileMark x={87} y={211} size={32} />
      <Text x={135} y={221} size={23} weight={500}>Syllabus</Text>
      <Text x={135} y={250} size={17} tone="muted">Topics and learning goals</Text>
      <Arrow x={381} y={220} />
      <Text x={435} y={237} size={23}>Plan</Text>
      <Arrow x={558} y={220} />
      <Text x={612} y={237} size={23}>Practice</Text>
      <Arrow x={756} y={220} />
      <Text x={809} y={237} size={23}>Review</Text>
    </g>
    {[
      { x: 60, heading: 'Topics', cards: ['Core concepts', 'Key readings'] },
      { x: 360, heading: 'Practice', cards: ['Exercises', 'Project work'] },
      { x: 660, heading: 'Review', cards: ['Topic notes', 'Revision plan'] },
    ].map(column => <g key={column.heading}>
      <Text x={column.x + 4} y={325} size={22} weight={500}>{column.heading}</Text>
      <Rule x1={column.x} x2={column.x + 272} y={342} />
      {column.cards.map((card, index) => <g key={card}>
        <Panel x={column.x} y={362 + index * 105} width={272} height={88} />
        <Text x={column.x + 20} y={397 + index * 105} size={21}>{card}</Text>
        <path d={`M${column.x + 20} ${421 + index * 105}h92`} stroke={INK} strokeOpacity={0.2} strokeWidth={2} />
        <Arrow x={column.x + 231} y={407 + index * 105} />
      </g>)}
    </g>)}
  </WindowFrame>
}

function SkillternArtwork() {
  return <WindowFrame title="SkillTern">
    <Text x={60} y={145} size={34} weight={500}>Find an opportunity</Text>
    <Panel x={60} y={174} width={872} height={58} radius={29} />
    <g fill="none" stroke={INK} strokeWidth={1.8}>
      <circle cx={90} cy={201} r={8} />
      <path d="m96 207 7 7" />
    </g>
    <Text x={122} y={210} size={20} tone="muted">Search roles or skills</Text>
    <Text x={699} y={210} size={17}>Role</Text>
    <Text x={779} y={210} size={17}>Skills</Text>
    <Text x={852} y={210} size={17}>Location</Text>
    <Text x={60} y={277} size={22} weight={500}>Opportunities</Text>
    {['Software internship', 'Data internship', 'Web internship'].map((label, index) => <g key={label}>
      <Panel x={60} y={296 + index * 88} width={544} height={76} />
      <rect x={78} y={314 + index * 88} width={38} height={38} rx={9} fill={INK} />
      <path d={`M90 ${326 + index * 88}h14m-14 7h9m-9 7h14`} stroke={PAPER} strokeWidth={1.5} />
      <Text x={134} y={326 + index * 88} size={21}>{label}</Text>
      <Text x={134} y={353 + index * 88} size={16} tone="muted">Skills · eligibility · preferences</Text>
      <Arrow x={558} y={322 + index * 88} />
    </g>)}
    <Panel x={638} y={259} width={294} height={313} dark />
    <Text x={662} y={302} size={24} tone="paper" weight={500}>Your profile</Text>
    <Text x={662} y={340} size={17} tone="paper">Technical skills</Text>
    <rect x={661} y={361} width={112} height={39} rx={19} fill={PAPER} />
    <rect x={787} y={361} width={120} height={39} rx={19} fill={PAPER} />
    <Text x={682} y={386} size={18}>React</Text>
    <Text x={805} y={386} size={18}>Python</Text>
    <Rule x1={662} x2={908} y={429} dark />
    <Text x={662} y={466} size={20} tone="paper">Study year</Text>
    <Text x={662} y={505} size={20} tone="paper">Degree</Text>
    <path d="M889 453v13m-6-6h12M889 492v13m-6-6h12" stroke={PAPER} strokeWidth={1.5} />
    <Text x={662} y={550} size={16} tone="paper">Profile-based matching</Text>
  </WindowFrame>
}

const artworks: Record<ProjectVisual, () => ReactNode> = {
  mentora: MentoraArtwork,
  transport: TransportArtwork,
  goodfind: GoodFindArtwork,
  docviewer: DocviewerArtwork,
  rehabilitation: RehabilitationArtwork,
  syllabus: SyllabusArtwork,
  skilltern: SkillternArtwork,
}

/** Theme artwork is conceptual UI; actual product evidence stays in the case-study galleries. */
export function ProjectArtwork({ type }: { type: ProjectVisual }) {
  const Artwork = artworks[type]
  return <svg className="project-artwork" viewBox="0 0 1000 620" width={1000} height={620}
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" fontFamily={DISPLAY}>
    <Artwork />
  </svg>
}
