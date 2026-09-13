"use client";
import { useEffect, useState, type RefObject, type MouseEvent } from "react";
export default function MorphingNavbar({
  navRef,
  floating,
  busy,
  onHome,
}: {
  navRef: RefObject<HTMLElement | null>;
  floating: boolean;
  busy: boolean;
  onHome: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!floating) setOpen(false);
  }, [floating]);
  return (
    <header
      ref={navRef}
      className={`navbar ${floating ? "navbar-floating" : ""}`}
      inert={busy}
    >
      <a
        className="wordmark"
        href="#hero"
        onClick={onHome}
        aria-label="THAI CONTEXT หน้าแรก"
      >
        <svg
          width="30"
          height="32"
          viewBox="0 0 30 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 27V7M15 8C10 3 5 3 2 4v20c5-1 9 0 13 3 4-3 8-4 13-3V4c-5-1-10 1-13 4Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span>
          THAI CONTEXT<small>จากค้นคำ สู่เข้าใจภาษา</small>
        </span>
      </a>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="เมนูหลัก">
        {floating && <a href="#compare" onClick={() => setOpen(false)}>เปรียบเทียบคำ</a>}
        {floating && <a href="#evolution" onClick={() => setOpen(false)}>วิวัฒนาการคำ</a>}
        {floating && <a href="#dialects" onClick={() => setOpen(false)}>ภาษาถิ่น</a>}
        <a
          className="nav-search"
          href={floating ? "#persistent-meaning" : "#meaning"}
          onClick={() => setOpen(false)}
        >
          เริ่มค้นหาความหมาย <span aria-hidden="true">↗</span>
        </a>
      </nav>
      {floating && (
        <button
          type="button"
          className="nav-menu-button"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      )}
    </header>
  );
}
