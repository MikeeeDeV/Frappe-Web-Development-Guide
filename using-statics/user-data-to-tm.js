/**
 * 🔍 Visitor Tracker - Sends data to Telegram Bot
 * ================================================
 * ⚙️ الإعداد: غيّر القيم دي قبل الاستخدام
 */

const TELEGRAM_BOT_TOKEN = "8616682746:AAHRFQM-llzhrCK-XbzYDVYGIVbuzlkwLSY";   // ← ضع التوكن هنا
const TELEGRAM_CHAT_ID = "-1003782319418";     // ← ضع الـ Chat ID هنا

// ─────────────────────────────────────────────────
// 1. جمع البيانات
// ─────────────────────────────────────────────────

async function getLocationData() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("ipapi failed");
        return await res.json();
    } catch {
        try {
            const res = await fetch("https://ip-api.com/json/?fields=status,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query");
            return await res.json();
        } catch {
            return {};
        }
    }
}

function getBrowserData() {
    const nav = navigator;
    const scr = screen;

    return {
        // المتصفح والنظام
        userAgent: nav.userAgent,
        language: nav.language || nav.userLanguage,
        languages: (nav.languages || []).join(", "),
        platform: nav.platform,
        cookiesOn: nav.cookieEnabled,
        doNotTrack: nav.doNotTrack,
        onLine: nav.onLine,
        hardwareCores: nav.hardwareConcurrency || "N/A",

        // الشاشة
        screenRes: `${scr.width}x${scr.height}`,
        colorDepth: `${scr.colorDepth}-bit`,
        windowSize: `${window.innerWidth}x${window.innerHeight}`,

        // الصفحة
        pageURL: location.href,
        pageTitle: document.title,
        referrer: document.referrer || "Direct",
        pageHistory: history.length,

        // الوقت
        localTime: new Date().toLocaleString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
    };
}

async function getNetworkInfo() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const data = {};

    if (conn) {
        data.effectiveType = conn.effectiveType;
        data.downlink = conn.downlink ? `${conn.downlink} Mbps` : "N/A";
        data.rtt = conn.rtt ? `${conn.rtt} ms` : "N/A";
        data.saveData = conn.saveData;
    }

    // Battery API (إن كانت مدعومة)
    if (navigator.getBattery) {
        try {
            const bat = await navigator.getBattery();
            data.battery = `${Math.round(bat.level * 100)}%`;
            data.batteryCharging = bat.charging;
        } catch { /* not supported */ }
    }

    return data;
}

function getCanvasFingerprint() {
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("Fingerprint👁", 2, 15);
        ctx.fillStyle = "rgba(102,204,0,0.7)";
        ctx.fillText("Fingerprint👁", 4, 17);
        return canvas.toDataURL().slice(-50); // آخر 50 حرف كـ fingerprint مختصر
    } catch {
        return "N/A";
    }
}

// ─────────────────────────────────────────────────
// 2. تنسيق الرسالة
// ─────────────────────────────────────────────────

function buildMessage(loc, browser, network) {
    const flag = loc.country_code
        ? String.fromCodePoint(...[...loc.country_code.toUpperCase()].map(c => 0x1F1E6 - 65 + c.charCodeAt(0)))
        : "🌍";

    const lines = [
        `🚨 *زيارة جديدة للموقع*`,
        ``,
        `━━━━━━ 📍 الموقع ━━━━━━`,
        `${flag} *الدولة:* ${loc.country_name || loc.country || "N/A"}`,
        `🏙 *المدينة:* ${loc.city || "N/A"}`,
        `📮 *المنطقة:* ${loc.region || loc.regionName || "N/A"}`,
        `🌐 *IP:* \`${loc.ip || loc.query || "N/A"}\``,
        `📡 *ISP:* ${loc.org || loc.isp || "N/A"}`,
        `🕐 *توقيت المنطقة:* ${loc.timezone || "N/A"}`,
        `📌 *الإحداثيات:* ${loc.latitude || loc.lat || "?"}, ${loc.longitude || loc.lon || "?"}`,
        ``,
        `━━━━━━ 💻 الجهاز ━━━━━━`,
        `🖥 *نظام التشغيل:* ${browser.platform}`,
        `🖥 *دقة الشاشة:* ${browser.screenRes} (نافذة: ${browser.windowSize})`,
        `🎨 *عمق اللون:* ${browser.colorDepth}`,
        `⚙️ *المعالج (Cores):* ${browser.hardwareCores}`,
        ``,
        `━━━━━━ 🌐 المتصفح ━━━━━━`,
        `🗣 *اللغة:* ${browser.language}`,
        `🕐 *التوقيت المحلي:* ${browser.localTime}`,
        `🌍 *Timezone:* ${browser.timezone}`,
        `🍪 *Cookies:* ${browser.cookiesOn ? "✅ مفعّل" : "❌ معطّل"}`,
        `🔏 *Do Not Track:* ${browser.doNotTrack || "N/A"}`,
        `📶 *الاتصال:* ${network.effectiveType || "N/A"} ${network.downlink || ""}`,
        ...(network.battery ? [`🔋 *البطارية:* ${network.battery} ${network.batteryCharging ? "⚡ شحن" : ""}`] : []),
        ``,
        `━━━━━━ 📄 الصفحة ━━━━━━`,
        `🔗 *URL:* ${browser.pageURL}`,
        `📋 *العنوان:* ${browser.pageTitle}`,
        `↩️ *المصدر:* ${browser.referrer}`,
        `🗂 *تاريخ المتصفح:* ${browser.pageHistory} صفحة`,
        ``,
        `━━━━━━ 🖨 User Agent ━━━━━━`,
        `\`${browser.userAgent}\``,
    ];

    return lines.join("\n");
}

// ─────────────────────────────────────────────────
// 3. الإرسال لـ Telegram
// ─────────────────────────────────────────────────

async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const body = {
        chat_id: "-1003782319418",
        text: text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!data.ok) console.warn("Telegram error:", data.description);
    } catch (err) {
        console.error("Failed to send to Telegram:", err);
    }
}

// ─────────────────────────────────────────────────
// 4. تشغيل كل شيء
// ─────────────────────────────────────────────────

(async function track() {
    // انتظر لودينج الصفحة
    if (document.readyState !== "complete") {
        await new Promise(r => window.addEventListener("load", r, { once: true }));
    }

    const [loc, network] = await Promise.all([getLocationData(), getNetworkInfo()]);
    const browser = getBrowserData();
    const fingerprint = getCanvasFingerprint();
    browser.canvasFingerprint = fingerprint;

    const message = buildMessage(loc, browser, network);
    await sendToTelegram(message);
})();