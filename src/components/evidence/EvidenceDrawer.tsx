import { useEffect, useRef } from "react";
import type { Recommendation } from "@/lib/search-types";
export default function EvidenceDrawer({
  word,
  isDemo,
  onClose,
}: {
  word: Recommendation;
  isDemo: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const prior = document.activeElement as HTMLElement | null;
    const old = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      dialog.current?.close();
      prior?.focus({ preventScroll: true });
    };
  }, []);
  const evidence = word.evidence;
  return (
    <dialog
      ref={dialog}
      className="evidence-drawer"
      aria-labelledby="evidence-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-content">
        <header>
          <span>หลักฐานอ้างอิง</span>
          <button
            autoFocus
            type="button"
            onClick={onClose}
            aria-label="ปิดหลักฐาน"
          >
            ×
          </button>
        </header>
        <h2 id="evidence-title">{word.headword}</h2>
        {evidence ? (
          <>
            <p className="evidence-status">
              {isDemo
                ? "ข้อมูลเดโม — ยังไม่รับรองหลักฐาน"
                : evidence.is_official
                  ? "✓ Official Verified · แหล่งข้อมูลทางการ"
                  : "แหล่งข้อมูลที่ยังไม่รับรอง"}
            </p>
            <h3>{evidence.source_book}</h3>
            <p>
              {evidence.edition ? `${evidence.edition} · ` : ""}
              {evidence.edition_year ? `พ.ศ. ${evidence.edition_year}` : ""}
              {evidence.page_number ? ` · หน้า ${evidence.page_number}` : ""}
            </p>
            <blockquote>{evidence.quote}</blockquote>
          </>
        ) : (
          <div className="safe-abstention">
            <h3>ยังไม่มีหลักฐานที่รับรอง</h3>
            <p>
              ระบบยังไม่พบข้อมูลที่ได้รับการรับรองเพียงพอ
              จึงไม่สร้างข้อความอ้างอิงหรือเลขหน้าขึ้นมาเอง
            </p>
            {isDemo && <p>คำแนะนำนี้เป็นข้อมูลเดโมสำหรับทดสอบการใช้งาน</p>}
          </div>
        )}
      </div>
    </dialog>
  );
}
