/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           DevTools  ·  Mohamed Ayman                    ║
 * ║           Frappe Framework Developer                    ║
 * ║           github.com/MikeeeDeV                         ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Usage: <script src="/devtools.js"></script>
 *
 * Easter Eggs:
 *   doBarrelRoll()  — spin the whole page 360°
 *   playGame()      — guess-the-number in the console
 *   matrixMode()    — green matrix rain overlay (toggle)
 *   hackMode()      — cinematic fake hacking sequence
 *   ↑↑↓↓←→←→       — Konami Code
 */

;(function (w, d) {
  "use strict";

  // ─── Palette (mirrors site tokens) ───────────────────────────────────────
  const C = {
    blue:   "#2490e3",
    blueBg: "#e8f4fd",
    green:  "#22c55e",
    orange: "#f97316",
    purple: "#8b5cf6",
    red:    "#ef4444",
    muted:  "#64748b",
    dark:   "#1e293b",
    white:  "#ffffff",
  };

  // ─── Tiny helpers ─────────────────────────────────────────────────────────
  const $ = id => d.getElementById(id);
  const mk = (tag, props) => Object.assign(d.createElement(tag), props || {});
  const css = (el, s) => Object.assign(el.style, s);

  function injectStyle(id, rules) {
    if ($(id)) return;
    const s = mk("style", { id, textContent: rules });
    d.head.appendChild(s);
  }
  function removeStyle(id) { $(id)?.remove(); }

  // Web Audio — safe wrapper
  function beep(type, freq, endFreq, dur, vol) {
    try {
      const ac   = new (w.AudioContext || w.webkitAudioContext)();
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, ac.currentTime + dur);
      gain.gain.setValueAtTime(vol || 0.12, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      osc.start();
      osc.stop(ac.currentTime + dur + 0.05);
    } catch (_) { /* no audio context — silently skip */ }
  }

  // ─── 1. SPLASH ────────────────────────────────────────────────────────────
  (function splash() {


    // Name block
    console.log(
      `%cMohamed Ayman%c  ·  Frappe Developer`,
      `color:${C.blue};font-size:18px;font-weight:700;font-family:monospace;`,
      `color:${C.muted};font-size:14px;font-family:monospace;`
    );
    console.log(
      `%cgithub.com/MikeeeDeV`,
      `color:${C.purple};font-size:12px;font-family:monospace;text-decoration:underline;`
    );

    // Divider
    console.log(
      `%c${"─".repeat(55)}`,
      `color:${C.dark};font-family:monospace;`
    );

    // Greeting
    console.log(
      `%c👋  مرحباً يا مطور — أهلاً في كواليس الموقع!`,
      `color:${C.blue};font-size:15px;font-weight:600;` +
      `background:${C.blueBg};padding:8px 14px;border-radius:6px;`
    );

    console.log(
      `%c✔  الكود نظيف ومفيهوش أسرار — استمتع بالتصفح!`,
      `color:${C.green};font-size:13px;font-weight:500;`
    );

    // Easter-egg hint table — one console.log per row for clean formatting
    console.log(
      `%c\n🥚  Easter Eggs — جرّبها في الـ Console:\n`,
      `color:${C.orange};font-size:13px;font-weight:700;`
    );

    const eggs = [
      ["doBarrelRoll()", "الموقع بيلف 360°  🌀"],
      ["playGame()",     "لعبة خمّن الرقم  🎮"],
      ["matrixMode()",   "مطر الكود الأخضر  🟢"],
      ["hackMode()",     "هجوم وهمي على السيرفر  💀"],
      ["↑↑↓↓←→←→",      "Konami Code  🕹️"],
    ];

    eggs.forEach(([fn, desc]) => {
      console.log(
        `%c  ${fn.padEnd(20)}%c${desc}`,
        `color:${C.blue};font-weight:700;background:${C.blueBg};` +
        `padding:3px 8px;border-radius:4px;font-family:monospace;font-size:12px;`,
        `color:${C.muted};font-size:12px;padding:3px 6px;`
      );
    });

    console.log(
      `%c\n${"─".repeat(55)}`,
      `color:${C.dark};font-family:monospace;`
    );
  })();


  // ─── 2. doBarrelRoll() ────────────────────────────────────────────────────
  w.doBarrelRoll = (function () {
    let running = false;

    return function doBarrelRoll() {
      if (running) {
        console.log(`%c⏳  already spinning — wait for it!`, `color:${C.orange};font-size:13px;`);
        return;
      }
      running = true;

      console.log(`%c🌀  Woohoo!`, `color:${C.orange};font-size:28px;font-weight:700;`);
      console.log(`%cYou found the secret! 😉`, `color:${C.purple};font-size:13px;`);

      injectStyle("__barrel_css", `
        @keyframes __barrel_spin {
          0%   { transform: rotate(0deg)   scale(1);    }
          20%  { transform: rotate(72deg)  scale(0.97); }
          50%  { transform: rotate(180deg) scale(1.03); }
          80%  { transform: rotate(288deg) scale(0.97); }
          100% { transform: rotate(360deg) scale(1);    }
        }
        body.__barrel {
          animation: __barrel_spin 1.9s cubic-bezier(.45,.05,.55,.95) forwards;
          transform-origin: 50% 50%;
          will-change: transform;
        }
      `);

      d.body.classList.add("__barrel");

      setTimeout(() => {
        d.body.classList.remove("__barrel");
        removeStyle("__barrel_css");
        running = false;
      }, 1950);

      return "🎉 barrel roll complete!";
    };
  })();


  // ─── 3. playGame() ────────────────────────────────────────────────────────
  w.playGame = (function () {
    let active = false;

    return function playGame() {
      // Cleanup any previous session
      if (active) {
        delete w.guess;
        active = false;
      }

      const target   = Math.floor(Math.random() * 100) + 1;
      const MAX      = 7;
      let   tries    = 0;
      active = true;

      console.clear();

      console.log(
        `%c🎮  GUESS THE NUMBER`,
        `color:${C.blue};font-size:22px;font-weight:700;` +
        `background:${C.blueBg};padding:10px 20px;border-radius:8px;`
      );
      console.log(
        `%cرقم من 1 → 100  |  عندك ${MAX} محاولات  |  اكتب: guess(50)`,
        `color:${C.muted};font-size:13px;`
      );
      console.log(`%c${"─".repeat(48)}`, `color:#e2e8f0;font-family:monospace;`);

      w.guess = function guess(n) {
        n = parseInt(n, 10);

        if (isNaN(n) || n < 1 || n > 100) {
          console.log(`%c⚠  رقم مش صح — بين 1 و 100`, `color:${C.red};font-size:13px;`);
          return;
        }

        tries++;
        const left    = MAX - tries;
        const pctDone = Math.round((tries / MAX) * 20);
        const bar     = "▰".repeat(pctDone) + "▱".repeat(20 - pctDone);

        if (n === target) {
          beep("sine", 523, 1047, 0.3, 0.15);
          console.log(
            `%c🎉  صح!  الرقم كان ${target}  —  وصلت في ${tries} محاولة`,
            `color:${C.green};font-size:18px;font-weight:700;`
          );
          console.log(`%c[▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰] 100% ✔`, `color:${C.green};font-family:monospace;font-size:13px;`);
          console.log(`%cاضغط playGame() للعب مرة تانية`, `color:${C.muted};font-size:12px;`);
          delete w.guess;
          active = false;
          return "🏆";
        }

        if (tries >= MAX) {
          beep("sawtooth", 220, 55, 0.6, 0.12);
          console.log(
            `%c💀  Game Over — كان الرقم ${target}`,
            `color:${C.red};font-size:16px;font-weight:700;`
          );
          console.log(`%caضغط playGame() للعب تاني`, `color:${C.muted};font-size:12px;`);
          delete w.guess;
          active = false;
          return;
        }

        const arrow = n < target ? "📈  أكبر" : "📉  أصغر";
        console.log(
          `%c${arrow}   %c[${bar}]  %cمتبقي: ${left}`,
          `color:${C.orange};font-size:13px;font-weight:600;`,
          `color:${C.blue};font-family:monospace;font-size:12px;`,
          `color:${C.muted};font-size:12px;`
        );
      };

      return `start → guess(${Math.floor(Math.random() * 100) + 1})`;
    };
  })();


  // ─── 4. matrixMode() ──────────────────────────────────────────────────────
  w.matrixMode = (function () {
    let frameId  = null;
    let canvas   = null;

    return function matrixMode() {
      // TOGGLE OFF
      if (canvas) {
        cancelAnimationFrame(frameId);
        canvas.style.opacity = "0";
        setTimeout(() => { canvas?.remove(); canvas = null; }, 500);
        console.log(`%c🟢  Matrix mode  OFF`, `color:${C.green};font-size:14px;font-weight:700;`);
        return;
      }

      // TOGGLE ON
      console.log(
        `%c🟢  Wake up, Neo…`,
        `color:${C.green};font-size:20px;font-weight:700;font-family:monospace;` +
        `text-shadow:0 0 8px #22c55e;`
      );
      console.log(`%c[ matrixMode() again to exit ]`, `color:${C.muted};font-size:11px;`);

      canvas = mk("canvas", { id: "__matrix_c" });
      css(canvas, {
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 99999, pointerEvents: "none",
        opacity: 0, transition: "opacity .6s",
      });
      d.body.appendChild(canvas);
      requestAnimationFrame(() => { if (canvas) canvas.style.opacity = "0.9"; });

      const ctx = canvas.getContext("2d");

      function resize() {
        if (!canvas) return;
        canvas.width  = w.innerWidth;
        canvas.height = w.innerHeight;
      }
      resize();
      w.addEventListener("resize", resize);

      const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01ﾊﾊﾆｻﾏｹﾴZ:・.\"=*+-<>¦|çﾷ";
      const SIZE  = 16;
      let   cols  = Math.floor(canvas.width / SIZE);
      let   drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));

      function draw() {
        if (!canvas) return;
        ctx.fillStyle = "rgba(0,0,0,0.055)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cols = Math.floor(canvas.width / SIZE);
        while (drops.length < cols) drops.push(0);

        drops.forEach((y, i) => {
          const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
          // Head char brighter
          ctx.fillStyle = i % 5 === 0 ? "#a7f3d0" : "#22c55e";
          ctx.font = `${SIZE}px monospace`;
          ctx.fillText(ch, i * SIZE, y * SIZE);

          if (y * SIZE > canvas.height && Math.random() > 0.972) drops[i] = 0;
          drops[i]++;
        });

        frameId = requestAnimationFrame(draw);
      }

      frameId = requestAnimationFrame(draw);

      // Auto-off after 60s
      setTimeout(() => { if (canvas) w.matrixMode(); }, 60_000);

      return "🟢 — matrixMode() to exit";
    };
  })();


  // ─── 5. hackMode() ────────────────────────────────────────────────────────
  w.hackMode = (function () {
    let busy = false;

    return function hackMode() {
      if (busy) {
        console.log(`%c⏳  hack sequence already running…`, `color:${C.orange};font-size:13px;`);
        return;
      }
      busy = true;

      const steps = [
        { ms:  300, pct:  5,  msg: "Connecting to target server" },
        { ms:  900, pct: 18,  msg: "Bypassing firewall rules" },
        { ms: 1600, pct: 32,  msg: "Injecting SQL payload" },
        { ms: 2400, pct: 47,  msg: "Extracting database schema" },
        { ms: 3100, pct: 61,  msg: "Stealing your cookies 🍪" },
        { ms: 3900, pct: 75,  msg: "Uploading to dark-web" },
        { ms: 4700, pct: 89,  msg: "Hacking the Pentagon" },
        { ms: 5400, pct: 99,  msg: "Compiling results" },
      ];

      console.log(
        `%c☠  INITIATING HACK SEQUENCE`,
        `color:${C.red};font-size:18px;font-weight:700;font-family:monospace;`
      );
      console.log(`%c${"═".repeat(50)}`, `color:${C.red};font-family:monospace;font-size:11px;`);

      steps.forEach(({ ms, pct, msg }) => {
        setTimeout(() => {
          const fill = Math.round(pct / 5);
          const bar  = `▓`.repeat(fill) + `░`.repeat(20 - fill);
          const col  = pct < 50 ? C.orange : pct < 80 ? C.red : "#ff4444";
          console.log(
            `%c [${bar}] ${String(pct).padStart(3)}%  ${msg}`,
            `color:${col};font-family:monospace;font-size:13px;`
          );
          if (pct > 60) beep("sawtooth", 80 + pct, null, 0.08, 0.04);
        }, ms);
      });

      // Final reveal
      setTimeout(() => {
        console.log(`%c${"═".repeat(50)}`, `color:${C.green};font-family:monospace;font-size:11px;`);
        console.log(`%c✅  ACCESS GRANTED`, `color:${C.green};font-size:26px;font-weight:700;font-family:monospace;`);
        beep("square", 880, 440, 0.4, 0.15);
      }, 6100);

      setTimeout(() => {
        console.log(`%c\n😂  Just kidding — your data is safe!`, `color:${C.orange};font-size:16px;font-weight:700;`);
        console.log(`%cMohamed Ayman loves you  ❤️`, `color:${C.purple};font-size:13px;`);
        busy = false;
      }, 7200);

      return "💀 hacking…";
    };
  })();


  // ─── 6. KONAMI CODE  ↑↑↓↓←→←→ ────────────────────────────────────────────
  (function konami() {
    const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown",
                 "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"];
    let idx = 0;

    d.addEventListener("keydown", function (e) {
      if (e.key !== SEQ[idx]) { idx = (e.key === SEQ[0]) ? 1 : 0; return; }
      idx++;
      if (idx < SEQ.length) return;
      idx = 0;
      fire();
    });

    function fire() {
      // Console
      console.log(
        `%c🕹️  KONAMI CODE`,
        `color:${C.orange};font-size:26px;font-weight:700;` +
        `background:${C.dark};padding:10px 22px;border-radius:8px;`
      );
      console.log(`%c↑↑↓↓←→←→  —  الكود السري اتفك! 🎮`, `color:${C.purple};font-size:14px;`);

      // Sound — rising 8-bit fanfare
      [523, 659, 784, 1047].forEach((f, i) => {
        setTimeout(() => beep("square", f, f * 1.5, 0.15, 0.13), i * 120);
      });

      // DOM overlay
      injectStyle("__konami_css", `
        @keyframes __k_in  { from{opacity:0;transform:translate(-50%,-50%) scale(.5)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes __k_out { from{opacity:1} to{opacity:0} }
        #__konami_msg { animation: __k_in .35s cubic-bezier(.16,1,.3,1) forwards; }
        #__konami_msg.bye { animation: __k_out .4s ease forwards; }

        @keyframes __k_vignette { 0%{opacity:0} 20%{opacity:1} 75%{opacity:1} 100%{opacity:0} }
        #__konami_vfx { animation: __k_vignette 2.4s ease forwards; }
      `);

      // Vignette
      const vfx = mk("div", { id: "__konami_vfx" });
      css(vfx, {
        position: "fixed", inset: 0, zIndex: 99997, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,.9) 100%)",
      });

      // Message
      const msg = mk("div", { id: "__konami_msg" });
      css(msg, {
        position: "fixed", top: "50%", left: "50%",
        zIndex: 99999, pointerEvents: "none",
        textAlign: "center", fontFamily: "monospace",
        lineHeight: "1.3",
      });
      msg.innerHTML =
        `<div style="font-size:clamp(32px,6vw,60px);font-weight:700;color:#22c55e;` +
        `text-shadow:0 0 24px #22c55e,0 0 48px #22c55e;">↑↑↓↓←→←→</div>` +
        `<div style="font-size:clamp(16px,3vw,28px);color:${C.orange};font-weight:700;margin-top:6px;">KONAMI CODE</div>` +
        `<div style="font-size:14px;color:#a7f3d0;margin-top:4px;">+30 lives unlocked 🎮</div>`;

      d.body.appendChild(vfx);
      d.body.appendChild(msg);

      setTimeout(() => {
        msg.classList.add("bye");
        setTimeout(() => { msg.remove(); vfx.remove(); removeStyle("__konami_css"); }, 450);
      }, 2500);
    }
  })();


}(window, document));