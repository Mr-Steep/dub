"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Value as PhoneValue } from "./PhoneField";

const PhoneField = dynamic(() => import("./PhoneField"), {
  ssr: false,
  loading: () => (
    <div className="phone-input phone-input--placeholder" aria-hidden="true">
      <span className="phone-input__placeholder-flag" />
      <span className="phone-input__placeholder-input">50 000 0000</span>
    </div>
  ),
});

export default function SpadarHome() {
  const navSentinelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const proofVideoRef = useRef<HTMLVideoElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const proofRef = useRef<HTMLElement | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [phone, setPhone] = useState<PhoneValue | undefined>();
  const [phoneError, setPhoneError] = useState(false);
  const [mountPhone, setMountPhone] = useState(false);
  const [mountVideos, setMountVideos] = useState(false);

  useEffect(() => {
    const sentinel = navSentinelRef.current;
    const nav = navRef.current;
    if (!sentinel || !nav) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) nav.classList.remove("scrolled");
        else nav.classList.add("scrolled");
      },
      { rootMargin: "-12px 0px 0px 0px", threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reducedData =
      typeof navigator !== "undefined" &&
      "connection" in navigator &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((navigator as any).connection?.saveData === true ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /(^|[^a-z])2g/i.test((navigator as any).connection?.effectiveType ?? ""));
    if (reducedData) return;
    if (window.matchMedia("(max-width: 720px), (prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const schedule =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).requestIdleCallback?.bind(window) ??
      ((cb: () => void) => window.setTimeout(cb, 200));
    const cancel =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).cancelIdleCallback?.bind(window) ?? window.clearTimeout;
    const id = schedule(() => setMountVideos(true), { timeout: 1500 });
    return () => cancel(id);
  }, []);

  useEffect(() => {
    if (!mountVideos) return;
    const observe = (el: Element | null, target: HTMLVideoElement | null) => {
      if (!el || !target) return null;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              target.play().catch(() => {});
            } else {
              target.pause();
            }
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(el);
      return io;
    };
    const observers = [
      observe(document.getElementById("top"), heroVideoRef.current),
      observe(proofRef.current, proofVideoRef.current),
    ];
    return () => observers.forEach((io) => io?.disconnect());
  }, [mountVideos]);

  useEffect(() => {
    const target = contactRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMountPhone(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const onSubmitInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValidPhoneNumber } = await import("./PhoneField");
    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    const form = e.currentTarget;
    const brief = (form.elements.namedItem("brief") as HTMLTextAreaElement).value.trim();

    const payload = {
      kind: "inquiry" as const,
      ts: new Date().toISOString(),
      phone,
      brief,
      ref: "SPDR-" + Math.floor(Math.random() * 9000 + 1000),
    };

    // ───── Telegram bot hook ─────
    const TG_BOT_TOKEN = "";
    const TG_CHAT_ID = "";
    if (TG_BOT_TOKEN && TG_CHAT_ID) {
      const text =
        `New inquiry %0A` +
        `Ref: ${payload.ref}%0A` +
        `Phone: ${payload.phone}%0A` +
        `Brief: ${payload.brief || "—"}`;
      try {
        await fetch(
          `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${text}`
        );
      } catch {
        // swallow
      }
    }

    setSubmittedRef(payload.ref);
  };

  return (
    <>
      <div ref={navSentinelRef} aria-hidden="true" style={{ position: "absolute", top: 0, height: 1, width: 1 }} />
      {/* ============== NAV ============== */}
      <nav className="nav" id="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <a className="brand brand-logo-link" href="#top" aria-label="SPADAR Automotive">
            <Image
              src="/spadar-logo.webp"
              alt="SPADAR Automotive"
              className="brand-logo brand-logo--nav"
              width={925}
              height={175}
              priority
              sizes="(max-width: 720px) 160px, 232px"
            />
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#coverage">Coverage</a>
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#proof">Portfolio</a>
            <a className="nav-link" href="#contact">Contact</a>
          </div>
          <a className="cta-outline cta-nav" href="#contact">Request Inquiry</a>
        </div>
      </nav>

      <main>
      {/* ============== HERO ============== */}
      <header className="hero" id="top">
        <div className="carbon-bg" />
        <div className="hero-grid" />
        <div className="hero-bokeh" />
        <div className="grain" />

        <div className="streaks">
          <span className="streak s1" />
          <span className="streak s2" />
          <span className="streak s3" />
        </div>

        <div className="hero-headlight">
          <div className="slot-wrap">
            <div className="hero-yt">
              {mountVideos && (
                <video
                  ref={heroVideoRef}
                  className="hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster=""
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <source src="/b.webm" type="video/webm" />
                </video>
              )}
              <div className="hero-yt-veil" />
            </div>
          </div>
        </div>

        <div className="wrap hero-content">
          <div className="hero-meta">
            <div className="mono" style={{ color: "var(--gold)" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  background: "var(--gold)",
                  borderRadius: "50%",
                  marginRight: 8,
                  verticalAlign: "middle",
                  boxShadow: "0 0 10px var(--gold)",
                }}
              />
              EST. DMCC FREE ZONE — DUBAI
            </div>
          </div>

          <h1 className="display hero-title">
            <span className="line"><span>Any car.</span></span>
            <span className="line"><span>Any point</span></span>
            <span className="line"><span className="chrome">of the world.</span></span>
          </h1>

          <p className="hero-sub">
            Professional Ultra-Luxury logistics. We find and deliver new and rare models
            where others don&rsquo;t see paths.
          </p>

          <a className="cta-outline hero-cta" href="#contact">Request a Quote</a>
        </div>

        <div className="hero-coords mono">
          <span>25.276987°N / 55.296249°E</span>
          <span>FILE №&nbsp;SPDR-0426</span>
        </div>
      </header>

      {/* ============== GLOBAL COVERAGE ============== */}
      <section className="coverage" id="coverage">
        <div className="wrap">
          <div className="section-head">
            <div className="lhs">
              <div className="eyebrow">02 — Global Coverage</div>
              <h2>
                Geography<br />
                <span className="gold">without borders.</span>
              </h2>
            </div>
            <div className="rhs">
              <strong style={{ color: "var(--ink)" }}>Your location is not a limitation.</strong>{" "}
              We operate on five continents, using dedicated air and sea corridors. Dispatch
              from our Dubai desk, tarmac handover by white-glove transport — no dealership,
              no showroom.
            </div>
          </div>

          <div className="map-wrap">
            <span className="map-corner tl" />
            <span className="map-corner tr" />
            <span className="map-corner bl" />
            <span className="map-corner br" />

            <div className="map-meta">
              <div className="mono">FIG. 01 — ACTIVE ROUTES // LAST 90 DAYS</div>
              <div className="live mono">
                <span className="dot" />LIVE OPERATIONS — 7
              </div>
            </div>

            <svg className="map-svg" viewBox="0 0 1200 540" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="mapDotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.65" fill="rgba(201,169,97,.12)" />
                </pattern>
                <radialGradient id="mapVignette" cx="50%" cy="50%" r="65%">
                  <stop offset="55%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(4,4,10,.65)" />
                </radialGradient>
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="worldGoldTint" x="0%" y="0%" width="100%" height="100%">
                  <feFlood floodColor="#C9A961" floodOpacity="0.32" result="tint" />
                  <feComposite in="tint" in2="SourceAlpha" operator="in" />
                </filter>
              </defs>

              {/* Dot-grid scan background */}
              <rect width="1200" height="540" fill="url(#mapDotGrid)" />

              {/* Vecteezy world map (licensed). Cropped to content bounds (1433×709)
                  to remove whitespace padding. Rendered at scale 0.82 + translate(12,-15)
                  so the map fills the viewBox properly. City pins were placed by
                  programmatic land-detection sampling of this exact PNG. */}
              <g transform="translate(12 -15) scale(0.82)" filter="url(#worldGoldTint)">
                <image href="/world-map-cropped.webp" width="1433" height="709" preserveAspectRatio="xMidYMid meet" />
              </g>

              {/* Equator */}
              <line
                x1="0"
                y1="290"
                x2="1200"
                y2="290"
                stroke="rgba(201,169,97,.22)"
                strokeWidth=".6"
                strokeDasharray="2 6"
              />

              {/* Range rings — centered on Dubai */}
              <g className="range-rings" transform="translate(720 280)">
                <circle r="120" />
                <circle r="220" />
                <circle r="340" />
                <circle r="480" />
              </g>

              {/* Routes from Dubai (720, 280) — coords auto-derived from PNG land-sampling */}
              <g filter="url(#routeGlow)">
                <path className="route" d="M720,280 Q630,200 540,166" />
                <path className="route" d="M720,280 Q450,200 270,230" />
                <path className="route" d="M720,280 Q880,230 1010,236" />
                <path className="route" d="M720,280 Q640,230 580,200" />
                <path className="route" d="M720,280 Q840,360 985,400" />
                <path className="route" d="M720,280 Q900,420 1055,470" />
                <path className="route" d="M720,280 Q450,290 280,310" />
              </g>

              {/* Vignette overlay */}
              <rect width="1200" height="540" fill="url(#mapVignette)" pointerEvents="none" />

              {/* City pins — auto-placed via land-density sampling of the PNG */}
              <g>
                <g className="city" transform="translate(540 166)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="11" y="-5" className="city-label">London</text>
                </g>

                <g className="city" transform="translate(270 230)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="11" y="-5" className="city-label">New York</text>
                </g>

                <g className="city" transform="translate(1010 236)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="-50" y="-5" className="city-label">Tokyo</text>
                </g>

                <g className="city" transform="translate(580 200)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="11" y="-5" className="city-label">Monaco</text>
                </g>

                <g className="city" transform="translate(985 400)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="11" y="-5" className="city-label">Singapore</text>
                </g>

                <g className="city" transform="translate(1055 470)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="-44" y="-10" className="city-label">Sydney</text>
                </g>

                <g className="city" transform="translate(280 310)">
                  <circle className="city-pulse" r="3" />
                  <circle className="city-ring" r="6" />
                  <circle className="city-dot" r="2.4" />
                  <text x="11" y="-5" className="city-label">Miami</text>
                </g>
              </g>

              {/* Dubai HQ hub — over Arabian Peninsula */}
              <g className="hub" transform="translate(720 280)">
                <circle className="hub-ring-outer" r="14" />
                <circle className="hub-ring" r="3" />
                <circle className="hub-dot" r="4.5" />
                <line className="hub-tick" x1="0" y1="-18" x2="0" y2="-22" />
                <line className="hub-tick" x1="0" y1="18" x2="0" y2="22" />
                <line className="hub-tick" x1="-18" y1="0" x2="-22" y2="0" />
                <line className="hub-tick" x1="18" y1="0" x2="22" y2="0" />
                <text className="hub-label" x="20" y="-12">
                  Dubai · HQ
                </text>
                <text className="hub-sublabel" x="20" y="2">
                  25.27°N / 55.30°E
                </text>
              </g>
            </svg>
          </div>

          <div className="stats-row">
            <div className="stat-box">
              <div className="num">
                <span className="gold">62</span>
              </div>
              <div className="lbl">Jurisdictions</div>
              <div className="desc">
                Bonded customs partners in 62 countries, including non-CITES sensitive markets.
              </div>
            </div>
            <div className="stat-box">
              <div className="num">
                <span className="gold">96</span>h
              </div>
              <div className="lbl">Median lead time</div>
              <div className="desc">
                From signed brief to confirmed allocation on a hypercar or armored asset.
              </div>
            </div>
            <div className="stat-box">
              <div className="num">
                €<span className="gold">1.4</span>B
              </div>
              <div className="lbl">Cumulative GMV</div>
              <div className="desc">
                Disclosed and undisclosed vehicle placements across 14 years of ops.
              </div>
            </div>
            <div className="stat-box">
              <div className="num">
                <span className="gold">0</span>
              </div>
              <div className="lbl">Public disclosures</div>
              <div className="desc">
                Every transaction routed under NDA. No press, no auction floor, no social.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CORE SERVICES ============== */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head">
            <div className="lhs">
              <div className="eyebrow">03 — Core Services</div>
              <h2>
                Three lanes.<br />
                <span className="gold">Zero leakage.</span>
              </h2>
            </div>
            <div className="rhs">
              Each file is sealed across three operational lanes — sourcing, transit and
              compliance — and handled by a single principal handler. No subcontract chain.
              No third-party touch.
            </div>
          </div>

          <div className="svc-grid">
            <article className="svc">
              <div className="svc-num">01 / SOURCING</div>
              <svg className="svc-icon" viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M2 36 L10 22 L24 18 L40 16 L54 22 L62 36 Z" />
                <circle cx="16" cy="36" r="6" />
                <circle cx="48" cy="36" r="6" />
                <path d="M40 16 L36 22 L24 22 L24 18" />
              </svg>
              <h3>Direct<br />Sourcing</h3>
              <p>
                Direct buyout from dealers and distributors worldwide — including models
                from closed waitlists and unannounced allocations.
              </p>
              <ul>
                <li>Worldwide dealer network</li>
                <li>Closed-waitlist access</li>
                <li>Pre-production reservation</li>
                <li>Spec book co-authoring</li>
              </ul>
            </article>

            <article className="svc">
              <div className="svc-num">02 / TRANSIT</div>
              <svg className="svc-icon" viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="6" y="14" width="42" height="22" />
                <path d="M48 18 L58 22 L58 32 L48 32" />
                <circle cx="16" cy="40" r="4" />
                <circle cx="40" cy="40" r="4" />
                <path d="M14 22 L22 22 M14 28 L22 28 M30 22 L38 22" strokeDasharray="2 2" />
              </svg>
              <h3>Secure<br />Transit</h3>
              <p>
                Transport in armored or fully enclosed car carriers. 24/7 GPS monitoring,
                bonded staging, tarmac-to-tarmac handover.
              </p>
              <ul>
                <li>Armored / enclosed carriers</li>
                <li>24/7 GPS monitoring</li>
                <li>Bonded warehouse staging</li>
                <li>Insurance up to €40M</li>
              </ul>
            </article>

            <article className="svc">
              <div className="svc-num">03 / COMPLIANCE</div>
              <svg className="svc-icon" viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M32 4 L54 12 L54 26 C54 36 44 42 32 46 C20 42 10 36 10 26 L10 12 Z" />
                <path d="M22 24 L30 32 L44 18" />
              </svg>
              <h3>Full<br />Compliance</h3>
              <p>
                Legal support, customs clearance and registration. You get the keys —
                we handle everything else.
              </p>
              <ul>
                <li>DMCC Free Zone licensed</li>
                <li>Customs &amp; homologation</li>
                <li>Registration concierge</li>
                <li>AML / KYC framework</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ============== VISUAL PROOF ============== */}
      <section className="proof" id="proof" ref={proofRef}>
        <div className="proof-img">
          {mountVideos && (
            <video
              ref={proofVideoRef}
              className="proof-video"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster=""
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/g.webm" type="video/webm" />
            </video>
          )}
        </div>

        <div className="wrap proof-inner">
          <div className="proof-meta">
            <div className="eyebrow">04 — Visual Proof</div>
            <div className="mono" style={{ color: "var(--gold)", textAlign: "right" }}>
              FILE №&nbsp;SPDR-0419<br />
              <span style={{ color: "var(--muted)" }}>DUBAI · DXB-OPS · 03:42 GST</span>
            </div>
          </div>

          <h2 className="display proof-title">
            <span style={{ display: "block" }}>We don&rsquo;t</span>
            <span style={{ display: "block" }}>sell cars.</span>
            <span style={{ display: "block" }} className="filled">Excelled.</span>
          </h2>

          <p className="proof-sub">
            We deliver the half-hour after landing — a sealed file, a vehicle on the apron, a
            single handler. Tarmac to garage in under 90 minutes, anywhere our network reaches.
          </p>

          <div className="proof-tags">
            <span className="tag">Tarmac handover</span>
            <span className="tag">White-glove transit</span>
            <span className="tag">No press, no auction</span>
            <span className="tag">One handler · One file</span>
            <span className="tag">NDA standard</span>
          </div>
        </div>
      </section>

      {/* ============== CONTACT ============== */}
      <section className="contact" id="contact" ref={contactRef}>
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-lhs">
              <div className="eyebrow">05 — Request Inquiry</div>
              <h2>
                Open <em>a file</em><br />with us.
              </h2>
              <p>
                Submit a private number. Our Dubai desk replies within four working hours via
                your preferred secure channel. No call centre, no junior, no record outside
                our vault.
              </p>

              <div className="badge-row">
                <div className="badge">
                  <div className="badge-num">04</div>
                  <div className="badge-txt">Hour reply<br />window</div>
                </div>
                <div className="badge">
                  <div className="badge-num">01</div>
                  <div className="badge-txt">Dedicated<br />handler</div>
                </div>
                <div className="badge">
                  <div className="badge-num">∞</div>
                  <div className="badge-txt">NDA<br />standard</div>
                </div>
              </div>
            </div>

            <form className="form" autoComplete="off" onSubmit={onSubmitInquiry}>
              <span className="form-corner tl" />
              <span className="form-corner tr" />
              <span className="form-corner bl" />
              <span className="form-corner br" />

              <div className="form-title">Secure intake</div>
              <h3>Submit your number.</h3>

              <div className="field">
                <label htmlFor="phone-input">Phone — preferred reply</label>
                {mountPhone ? (
                  <PhoneField
                    id="phone-input"
                    value={phone}
                    onChange={(v) => {
                      setPhone(v);
                      if (phoneError) setPhoneError(false);
                    }}
                    invalid={phoneError}
                  />
                ) : (
                  <div
                    className="phone-input phone-input--placeholder"
                    onClick={() => setMountPhone(true)}
                    onFocus={() => setMountPhone(true)}
                    onMouseEnter={() => setMountPhone(true)}
                  >
                    <span className="phone-input__placeholder-flag" />
                    <span className="phone-input__placeholder-input">50 000 0000</span>
                  </div>
                )}
                {phoneError && (
                  <span className="field-error">Please enter a valid phone number</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="brief">Brief — optional</label>
                <textarea
                  id="brief"
                  name="brief"
                  rows={3}
                  placeholder="Marque, model, target window, jurisdiction…"
                />
              </div>

              <button
                className={`cta-outline cta-submit${submittedRef ? " is-filed" : ""}`}
                type="submit"
              >
                {submittedRef ? `✓ Filed — ${submittedRef}` : "Submit Inquiry"}
              </button>

              <div className="messengers">
                <span className="lbl">Or via</span>

                <a className="msg-btn" href="#">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21 4.4 16.7A8.5 8.5 0 1 1 7.5 19.7L3 21Z" />
                    <path d="M8.5 9.5C8.5 12 10.5 14.5 13 15.5L14.7 14.3C15.1 14 15.6 14 16 14.2L18.5 15.2C19 15.4 19.2 15.9 19 16.4L18.6 17.4C18.3 18.2 17.5 18.7 16.6 18.6C13.2 18.4 9 14.9 8.6 11.5C8.5 10.6 9 9.8 9.8 9.5L10.8 9.1C11.3 8.9 11.8 9.1 12 9.6L13 12.1C13.2 12.5 13.2 13 12.9 13.4L11.7 14.3" />
                  </svg>
                  WhatsApp
                </a>

                <a className="msg-btn" href="#">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 4 2.5 11 9 13.5 17 7 11.5 14.5 11.5 19 14 16 18 19 21.5 4Z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
      </main>

      {/* ============== FOOTER ============== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <Image
                src="/spadar-logo.webp"
                alt="SPADAR Automotive"
                className="brand-logo brand-logo--foot"
                width={925}
                height={175}
                loading="lazy"
                sizes="(max-width: 720px) 200px, 360px"
              />
              <p>
                A private vehicle brokerage operating from the DMCC Free Zone, Dubai.
                Discretionary placement of hypercars, armored saloons and ultra-rare collector
                pieces since 2012.
              </p>
            </div>

            <div className="foot-col">
              <h4>Office</h4>
              <ul>
                <li>Unit 1402, JBC 4 Tower</li>
                <li>Jumeirah Lakes Towers</li>
                <li>DMCC Free Zone</li>
                <li>Dubai, U.A.E.</li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:desk@spadar.auto">desk@spadar.auto</a></li>
                <li><a href="tel:+97150000000">+971 50 000 0000</a></li>
                <li><a href="#">WhatsApp</a></li>
                <li><a href="#">Telegram</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>Legal</h4>
              <ul>
                <li>DMCC Lic. 0428-419</li>
                <li>VAT TRN 1004-2871-93</li>
                <li><a href="#">Privacy &amp; NDA</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <div>© 2012—2026 SPADAR Automotive FZ-LLC. All rights reserved.</div>
            <div>Registered DMCC Free Zone — Dubai</div>
          </div>
        </div>
      </footer>
    </>
  );
}
