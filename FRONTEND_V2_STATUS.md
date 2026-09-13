# THAI CONTEXT — Frontend V2 Status

อัปเดตล่าสุด: 13 กันยายน 2026

## Audit และสิ่งที่รักษาไว้

- ✅ Hero เต็มจอและ visual direction เดิม
- ✅ 3D Living Book, poster fallback, error boundary และ reduced-motion fallback
- ✅ Hero cinematic search orchestration ด้วย timeline กลาง
- ✅ Search API route, request cancellation, stale-response protection และ mock fallback
- ✅ Search Results เดิม พร้อม layout สำหรับ 0 / 1 / 2 / 3+ รายการ
- ✅ Bottom composer ที่ค้นซ้ำโดยไม่เล่น Hero cinematic และไม่สั่ง scroll ซ้ำ
- ✅ Morphing navbar และ Evidence drawer พื้นฐาน
- 🛠 ขยาย Result/Intent/Filter/Evidence contract และ responsive/a11y behavior
- ✅ เพิ่ม Comparator, Evolution, Dialect, mobile navigation และ footer ที่เดิมยังไม่มี

## Implemented Features

1. Parsed Intent รองรับ `raw_query`, `detected_meaning`, `context`, `excluded_words`
2. Smart Filters สำหรับระดับภาษา บริบท และคำที่ไม่ต้องการใช้ พร้อม empty state หลังกรอง
3. Dynamic Result Cards สำหรับ 0/1/2/3+ ผลลัพธ์ พร้อม match score, POS, definition, explanation, tags, compare และ evidence actions
4. Persistent Bottom Search Composer พร้อม inline loading, keyboard submit, safe-area และการรักษา scroll position
5. Morphing Navbar พร้อมเมนู mobile ที่เปิด/ปิดและลิงก์ไปยังแต่ละ chapter
6. Context Comparator แบบสองคอลัมน์/stack mobile พร้อมเลือกคำ เปรียบเทียบ 7 มิติ highlight จุดต่าง และ source shortcut
7. Word Evolution Explorer แบบ 3 ยุค พร้อม `NOT_FOUND`, `ADDED`, `MODIFIED`, tab semantics และ transition
8. Dialect Explorer 4 ภาค พร้อม Official / AI Inferred provenance และ source reveal
9. Evidence Drawer แบบ right drawer / mobile bottom sheet, native dialog focus handling, Esc close และ Safe Abstention
10. Real API → validated response → mock fallback โดย UI ไม่แสดง stack trace
11. Loading, empty, filtered-empty และ recoverable error states ภาษาไทย
12. Reduced motion, visible focus, semantic landmarks, aria-live, touch target และ overflow protection

## Component Map

```text
SearchExperience
├── HeroSection (ของเดิม)
│   ├── HeroSearch (ของเดิม)
│   └── Hero3DScene / BookModel (ของเดิม)
├── MorphingNavbar
├── SearchResults
│   ├── ParsedIntent
│   ├── SmartFilters
│   └── WordResultCard
├── PersistentSearchComposer
├── ContextComparator
├── EvolutionExplorer
├── DialectExplorer
├── EvidenceDrawer
└── Footer
```

## Data Contracts

Search ใช้ `SearchResponse` ใน `src/lib/search-types.ts`:

- `query_understanding`: raw query, detected meaning, context, excluded words
- `recommendations[]`: headword, score 0–1, POS, definition, AI explanation, registers, contexts
- `recommendations[].comparison`: emphasis, use_when, example, common_confusion
- `recommendations[].evidence`: source_book, edition, edition_year, page_number, quote, is_official
- `mode`: `live | demo | fallback`

Response จาก backend ถูกตรวจ schema ด้วย `parseResponse` ก่อนเข้า UI ข้อมูลที่ผิดรูปแบบจะ fallback ไป mock ที่ route boundary

## Mock Data

- Search demo/fallback: `src/lib/mock-search.ts`
- Evolution และ Dialect demo: `src/lib/explorer-data.ts`
- ข้อมูล mock มีข้อความกำกับว่าเป็นข้อมูลสาธิต และไม่กล่าวอ้างว่าเป็นหลักฐานจริง
- Evidence ที่ไม่มีข้อมูลใช้ Safe Abstention และไม่สร้าง quote/page ขึ้นเอง

## API Integration Points

- Client เรียก `POST /api/search` ผ่าน `src/lib/api-client.ts`
- Route handler อยู่ที่ `src/app/api/search/route.ts`
- Backend contract เปลี่ยนได้ที่ route/adapter โดยไม่ต้อง rewrite component
- Route รองรับ envelope `{ data: SearchResponse }` และ response ตรงแบบ `SearchResponse`
- Timeout upstream 7 วินาที; client timeout 10 วินาที

## Environment Variables

```env
# ตาม V2 brief
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_USE_MOCK=

# server-only aliases ที่รองรับเพื่อไม่เปิด endpoint ใน client bundle
THAI_CONTEXT_API_URL=
THAI_CONTEXT_USE_MOCK=
```

ลำดับการอ่าน endpoint: `THAI_CONTEXT_API_URL` ก่อน แล้วจึง `NEXT_PUBLIC_API_URL` หากไม่กำหนด endpoint หรือ force mock ระบบใช้ demo data

## Validation

```text
npm.cmd test          # 22 tests ผ่าน
npm.cmd run typecheck # ผ่าน
npm.cmd run build     # ผ่าน
npm.cmd run test:http # production HTTP checks ผ่าน
```

HTTP QA ครอบคลุมหน้าแรก, assets, backend 0/1/2/3/5 results, slow API, upstream error, malformed response และ invalid input

## Remaining TODO / Known Limitations

- ข้อมูล Evolution และ Dialect ยังเป็น typed demo data รอ endpoint จริง
- คะแนน semantic match และคำอธิบายใน mock เป็นตัวอย่าง ไม่ใช่ผลจากโมเดลจริง
- ตัวอย่าง evidence ใน mock ไม่ใช่คำอ้างอิงทางการ; UI พร้อมรับ Official evidence จาก backend
- Session เครื่องมือรอบนี้ไม่มี browser surface จึงทำ visual GUI pass ไม่ได้; ใช้ DOM interaction tests, HTTP smoke tests และ production build แทน ควรตรวจภาพจริงอีกครั้งที่ 375, 430, 768, 1024, 1280 และ 1440px เมื่อมี browser
- Lighthouse score ต้องวัดใน deployment/production browser จริง

