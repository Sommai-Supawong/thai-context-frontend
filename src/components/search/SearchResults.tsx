import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import gsap from "gsap";
import type { Experience } from "@/lib/experience-state";
import type { Recommendation } from "@/lib/search-types";
import ParsedIntent from "./ParsedIntent";
import SmartFilters, { type SmartFilterValue } from "./SmartFilters";
import WordResultCard from "./WordResultCard";
export default function SearchResults({
  experience,
  reduced,
  sectionRef,
  onEvidence,
  compareSelected,
  onCompare,
  onRetry,
}: {
  experience: Experience;
  reduced: boolean;
  sectionRef: RefObject<HTMLElement | null>;
  onEvidence: (word: Recommendation) => void;
  compareSelected: string[];
  onCompare: (word: Recommendation) => void;
  onRetry: () => void;
}) {
  const { result, loading, error, revealed, revision, query } = experience;
  const [filters, setFilters] = useState<SmartFilterValue>({
    register: "",
    context: "",
    excluded: "",
  });
  const grid = useRef<HTMLDivElement>(null);
  useLayoutEffect(
    () => setFilters({ register: "", context: "", excluded: "" }),
    [revision],
  );
  const registers = useMemo(
    () => [
      ...new Set(
        result?.recommendations.flatMap((r) => r.registers ?? []) ?? [],
      ),
    ],
    [result],
  );
  const contexts = useMemo(
    () => [
      ...new Set(result?.recommendations.flatMap((r) => r.contexts ?? []) ?? []),
    ],
    [result],
  );
  const excludedWords = filters.excluded
    .split(/[,，\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const words =
    result?.recommendations.filter(
      (r) =>
        (!filters.register || r.registers?.includes(filters.register)) &&
        (!filters.context || r.contexts?.includes(filters.context)) &&
        !excludedWords.some((word) => r.headword.includes(word)),
    ) ?? [];
  useLayoutEffect(() => {
    if (!revealed || !grid.current?.querySelector("[data-reveal]")) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: reduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.18 : 0.48,
          stagger: reduced ? 0 : 0.07,
          ease: "power2.out",
        },
      );
    }, grid);
    return () => ctx.revert();
  }, [revealed, revision, filters, reduced, error]);
  return (
    <section
      ref={sectionRef}
      id="search-results"
      className="search-results"
      aria-labelledby="results-title"
      aria-busy={loading}
    >
      <div
        className="results-inner"
        style={{ visibility: revealed ? "visible" : "hidden" }}
      >
        <p className="eyebrow">
          <span /> จากความหมาย สู่คำที่ใช่
        </p>
        <div className="results-heading">
          <h2 id="results-title" tabIndex={-1}>
            คำที่ใกล้กับสิ่งที่คุณกำลังคิด
          </h2>
          <span className="result-count" role="status" aria-live="polite">
            {loading ? "กำลังค้นหา…" : `${words.length} คำแนะนำ`}
          </span>
        </div>
        <ParsedIntent result={result} query={query} loading={loading} />
        {result?.mode !== "live" && result?.notice && (
          <p className="demo-notice">{result.notice}</p>
        )}
        {!!result?.recommendations.length && (
          <SmartFilters
            registers={registers}
            contexts={contexts}
            value={filters}
            disabled={loading}
            onChange={setFilters}
          />
        )}
        {error && (
          <div role="alert" className="result-error">
            <p>{error}</p>
            <button type="button" onClick={onRetry}>
              ลองค้นหาอีกครั้ง
            </button>
          </div>
        )}
        <div
          ref={grid}
          className={`results-grid count-${Math.min(words.length, 3)}`}
          style={{
            opacity: loading && result?.recommendations.length ? 0.55 : 1,
          }}
        >
          {!result && loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div className="result-skeleton" key={i} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              ))
            : words.map((word, index) => (
                <WordResultCard
                  key={`${revision}-${word.id ?? word.headword}-${index}`}
                  word={word}
                  index={index}
                  revision={revision}
                  mode={result?.mode}
                  loading={loading}
                  selected={compareSelected.includes(word.headword)}
                  onEvidence={onEvidence}
                  onCompare={onCompare}
                />
              ))}
          {!loading && !error && words.length === 0 && (
            <div data-reveal className="empty-results">
              <span className="empty-mark" aria-hidden="true">
                “ ”
              </span>
              <h3>
                {!filters.register && !filters.context && !filters.excluded
                  ? "ยังไม่พบคำที่ตรงพอ"
                  : "ยังไม่มีคำที่ตรงกับตัวกรองนี้"}
              </h3>
              <p>
                ลองเล่าบริบทเพิ่มอีกนิด เช่น ใช้ในงานเขียน การพูด
                หรือสถานการณ์แบบใด
              </p>
              {filters.register || filters.context || filters.excluded ? (
                <button onClick={() => setFilters({ register: "", context: "", excluded: "" })}>
                  ดูคำแนะนำทั้งหมด
                </button>
              ) : (
                <a href="#persistent-meaning">เพิ่มบริบทในการค้นหา ↗</a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
