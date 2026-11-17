# Yashashvi Srivastava &bull; Portfolio Website

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Uptime](https://img.shields.io/badge/Cloud%20API-99%25%20Uptime-emerald)](#)
[![Academic](https://img.shields.io/badge/VIT%20Bhopal-CGPA%208.67%20(Top%2010%25)-purple)](#)
[![Patent](https://img.shields.io/badge/Patent-Granted-brightgreen)](#)
[![Research](https://img.shields.io/badge/Paper-Published%20(3%2B%20Citations)-blue)](#)

A modern, high-performance developer portfolio showcasing the work, research publications, intellectual property, and engineering projects of **Yashashvi Srivastava** (AI/ML Engineer & Full-Stack Developer).

---

## 🌟 Highlights & Features

- **⚡ Zero Build Dependencies**: Built entirely with standards-compliant HTML5, modular CSS custom properties, and native ES6+ JavaScript. Loads instantly with 100/100 Lighthouse performance.
- **🎨 Theme Engine**: Persistent Dark and Light theme switcher syncing with OS `prefers-color-scheme` and local storage.
- **🍱 Bento Grid Projects Showcase**: Categorized and filterable project grid (`Generative AI`, `Full-Stack & Cloud`) with deep-dive modal dialogs and live metrics.
- **💻 Interactive Developer Terminal**: Built-in CLI emulator (`help`, `about`, `skills`, `projects`, `patent`, `paper`, `contact`, `whoami`).
- **🛡️ Patent & Research Spotlight**: Dedicated showcase for the granted *"Automated Spraying System"* patent and published DenseNet-ResNet research paper.
- **📱 Responsive & Accessible**: Mobile drawer navigation, keyboard accessible modals, and print-optimized resume view (`Ctrl + P`).

---

## 📂 Architecture & Directory Structure

```text
Portfolio-yashashvi/
├── index.html           # Main semantic HTML5 entry point & JSON-LD metadata
├── resume.md            # Complete markdown curriculum vitae
├── css/
│   ├── variables.css    # Design tokens, color system, elevation & themes
│   ├── base.css         # CSS reset, typography, layout & print styles
│   └── components.css   # Navigation, hero, bento cards, terminal & modal
├── js/
│   ├── theme.js         # Theme manager with localStorage persistence
│   ├── navigation.js    # Header, mobile menu, and scroll progress
│   ├── projects.js      # Filterable project grid & interactive modal dialog
│   ├── terminal.js      # CLI terminal emulator and command handler
│   ├── contact.js       # Form validation, toast feedback, mailto link
│   └── main.js          # Main app orchestrator & data binder
├── data/
│   ├── profile.json     # Extracted resume data model
│   └── projects.json    # Detailed project metrics and architecture specs
├── LICENSE              # MIT License
└── README.md            # Comprehensive project documentation
```

---

## 🚀 Running Locally

No installation or node build step required! You can serve the portfolio with any lightweight HTTP server:

### Option 1: Python
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deployment to GitHub Pages

1. Commit and push all files to your `main` branch:
   ```bash
   git push origin main
   ```
2. In your repository on GitHub, go to **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and root folder `/`, then click **Save**.
4. Your site will be live at:
   `https://<your-username>.github.io/Portfolio-yashashvi/`

---

## 📬 Contact & Connect

- **Email**: [yashashvisrivastava674@gmail.com](mailto:yashashvisrivastava674@gmail.com)
- **Phone**: [+91 8303355281](tel:+918303355281)
- **LinkedIn**: [linkedin.com/in/yashashvi-srivastava-681b35251](https://www.linkedin.com/in/yashashvi-srivastava-681b35251)
- **GitHub**: [github.com/yashashvisri](https://github.com/yashashvisri)
