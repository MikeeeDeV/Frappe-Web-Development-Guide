<div align="center">

#  FRAPPE WEB DEVELOPMENT
#  ULTIMATE GUIDE

### *The comprehensive handbook for building Web Pages, Web Templates, and Custom Blocks in the Frappe Framework*

<p>
  <img src="https://img.shields.io/badge/Frappe-Framework-2490E3?style=for-the-badge&logo=frappe&logoColor=white" alt="Frappe Framework">
  <img src="https://img.shields.io/badge/Jinja-Templates-B41706?style=for-the-badge&logo=jinja&logoColor=white" alt="Jinja">
  <img src="https://img.shields.io/badge/Bootstrap-5.1-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/License-MIT-00D26A?style=for-the-badge" alt="License">
</p>

<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
</p>

---

</div>

<br>

## 📑 Table of Contents

<table>
  <tr>
    <td align="center" width="14%">
      <a href="#1-html-rules-jinja-templates">
        <img src="https://img.shields.io/badge/01-HTML-E34F26?style=for-the-badge" alt="HTML"/><br>
        <sub><b>Jinja Templates</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#2-css-rules--scoping">
        <img src="https://img.shields.io/badge/02-CSS-1572B6?style=for-the-badge" alt="CSS"/><br>
        <sub><b>Rules & Scoping</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#3-javascript-rules-client-side">
        <img src="https://img.shields.io/badge/03-JavaScript-F7DF1E?style=for-the-badge" alt="JS"/><br>
        <sub><b>Client Side</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#4-web-page-doctype-structure">
        <img src="https://img.shields.io/badge/04-Structure-9B59B6?style=for-the-badge" alt="Structure"/><br>
        <sub><b>Doctype Fields</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#5-common-mistakes">
        <img src="https://img.shields.io/badge/05-Mistakes-E74C3C?style=for-the-badge" alt="Mistakes"/><br>
        <sub><b>Pitfalls</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#6-best-practice-structure">
        <img src="https://img.shields.io/badge/06-Practices-27AE60?style=for-the-badge" alt="Practices"/><br>
        <sub><b>Examples</b></sub>
      </a>
    </td>
    <td align="center" width="14%">
      <a href="#7-advanced-pro-tips">
        <img src="https://img.shields.io/badge/07-Pro_Tips-FF6B6B?style=for-the-badge" alt="Tips"/><br>
        <sub><b>Advanced</b></sub>
      </a>
    </td>
  </tr>
</table>

<br>

<div id="1-html-rules-jinja-templates">

<br>

## 🧩 1) HTML Rules — Jinja Templates

<img src="https://img.shields.io/badge/Jinja2-Dynamic_Templating-B41706?style=flat-square&logo=jinja&logoColor=white" alt="Jinja2">

Frappe leverages the **Jinja2 engine** to render dynamic HTML content. Your code is injected into a global layout containing the Navbar and Footer.

### ✅ Do's

| ✅ Do | 📝 Description |
|-------|----------------|
| **Content Only** | Write only the page content. Frappe handles the global layout. |
| **Bootstrap Ready** | Use built-in classes: `container`, `row`, `col-md-6`, `btn-primary`, etc. |
| **Semantic HTML** | Use `<section>`, `<article>`, `<nav>` for better SEO & accessibility. |
| **Use Filters** | Apply Jinja filters: `{{ value \| e }}`, `{{ "/path" \| abs_url }}` |

### ❌ Don'ts

| ❌ Don't | ⚠️ Why |
|---------|--------|
| `<html>`, `<head>`, `<body>` | These tags are already provided by Frappe |
| Duplicate `id` attributes | Breaks SPA mode when page loads twice |
| Inline styles | Creates specificity conflicts |
| Hardcoded URLs | Use `{{ "/page" \| abs_url }}` instead |

> 💡 **Pro Tip:** Always escape user input with `\| e` filter to prevent XSS attacks.

</div>

---

<div id="2-css-rules--scoping">

<br>

## 🎨 2) CSS Rules & Scoping

<img src="https://img.shields.io/badge/CSS3-Scoped_Styling-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">

> ⚠️ **CRITICAL WARNING:** CSS leaks can break the entire ERPNext Desk UI. Handle with extreme care!

### The Golden Rule

```css
/* ❌ FORBIDDEN — Breaks system UI */
* { margin: 0; padding: 0; }
body { font-size: 16px; }
h1 { color: red; }

/* ✅ CORRECT — Scoped to your wrapper */
.my-wrapper h1 { color: var(--primary-color); }
```

### Namespacing Pattern

```html
<!-- Always wrap in a unique class -->
<div class="my-unique-page">
    <h1>Title</h1>
    <p>Content goes here</p>
</div>

<style>
/* Target only elements inside your wrapper */
.my-unique-page {
    padding: 2rem;
    background: var(--bg-color);
}

.my-unique-page h1 {
    color: var(--text-color);
    font-weight: 600;
}
</style>
```

### Available CSS Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `--primary-color` | Main brand color | `#2490E3` |
| `--text-color` | Default text | `#2d3748` |
| `--bg-color` | Page background | `#ffffff` |
| `--card-bg` | Card background | `#f8f9fa` |
| `--border-color` | Borders | `#e2e8f0` |
| `--font-stack` | Typography | System fonts |

</div>

---

<div id="3-javascript-rules-client-side">

<br>

## ⚡ 3) JavaScript Rules — Client Side

<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/jQuery-Supported-0769AD?style=flat-square&logo=jquery&logoColor=white" alt="jQuery">

Frappe provides **jQuery** and **Vanilla JS** support. All code should be wrapped in `frappe.ready()`.

### Initialization

```javascript
// ✅ Always wrap in frappe.ready
frappe.ready(function() {
    console.log("Page loaded and ready");
});

// ✅ Arrow function syntax also supported
frappe.ready(() => {
    initComponents();
});
```

### API Communication

```javascript
// Making a server call
frappe.call({
    method: "my_app.api.get_data",
    args: {
        doctype: "Lead",
        filters: { status: "Open" }
    },
    freeze: true,        // Show loading spinner
    show_spinner: true, // Alternative syntax
    callback: function(response) {
        if (!response.exc) {
            const data = response.message;
            console.log("Data received:", data);
        }
    },
    error: function(error) {
        frappe.throw(__("Failed to fetch data"));
    }
});
```

### jQuery Integration

```javascript
frappe.ready(() => {
    // jQuery available as $ or frappe$
    $('.my-button').on('click', function() {
        frappe.msgprint("Button clicked!");
    });
    
    // AJAX with frappe's wrapper
    frappe.call({
        // ... same as above
    });
});
```

### DOM Manipulation Helpers

| Method | Use |
|--------|-----|
| `frappe.msgprint(__('Message'))` | Show modal dialog |
| `frappe.show_alert({message: __('Done'), indicator: 'green'})` | Toast notification |
| `frappe.throw(__('Error message'))` | Error alert |
| `frappe.confirm(__('Are you sure?'), () => { ... })` | Confirmation dialog |

</div>

---

<div id="4-web-page-doctype-structure">

<br>

## 🧠 4) Web Page Doctype Structure

<img src="https://img.shields.io/badge/Frappe-Web_Page_Doctype-2490E3?style=flat-square&logo=frappe&logoColor=white" alt="Doctype">

Organize your code across the three main fields in the **Web Page** doctype:

| Field | Content Type | Notes |
|-------|-------------|-------|
| **HTML Template** | HTML + Jinja | Structure, loops, conditionals |
| **Style** | CSS only | No `<style>` tags needed |
| **Script** | JavaScript only | No `<script>` tags needed |

### Field Example

```
┌─────────────────────────────────────────────────────────┐
│  HTML Template                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │ <div class="portal-wrapper">                        ││
│  │     <h1>{{ doc.page_title }}</h1>                   ││
│  │     {% for item in doc.items: %}                    ││
│  │         <div class="item">{{ item.name }}</div>     ││
│  │     {% endfor %}                                    ││
│  │ </div>                                              ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  Style                                                  │
│  ┌─────────────────────────────────────────────────────┐│
│  │ .portal-wrapper { padding: 2rem; }                  ││
│  │ .portal-wrapper h1 { color: var(--primary-color); }  ││
│  └─────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  Script                                                 │
│  ┌─────────────────────────────────────────────────────┐│
│  │ frappe.ready(() => {                                ││
│  │     console.log("Portal loaded");                  ││
│  │ });                                                 ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

</div>

---

<div id="5-common-mistakes">

<br>

## 🚫 5) Common Mistakes

<img src="https://img.shields.io/badge/⚠️-Avoid_These-E74C3C?style=flat-square" alt="Warning">

### ❌ Style Bleeding

```css
/* ❌ BAD — Overrides system buttons */
.btn { background: red; }

/* ✅ GOOD — Scope to your wrapper */
.my-wrapper .btn { background: var(--primary-color); }
```

### ❌ Hardcoded URLs

```html
<!-- ❌ BAD -->
<a href="http://localhost:8000/about">About</a>

<!-- ✅ GOOD -->
<a href="/about">About</a>
<a href="{{ "/about" | abs_url }}">About</a>
```

### ❌ Z-Index Overrides

```css
/* ❌ BAD — Covers system modals */
.modal { z-index: 999999; }

/* ✅ GOOD — Use reasonable values */
.modal { z-index: 100; }
```

### ❌ Synchronous AJAX

```javascript
// ❌ BAD — Freezes the browser
$.ajax({ async: false, ... });

// ✅ GOOD — Async call
$.ajax({ async: true, success: () => {} });
```

### 📋 Quick Reference

<table>
<tr>
<th>❌ Mistake</th>
<th>✅ Solution</th>
</tr>
<tr>
<td>System styles broken</td>
<td>Always use wrapper classes</td>
</tr>
<tr>
<td>Links not working on production</td>
<td>Use <code>| abs_url</code> filter</td>
</tr>
<tr>
<td>Modals covered</td>
<td>Use z-index < 1000</td>
</tr>
<tr>
<td>Page frozen</td>
<td>Use async AJAX calls</td>
</tr>
</table>

</div>

---

<div id="6-best-practice-structure">

<br>

## 🏆 6) Best Practice Structure

<img src="https://img.shields.io/badge/Best_Practices-Production_Ready-27AE60?style=flat-square" alt="Best Practices">

### 📦 Complete Example

#### 📄 HTML

```html
<div class="custom-portal-container">
    <section class="hero-section">
        <div class="hero-content">
            <h1>{{ doc.title or "Welcome" }}</h1>
            <p class="text-muted lead">
                {{ doc.subtitle or _("Welcome to our portal") }}
            </p>
            
            <div class="hero-actions">
                <button id="submit-btn" class="btn btn-primary btn-lg">
                    <i class="fa fa-paper-plane"></i>
                    {{ _("Get Started") }}
                </button>
            </div>
        </div>
    </section>
    
    <section class="features-section">
        <!-- Dynamic content here -->
    </section>
</div>
```

#### 🎨 CSS

```css
.custom-portal-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--padding, 2rem);
}

.custom-portal-container .hero-section {
    padding: 4rem 2rem;
    text-align: center;
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    margin-bottom: 2rem;
}

.custom-portal-container .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 1rem;
}

.custom-portal-container .hero-actions {
    margin-top: 2rem;
}

.custom-portal-container .btn-lg {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
}
```

#### ⚡ JavaScript

```javascript
frappe.ready(() => {
    const submitBtn = document.getElementById('submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            frappe.confirm(
                __('Are you sure you want to proceed?'),
                () => {
                    // Confirm action
                    processSubmission();
                },
                () => {
                    // Cancel action
                    frappe.show_alert({
                        message: __('Action cancelled'),
                        indicator: 'orange'
                    });
                }
            );
        });
    }
    
    function processSubmission() {
        frappe.show_alert({
            message: __('Processing your request...'),
            indicator: 'blue'
        });
        
        frappe.call({
            method: 'my_app.api.process',
            args: { data: getFormData() },
            callback: function(response) {
                if (!response.exc) {
                    frappe.show_alert({
                        message: __('Success!'),
                        indicator: 'green'
                    });
                    setTimeout(() => {
                        window.location.href = '/success';
                    }, 1500);
                }
            }
        });
    }
    
    function getFormData() {
        // Collect form data
        return { item: 'value' };
    }
});
```

</div>

---

<div id="7-advanced-pro-tips">

<br>

## 🚀 7) Advanced Pro Tips

<img src="https://img.shields.io/badge/Advanced-Expert_Level-FF6B6B?style=flat-square" alt="Advanced">

<details>
<summary><b>🌍 Localization & i18n</b></summary>
<br>

```javascript
// JavaScript
const greeting = __("Hello, World!");
const message = n_("item", "items", count);  // Singular/Plural
```

```html
<!-- Jinja Templates -->
<h1>{{ _("Welcome") }}</h1>
<p>{{ n_("One item", "Multiple items", items | length) }}</p>
```

> 📌 **Note:** Enable translations in the doctype settings for dynamic content.

</details>

<details>
<summary><b>🔐 Security Checklist</b></summary>
<br>

| Check | Implementation |
|-------|----------------|
| ✅ CSRF Protection | `frappe.call` handles automatically |
| ✅ XSS Prevention | Use `{{ user_input \| e }}` in Jinja |
| ✅ Input Validation | Validate in Python with `frappe.validates` |
| ✅ Guest Access | Use `@frappe.whitelist(allow_guest=True)` |
| ✅ Rate Limiting | Implement in API method |

```python
# Python - Secure API Method
@frappe.whitelist()
def secure_method(data):
    # Validate input
    if not frappe.has_permission("DocType", "create"):
        frappe.throw(_("No permission"), frappe.PermissionError)
    
    # Sanitize data
    safe_data = frappe.sanitize_html(data)
    
    # Process
    return { "status": "success" }
```

</details>

<details>
<summary><b>🎨 Theming Best Practices</b></summary>
<br>

```css
/* ✅ Use CSS Variables for theme support */
.my-component {
    background: var(--card-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: var(--padding-md, 1rem);
}

/* ✅ Dark mode ready */
@media (prefers-color-scheme: dark) {
    .my-component {
        background: var(--bg-dark);
        color: var(--text-dark);
    }
}
```

</details>

<details>
<summary><b>📊 Performance Optimization</b></summary>
<br>

| Technique | Code |
|-----------|------|
| **Lazy Images** | `<img loading="lazy" src="...">` |
| **Lazy Content** | Use Intersection Observer API |
| **Server Caching** | `frappe.cache().set_value('key', data)` |
| **Query Optimization** | Use `frappe.get_all()` with fields/limit |

```python
# Python - Cached Data Fetch
import frappe

@frappe.whitelist()
def get_cached_data():
    cache_key = "my_app:cached_data"
    data = frappe.cache().get_value(cache_key)
    
    if not data:
        data = frappe.get_all("DocType", 
            fields=["name", "title"],
            limit=10
        )
        frappe.cache().set_value(cache_key, data, expires_in_sec=3600)
    
    return data
```

</details>

<details>
<summary><b>🔄 Real-time Updates</b></summary>
<br>

```javascript
// Subscribe to real-time events
frappe.realtime.on('task_progress', function(data) {
    frappe.show_progress(__('Processing'), data.percent, 100);
    $('#progress-bar').width(data.percent + '%');
});

frappe.realtime.on('task_complete', function(data) {
    frappe.msgprint(__('Task completed!'));
    // Refresh data
    loadData();
});
```

</details>

<details>
<summary><b>📝 Form Handling</b></summary>
<br>

```javascript
// Create new document
frappe.db.insert({
    doctype: "Lead",
    first_name: "John",
    last_name: "Doe",
    email_id: "john@example.com",
    status: "Lead"
}).then(doc => {
    frappe.show_alert({
        message: __("Lead created: ") + doc.name,
        indicator: 'green'
    });
});

// Update existing
frappe.db.set_value("Lead", "DOC-001", "status", "Converted")
    .then(() => frappe.msgprint("Updated!"));

// Delete
frappe.db.delete("Lead", "DOC-001")
    .then(() => console.log("Deleted"));
```

</details>

<details>
<summary><b>🪝 Hooks Reference</b></summary>
<br>

| Hook | File | Purpose |
|------|------|---------|
| `app_include_js` | hooks.py | Add JS to Desk + Website |
| `app_include_css` | hooks.py | Add CSS to Desk + Website |
| `web_include_js` | hooks.py | Add JS to Website only |
| `website_route_rules` | hooks.py | Custom URL routing |
| `fixtures` | hooks.py | Export/import configurations |

```python
# hooks.py Example
app_include_js = "/assets/my_app/js/app.js"
web_include_js = "/assets/my_app/js/website.js"
app_include_css = "/assets/my_app/css/app.css"

fixtures = [
    {"dt": "Web Page Template", "filters": [["name", "like", "custom_%"]]}
]
```

</details>

<details>
<summary><b>🛠 Debugging Tips</b></summary>
<br>

```javascript
// Debug: Log all requests
frappe.call = function(opts) {
    console.log("API Call:", opts.method, opts.args);
    return this._orig_call(opts);
};

// Debug: Inspect page context
frappe.ready(() => {
    console.log("Context:", frappe.boot);
    console.log("User:", frappe.session.user);
});
```

```python
# Debug: Python
import frappe

# Pretty print to bench console
frappe.errprint(f"Debug: {my_variable}")

# Log to website
frappe.flags.in_test = True  # Shows debug in bench
```

</details>

</div>

---

<br>

## 👨‍💻 Developer

<div align="center">

### Mohamed Ayman
**Frappe Framework Developer**

<p>
  <a href="tel:+201021984471">
    <img src="https://img.shields.io/badge/Phone-+20%20102%20198%204471-25D366?style=for-the-badge&logo=phone&logoColor=white" alt="Phone">
  </a>
  <a href="https://wa.me/201118275197">
    <img src="https://img.shields.io/badge/WhatsApp-+20%20111%20827%205197-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
</p>

<p>
  <a href="https://github.com/MikeeeDeV">
    <img src="https://img.shields.io/badge/GitHub-MikeeeDeV-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/feed/">
    <img src="https://img.shields.io/badge/LinkedIn-Mohamed%20Ayman-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://www.facebook.com/share/1HTJiZLGYg/">
    <img src="https://img.shields.io/badge/Facebook-Profile-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook">
  </a>
</p>

<p>
  <a href="https://x.com/ayman_moha35360">
    <img src="https://img.shields.io/badge/Twitter-@MohamedAyman-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
  </a>
  <a href="https://www.instagram.com/mo7amed2ymen?igsh=MTNpeDJ1MDR5cTQ4OQ==">
    <img src="https://img.shields.io/badge/Instagram-@mohamedayman-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
  <a href="https://t.me/Melo_pl">
    <img src="https://img.shields.io/badge/Telegram-@mohamedayman-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>
</p>

<p>
  <a href="https://stackoverflow.com/users/28003333/mohamed-ayman">
    <img src="https://img.shields.io/badge/Stack%20Overflow-Mohamed%20Ayman-F58025?style=for-the-badge&logo=stackoverflow&logoColor=white" alt="Stack Overflow">
  </a>
  <a href="https://dev.to/mohamedayman">
    <img src="https://img.shields.io/badge/Dev.to-@mohamedayman-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="Dev.to">
  </a>
</p>

<br>

**💼 Available for Frappe/ERPNext consulting and custom development**

</div>

---

## 📄 License

<div align="center">

<img src="https://img.shields.io/badge/License-MIT-00D26A?style=for-the-badge" alt="MIT License">

### MIT License — Free to use and modify

**Built with ❤️ for the Frappe Community**

<br>

<a href="https://frappe.io">
  <img src="https://img.shields.io/badge/Frappe-Framework-2490E3?style=flat-square&logo=frappe&logoColor=white" alt="Frappe">
</a>
<a href="https://frappe.io/erpnext">
  <img src="https://img.shields.io/badge/ERPNext-Platform-0089FF?style=flat-square" alt="ERPNext">
</a>

<br><br>

---

<p>
  <img src="https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg?style=flat-square" alt="Markdown">
  <img src="https://img.shields.io/badge/Last%20Updated-Feb%202025-4A90E2?style=flat-square" alt="Updated">
  <img src="https://img.shields.io/github/stars/yourusername/repo?style=flat-square" alt="Stars">
</p>

<br>

### 🌟 Star this guide if you found it helpful!

<sub>Developed by Mohamed Ayman | Frappe Framework Expert</sub>

<br>

**📧 Contact for projects:** [Phone](tel:+201021984471) | [WhatsApp](https://wa.me/201118275197) | [GitHub](https://github.com/MikeeeDeV)

</div>
