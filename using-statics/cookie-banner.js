/*!
 * Cookie Consent Banner — Vanilla JS
 * Bilingual: English (default) / Arabic
 * Usage: <script src="cookie-banner.js"></script>
 */

(function () {
  const STORAGE_KEY = "cookie_consent";
  if (localStorage.getItem(STORAGE_KEY)) return;

  // ─── i18n ──────────────────────────────────────────────────────────────────
  const T = {
    en: {
      dir:          "ltr",
      title:        "We use cookies",
      desc:         "We use cookies to enhance your experience and analyse site traffic. You can manage your preferences or accept them all.",
      policy:       "Privacy Policy",
      tabSummary:   "Summary",
      tabCustom:    "Customise",
      necessary:    "Necessary",
      necessaryD:   "Required for the site to work — cannot be disabled.",
      analytics:    "Analytics",
      analyticsD:   "Helps us understand how visitors use the site.",
      marketing:    "Marketing",
      marketingD:   "Used to show ads relevant to your interests.",
      acceptAll:    "Accept all",
      savePrefs:    "Save preferences",
      essentialOnly:"Essential only",
      switchLang:   "عـربي",
    },
    ar: {
      dir:          "rtl",
      title:        "نستخدم ملفات تعريف الارتباط",
      desc:         "نستخدم الكوكيز لتحسين تجربتك وتحليل زيارات الموقع. بإمكانك التحكم في اختياراتك أو قبولها جميعاً.",
      policy:       "سياسة الخصوصية",
      tabSummary:   "ملخص",
      tabCustom:    "تخصيص",
      necessary:    "ضرورية",
      necessaryD:   "لازمة لتشغيل الموقع — لا يمكن إيقافها",
      analytics:    "تحليلية",
      analyticsD:   "تساعدنا نفهم كيف تستخدم الموقع",
      marketing:    "تسويقية",
      marketingD:   "لعرض إعلانات ذات صلة باهتماماتك",
      acceptAll:    "قبول الكل",
      savePrefs:    "حفظ التفضيلات",
      essentialOnly:"الضرورية فقط",
      switchLang:   "English",
    },
  };

  // ─── CSS ───────────────────────────────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

    :root {
      --cb-blue:        #2490e3;
      --cb-blue-light:  #e8f4fd;
      --cb-blue-mid:    #b3d9f7;
      --cb-green:       #22c55e;
      --cb-orange:      #f97316;
      --cb-purple:      #8b5cf6;
      --cb-text:        #1e293b;
      --cb-muted:       #64748b;
      --cb-border:      #e2e8f0;
      --cb-card:        #f8fafc;
      --cb-white:       #ffffff;
    }

    /* ── Overlay ── */
    #cb-overlay {
      position: fixed; inset: 0;
      background: rgba(30,41,59,.28);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9998;
      animation: cb-fi .35s ease forwards;
    }
    #cb-overlay.out { animation: cb-fo .4s ease forwards; }

    /* ── Banner wrapper ── */
    #cb-banner {
      position: fixed; bottom: 0; left: 0; right: 0;
      z-index: 9999;
      animation: cb-up .55s cubic-bezier(.16,1,.3,1) forwards;
    }
    #cb-banner.out { animation: cb-dn .42s cubic-bezier(.7,0,.84,0) forwards; }

    /* ── Card ── */
    #cb-inner {
      background: var(--cb-white);
      border-top: 1px solid var(--cb-border);
      box-shadow: 0 -6px 40px rgba(36,144,227,.10), 0 -1px 8px rgba(0,0,0,.04);
      position: relative;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Animated top stripe ── */
    #cb-stripe {
      height: 3px;
      background: linear-gradient(90deg,
        var(--cb-blue) 0%,
        var(--cb-purple) 30%,
        #60b4f5 55%,
        var(--cb-blue) 100%
      );
      background-size: 250% 100%;
      animation: cb-slide 4s linear infinite;
    }
    @keyframes cb-slide {
      0%   { background-position: 0%   0%; }
      100% { background-position: 250% 0%; }
    }

    /* ── Layout ── */
    #cb-body {
      display: grid;
      grid-template-columns: 1fr auto;
      max-width: 1360px;
      margin: 0 auto;
      padding: 24px 36px 28px;
      gap: 0;
      align-items: start;
    }
    @media (max-width: 760px) {
      #cb-body {
        grid-template-columns: 1fr;
        padding: 18px 18px 22px;
        gap: 18px;
      }
      #cb-right { padding-inline-start: 0 !important; }
    }

    /* ── Left ── */
    #cb-left  { display: flex; flex-direction: column; gap: 14px; }

    #cb-header { display: flex; align-items: center; gap: 12px; }

    #cb-ico {
      width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
      background: var(--cb-blue-light);
      border: 1px solid var(--cb-blue-mid);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      box-shadow: 0 2px 10px rgba(36,144,227,.15);
    }

    #cb-title {
      font-family: 'Instrument Serif', serif;
      font-size: 21px; font-weight: 400; font-style: italic;
      color: var(--cb-text); margin: 0;
      letter-spacing: -.01em; line-height: 1.2;
    }

    #cb-desc {
      font-size: 13.5px; color: var(--cb-muted);
      line-height: 1.7; margin: 0; max-width: 600px;
    }
    #cb-desc a {
      color: var(--cb-blue); text-decoration: none;
      border-bottom: 1px solid var(--cb-blue-mid);
      transition: border-color .2s;
    }
    #cb-desc a:hover { border-color: var(--cb-blue); }

    /* ── Tabs ── */
    #cb-tabs {
      display: flex; gap: 2px;
      background: var(--cb-card);
      border: 1px solid var(--cb-border);
      border-radius: 8px; padding: 3px;
      width: fit-content;
    }
    .cb-tab {
      padding: 5px 16px; border-radius: 6px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px; font-weight: 500;
      cursor: pointer; border: none;
      background: transparent; color: var(--cb-muted);
      transition: all .2s; letter-spacing: .02em;
    }
    .cb-tab.active {
      background: var(--cb-white); color: var(--cb-blue);
      box-shadow: 0 1px 4px rgba(0,0,0,.08);
    }

    /* ── Details rows ── */
    #cb-details { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }

    .cb-pref {
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 11px 14px;
      background: var(--cb-card);
      border: 1px solid var(--cb-border);
      border-radius: 8px; gap: 20px;
      transition: border-color .2s, box-shadow .2s;
    }
    .cb-pref:hover {
      border-color: var(--cb-blue-mid);
      box-shadow: 0 2px 8px rgba(36,144,227,.07);
    }
    .cb-pref-lhs { display: flex; align-items: center; gap: 10px; }
    .cb-dot {
      width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
    }
    .cb-dot-green  { background: var(--cb-green); }
    .cb-dot-blue   { background: var(--cb-blue); }
    .cb-dot-orange { background: var(--cb-orange); }

    .cb-pref-name { font-size: 13px; font-weight: 600; color: var(--cb-text); margin: 0 0 2px; }
    .cb-pref-desc { font-size: 12px; color: var(--cb-muted); margin: 0; }

    /* ── Toggle switch ── */
    .cb-toggle { position: relative; width: 42px; height: 23px; flex-shrink: 0; }
    .cb-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
    .cb-slider {
      position: absolute; inset: 0;
      background: var(--cb-border); border-radius: 23px;
      cursor: pointer; transition: background .25s, box-shadow .25s;
    }
    .cb-slider::before {
      content: ''; position: absolute;
      width: 17px; height: 17px; left: 3px; top: 3px;
      background: var(--cb-white); border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,.18);
      transition: transform .25s cubic-bezier(.16,1,.3,1);
    }
    .cb-toggle input:checked + .cb-slider {
      background: var(--cb-blue);
      box-shadow: 0 0 0 3px rgba(36,144,227,.15);
    }
    .cb-toggle input:checked + .cb-slider::before { transform: translateX(19px); }
    .cb-toggle input:disabled + .cb-slider { opacity: .45; cursor: not-allowed; }

    /* ── Right column ── */
    #cb-right {
      display: flex; flex-direction: column;
      gap: 7px; padding-inline-start: 36px;
      min-width: 190px;
    }

    /* ── Language button ── */
    #cb-lang {
      display: flex; align-items: center; justify-content: center; gap: 7px;
      padding: 7px 14px;
      background: var(--cb-card); border: 1px solid var(--cb-border);
      border-radius: 7px; cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px; font-weight: 500; color: var(--cb-muted);
      transition: all .2s; letter-spacing: .04em;
      margin-bottom: 1px;
    }
    #cb-lang:hover {
      border-color: var(--cb-blue-mid);
      color: var(--cb-blue);
      background: var(--cb-blue-light);
    }

    /* ── Action buttons ── */
    .cb-btn {
      padding: 11px 18px; border-radius: 8px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 13px; font-weight: 600;
      cursor: pointer; border: none;
      letter-spacing: .015em;
      transition: all .2s; white-space: nowrap;
      width: 100%; text-align: center;
    }

    #cb-accept {
      background: var(--cb-blue); color: var(--cb-white);
      box-shadow: 0 2px 12px rgba(36,144,227,.28);
    }
    #cb-accept:hover {
      background: #1a7fd4;
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(36,144,227,.38);
    }
    #cb-accept:active { transform: translateY(0); }

    #cb-save {
      background: var(--cb-blue-light); color: var(--cb-blue);
      border: 1px solid var(--cb-blue-mid);
      display: none;
    }
    #cb-save:hover { background: #d4eafb; border-color: var(--cb-blue); }

    #cb-reject {
      background: var(--cb-card); color: var(--cb-muted);
      border: 1px solid var(--cb-border);
    }
    #cb-reject:hover { border-color: #cbd5e1; color: var(--cb-text); background: #f1f5f9; }

    /* ── Keyframes ── */
    @keyframes cb-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes cb-dn { from { transform: translateY(0);    opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
    @keyframes cb-fi { from { opacity: 0; } to { opacity: 1; } }
    @keyframes cb-fo { from { opacity: 1; } to { opacity: 0; } }
  `;

  // ─── HTML builder ──────────────────────────────────────────────────────────
  function buildHTML(t) {
    return `
      <div id="cb-overlay"></div>
      <div id="cb-banner" dir="${t.dir}">
        <div id="cb-inner">
          <div id="cb-stripe"></div>
          <div id="cb-body">

            <div id="cb-left">
              <div id="cb-header">
                <div id="cb-ico">🍪</div>
                <h2 id="cb-title">${t.title}</h2>
              </div>

              <p id="cb-desc">
                ${t.desc}
                <a href="/policy/policy.html">${t.policy}</a>
              </p>

              <div id="cb-tabs">
                <button class="cb-tab active" data-tab="simple">${t.tabSummary}</button>
                <button class="cb-tab"        data-tab="details">${t.tabCustom}</button>
              </div>

              <div id="cb-details" style="display:none">
                <div class="cb-pref">
                  <div class="cb-pref-lhs">
                    <span class="cb-dot cb-dot-green"></span>
                    <div><p class="cb-pref-name">${t.necessary}</p><p class="cb-pref-desc">${t.necessaryD}</p></div>
                  </div>
                  <label class="cb-toggle"><input type="checkbox" checked disabled><span class="cb-slider"></span></label>
                </div>
                <div class="cb-pref">
                  <div class="cb-pref-lhs">
                    <span class="cb-dot cb-dot-blue"></span>
                    <div><p class="cb-pref-name">${t.analytics}</p><p class="cb-pref-desc">${t.analyticsD}</p></div>
                  </div>
                  <label class="cb-toggle"><input type="checkbox" id="cb-analytics"><span class="cb-slider"></span></label>
                </div>
                <div class="cb-pref">
                  <div class="cb-pref-lhs">
                    <span class="cb-dot cb-dot-orange"></span>
                    <div><p class="cb-pref-name">${t.marketing}</p><p class="cb-pref-desc">${t.marketingD}</p></div>
                  </div>
                  <label class="cb-toggle"><input type="checkbox" id="cb-marketing"><span class="cb-slider"></span></label>
                </div>
              </div>
            </div>

            <div id="cb-right">
              <button id="cb-lang">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                ${t.switchLang}
              </button>
              <button class="cb-btn" id="cb-accept">${t.acceptAll}</button>
              <button class="cb-btn" id="cb-save"  >${t.savePrefs}</button>
              <button class="cb-btn" id="cb-reject">${t.essentialOnly}</button>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // ─── State ─────────────────────────────────────────────────────────────────
  let currentLang = "en";
  let wrap = null;

  // ─── Mount / Re-render ─────────────────────────────────────────────────────
  function render() {
    // Inject CSS once
    if (!document.getElementById("cb-style")) {
      const s = document.createElement("style");
      s.id = "cb-style";
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    // Preserve toggle state across re-renders
    const prevAnalytics = document.getElementById("cb-analytics")?.checked ?? false;
    const prevMarketing = document.getElementById("cb-marketing")?.checked ?? false;
    const prevTab       = document.querySelector(".cb-tab.active")?.dataset.tab ?? "simple";

    // Tear down old
    wrap?.remove();

    // Inject new
    wrap = document.createElement("div");
    wrap.innerHTML = buildHTML(T[currentLang]);
    document.body.appendChild(wrap);

    // Restore toggle state
    const an = document.getElementById("cb-analytics");
    const mk = document.getElementById("cb-marketing");
    if (an) an.checked = prevAnalytics;
    if (mk) mk.checked = prevMarketing;

    // Restore active tab
    if (prevTab === "details") {
      document.querySelectorAll(".cb-tab").forEach(b => {
        b.classList.toggle("active", b.dataset.tab === "details");
      });
      document.getElementById("cb-details").style.display = "flex";
      document.getElementById("cb-save").style.display    = "block";
    }

    bindEvents();
  }

  // ─── Events ────────────────────────────────────────────────────────────────
  function bindEvents() {
    // Tab switching
    document.querySelectorAll(".cb-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cb-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const isDetails = btn.dataset.tab === "details";
        document.getElementById("cb-details").style.display = isDetails ? "flex"  : "none";
        document.getElementById("cb-save").style.display    = isDetails ? "block" : "none";
      });
    });

    // Language toggle
    document.getElementById("cb-lang").addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      render();
    });

    // Dismiss with animation
    function dismiss(choice) {
      const analytics = document.getElementById("cb-analytics")?.checked ?? false;
      const marketing = document.getElementById("cb-marketing")?.checked ?? false;

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        choice,
        prefs: { necessary: true, analytics, marketing },
        date:  new Date().toISOString(),
      }));

      window.dispatchEvent(new CustomEvent("cookieConsentSaved", {
        detail: { analytics, marketing }
      }));

      document.getElementById("cb-banner")?.classList.add("out");
      document.getElementById("cb-overlay")?.classList.add("out");
      setTimeout(() => wrap?.remove(), 500);
    }

    // Accept all — check both toggles first
    document.getElementById("cb-accept").addEventListener("click", () => {
      const an = document.getElementById("cb-analytics");
      const mk = document.getElementById("cb-marketing");
      if (an) an.checked = true;
      if (mk) mk.checked = true;
      dismiss("all");
    });

    // Save custom preferences
    document.getElementById("cb-save").addEventListener("click", () => dismiss("custom"));

    // Essential only
    document.getElementById("cb-reject").addEventListener("click", () => {
      const an = document.getElementById("cb-analytics");
      const mk = document.getElementById("cb-marketing");
      if (an) an.checked = false;
      if (mk) mk.checked = false;
      dismiss("necessary");
    });

    // Click on overlay → accept all
    document.getElementById("cb-overlay").addEventListener("click", () => {
      const an = document.getElementById("cb-analytics");
      const mk = document.getElementById("cb-marketing");
      if (an) an.checked = true;
      if (mk) mk.checked = true;
      dismiss("all");
    });
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }

})();