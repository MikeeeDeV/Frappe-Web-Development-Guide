/*!
 * Cookie Consent Banner — Vanilla JS
 * ضعه قبل </body> في صفحتك:
 * <script src="cookie-banner.js"></script>
 */

(function () {
  const STORAGE_KEY = "cookie_consent";
  if (localStorage.getItem(STORAGE_KEY)) return; // سبق وافق

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {

  // ─── Styles ───────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');

    #cb-overlay {
      position:fixed;inset:0;background:rgba(10,8,6,.45);
      backdrop-filter:blur(3px);z-index:9998;
      animation:cb-fi .4s ease forwards;
    }
    #cb-overlay.out{animation:cb-fo .45s ease forwards;}

    #cb-banner {
      position:fixed;bottom:0;left:0;right:0;z-index:9999;
      font-family:'DM Sans',sans-serif;
      animation:cb-up .55s cubic-bezier(.16,1,.3,1) forwards;
    }
    #cb-banner.out{animation:cb-dn .45s cubic-bezier(.7,0,.84,0) forwards;}

    #cb-inner{background:#0f0d0b;border-top:1px solid #2a2520;overflow:hidden;}

    #cb-accent{height:3px;background:linear-gradient(90deg,#c9a96e,#e8c98a 40%,#b8865a);}

    #cb-body{
      display:grid;grid-template-columns:1fr auto;gap:0;
      max-width:1400px;margin:0 auto;padding:28px 36px;align-items:start;
    }
    @media(max-width:768px){
      #cb-body{grid-template-columns:1fr;padding:20px;gap:20px;}
      #cb-right{padding-left:0!important;flex-direction:row;flex-wrap:wrap;}
    }

    #cb-left{display:flex;flex-direction:column;gap:16px;}

    #cb-header{display:flex;align-items:center;gap:12px;}
    #cb-ico{
      width:36px;height:36px;background:linear-gradient(135deg,#c9a96e22,#c9a96e44);
      border:1px solid #c9a96e55;border-radius:8px;
      display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;
    }
    #cb-title{
      font-family:'DM Serif Display',serif;font-size:20px;
      color:#f0ebe4;margin:0;letter-spacing:.01em;
    }
    #cb-desc{font-size:13.5px;color:#8a7f74;line-height:1.65;margin:0;max-width:640px;}
    #cb-desc a{color:#c9a96e;text-decoration:none;border-bottom:1px solid #c9a96e44;}

    #cb-tabs{
      display:flex;gap:2px;background:#1a1714;border-radius:6px;
      padding:3px;width:fit-content;
    }
    .cb-tab{
      padding:5px 14px;border-radius:4px;font-size:12px;font-weight:500;
      cursor:pointer;border:none;background:transparent;color:#5a5249;
      transition:all .2s;letter-spacing:.03em;font-family:'DM Sans',sans-serif;
    }
    .cb-tab.active{background:#2a2420;color:#c9a96e;}

    #cb-details{display:flex;flex-direction:column;gap:10px;padding-top:4px;}

    .cb-pref{
      display:flex;align-items:center;justify-content:space-between;
      padding:12px 16px;background:#1a1714;border-radius:8px;
      border:1px solid #252019;gap:20px;
    }
    .cb-pref-name{font-size:13px;font-weight:500;color:#d0c9c0;margin:0 0 2px;}
    .cb-pref-desc{font-size:12px;color:#5a5249;margin:0;}

    .cb-toggle{position:relative;width:40px;height:22px;flex-shrink:0;}
    .cb-toggle input{opacity:0;width:0;height:0;}
    .cb-slider{
      position:absolute;inset:0;background:#2a2520;border-radius:22px;
      cursor:pointer;transition:.25s;border:1px solid #3a3028;
    }
    .cb-slider:before{
      content:'';position:absolute;width:16px;height:16px;left:2px;top:2px;
      background:#5a5249;border-radius:50%;transition:.25s cubic-bezier(.16,1,.3,1);
    }
    .cb-toggle input:checked+.cb-slider{background:#c9a96e22;border-color:#c9a96e66;}
    .cb-toggle input:checked+.cb-slider:before{transform:translateX(18px);background:#c9a96e;}
    .cb-toggle input:disabled+.cb-slider{opacity:.5;cursor:not-allowed;}

    #cb-right{
      display:flex;flex-direction:column;gap:8px;
      padding-left:40px;min-width:180px;
    }
    .cb-btn{
      padding:11px 20px;border-radius:7px;font-family:'DM Sans',sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;border:none;
      letter-spacing:.02em;transition:all .2s;white-space:nowrap;
    }
    .cb-btn-accept{background:linear-gradient(135deg,#c9a96e,#e8c98a);color:#0f0d0b;}
    .cb-btn-accept:hover{background:linear-gradient(135deg,#d4b87a,#f0d496);transform:translateY(-1px);box-shadow:0 4px 16px #c9a96e33;}
    .cb-btn-reject{background:#1a1714;color:#8a7f74;border:1px solid #2a2520;}
    .cb-btn-reject:hover{color:#d0c9c0;border-color:#3a3028;}
    .cb-btn-save{background:#2a2420;color:#c9a96e;border:1px solid #c9a96e33;display:none;}
    .cb-btn-save:hover{background:#342e28;border-color:#c9a96e66;}

    @keyframes cb-up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes cb-dn{from{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}
    @keyframes cb-fi{from{opacity:0}to{opacity:1}}
    @keyframes cb-fo{from{opacity:1}to{opacity:0}}
  `;

  // ─── HTML ──────────────────────────────────────────
  const html = `
    <div id="cb-overlay"></div>
    <div id="cb-banner">
      <div id="cb-inner">
        <div id="cb-accent"></div>
        <div id="cb-body">
          <div id="cb-left">
            <div id="cb-header">
              <div id="cb-ico">🍪</div>
              <h2 id="cb-title">نستخدم ملفات تعريف الارتباط</h2>
            </div>
            <p id="cb-desc">
              نستخدم الكوكيز لتحسين تجربتك وتحليل زيارات الموقع.
              بإمكانك التحكم في اختياراتك أو قبولها جميعاً.
              <a href="/privacy">سياسة الخصوصية</a>
            </p>
            <div id="cb-tabs">
              <button class="cb-tab active" data-tab="simple">ملخص</button>
              <button class="cb-tab" data-tab="details">تخصيص</button>
            </div>
            <div id="cb-details" style="display:none;">
              <div class="cb-pref">
                <div><p class="cb-pref-name">ضرورية</p><p class="cb-pref-desc">لازمة لتشغيل الموقع — لا يمكن إيقافها</p></div>
                <label class="cb-toggle"><input type="checkbox" checked disabled><span class="cb-slider"></span></label>
              </div>
              <div class="cb-pref">
                <div><p class="cb-pref-name">تحليلية</p><p class="cb-pref-desc">تساعدنا نفهم كيف تستخدم الموقع</p></div>
                <label class="cb-toggle"><input type="checkbox" id="cb-analytics"><span class="cb-slider"></span></label>
              </div>
              <div class="cb-pref">
                <div><p class="cb-pref-name">تسويقية</p><p class="cb-pref-desc">لعرض إعلانات ذات صلة باهتماماتك</p></div>
                <label class="cb-toggle"><input type="checkbox" id="cb-marketing"><span class="cb-slider"></span></label>
              </div>
            </div>
          </div>
          <div id="cb-right">
            <button class="cb-btn cb-btn-accept" id="cb-accept">قبول الكل ✓</button>
            <button class="cb-btn cb-btn-save"   id="cb-save">حفظ التفضيلات</button>
            <button class="cb-btn cb-btn-reject" id="cb-reject">الضرورية فقط</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // ─── Inject ────────────────────────────────────────
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  // ─── Logic ────────────────────────────────────────
  const banner  = document.getElementById("cb-banner");
  const overlay = document.getElementById("cb-overlay");
  const details = document.getElementById("cb-details");
  const saveBtn = document.getElementById("cb-save");

  function dismiss(choice) {
    const prefs = {
      necessary: true,
      analytics: document.getElementById("cb-analytics")?.checked || false,
      marketing: document.getElementById("cb-marketing")?.checked || false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, prefs, date: new Date().toISOString() }));
    banner.classList.add("out");
    overlay.classList.add("out");
    setTimeout(() => wrap.remove(), 500);
  }

  document.getElementById("cb-accept").addEventListener("click", () => {
    document.getElementById("cb-analytics").checked = true;
    document.getElementById("cb-marketing").checked = true;
    dismiss("all");
  });
  document.getElementById("cb-reject").addEventListener("click", () => dismiss("necessary"));
  document.getElementById("cb-save").addEventListener("click", () => dismiss("custom"));
  overlay.addEventListener("click", () => dismiss("necessary"));

  // Tabs
  document.querySelectorAll(".cb-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cb-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      const isDetails = btn.dataset.tab === "details";
      details.style.display = isDetails ? "flex" : "none";
      saveBtn.style.display  = isDetails ? "block" : "none";
    });
  });

  // Show after delay
  banner.style.visibility  = "hidden";
  overlay.style.visibility = "hidden";
  setTimeout(() => {
    banner.style.visibility  = "";
    overlay.style.visibility = "";
  }, 800);

  } // end init
})();