"use client";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import HeroSection, { type HeroHandle } from "./hero/HeroSection";
import MorphingNavbar from "./layout/MorphingNavbar";
import SearchResults from "./search/SearchResults";
import PersistentSearchComposer from "./search/PersistentSearchComposer";
import EvidenceDrawer from "./evidence/EvidenceDrawer";
import ContextComparator from "./compare/ContextComparator";
import EvolutionExplorer from "./evolution/EvolutionExplorer";
import DialectExplorer from "./dialect/DialectExplorer";
import Footer from "./layout/Footer";
import { mockSearch } from "@/lib/mock-search";
import type { Recommendation } from "@/lib/search-types";
import {
  experienceReducer,
  initialExperience,
  isCinematic,
} from "@/lib/experience-state";
import { searchMeaning } from "@/lib/api-client";
export default function SearchExperience() {
  const [model, dispatch] = useReducer(experienceReducer, initialExperience);
  const current = useRef(model);
  current.current = model;
  const hero = useRef<HeroHandle>(null);
  const nav = useRef<HTMLElement>(null);
  const results = useRef<HTMLElement>(null);
  const request = useRef<AbortController | null>(null);
  const sequence = useRef(0);
  const locked = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const floating =
    model.hasResults &&
    model.state !== "hero-idle" &&
    !isCinematic(model.state);
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener("change", update);
    return () => {
      m.removeEventListener("change", update);
      request.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!isCinematic(model.state)) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [model.state]);
  const back = useCallback(() => {
    if (
      locked.current ||
      isCinematic(current.current.state) ||
      current.current.state === "evidence-open"
    )
      return;
    request.current?.abort();
    hero.current?.reset();
    gsap.set(nav.current, { clearProps: "opacity,transform" });
    flushSync(() => dispatch({ type: "BACK" }));
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (
        locked.current ||
        !current.current.hasResults ||
        current.current.state === "evidence-open"
      )
        return;
      const height =
        document.getElementById("hero")?.offsetHeight ?? innerHeight;
      if (scrollY < height * 0.45 && current.current.state !== "hero-idle")
        back();
      else if (scrollY > height * 0.8 && current.current.state === "hero-idle")
        dispatch({ type: "VIEW_RESULTS" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [back]);
  function startRequest(query: string, source: "hero" | "composer") {
    const s = current.current;
    if (
      locked.current ||
      (source === "hero"
        ? s.state !== "hero-idle"
        : s.state !== "results-active" || s.loading)
    )
      return;
    locked.current = true;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const id = Math.max(sequence.current, s.requestId) + 1;
    sequence.current = id;
    if (source === "composer" && results.current)
      results.current.style.minHeight = `${results.current.offsetHeight}px`;
    flushSync(() =>
      dispatch({
        type: source === "hero" ? "HERO_SEARCH" : "COMPOSER_SEARCH",
        query,
        id,
      }),
    );
    // Start the network request in this submit turn; never await it before animation.
    const pending = searchMeaning(query, controller.signal);
    pending
      .then((result) => {
        if (!controller.signal.aborted)
          dispatch({ type: "RESOLVE", id, result });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          dispatch({
            type: "REJECT",
            id,
            error:
              error instanceof Error && error.name === "TimeoutError"
                ? "บริการค้นหาใช้เวลานาน กรุณาลองอีกครั้ง"
                : "ขณะนี้ค้นหาไม่ได้ กรุณาลองอีกครั้ง",
          });
      })
      .finally(() => {
        if (source === "composer" && request.current === controller)
          locked.current = false;
      });
    if (source === "composer") return;
    flushSync(() => dispatch({ type: "CINEMATIC" }));
    hero.current?.play(
      () => {
        // This callback runs only at opaque white. Commit staged response or skeleton first.
        flushSync(() => dispatch({ type: "WHITE" }));
        if (results.current) {
          results.current.style.minHeight = "";
          results.current.scrollIntoView({ behavior: "auto", block: "start" });
        }
        gsap.set(nav.current, { clearProps: "opacity,transform" });
      },
      () => {
        flushSync(() => dispatch({ type: "REVEAL" }));
        locked.current = false;
        document
          .getElementById("results-title")
          ?.focus({ preventScroll: true });
      },
    );
  }
  const comparisonWords = model.result?.recommendations.length
    ? model.result.recommendations
    : mockSearch("ทำงาน").recommendations;
  const toggleCompare = (word: Recommendation) => {
    setCompareSelected((selected) => {
      if (selected.includes(word.headword))
        return selected.filter((item) => item !== word.headword);
      return [...selected.slice(-1), word.headword];
    });
  };
  return (
    <div className="experience" data-experience-state={model.state}>
      <HeroSection
        heroRef={hero}
        navRef={nav}
        onSearch={(q) => startRequest(q, "hero")}
      />
      <MorphingNavbar
        navRef={nav}
        floating={floating}
        busy={isCinematic(model.state) || (floating && !model.revealed)}
        onHome={(e) => {
          e.preventDefault();
          back();
          if (!locked.current) {
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "auto" });
            document.getElementById("meaning")?.focus({ preventScroll: true });
          }
        }}
      />
      {model.hasResults && (
        <SearchResults
          experience={model}
          reduced={reduced}
          sectionRef={results}
          onEvidence={(word) => dispatch({ type: "OPEN_EVIDENCE", word })}
          compareSelected={compareSelected}
          onCompare={toggleCompare}
          onRetry={() => startRequest(model.query, "composer")}
        />
      )}
      {model.hasResults && model.revealed && (
        <div className="discovery-chapters">
          <ContextComparator
            words={comparisonWords.length >= 2 ? comparisonWords : mockSearch("ทำงาน").recommendations}
            selected={compareSelected}
            onSelect={setCompareSelected}
            onEvidence={(word) => dispatch({ type: "OPEN_EVIDENCE", word })}
          />
          <EvolutionExplorer word={model.result?.recommendations[0]?.headword ?? "ประสิทธิภาพ"} />
          <DialectExplorer />
          <Footer />
        </div>
      )}
      {floating && (
        <PersistentSearchComposer
          query={model.query}
          busy={model.loading || !model.revealed}
          onSearch={(q) => startRequest(q, "composer")}
        />
      )}
      {model.state === "evidence-open" && model.evidence && (
        <EvidenceDrawer
          word={model.evidence}
          isDemo={model.result?.mode !== "live"}
          onClose={() => dispatch({ type: "CLOSE_EVIDENCE" })}
        />
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {isCinematic(model.state)
          ? "กำลังค้นหาคำที่ใกล้กับสิ่งที่คุณกำลังคิด…"
          : ""}
      </p>
    </div>
  );
}
