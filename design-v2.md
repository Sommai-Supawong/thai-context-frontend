# THAI CONTEXT — DESIGN V2

> **Version:** Frontend UX/UI & Interaction Specification V2  
> **Design Direction:** Living Editorial Book × Soft Rounded UI × Soft Liquid Glass × Cinematic 3D  
> **Primary Language:** ภาษาไทย  
> **Core Concept:** จาก “ค้นคำ” สู่ “เข้าใจภาษา”  
> **Tagline:** “ไม่ต้องรู้คำ ก็รู้ว่าควรใช้คำไหน”  
> **Primary Goal:** ทำให้การค้นหาคำด้วยความหมายเป็นประสบการณ์หลัก และใช้ 3D / Motion เพื่อช่วยเล่าเรื่อง ไม่ใช่แย่งความสนใจจากเนื้อหา

---

# 0. V2 Product Direction

DESIGN V2 ยังคง DNA จาก V1 คือ Modern Thai Editorial, Living Book, Thai-first Typography และ Soft 3D Storytelling แต่ปรับภาษาของ UI ให้ร่วมสมัยและเป็น Digital Product มากขึ้นด้วย:

- Soft Rounded UI
- Soft Liquid Glass เฉพาะจุดสำคัญ
- Smooth state transition
- Full-screen cinematic Hero
- Floating / morphing Navbar
- Persistent Search Composer หลังออกจาก Hero
- Modern result cards ที่ responsive และรองรับผลลัพธ์หลายรายการ
- Scroll-driven flow ที่รู้สึกต่อเนื่องเหมือน “เข้าไปในโลกของคำ”

V2 ต้องไม่กลายเป็น AI SaaS หรือ Dashboard แม้จะมี Search Composer ที่ได้แรงบันดาลใจจากประสบการณ์แบบ conversational product

> **North Star:** เว็บต้องรู้สึกเหมือน “พื้นที่สำรวจภาษาไทยที่มีชีวิต” ไม่ใช่ “Chatbot ที่ถูกตกแต่งให้เหมือนหนังสือ”

---

# 1. Product Structure ที่ต้องมี

อิงโครงสร้าง Frontend Product หลัก หน้า Home / Master Experience ต้องรองรับโมดูลต่อไปนี้:

1. **Hero Meaning-first Search**
   - ช่องค้นหาความหมาย
   - Popular Suggestions
   - Intent Parsing / ระบบเข้าใจความต้องการ
   - Smart Filters

2. **Candidate Recommendation Results**
   - ผลลัพธ์ได้ตั้งแต่ 1 รายการขึ้นไป
   - % Match
   - ความหมาย
   - เหตุผลที่แนะนำ
   - ระดับภาษา / บริบท
   - ปุ่มดูหลักฐานอ้างอิง

3. **Context Comparator**
   - เปรียบเทียบคำแบบ Side-by-Side
   - ตัวอย่างเช่น “อนุมัติ” vs “เห็นชอบ”
   - ต้องอ่านความต่างได้ในไม่กี่วินาที

4. **วิวัฒนาการคำศัพท์ตามยุคสมัย**
   - 3-Era Evolution
   - พ.ศ. ๒๕๔๒ → ๒๕๕๔ → ๒๕๖๙
   - Diff / Added / Modified / Not Found state

5. **สำรวจคลังคำภาษาถิ่น 4 ภาค**
   - เหนือ
   - อีสาน
   - กลาง
   - ใต้
   - แยกสถานะ Official / AI Inferred อย่างชัดเจน

6. **Grounded Evidence / Source Drawer**
   - ชื่อแหล่งข้อมูล
   - ฉบับ / ปี
   - เลขหน้า
   - ข้อความอ้างอิง
   - Official Verified
   - Safe Abstention เมื่อไม่มีหลักฐานเพียงพอ

7. **Fail-Safe Mock Layer**
   - ใช้ Mock Data ได้
   - เชื่อม Real API ได้
   - ถ้า Backend มีปัญหา ต้อง fallback โดยไม่ทำให้ Demo สะดุด

> **หมายเหตุ:** Style เดิมจาก role-3 ไม่ต้องนำมาใช้ ให้ใช้เฉพาะโครงสร้าง Product / Data / Feature requirement จากไฟล์นั้น

---

# 2. V2 Visual DNA

## 2.1 Style Formula

```text
35% Modern Thai Editorial
20% Soft Rounded Product UI
15% Living Book / Contemporary Publishing
10% Soft Liquid Glass
10% Cinematic 3D
5% Organic Human Detail
5% Modern Conversational Interaction
```

คำสำคัญสำหรับ Designer / Codex:

```text
Modern Thai Editorial
Soft Rounded UI
Soft Liquid Glass
Warm Neutral Interface
Living Book
Cinematic 3D Book
Thai-first Typography
Calm Technology
Editorial Product UI
Human-designed Interface
Soft Depth
Natural Light
Smooth Motion
Contextual Search
```

---

# 3. Visual Principle

## 3.1 Soft Rounded, not Bubble UI

V2 เพิ่มความโค้งมนจาก V1 แต่ต้องไม่ทำทุกอย่างเป็น capsule หรือ bubble

แนะนำ:

```text
Small control       12–16px
Button              16–20px
Input               24–30px
Search Composer     28–34px
Card                24–30px
Feature Card        28–36px
Floating Navbar     22–28px
Drawer / Modal      28–34px
Pill / Tag          999px เฉพาะ tag/status/filter เท่านั้น
```

เป้าหมายคือ “นุ่มและร่วมสมัย” ไม่ใช่ “กลมทุกอย่างจนไม่มี hierarchy”

---

## 3.2 Liquid Glass ใช้เฉพาะ Layer ที่ควรลอย

Liquid Glass ใช้กับ:

- Navbar ตอน Scroll
- Persistent Search Composer
- Small floating controls
- Evidence quick action
- Optional filter tray

ไม่ใช้ Liquid Glass กับทุก Result Card

ตัวอย่าง Glass Token:

```css
.glass-surface {
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(22px) saturate(135%);
  -webkit-backdrop-filter: blur(22px) saturate(135%);
  box-shadow:
    0 14px 42px rgba(31, 28, 31, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.62);
}
```

Glass ต้อง:

- ใสพอให้เห็น Background เพียงเล็กน้อย
- ไม่มี neon glow
- ไม่มี rainbow refraction หนัก
- ไม่มีเส้นขอบสว่างจัด
- อ่านภาษาไทยได้ชัดเจน

---

# 4. Color System V2

รักษา Brand Palette เดิม แต่ปรับ surface ให้เหมาะกับ Soft Rounded / Glass

```css
:root {
  --bg: #E8E8E8;
  --bg-warm: #EEEAE4;
  --bg-soft: #F3F1ED;

  --surface: #FFFFFF;
  --surface-warm: #FAF8F4;
  --surface-glass: rgba(255,255,255,.54);

  --text-primary: #1F1C1F;
  --text-secondary: #5E5A5E;
  --text-muted: #8B878B;

  --accent-burgundy: #8B3A42;
  --accent-burgundy-soft: #B46D74;

  --accent-green: #3F5147;
  --accent-sage: #AAB4A3;

  --border-soft: rgba(31,28,31,.07);
  --border-glass: rgba(255,255,255,.58);

  --shadow-soft: 0 12px 38px rgba(31,28,31,.07);
  --shadow-lift: 0 20px 54px rgba(31,28,31,.10);
}
```

กฎ:

- หลีกเลี่ยง gradient หลักแบบ AI SaaS
- แสงจาก 3D Hero ใช้ warm white / daylight
- Burgundy เป็น CTA / Selected / Focus Accent
- Green ใช้กับ Verified / Positive semantic state
- Yellow/Gold ใช้ได้เล็กน้อยสำหรับ Historical / Changed state แต่ไม่เป็น Theme หลัก

---

# 5. Typography V2

## Primary Thai

```text
LINE Seed Sans TH
```

Fallback:

```text
IBM Plex Sans Thai
Noto Sans Thai
Sarabun
```

Serif Accent ใช้เฉพาะ:

- THAI CONTEXT wordmark
- Hero editorial quote
- 3D book cover
- Decorative word

Body และ functional UI ใช้ Sans Thai เป็นหลัก

Desktop hierarchy:

```text
Hero Display       clamp(48px, 5vw, 76px)
Hero Support       18–22px
Section Title      30–44px
Card Word Title    28–38px
Body               16–18px
Meta               13–14px
Label              12–13px
```

---

# 6. Master Page Flow

```text
[ HERO / SEARCH / 3D WORLD ]
          ↓
  cinematic search transition
          ↓
[ SEARCH RESULTS ]
          ↓
[ CONTEXT COMPARATOR ]
          ↓
[ WORD EVOLUTION ]
          ↓
[ DIALECT EXPLORER ]
          ↓
[ TRUST / EVIDENCE ]
          ↓
[ FOOTER / FINAL DISCOVERY ]
```

หลังผู้ใช้ออกจาก Hero:

```text
Floating Glass Navbar     → อยู่ด้านบน
Persistent Search Composer → อยู่กึ่งกลางด้านล่าง
Main Content               → scroll อยู่ด้านหลัง
```

---

# 7. Hero — Full Screen Meaning-first Search

## 7.1 Hero Size

```css
min-height: 100svh;
```

Hero ต้องกินพื้นที่เต็มหน้าจอแรก

องค์ประกอบหลัก:

1. Navbar
2. 3D Living Book Background / Scene
3. Main Heading
4. Supporting Copy
5. Main Search
6. Popular Suggestions
7. subtle scroll cue

---

## 7.2 Hero Copy

Main Heading:

> **วันนี้คุณอยากสื่ออะไร?**

Supporting:

> เล่าความหมายที่คุณกำลังคิด แม้ยังไม่รู้ว่าคำนั้นเรียกว่าอะไร

Search Placeholder:

> เช่น อยากได้คำที่หมายถึง “ทำงานได้ผลดีโดยใช้ทรัพยากรน้อย”

CTA:

> **ค้นหาคำที่ใช่**

---

# 8. Hero 3D Background Contract

3D Scene จะถูกสร้างแยกจาก Frontend workflow จึงต้องออกแบบ Component ให้เปลี่ยน asset ได้โดยไม่ผูกกับ implementation เดียว

Component แนะนำ:

```text
Hero3DScene
```

State:

```ts
type Hero3DState =
  | 'idle'
  | 'focus'
  | 'opening'
  | 'zooming'
  | 'flash'
  | 'completed';
```

Props concept:

```ts
<Hero3DScene
  state={hero3DState}
  reducedMotion={reducedMotion}
  onTransitionComplete={...}
/>
```

รองรับ asset strategy:

1. React Three Fiber / GLB
2. Spline / WebGL embed ถ้าจำเป็น
3. Video / Image sequence fallback
4. Static image fallback บน low-power / reduced-motion

Frontend ห้ามผูก Search Logic เข้ากับ 3D engine โดยตรง

---

# 9. Hero Search Interaction

Main Search เป็น Soft Rounded White / Glass Hybrid

```text
╭──────────────────────────────────────────────╮
│  ⌕  เล่าสิ่งที่คุณอยากสื่อ...     [ค้นหา →] │
╰──────────────────────────────────────────────╯
```

Style:

```css
.hero-search {
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 30px;
  backdrop-filter: blur(18px);
  box-shadow: 0 16px 48px rgba(31,28,31,.10);
}
```

Focus:

```text
surface lift 2px
shadow soft increase
border contrast +5–8%
no glow
```

Popular Suggestions แสดงด้านล่าง เช่น:

```text
เขียนรายงาน
หาคำทางการ
คำที่สุภาพกว่า
งานวิชาการ
เปรียบเทียบคำใกล้เคียง
```

Suggestion เป็น Soft Rounded Tag / Index Bubble ที่บางและสงบ

---

# 10. Signature Search Transition — Search จาก Hero เท่านั้น

เมื่อกดค้นหาจาก Hero ให้เล่น Cinematic Sequence

## Sequence

```text
T+0ms
Search accepted
button → loading state

T+120ms
Hero copy / suggestion ลด opacity เล็กน้อย

T+200ms
3D book responds
ambient motion หยุด / settle

T+320ms
book begins opening

T+650ms
camera starts zoom toward opened pages

T+900ms
white light blooms from center / pages

T+1150ms
screen reaches near-white

T+1250ms
results section mount + data prepared

T+1350ms
scroll / camera transitions to Results anchor

T+1550ms
white overlay fades out

T+1700ms
result cards stagger reveal
floating navbar morph complete
persistent bottom search slides up
```

Target duration:

```text
1.4–1.8 seconds
```

ไม่ควรเกิน 2 วินาทีใน normal flow

หาก API ยังโหลดไม่เสร็จ:

- Result area ใช้ skeleton / semantic loading
- ไม่ hold white flash ไว้นาน

`prefers-reduced-motion`:

```text
skip book open + zoom + flash
fade hero → results 220–320ms
```

---

# 11. Scroll Behavior / Section Movement

Hero และ Results เป็นสอง “Chapter” หลัก

เมื่อผู้ใช้ scroll ออกจาก Hero ครั้งแรก:

- Hero ค่อย ๆ ลด scale / opacity เล็กน้อย
- Navbar morph จาก Topbar → Floating Glass Navbar
- Results section เคลื่อนขึ้นอย่างนุ่มนวล
- Optional ใช้ soft scroll snap เฉพาะ Hero → Results

ไม่ใช้ hard snap ทุก section เพราะจะขัดการอ่านข้อมูลยาว

แนะนำ:

```css
scroll-behavior: smooth;
```

ถ้าใช้ Lenis / GSAP ให้ใช้เพื่อ smoothing และ sequence orchestration เท่านั้น

---

# 12. Navbar V2 — Morphing Floating Glass Navbar

## State A — Hero

Navbar อยู่ด้านบนแบบ full-width editorial topbar

คุณสมบัติ:

- transparent / almost transparent
- height 72–84px
- logo ซ้าย
- nav menu กลาง/ขวา
- minimal border
- ไม่ลอยเด่นกว่า Hero

## State B — Scrolled

เมื่อ scroll > Hero threshold:

Navbar:

- fixed top center
- ลดความกว้าง
- ขยับลงจากขอบบนเล็กน้อย
- กลายเป็นสี่เหลี่ยมโค้งมน
- Soft Liquid Glass
- shadow นุ่ม

ตัวอย่าง:

```css
.floating-nav {
  width: min(92vw, 1120px);
  border-radius: 26px;
  background: rgba(255,255,255,.52);
  border: 1px solid rgba(255,255,255,.58);
  backdrop-filter: blur(22px) saturate(135%);
  box-shadow: 0 14px 42px rgba(31,28,31,.08);
}
```

Morph Animation:

```text
width: 100% → min(92vw,1120px)
translateY: 0 → 14px
radius: 0/12px → 26px
background alpha: 0 → .52
shadow: 0 → soft
```

Duration:

```text
420–650ms
```

Ease:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

Navbar ต้องไม่กระโดดตำแหน่งตอน breakpoint เปลี่ยน

---

# 13. Search Results Chapter

ผลลัพธ์ต้องไม่จำลองหน้าหนังสือแบบ literal อีกต่อไป

V2 ใช้:

> **Modern Soft Rounded Semantic Cards**

แต่ยังมีรายละเอียด Editorial เช่นเลขลำดับ, underline, reference, source marker ได้

Section Header:

> **คำที่ใกล้กับสิ่งที่คุณกำลังคิด**

Supporting UI:

- Query summary
- Parsed Intent
- Context
- Excluded words
- Smart Filter

ตัวอย่าง:

```text
คุณกำลังมองหาคำที่สื่อถึง
“ทำงานได้ผลลัพธ์ดีโดยใช้ทรัพยากรอย่างคุ้มค่า”

บริบท: การทำงาน / ทางการ
ไม่รวม: เก่ง
```

Intent block ไม่ควรใหญ่จนแย่ง Result

---

# 14. Result Card V2

Card ต้องรองรับ 1–N results

Desktop:

```text
1 result  → max-width 760–880px / prominent card
2 results → 2 columns
3 results → 3 columns ถ้าเนื้อหาสั้น หรือ 2 + 1 balanced layout
4+        → responsive auto-fit grid / list hybrid
```

Tablet:

```text
1–2 columns
```

Mobile:

```text
1 column
```

Card Anatomy:

```text
01                                      94% ตรงกับความหมาย

สัมฤทธิผล                         [น.]

ผลที่สำเร็จตามความประสงค์อย่างสมบูรณ์

เหตุผลที่แนะนำ
คำนี้เน้นถึงผลสำเร็จของงาน...

ทางการ   งานองค์กร   พจนานุกรม ๒๕๕๔

[ดูบริบท]        [ตรวจสอบหลักฐาน ↗]
```

Card style:

```css
.result-card {
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(31,28,31,.065);
  border-radius: 28px;
  box-shadow: 0 14px 40px rgba(31,28,31,.065);
}
```

Hover Desktop:

```text
translateY(-4px)
shadow increase
primary action appears clearer
```

ไม่ใช้ 3D tilt กับ result card เพราะเนื้อหาต้องอ่านง่าย

---

# 15. Result Reveal Motion

หลัง Hero transition:

```text
Section title    fade + y 16
Intent summary   fade + y 16
Card 01          fade + y 24
Card 02          fade + y 24 delay +70ms
Card 03          fade + y 24 delay +140ms
```

Duration:

```text
420–560ms
```

หากค้นหาซ้ำจาก Bottom Composer:

- ห้ามเล่น Hero 3D
- old cards opacity .55 + slight y
- loading state ใน composer
- new result cards crossfade / stagger
- รักษา scroll position

---

# 16. Persistent Bottom Search Composer

เมื่อผู้ใช้ออกจาก Hero ให้ Search Composer เลื่อนขึ้นจากด้านล่าง

แรงบันดาลใจด้าน UX:

- conversational composer
- centered floating search
- ง่ายต่อการค้นซ้ำ

แต่ visual ต้องเป็น THAI CONTEXT ไม่ copy UI ของ ChatGPT ตรง ๆ

ตำแหน่ง Desktop:

```text
fixed
bottom: 22–30px
left: 50%
transform: translateX(-50%)
width: min(760px, calc(100vw - 48px))
```

UI:

```text
╭─────────────────────────────────────────────╮
│  เล่าความหมายอื่นที่คุณกำลังคิด...      ↑ │
╰─────────────────────────────────────────────╯
```

Style:

```css
.bottom-composer {
  background: rgba(255,255,255,.58);
  border: 1px solid rgba(255,255,255,.62);
  backdrop-filter: blur(24px) saturate(140%);
  border-radius: 30px;
  box-shadow:
    0 18px 50px rgba(31,28,31,.12),
    inset 0 1px 0 rgba(255,255,255,.72);
}
```

Entrance:

```text
translateY(40px) + opacity 0
→ translateY(0) + opacity 1
500ms ease-out
```

Search จาก Composer:

```text
Submit
→ inline loading
→ fetch
→ update results
→ result crossfade
```

**ไม่ trigger 3D book animation**

ถ้าผู้ใช้กลับขึ้นไปค้นใน Hero แล้ว submit ใหม่ จึงเล่น 3D transition อีกครั้ง

---

# 17. Context Comparator

Role requirement ต้องมี Side-by-Side Comparison

V2 Visual:

- ไม่ต้องทำเป็น open book literal
- ใช้ Dual Soft Cards อยู่ภายใน shared comparison surface
- center divider บาง
- มี “VS” หรือ Difference Marker เล็ก ๆ

Desktop:

```text
╭────────────────────────────────────────────────────╮
│  เปรียบเทียบคำ                                     │
│                                                    │
│  อนุมัติ                  VS         เห็นชอบ       │
│  ─────────                           ─────────      │
│  ความหมาย                            ความหมาย       │
│  บริบท                              บริบท          │
│  ระดับภาษา                          ระดับภาษา       │
│  ใช้เมื่อ                            ใช้เมื่อ         │
│                                                    │
╰────────────────────────────────────────────────────╯
```

Mobile:

```text
stack vertical
Word A
↓ difference summary
Word B
```

Interaction:

- เลือกคำจาก Result Card เพื่อ add to compare
- เปลี่ยนคำใน dropdown / search mini field
- highlight row ที่แตกต่างที่สุด
- motion ใช้ crossfade + horizontal shift 12–20px

---

# 18. วิวัฒนาการคำศัพท์ตามยุคสมัย

Section นี้ต้องเป็น Feature Card ที่คุม Theme และ “กดเปลี่ยนยุคได้”

Heading:

> **วิวัฒนาการคำศัพท์ตามยุคสมัย**

Concept:

> ภาษาเปลี่ยนไปพร้อมกับสังคม — ลองดูว่าคำหนึ่งเดินทางผ่านแต่ละยุคอย่างไร

Desktop layout:

```text
Left: Word / summary
Right: Interactive Era Card / Timeline
```

หรือ full-width card:

```text
[ ๒๕๔๒ ] —— [ ๒๕๕๔ ] —— [ ๒๕๖๙ ]
                  ↓
         Active definition card
```

States:

```text
NOT_FOUND  → neutral gray
ADDED      → muted green
MODIFIED   → warm muted gold / burgundy accent
```

Interaction:

กดปี:

```text
old definition:
opacity 1 → 0
x 0 → -16

new definition:
opacity 0 → 1
x +18 → 0
```

Timeline indicator เลื่อนตาม selection แบบ spring-soft

ไม่ใช้ carousel snap แรง

Mobile:

- horizontal era tabs scrollable
- definition อยู่ด้านล่าง
- touch target ≥ 44px

---

# 19. สำรวจคลังคำภาษาถิ่น 4 ภาค

Heading:

> **สำรวจคลังคำภาษาถิ่น 4 ภาค**

Goal:

ทำให้ผู้ใช้รู้สึกว่า “ภาษาไทยมีหลายเสียงและหลายบริบท”

V2 ไม่จำเป็นต้องใช้แผนที่เป็น UI หลัก ถ้าแผนที่ทำให้พื้นที่แน่นเกินไป

แนะนำ Desktop:

```text
                [ คำมาตรฐาน: คิดถึง ]

[เหนือ]        [อีสาน]        [กลาง]        [ใต้]
 กึ๊ดฮอด        คึดฮอด          คิดถึง        ...
 Official       Official        Official      AI Inferred
```

Card แต่ละภาค:

- Soft Rounded
- background แตกต่างเล็กน้อยด้วย neutral tint
- hover → lift + reveal source
- click → card expand หรือ drawer

Official badge:

```text
✓ แหล่งข้อมูลทางการ
```

AI Inferred badge:

```text
◌ AI ช่วยอนุมาน — ควรตรวจสอบบริบท
```

ห้ามใช้ badge สีฉูดฉาด

Motion:

- selecting a region shifts focus smoothly
- non-selected cards opacity .72–.84
- selected card scale 1.01–1.02

Mobile:

- 2 × 2 grid หรือ horizontal snap cards
- อย่าบีบ 4 column

---

# 20. Grounded Evidence Drawer

Evidence เป็นส่วนสำคัญด้าน Trust

V2 Style:

- Right Drawer Desktop
- Bottom Sheet Mobile
- Soft Rounded edge
- Light / glass header
- content surface เป็น solid white เพื่ออ่านหลักฐานง่าย

Structure:

```text
หลักฐานอ้างอิง

พจนานุกรม ฉบับ...
พ.ศ. ๒๕๕๔
หน้า 1208

“ข้อความต้นฉบับ...”

[✓ Official Verified]
```

Safe Abstention:

> ระบบยังไม่พบข้อมูลที่ได้รับการรับรองเพียงพอ จึงไม่สร้างคำตอบขึ้นมาเอง

AI explanation ต้อง visually แยกจาก official evidence เสมอ

---

# 21. Background & Depth System V2

Hero:

- ใช้ 3D Scene เป็น Background / Main Visual
- ambient Thai typography ได้ แต่ opacity ต่ำ
- soft daylight
- depth จาก foreground / book / background

Results and other sections:

- Background สงบกว่า Hero
- ใช้ #E8E8E8 / warm neutral
- subtle radial light ได้แต่ห้ามเป็น gradient AI
- occasional oversized Thai word 2–4% opacity
- ไม่ใส่ 3D object ทุก section

Visual depth hierarchy:

```text
Layer 0  Base neutral background
Layer 1  Ambient typography / subtle editorial texture
Layer 2  Section content cards
Layer 3  Floating Navbar
Layer 4  Persistent Search Composer
Layer 5  Drawer / Modal
```

---

# 22. Motion System V2

Core motion token:

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-cinematic: cubic-bezier(0.65, 0, 0.35, 1);

  --motion-fast: 160ms;
  --motion-ui: 280ms;
  --motion-soft: 480ms;
  --motion-section: 650ms;
  --motion-cinematic: 1500ms;
}
```

Rules:

- Hover: 160–280ms
- UI morph: 350–650ms
- Section reveal: 420–650ms
- Hero cinematic: 1.4–1.8s
- Ambient 3D: 5–9s

ห้าม:

- bounce เยอะ
- elastic overshoot แรง
- random floating
- scroll-jacking
- motion ที่ทำให้ text อ่านยาก

---

# 23. Interaction State Machine

แนะนำให้กำหนด state ชัดเจนเพื่อลด bug ระหว่าง Scroll / Search / 3D

```ts
type AppExperienceState =
  | 'hero-idle'
  | 'hero-search-submitting'
  | 'hero-cinematic-transition'
  | 'results-active'
  | 'results-searching'
  | 'evidence-open';
```

Key rules:

```text
hero-idle
  search from Hero
      ↓
hero-search-submitting
      ↓
hero-cinematic-transition
      ↓
results-active

results-active
  search from Bottom Composer
      ↓
results-searching
      ↓
results-active
```

ไม่ให้ `results-searching` trigger Hero cinematic

---

# 24. Responsive Strategy V2

## Desktop ≥ 1280

- Full 3D Hero
- Floating Nav morph
- Bottom Composer max 760px
- Result 2–3 columns ตามจำนวนข้อมูล
- Comparator 2 columns
- Evolution wide timeline
- Dialect 4-card layout

## Tablet 768–1279

- 3D complexity ลดลง
- Nav compact
- Result 1–2 columns
- Comparator 2 columns ถ้าพื้นที่พอ ไม่งั้น stack
- Dialect 2 × 2
- Bottom Composer width calc(100vw - 40px)

## Mobile < 768

Hero:

- 100svh
- 3D เป็น simplified / pre-render / static fallback ได้
- no pointer tracking
- heading 42–54px
- search multiline 2–3 rows ได้

Nav:

- floating glass compact
- logo + menu / search shortcut
- ห้ามยัดเมนู desktop

Results:

- single column
- card radius 24–28px

Bottom Composer:

```text
left/right: 12–16px
bottom: max(12px, env(safe-area-inset-bottom))
```

Comparator:

- vertical stack

Evolution:

- horizontal era tabs

Dialect:

- 2 × 2 หรือ horizontal cards

Drawer:

- bottom sheet 85–92svh

---

# 25. Accessibility

ต้องรองรับ:

- prefers-reduced-motion
- keyboard navigation
- visible focus
- semantic HTML
- aria-label สำหรับ Search / Drawer / Tabs
- touch target ≥ 44px
- contrast ที่ผ่านมาตรฐาน
- Esc ปิด Drawer
- focus trap ใน Modal / Drawer
- screen reader อ่านสถานะ Loading / Search Result update ได้

Cinematic White Flash:

- ห้ามเป็น pure white flash แบบทันที
- ต้อง bloom แบบ gradual
- reduced-motion / photosensitive-friendly mode ต้อง skip flash

---

# 26. Performance Constraints

Hero 3D คือส่วนเสี่ยงที่สุด ต้องแยกจาก Product Core

Target:

```text
Lighthouse Performance > 85 บน production-like build
Search usable แม้ 3D โหลดไม่สำเร็จ
Hero input interactive โดยเร็ว
No layout shift ตอน asset load
```

Implementation:

- lazy-load 3D engine
- preload lightweight poster
- use Suspense boundary
- hero search UI ห้ามรอ 3D
- use transform/opacity for motion
- avoid animating width/height ต่อเนื่องถ้าใช้ transform substitute ได้
- pause ambient 3D เมื่อ tab hidden
- mobile quality tier

---

# 27. Technical Component Architecture V2

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── MorphingNavbar.tsx
│   │   ├── PageShell.tsx
│   │   └── Footer.tsx
│   │
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── Hero3DScene.tsx
│   │   ├── HeroSearch.tsx
│   │   └── PopularSuggestions.tsx
│   │
│   ├── search/
│   │   ├── ParsedIntent.tsx
│   │   ├── SmartFilters.tsx
│   │   ├── SearchResults.tsx
│   │   ├── WordResultCard.tsx
│   │   └── PersistentSearchComposer.tsx
│   │
│   ├── compare/
│   │   └── ContextComparator.tsx
│   │
│   ├── evolution/
│   │   └── EvolutionExplorer.tsx
│   │
│   ├── dialect/
│   │   ├── DialectExplorer.tsx
│   │   └── DialectCard.tsx
│   │
│   ├── evidence/
│   │   └── GroundedEvidenceDrawer.tsx
│   │
│   ├── motion/
│   │   ├── HeroSearchTransition.tsx
│   │   ├── SectionReveal.tsx
│   │   └── ScrollExperience.tsx
│   │
│   └── ui/
│       ├── GlassSurface.tsx
│       ├── SoftCard.tsx
│       ├── SoftButton.tsx
│       ├── Tag.tsx
│       └── SectionHeading.tsx
│
├── lib/
│   ├── api-client.ts
│   ├── motion.ts
│   └── experience-state.ts
│
└── mocks/
    └── thai-context-mock.json
```

---

# 28. Data / API UX Contract

Frontend ต้องรองรับ response อย่างน้อย:

```ts
type SearchResponse = {
  query_understanding: {
    raw_query: string;
    detected_meaning: string;
    context?: string;
    excluded_words?: string[];
  };

  recommendations: Array<{
    id?: string;
    headword: string;
    score: number;
    pos?: string;
    definition: string;
    ai_explanation?: string;
    registers?: string[];
    contexts?: string[];
    evidence?: Evidence;
  }>;
};
```

UI ต้องไม่ assume ว่ามีผลลัพธ์ 2 ใบเสมอ

กรณี:

```text
0 results  → Empty / Safe Suggestion state
1 result   → centered prominent result
2 results  → 2-column
3+ results → responsive layout
```

---

# 29. Empty / Loading / Error

## Loading

Hero:

> กำลังค้นหาคำที่ใกล้กับสิ่งที่คุณกำลังคิด…

Results composer:

> กำลังค้นจากบริบทและแหล่งข้อมูล…

ใช้ skeleton card / subtle shimmer ที่ neutral มาก

## Empty

> **ยังไม่พบคำที่ตรงพอ**  
> ลองเล่าบริบทเพิ่มอีกนิด เช่น ใช้ในงานเขียน การพูด หรือสถานการณ์แบบใด

Actions:

```text
+ เพิ่มบริบท
+ เลือกระดับภาษา
+ ระบุคำที่ไม่ต้องการใช้
```

## Error / Backend unavailable

ถ้ามี Mock Fallback:

- fallback โดยไม่ block demo
- Dev / Presenter indicator สามารถแจ้ง Mock Mode ได้
- ไม่แสดง technical stack trace กับ user

---

# 30. Development Priority — ลำดับการพัฒนา

หลักสำคัญ:

> **อย่าพัฒนา 3D ก่อนที่ Search → Results → Search Again จะใช้งานได้จริง**

เพราะ Signature Animation ควรครอบ Core Flow ไม่ใช่แทน Core Flow

## Phase 0 — Project Audit & Foundation

**Priority: P0**

งาน:

- ตรวจ Next.js / TypeScript structure
- เช็ก Mock Data / API shape
- สร้าง design tokens V2
- วาง font
- วาง responsive container
- สร้าง SoftCard / GlassSurface / SoftButton primitives
- กำหนด AppExperienceState

Done เมื่อ:

- หน้า render ได้
- tokens ใช้งานได้
- ไม่มี style เก่าจาก role-3 หลุดเข้ามา

---

## Phase 1 — Static V2 Layout Skeleton

**Priority: P0**

สร้างเรียง section ก่อน:

```text
Navbar
Hero
Results
Comparator
Evolution
Dialect
Footer
```

ใช้ Mock Data ทั้งหมดก่อน

ยังไม่ต้องทำ 3D cinematic

Done เมื่อ:

- Desktop / Tablet / Mobile มีโครงครบ
- scroll flow ถูกลำดับ
- content จาก role-3 อยู่ครบ

---

## Phase 2 — Search Core Function

**Priority: P0 / Critical**

ทำ:

- Hero Search submit
- api-client
- Mock / Real fallback
- Parsed Intent
- Dynamic Result Cards 0 / 1 / N
- Loading / Empty / Error

Done เมื่อ:

```text
พิมพ์ → ค้นหา → ได้ผลลัพธ์ → เปิดหลักฐานได้
```

โดยไม่พึ่ง 3D

---

## Phase 3 — Persistent Bottom Composer

**Priority: P0**

ทำ:

- show เมื่อออกจาก Hero
- hide / reduce เมื่อกลับ Hero
- search ใหม่ได้ทันที
- update results โดยไม่ trigger 3D
- mobile safe area
- keyboard interaction

Done เมื่อ:

```text
ค้นซ้ำได้หลายรอบโดยไม่ต้องกลับขึ้น Hero
```

---

## Phase 4 — Morphing Navbar

**Priority: P1**

ทำ:

- Hero state
- Scrolled glass state
- smooth size / position / radius morph
- responsive menu
- active section indicator optional

Done เมื่อ:

- scroll ขึ้นลงไม่ flicker
- navbar ไม่ jump
- glass อ่านชัดทุก background

---

## Phase 5 — Search Result Motion

**Priority: P1**

ทำ:

- result reveal
- result replace / crossfade
- card hover
- section enter
- reduced-motion

Done เมื่อ:

- search ซ้ำแล้ว UI รู้สึกต่อเนื่อง
- ไม่มี layout jump

---

## Phase 6 — Context Comparator

**Priority: P1**

ทำ:

- side-by-side desktop
- stack mobile
- compare selection
- difference highlight
- source shortcut

Done เมื่อ:

- ผู้ใช้เข้าใจความต่างของสองคำได้ภายในไม่กี่วินาที

---

## Phase 7 — Evolution Explorer

**Priority: P1**

ทำ:

- 3 era tabs
- selected indicator
- definition transition
- status state
- responsive horizontal control

Done เมื่อ:

- click ปีแล้ว content เปลี่ยนแบบ smooth
- status readable โดยไม่พึ่งสีอย่างเดียว

---

## Phase 8 — Dialect Explorer

**Priority: P1**

ทำ:

- 4 region cards
- Official / AI Inferred distinction
- source reveal
- responsive 4 / 2 / 1-2 layout
- interaction animation

Done เมื่อ:

- ผู้ใช้เห็น 4 ภาคชัด
- provenance ชัด

---

## Phase 9 — Evidence Drawer & Trust UX Polish

**Priority: P1**

ทำ:

- desktop drawer
- mobile bottom sheet
- focus trap
- official badge
- source / page / quote
- safe abstention

Done เมื่อ:

- ทุกคำที่มี evidence เปิดดูได้
- AI explanation กับ official source ไม่ปะปนกัน

---

## Phase 10 — Integrate Hero 3D Asset

**Priority: P2 / Signature Polish**

เมื่อ Product Core เสถียรแล้วค่อยเชื่อม 3D

ทำ:

- Hero3DScene adapter
- idle ambient motion
- opening state
- zoom state
- white bloom
- callback เมื่อ transition complete
- asset fallback

ใช้ placeholder animation ก่อนถ้า 3D asset ยังไม่พร้อม

Done เมื่อ:

- Search UI ใช้ได้แม้ 3D fail
- animation ไม่ block result data

---

## Phase 11 — Cinematic Hero → Results Orchestration

**Priority: P2**

เชื่อม:

```text
Hero Search
→ Book Open
→ Zoom
→ White Bloom
→ Results Anchor
→ Reveal Cards
→ Morph Navbar
→ Show Bottom Composer
```

ทำ timeline เดียว ไม่ให้หลาย component setTimeout กันเอง

แนะนำ:

- Framer Motion orchestration หรือ
- GSAP Timeline สำหรับ sequence นี้เท่านั้น

Done เมื่อ:

- transition consistent ทุกครั้ง
- interrupt / fast navigation ไม่ทำ UI ค้าง

---

## Phase 12 — Responsive + Accessibility + Performance Pass

**Priority: P0 before demo**

ตรวจ:

- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px+

QA:

- keyboard
- focus
- reduced motion
- safe area
- no horizontal overflow
- 3D lazy load
- no hydration error
- no scroll lock bug
- drawer body lock ถูกต้อง

---

## Phase 13 — Demo Mode / Fail-Safe QA

**Priority: P0 before competition/demo**

ทดสอบ:

1. Real API success
2. API slow
3. API error
4. Mock forced
5. 3D fails to load
6. mobile fallback
7. search 1 result
8. search 4+ results
9. no result
10. evidence missing → Safe Abstention

เป้าหมาย:

> เดโมต้องเดินต่อได้แม้ส่วนใดส่วนหนึ่งล้มเหลว

---

# 31. Recommended Implementation Order — Short Version

```text
01 Foundation + Tokens
02 Static Page Structure
03 Search + API/Mock
04 Dynamic Result Cards
05 Bottom Search Composer
06 Morphing Navbar
07 Result Motion
08 Comparator
09 Evolution
10 Dialect Explorer
11 Evidence Drawer
12 3D Integration
13 Hero Cinematic Transition
14 Responsive / A11y / Performance
15 Demo Fail-Safe QA
```

---

# 32. Animation Responsibility Map

เพื่อป้องกัน animation ชนกัน:

```text
MorphingNavbar
→ รับผิดชอบ Nav morph เท่านั้น

Hero3DScene
→ รับผิดชอบ 3D state เท่านั้น

HeroSearchTransition
→ orchestration Hero → Results

SearchResults
→ reveal / replace result cards

PersistentSearchComposer
→ entrance / loading state ของตัวเอง

EvolutionExplorer
→ era content transition

DialectExplorer
→ region selection transition

GroundedEvidenceDrawer
→ drawer / sheet transition
```

ห้ามให้แต่ละ component scroll page เองพร้อมกัน

การ scroll ไป Results ต้องควบคุมจาก Orchestrator จุดเดียว

---

# 33. UX Decision Rules

ก่อนเพิ่ม UI ใหม่ ให้ถาม:

1. ช่วยให้ค้นคำเร็วขึ้นหรือไม่?
2. ช่วยให้เข้าใจบริบทดีขึ้นหรือไม่?
3. ช่วยให้เชื่อถือข้อมูลมากขึ้นหรือไม่?
4. ถ้าตัดออก Core Flow ยังดีเท่าเดิมไหม?

ถ้าตัดออกแล้วไม่กระทบ UX และเป็นเพียง decoration:

> **ไม่ต้องเพิ่ม**

---

# 34. Anti-patterns V2

ห้าม:

- Heavy Liquid Glass ทั้งหน้า
- Glass Card ทุก result
- Neon / Cyberpunk
- Purple AI gradient
- Chat bubble response layout
- Dashboard sidebar
- Random 3D blobs
- animation ทุกครั้งที่ search จาก bottom composer
- hard scroll snap ทุก section
- overly long 3D transition
- hiding evidence หลาย click เกินไป
- cards ที่ fixed จำนวน column โดยไม่ดูจำนวน result
- text ภาษาอังกฤษเด่นกว่าภาษาไทย
- ใช้ 3D เพื่อซ่อน loading API

---

# 35. Final V2 Experience

ผู้ใช้เปิดเว็บ:

```text
เห็นโลกของ THAI CONTEXT + หนังสือ 3D
↓
อ่าน “วันนี้คุณอยากสื่ออะไร?”
↓
พิมพ์ความหมาย
↓
กดค้นหา
↓
หนังสือเปิด → กล้องซูม → แสงขาว
↓
เข้าสู่ผลลัพธ์
↓
เห็นคำที่แนะนำหลายรายการแบบ Soft Rounded Cards
↓
Navbar กลายเป็น Floating Liquid Glass
↓
Search Composer ลอยขึ้นด้านล่าง
↓
ค้นคำต่อได้ทันที โดยไม่เล่น 3D ซ้ำ
↓
เปรียบเทียบคำ
↓
ดูวิวัฒนาการคำ
↓
สำรวจภาษาถิ่น 4 ภาค
↓
ตรวจหลักฐานอ้างอิง
```

ความรู้สึกที่ต้องได้:

> **ทันสมัย — นุ่ม — มีชีวิต — เชื่อถือได้ — เป็นภาษาไทย — และมีจังหวะการใช้งานที่ลื่นไหล**

---

# 36. Master Prompt สำหรับ Codex / Coding Agent

```text
Read design-v2.md as the single source of truth for the THAI CONTEXT frontend visual and interaction system.

Preserve all required product modules from the existing role-3 frontend specification, but ignore its previous dark/navy dashboard styling.

Build the new frontend as a Thai-first Modern Editorial product with Soft Rounded UI, selective Soft Liquid Glass, warm neutral surfaces, smooth motion, and a full-screen cinematic 3D Living Book hero.

Core interaction:
- Hero search triggers the 3D book opening sequence, camera zoom, soft white bloom, then transitions to the search results section.
- Once the user leaves Hero, morph the navbar into a floating rounded Liquid Glass surface.
- Reveal a centered floating bottom search composer for subsequent searches.
- Searches from the bottom composer update results directly and MUST NOT replay the 3D cinematic transition.
- Returning to the Hero and searching there can replay the cinematic transition.

Required modules:
1. Meaning-first Hero Search + Parsed Intent + Smart Filters
2. Responsive Candidate Recommendation Cards with % Match and evidence actions
3. Context Comparator
4. 3-Era Word Evolution Explorer
5. 4-Region Dialect Explorer with Official vs AI Inferred provenance
6. Grounded Evidence Drawer / Mobile Bottom Sheet
7. Fail-Safe Mock / Real API layer

Build functionality before 3D polish. The site must remain fully usable if the 3D asset fails or reduced-motion is enabled.

Use Thai as the primary UI language. Avoid generic AI SaaS visuals, heavy glassmorphism, dashboard layouts, neon gradients, random 3D objects, excessive pills, and chat-bubble responses.

Follow the development order and state-machine rules defined in design-v2.md.
```

---

# 37. V2 North Star

> **THAI CONTEXT ไม่ใช่เว็บที่เอา AI มาใส่ในพจนานุกรม แต่คือประสบการณ์ค้นพบภาษาไทยที่เข้าใจสิ่งที่ผู้ใช้ต้องการสื่อ**

และในเชิง Design:

> **Hero คือโลกของหนังสือ — Results คือโลกของข้อมูล — Glass UI คือชั้นเชื่อมระหว่างผู้ใช้กับโลกทั้งสอง**
