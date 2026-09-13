# THAI CONTEXT — Hero → Search Results

ต่อยอด Hero 3D ที่อนุมัติ โดยคงโมเดลหนังสือ, ภาพ, Hero copy, ช่องค้นหา, คำแนะนำ และ CSS Hero เดิม ไม่เพิ่ม Comparator, Evolution หรือ Dialect

## Run

Node.js 22+ และ npm

```bash
npm ci
npm run dev
```

เปิด `http://localhost:3000` พิมพ์คำอธิบายแล้วกด Enter หรือปุ่มค้นหา

Production และการทดสอบ:

```bash
npm test
npm run build
npm run test:http
npm run start
```

`test:http` ใช้พอร์ต 3011 และ backend จำลองชั่วคราว แล้วปิดกระบวนการเมื่อจบ

## API

ทุกครั้งที่ submit จะส่ง `POST /api/search` พร้อม `{ "query": "…" }` จริง

ยังไม่มี backend endpoint จากผู้ใช้ จึงเริ่มด้วยข้อมูลเดโมที่ระบุชัดเจน ไม่ใช่ semantic search จริงและไม่อ้างว่าตัวอย่างได้รับการรับรองจากพจนานุกรม

เชื่อม backend จริงโดยคัดลอก `.env.example` เป็น `.env.local` และตั้งค่า:

```dotenv
THAI_CONTEXT_API_URL=http://localhost:4000/api/v1/search/meaning
THAI_CONTEXT_USE_MOCK=false
```

URL ต้องเป็น endpoint เต็ม รับ POST `{query}` คืน schema ตาม `src/lib/search-types.ts` โดยรองรับทั้ง response ตรงและ `{data: response}` ตัวแปรอยู่ฝั่ง server ไม่ส่ง URL ไป browser

Backend timeout 7 วินาที, HTTP error หรือ schema ไม่ถูกต้อง → คืนข้อมูลเดโมพร้อมสถานะ `fallback` และข้อความแจ้งในหน้าเว็บ ส่วน client timeout 10 วินาทีหรือเครือข่ายขาด → แสดงข้อผิดพลาดพร้อม retry

ตัวอย่างคำค้นในเดโม:

| คำค้น | จำนวนผล |
| --- | --- |
| `ไม่พบคำนี้xyz` | 0 |
| `วิจัย` | 1 |
| `ช่วยกัน` | 2 |
| `ทำงาน` | 3 |
| `ทำงานทรัพยากร` | 4 |

เดโมจับ keyword จากรายการตัวอย่าง จึงไม่สามารถตีความภาษาได้เหมือน backend จริง

## Flow

Central reducer อยู่ที่ `src/lib/experience-state.ts` มี state ตามที่กำหนด:

- `hero-idle`
- `hero-search-submitting`
- `hero-cinematic-transition`
- `results-active`
- `results-searching`
- `evidence-open`

`SearchExperience.tsx` เป็นเจ้าของ request และการเปลี่ยน state ส่วน state `idle/opening/zooming/flash/completed` ใน Hero เป็น phase ของภาพ 3D เท่านั้น

### Hero Search

1. เริ่ม API และ timeline ใน submit เดียวกัน โดยไม่ await API
2. Response ที่มาถึงก่อนจอขาวถูกเก็บใน staged result
3. เมื่อ opacity ของ overlay เป็น 1 ที่ 1.6 วินาที: commit staged result หรือ skeleton, jump ไป `#search-results` ด้วย `behavior: auto`, เปลี่ยน Navbar เป็น Floating Liquid Glass และ mount PersistentSearchComposer
4. Overlay fade out 320ms แล้ว reveal การ์ดด้วย stagger 70ms
5. ถ้า API ยังไม่เสร็จ ให้แสดง skeleton ต่อโดยไม่ hold white แล้วเปลี่ยนเป็นผลลัพธ์เมื่อ response มาถึง

Timeline การเปิดหนังสือเดิมยังอยู่ครบ เพิ่มเฉพาะ white-boundary callback และ fade out หลังจุดจบเดิม Overlay ถูกย้ายเป็น fixed portal นอก Hero เพื่อไม่ให้หลุดออกจาก viewport ตอน jump

### Persistent Search

ส่ง request และ update results โดยตรง ไม่เรียก `hero.play` และไม่ scroll ใหม่ ระหว่างรอแสดงการ์ดเดิมแบบจางลงและสถานะ loading คงความสูงของ section เพื่อป้องกันตำแหน่ง scroll ถูกดันขึ้นเมื่อจำนวนผลลดลง

Request มี ID, AbortController และ submit guard เพื่อป้องกัน stale response และการกดซ้ำ

### กลับ Hero

กด wordmark หรือเลื่อนกลับเข้า Hero เพื่อ reset ภาพเดิม กลับสู่ `hero-idle` และค้นหาจาก Hero เพื่อเล่น cinematic ได้อีกครั้ง การเลื่อนลงสู่ผลลัพธ์เดิมไม่ทำ request และไม่ replay cinematic

### Results / Evidence

- 0 ผล: empty state พร้อมเพิ่มบริบท
- 1 ผล: การ์ดกลาง ความกว้างสูงสุด 840px
- 2 ผล: 2 คอลัมน์บน desktop/tablet
- 3+ ผล: responsive grid สูงสุด 3 คอลัมน์
- มือถือ: 1 คอลัมน์
- มี Parsed Intent และตัวกรองระดับภาษาจาก response
- Evidence drawer ใช้ native dialog สำหรับ modal/focus containment, Escape, คืน focus เมื่อปิด และ safe abstention เมื่อไม่มีหลักฐาน
- เดโมไม่มีเลขหน้าหรือข้อความอ้างอิงที่สร้างขึ้นมาเพื่ออ้างว่าเป็นข้อมูลทางการ

### Accessibility / Motion

รองรับ Enter/Shift+Enter/IME, ป้องกันคำค้นว่าง, aria-live, visible focus, loading states และ reduced-motion แบบ short fade ไม่เปิดหนังสือหรือ dolly-in หาก 3D โหลดไม่ได้ ช่องค้นหาและ transition แบบ fade ยังใช้ได้ Canvas หยุด render เมื่ออยู่นอก viewport, tab hidden หรือ phase completed

## Verification

ตรวจแล้วในสภาพแวดล้อมพัฒนา:

- `npm test`: 21 tests ผ่าน (DOM + GSAP จริง, stub เฉพาะ GPU scene; reducer, API route และ schema)
- ทดสอบว่า opacity เท่ากับ 1 ณ จุด scroll และผลลัพธ์ยังไม่แสดงก่อน white boundary
- ทดสอบ early/late response, 0/1/2/3/4 ผล, composer ไม่ replay/scroll, reduced-motion, evidence open/close, empty validation, กลับ Hero แล้วเริ่มใหม่, stale response และ retry state
- `npm run build`: ผ่าน รวม TypeScript
- `npm run test:http`: production HTTP ผ่านสำหรับหน้าเว็บ/ภาพ, backend 0/1/2/3/5 ผล, backend ช้า 1.8 วินาที, error/malformed fallback และ invalid request
- เทียบกับ ZIP Hero ที่อนุมัติ: BookModel, HeroSearch, PopularSuggestions เหมือนเดิม และ CSS เดิมถูกเก็บไว้ก่อนส่วน integration ที่เพิ่ม

**Browser QA ยังไม่เสร็จ:** Cloud browser บล็อก `http://localhost:3000` ด้วย `ERR_BLOCKED_BY_CLIENT` จึงยังไม่ได้ตรวจภาพจริง, GPU, hydration ฝั่ง browser หรือ responsive overflow ด้วย browser จริง การทดสอบ DOM และ build ไม่ได้ทดแทนส่วนนี้

ก่อนใช้งานจริง ให้เปิด browser ที่เข้าถึง preview ได้และตรวจที่ 375×667, 430×932, 768×1024, 1024×768, 1440×900 รวมถึง WebGL disabled และ reduced motion
"# thai-context-frontend" 
