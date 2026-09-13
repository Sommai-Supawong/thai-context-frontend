# CODEX_FRONTEND_V2_TASK.md

## THAI CONTEXT — Frontend V2 Feature Completion

> ใช้ไฟล์นี้เป็น Task Brief สำหรับ Codex Sol  
> ให้อ่าน `design-v2.md` ที่ root ก่อนเริ่มงานทุกครั้ง

## 1) Source of Truth
- อ่าน `design-v2.md` ทั้งไฟล์ก่อนแก้โค้ด
- ถ้ามี `role-3-frontend-product.md` ให้ใช้อ้างอิงเฉพาะ product requirements, feature requirements, mock data, data shape และ demo flow
- ห้ามใช้ dark/navy dashboard style จาก role-3
- Visual / UX / Motion / Responsive ให้ยึด `design-v2.md` เป็นหลัก

## 2) Current Project State
ของเดิมที่ถือว่า Approved:
- Hero / หน้าแรก
- Search
- Search animation / 3D ที่มีอยู่
- Search Results เบื้องต้น
- Visual direction ปัจจุบัน

กฎ:
- DO NOT redesign Hero
- DO NOT rebuild project from scratch
- DO NOT replace 3D / Search flow ถ้าไม่จำเป็น
- DO NOT refactor ใหญ่เพียงเพื่อเปลี่ยน code style
- Preserve ของเดิมที่ทำงานดีแล้ว

เป้าหมาย:
> ตรวจของที่มีอยู่ แล้วสร้าง Feature ที่ยังขาดให้ครบตาม `design-v2.md`

## 3) Audit Before Implementation
ตรวจ:
- `package.json`
- `src/app`
- `src/components`
- `src/lib`
- hooks / stores / context
- mocks
- Search flow
- Result data shape
- Hero / 3D / animation
- responsive behavior

สร้าง checklist ภายใน:
- ✅ มีแล้ว
- 🛠 ต้องปรับ
- ❌ ยังไม่มี

จากนั้นลงมือ implement ต่อทันที ไม่ต้องหยุดรอ confirmation เว้นแต่เจอ blocker จริง

## 4) Features ที่ต้องสร้าง/ปรับให้ครบ

### 4.1 Parsed Intent / Query Understanding
รองรับ:
- raw_query
- detected_meaning
- context
- excluded_words

ตัวอย่าง:
```text
คุณกำลังมองหาคำที่สื่อถึง
“ทำงานได้ผลลัพธ์ดีโดยใช้ทรัพยากรอย่างคุ้มค่า”

บริบท: การทำงาน / ทางการ
ไม่รวม: เก่ง
```

UI:
- Soft Rounded
- Thai-first
- ไม่ใหญ่จนแย่ง Results
- subtle fade + translateY
- responsive

### 4.2 Smart Filters
เพิ่ม filter เช่น:
- ระดับภาษา
- บริบท
- ทางการ / ไม่เป็นทางการ
- งานเขียน
- งานวิชาการ
- ธุรกิจ
- คำที่ไม่ต้องการใช้

Style:
- Soft Rounded controls
- Liquid Glass เฉพาะ floating/filter tray ถ้าเหมาะสม
- ห้ามทำเหมือน dashboard filter bar

### 4.3 Search Result System
ใช้ Result UI ปัจจุบันเป็นฐาน

ต้องรองรับ:
```text
0 result
1 result
2 results
3+ results
```

Desktop:
```text
1 result  → centered prominent card
2 results → 2 columns
3 results → balanced responsive layout
4+        → responsive grid/list hybrid
```

Tablet: 1–2 columns  
Mobile: 1 column

Result Card แสดง:
- headword
- part of speech
- % match
- definition
- reason / ai_explanation
- register
- context
- evidence action

ห้าม assume ว่ามี 2 results เสมอ

### 4.4 Persistent Bottom Search Composer
เมื่อ user ออกจาก Hero ให้แสดง floating Search Composer ด้านล่างกลางจอ

Behavior:
```text
Hero Search
→ ใช้ cinematic / 3D transition เดิมได้

Bottom Composer Search
→ MUST NOT replay Hero cinematic
→ inline loading
→ fetch/mock
→ old results fade
→ update results
→ new results crossfade/stagger
→ preserve scroll position
```

Desktop max-width ≈ 760px  
Mobile margin 12–16px + safe-area

Visual:
- Soft Rounded
- Soft Liquid Glass
- warm neutral
- soft shadow
- ห้าม copy ChatGPT UI ตรง ๆ

### 4.5 Morphing Navbar
Hero State:
- full width
- transparent / almost transparent
- editorial
- ไม่เด่นกว่า Hero

Scrolled State:
- fixed top center
- width ≈ `min(92vw, 1120px)`
- top offset เล็กน้อย
- rounded rectangle
- Soft Liquid Glass
- soft shadow

Morph:
- width
- position
- radius
- background alpha
- shadow

Duration: 420–650ms

ต้อง:
- ไม่ flicker
- ไม่ jump
- responsive
- mobile menu ใช้งานได้จริง

### 4.6 Context Comparator
สร้าง `ContextComparator`

เป้าหมาย:
> ให้ผู้ใช้เข้าใจความต่างของคำ 2 คำได้ภายในไม่กี่วินาที

แสดง:
- ความหมาย
- เน้นอะไร
- บริบท
- ระดับภาษา
- ใช้เมื่อไร
- ตัวอย่าง
- จุดที่มักสับสน
- source shortcut ถ้ามี

Desktop: Side-by-Side Dual Soft Cards  
Mobile: Stack Vertical

Interaction:
- เลือกคำจาก Result Card เพื่อ compare ถ้าเหมาะสม
- เปลี่ยนคำได้
- highlight จุดต่าง
- crossfade / horizontal shift เล็กน้อย

### 4.7 Word Evolution Explorer
Section:
> **วิวัฒนาการคำศัพท์ตามยุคสมัย**

รองรับ:
```text
พ.ศ. ๒๕๔๒
พ.ศ. ๒๕๕๔
พ.ศ. ๒๕๖๙
```

States:
```text
NOT_FOUND
ADDED
MODIFIED
```

Interaction:
```text
click year
→ old content fade + shift left
→ indicator moves
→ new content fade + shift from right
```

Desktop: wide timeline / feature card  
Mobile: horizontal era tabs + definition below

### 4.8 Dialect Explorer
Section:
> **สำรวจคลังคำภาษาถิ่น 4 ภาค**

ต้องมี:
```text
เหนือ
อีสาน
กลาง
ใต้
```

แต่ละ card ต้องมี provenance:
```text
Official
AI Inferred
```

Interaction:
- hover/click reveal source
- selected region scale 1.01–1.02
- non-selected opacity ลดเล็กน้อย

Responsive:
```text
Desktop → 4 cards
Tablet  → 2×2
Mobile  → 2×2 หรือ horizontal responsive cards
```

### 4.9 Grounded Evidence Drawer
Desktop: Right Drawer  
Mobile: Bottom Sheet 85–92svh

แสดง:
- source_book
- edition
- edition_year
- page_number
- quote
- Official Verified

AI explanation และ Official evidence ต้อง visually แยกออกจากกัน

### 4.10 Safe Abstention
เมื่อไม่มี evidence ที่เชื่อถือได้:
```text
ระบบยังไม่พบข้อมูลที่ได้รับการรับรองเพียงพอ
จึงไม่สร้างคำตอบขึ้นมาเอง
```

### 4.11 Fail-Safe Mock / Real API
รองรับ:
```text
Real API
↓ fail
Mock Data fallback
```

Environment:
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_USE_MOCK=
```

ถ้า API fail:
- UI ห้าม crash
- demo ต้องเดินต่อได้
- ไม่แสดง technical stack trace ต่อ user
- fallback ไป Mock ได้

ห้าม hardcode Mock Data กระจายใน components

### 4.12 Loading / Empty / Error States
Loading:
```text
กำลังค้นหาคำที่ใกล้กับสิ่งที่คุณกำลังคิด…
```

Empty:
```text
ยังไม่พบคำที่ตรงพอ

ลองเล่าบริบทเพิ่มอีกนิด เช่น
ใช้ในงานเขียน การพูด หรือสถานการณ์แบบใด
```

Actions:
```text
+ เพิ่มบริบท
+ เลือกระดับภาษา
+ ระบุคำที่ไม่ต้องการใช้
```

Error:
ใช้ข้อความภาษาไทยที่เข้าใจง่าย ไม่แสดง technical error เป็น UI หลัก

## 5) Motion Rules
ยึด `design-v2.md`

```text
Hover            160–280ms
UI Morph         350–650ms
Section Reveal   420–650ms
```

Result Reveal:
```text
Section Heading
→ Parsed Intent
→ Result Cards stagger 60–80ms
```

ห้าม:
- excessive bounce
- strong elastic
- random motion
- scroll-jacking
- animation ที่รบกวนการอ่าน

## 6) App State
ถ้ายังไม่มี state architecture ที่ชัดเจน ให้ใช้:

```ts
type AppExperienceState =
  | 'hero-idle'
  | 'hero-search-submitting'
  | 'hero-cinematic-transition'
  | 'results-active'
  | 'results-searching'
  | 'evidence-open';
```

กฎ:
```text
results-searching
MUST NOT trigger Hero cinematic
```

## 7) Component Architecture
ใช้ architecture จาก `design-v2.md` เป็นแนวทาง แต่ห้าม restructure ทั้ง project ถ้าโครงเดิมดีอยู่แล้ว

```text
src/components/
  layout/
    MorphingNavbar.tsx
  hero/
    HeroSection.tsx
    Hero3DScene.tsx
    HeroSearch.tsx
    PopularSuggestions.tsx
  search/
    ParsedIntent.tsx
    SmartFilters.tsx
    SearchResults.tsx
    WordResultCard.tsx
    PersistentSearchComposer.tsx
  compare/
    ContextComparator.tsx
  evolution/
    EvolutionExplorer.tsx
  dialect/
    DialectExplorer.tsx
    DialectCard.tsx
  evidence/
    GroundedEvidenceDrawer.tsx
  motion/
    HeroSearchTransition.tsx
    SectionReveal.tsx
    ScrollExperience.tsx
  ui/
    GlassSurface.tsx
    SoftCard.tsx
    SoftButton.tsx
    Tag.tsx
    SectionHeading.tsx

src/lib/
  api-client.ts
  motion.ts
  experience-state.ts

src/mocks/
  thai-context-mock.json
```

Reuse existing components ก่อน

## 8) Design Rules
Primary Language: ภาษาไทย

Style:
- Modern Thai Editorial
- Soft Rounded UI
- selective Soft Liquid Glass
- Warm Neutral
- Living Book
- Calm Technology

ห้าม:
- dark dashboard
- AI SaaS
- purple/blue AI gradient
- neon
- heavy glassmorphism
- bento grid เต็มหน้า
- chat bubble response UI
- random 3D objects

ของเดิมที่ทำงานดีแล้วถือว่า Approved โดยเฉพาะ:
- Hero visual
- 3D
- Search
- Search animation
- Result presentation

ถ้าจำเป็นต้องแก้เพื่อ integrate ให้แก้ให้น้อยที่สุด

## 9) Data Strategy
ถ้า Backend feature ใดยังไม่มี endpoint:

> DO NOT block frontend development

สร้าง:
- typed mock data
- adapter/service boundary

เพื่อให้ภายหลังเปลี่ยน:
```text
mock
→ real API
```
โดยไม่ rewrite UI

## 10) Implementation Order
```text
01 Audit current project
02 Preserve approved existing features
03 Parsed Intent
04 Smart Filters
05 Result responsiveness / states
06 Persistent Bottom Composer
07 Morphing Navbar
08 Result motion
09 Context Comparator
10 Evolution Explorer
11 Dialect Explorer
12 Evidence Drawer
13 Safe Abstention
14 Mock / Real API fail-safe
15 Loading / Empty / Error
16 Responsive pass
17 Accessibility pass
18 Performance / cleanup
```

## 11) Responsive QA
ตรวจอย่างน้อย:
```text
375px
430px
768px
1024px
1280px
1440px+
```

ต้องไม่มี:
- horizontal overflow
- card ถูกบีบจนอ่านไม่ได้
- navbar หลุดจอ
- floating composer บัง content สำคัญ

## 12) Accessibility
รองรับ:
- prefers-reduced-motion
- keyboard navigation
- visible focus
- semantic HTML
- aria-label
- touch target >= 44px
- Esc close drawer
- focus trap ใน drawer/modal
- screen reader loading/result updates

ถ้ามี cinematic white flash reduced-motion ต้อง skip ได้

## 13) Final Validation
หลัง implement:

1. Run lint
2. Run TypeScript check
3. Run tests ที่มี
4. Run production build
5. Run application
6. ตรวจ browser console
7. แก้ hydration errors
8. แก้ runtime errors
9. แก้ horizontal overflow
10. ตรวจ responsive

ทดสอบ:
- search 1 result
- search 2 results
- search 4+ results
- no result
- search ซ้ำจาก bottom composer
- comparator
- switch Evolution era
- select Dialect region
- open Evidence
- missing Evidence → Safe Abstention
- API failure → Mock fallback
- mobile layout

## 14) Final Deliverables
เมื่อเสร็จให้สรุป:
1. เพิ่ม feature อะไร
2. แก้ไฟล์อะไร
3. สร้างไฟล์อะไรใหม่
4. dependency เพิ่มอะไร
5. ส่วนไหนใช้ mock
6. ส่วนไหนพร้อมต่อ Backend จริง
7. TODO ที่ยังเหลือ
8. run/build/test commands

และสร้างไฟล์ที่ root:

```text
FRONTEND_V2_STATUS.md
```

ให้มี:
- implemented features
- component map
- data contracts
- mock data
- API integration points
- environment variables
- remaining TODO
- known limitations

## 15) Execution Rule
อย่าจบแค่เสนอแผน

> **ให้ลงมือ implement + run + test + fix จริงใน project นี้**

ถ้าของเดิมทำงานดีอยู่แล้ว: รักษาไว้  
ถ้าฟีเจอร์ยังไม่มี: สร้างให้ครบตาม `design-v2.md`
