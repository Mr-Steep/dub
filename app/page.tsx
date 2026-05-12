"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

type ImageSlotProps = {
  placeholder?: string;
  src?: string;
};

function ImageSlot({ placeholder, src }: ImageSlotProps) {
  if (src) {
    return (
      <div className="image-slot">
        <img src={src} alt="" />
      </div>
    );
  }
  return (
    <div className="image-slot">
      <div className="image-slot-empty">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        {placeholder ? <div className="cap">{placeholder}</div> : null}
      </div>
    </div>
  );
}

export default function SpadarHome() {
  const navRef = useRef<HTMLElement | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmitInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const cc = (form.elements.namedItem("cc") as HTMLSelectElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const brief = (form.elements.namedItem("brief") as HTMLTextAreaElement).value.trim();

    const payload = {
      kind: "inquiry" as const,
      ts: new Date().toISOString(),
      phone: cc + " " + phone,
      brief,
      ref: "SPDR-" + Math.floor(Math.random() * 9000 + 1000),
    };

    // ───── Telegram bot hook ─────
    // Replace TG_BOT_TOKEN and TG_CHAT_ID below to enable.
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
      {/* ============== NAV ============== */}
      <nav className="nav" id="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <a className="brand brand-logo-link" href="#top" aria-label="SPADAR Automotive">
            <Image
              src="/spadar-logo.png"
              alt="SPADAR Automotive"
              className="brand-logo brand-logo--nav"
              width={925}
              height={175}
              priority
            />
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#coverage">Coverage</a>
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#proof">Portfolio</a>
            <a className="nav-link" href="#contact">Contact</a>
          </div>
          <a className="cta-gold" href="#contact">Request Inquiry</a>
        </div>
      </nav>

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
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >

                <source src="/b.webm" type="video/webm" />
              </video>
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
            <div className="right mono">
              <span>25.276987°N / 55.296249°E</span>
              <span>FILE №&nbsp;SPDR-0426</span>
            </div>
          </div>

          <h1 className="display hero-title">
            <span className="line"><span>Private</span></span>
            <span className="line"><span>vehicle</span></span>
            <span className="line"><span className="chrome">Brokerage.</span></span>
          </h1>
        </div>
      </header>

      {/* ============== GLOBAL COVERAGE ============== */}
      <section className="coverage" id="coverage">
        <div className="wrap">
          <div className="section-head">
            <div className="lhs">
              <div className="eyebrow">02 — Global Coverage</div>
              <h2>
                Seven hubs.<br />
                <span className="gold">One file</span> handler.
              </h2>
            </div>
            <div className="rhs">
              Operations dispatched from our Dubai desk and routed through bonded partners in{" "}
              <strong style={{ color: "var(--ink)" }}>
                London, New York, Tokyo, Monaco, Singapore, Sydney and Miami
              </strong>
              . Air-freighted in climate-sealed containers. Tarmac handover by white-glove
              transport — no dealership, no showroom.
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
              <g className="grid-bg">
                <line x1="0" y1="90" x2="1200" y2="90" />
                <line x1="0" y1="180" x2="1200" y2="180" />
                <line x1="0" y1="270" x2="1200" y2="270" />
                <line x1="0" y1="360" x2="1200" y2="360" />
                <line x1="0" y1="450" x2="1200" y2="450" />
                <line x1="150" y1="0" x2="150" y2="540" />
                <line x1="300" y1="0" x2="300" y2="540" />
                <line x1="450" y1="0" x2="450" y2="540" />
                <line x1="600" y1="0" x2="600" y2="540" />
                <line x1="750" y1="0" x2="750" y2="540" />
                <line x1="900" y1="0" x2="900" y2="540" />
                <line x1="1050" y1="0" x2="1050" y2="540" />
              </g>

              <line
                x1="0"
                y1="290"
                x2="1200"
                y2="290"
                stroke="rgba(201,169,97,.18)"
                strokeWidth=".6"
                strokeDasharray="2 6"
              />

              <path className="continent" d="M180,140 L290,120 L360,160 L380,220 L320,260 L250,250 L200,210 Z" />
              <path className="continent" d="M260,210 L330,260 L320,330 L280,360 L240,330 L230,270 Z" />
              <path className="continent" d="M460,130 L580,120 L640,160 L680,210 L600,220 L520,200 Z" />
              <path className="continent" d="M540,210 L640,220 L660,290 L590,300 L540,260 Z" />
              <path className="continent" d="M620,300 L660,330 L650,380 L600,400 L580,360 Z" />
              <path className="continent" d="M680,170 L820,160 L900,210 L870,280 L760,270 L700,220 Z" />
              <path className="continent" d="M830,180 L900,170 L940,210 L900,250 L850,230 Z" />
              <path className="continent" d="M940,360 L1010,370 L1030,430 L970,440 L940,400 Z" />

              <path className="route" d="M720,260 Q620,150 540,170" />
              <path className="route" d="M720,260 Q500,160 280,220" />
              <path className="route" d="M720,260 Q860,160 1010,230" />
              <path className="route" d="M720,260 Q640,180 560,200" />
              <path className="route" d="M720,260 Q840,320 940,350" />
              <path className="route" d="M720,260 Q900,380 1050,430" />
              <path className="route" d="M720,260 Q500,210 310,270" />

              <circle className="hub-ring" cx="720" cy="260" r="3" />
              <circle className="hub-dot" cx="720" cy="260" r="4" />
              <text
                x="732"
                y="252"
                className="city-label"
                style={{ fill: "#fff", letterSpacing: ".2em", fontWeight: 600 }}
              >
                DUBAI · HQ
              </text>

              <g>
                <circle className="city-pulse" cx="540" cy="170" r="3" />
                <circle className="city-dot" cx="540" cy="170" r="3" />
                <text x="550" y="165" className="city-label">London</text>

                <circle className="city-pulse" cx="280" cy="220" r="3" />
                <circle className="city-dot" cx="280" cy="220" r="3" />
                <text x="290" y="215" className="city-label">New York</text>

                <circle className="city-pulse" cx="1010" cy="230" r="3" />
                <circle className="city-dot" cx="1010" cy="230" r="3" />
                <text x="1020" y="225" className="city-label">Tokyo</text>

                <circle className="city-pulse" cx="560" cy="200" r="3" />
                <circle className="city-dot" cx="560" cy="200" r="3" />
                <text x="500" y="216" className="city-label">Monaco</text>

                <circle className="city-pulse" cx="940" cy="350" r="3" />
                <circle className="city-dot" cx="940" cy="350" r="3" />
                <text x="950" y="346" className="city-label">Singapore</text>

                <circle className="city-pulse" cx="1050" cy="430" r="3" />
                <circle className="city-dot" cx="1050" cy="430" r="3" />
                <text x="1060" y="426" className="city-label">Sydney</text>

                <circle className="city-pulse" cx="310" cy="270" r="3" />
                <circle className="city-dot" cx="310" cy="270" r="3" />
                <text x="320" y="265" className="city-label">Miami</text>
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
                Allocation slots negotiated directly with the marque&rsquo;s private office. We
                bypass dealership queues for hypercar tranches, armored saloons and one-off
                coachbuilt commissions.
              </p>
              <ul>
                <li>Factory allocation pull</li>
                <li>Private-office liaison</li>
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
                Climate-sealed containers, GPS-blackout escort, and tarmac-to-tarmac handover
                via private freight partners. Vehicle status visible only to two parties — the
                principal and the handler.
              </p>
              <ul>
                <li>Bonded warehouse staging</li>
                <li>Private freight charter</li>
                <li>Armed escort optional</li>
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
                End-to-end paperwork — KYC, AML, beneficial ownership, customs, homologation
                and re-registration in destination jurisdiction. DMCC-licensed; audited annually.
              </p>
              <ul>
                <li>DMCC Free Zone licensed</li>
                <li>AML / KYC framework</li>
                <li>Homologation in 62 markets</li>
                <li>Re-registration concierge</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ============== VISUAL PROOF ============== */}
      <section className="proof" id="proof">
        <div className="proof-img">
          <ImageSlot placeholder="Cinematic shot — matte black saloon, private jet tarmac, golden-hour, low-angle, 16:9" />
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
      <section className="contact" id="contact">
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
                <label htmlFor="phone">Phone — preferred reply</label>
                <div className="phone-row">
                  <select id="cc" name="cc" defaultValue="+971">
                    <option value="+971">+971 AE</option>
                    <option value="+44">+44 UK</option>
                    <option value="+1">+1 US</option>
                    <option value="+33">+33 FR</option>
                    <option value="+377">+377 MC</option>
                    <option value="+65">+65 SG</option>
                    <option value="+81">+81 JP</option>
                    <option value="+61">+61 AU</option>
                  </select>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="50 000 0000"
                    required
                  />
                </div>
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
                className="submit"
                type="submit"
                style={
                  submittedRef
                    ? {
                        background: "linear-gradient(180deg,#0E0E18,#04040A)",
                        color: "var(--gold)",
                        borderColor: "var(--gold)",
                      }
                    : undefined
                }
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

      {/* ============== FOOTER ============== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <Image
                src="/spadar-logo.png"
                alt="SPADAR Automotive"
                className="brand-logo brand-logo--foot"
                width={925}
                height={175}
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
