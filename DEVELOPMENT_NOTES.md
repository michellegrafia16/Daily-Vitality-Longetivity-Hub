# Daily Vitality & Longevity Hub - Development Notes

## Project Overview
- **Project**: Daily Vitality & Longevity Hub (wellness/health affiliate website)
- **Live URL**: https://vitalityhub.vercel.app
- **GitHub**: https://github.com/michellegrafia16/Daily-Vitality-Longetivity-Hub
- **Hosting**: Vercel (static HTML deployment)
- **Purpose**: Affiliate marketing site promoting health supplements (ClickBank products)

---

## Team Members
- **Gerry** (current developer)
- **Michelle** (account owner, GitHub collaborator)

---

## Project Structure

### Root Files
```
index.html          - Main landing page
styles.css          - Global stylesheet
script.js           - Global JavaScript (form handlers, mobile menu, carousels)
sitemap.xml         - SEO sitemap for Google
robots.txt          - Search engine crawling instructions
favicon.svg         - Site favicon
vercel.json         - Vercel serverless routing config
README.md           - Project documentation
server.js           - Local dev server (NOT used in production)
api/                - Vercel serverless functions directory
  contact.js        - Contact form → SheetDB
  newsletter.js     - Newsletter signup → SheetDB
```

### Page Structure (15 HTML files)
1. **Core Pages** (uses `nav-desktop` layout with consistent nav):
   - `index.html` - Main page
   - `nutrition.html`
   - `fitness.html`
   - `mindfulness.html`
   - `resources.html`
   - `blog.html` - Blog listing with 6 article cards
   - `contact.html`

2. **Blog Articles** (uses `nav-desktop` layout, Blog category active):
   - `best-blood-sugar-supplements.html`
   - `joint-health-products.html`
   - `weight-loss-supplements.html`
   - `brain-health-supplements.html`
   - `anti-aging-supplements.html`
   - `energy-supplements.html`

3. **Legal Pages** (uses simplified inline nav):
   - `privacy.html`
   - `terms.html`
   - `affiliate-disclaimer.html`

4. **Standalone** (custom nav, not part of main site nav):
   - `health-tracker.html` - Separate tool, NOT in main navigation

---

## Navigation Bar Standardization (May 10, 2026)

### PROBLEM
Each HTML page had different navigation structure:
- `index.html` used `nav-desktop` with `nav-link` classes
- Other pages used `nav-links` with `ul/li` structure
- Mobile menus varied - some had Blog/Contact only, others had all links
- Navigation changed when clicking between pages

### SOLUTION
Standardized all pages to use consistent `nav-desktop` structure:

**Desktop Navigation (7 links):**
```html
<nav class="nav-desktop">
    <a href="index.html" class="nav-link">Home</a>
    <a href="nutrition.html" class="nav-link">Nutrition</a>
    <a href="fitness.html" class="nav-link">Fitness</a>
    <a href="mindfulness.html" class="nav-link">Mindfulness</a>
    <a href="resources.html" class="nav-link">Resources</a>
    <a href="blog.html" class="nav-link">Blog</a>
    <a href="contact.html" class="nav-link">Contact</a>
</nav>
```

**Mobile Navigation (8 links):**
```html
<nav class="mobile-nav">
    <a href="index.html" class="mobile-link">Home</a>
    <a href="nutrition.html" class="mobile-link">Nutrition</a>
    <a href="fitness.html" class="mobile-link">Fitness</a>
    <a href="mindfulness.html" class="mobile-link">Mindfulness</a>
    <a href="resources.html" class="mobile-link">Resources</a>
    <a href="blog.html" class="mobile-link">Blog</a>
    <a href="contact.html" class="mobile-link">Contact</a>
    <a href="health-tracker.html" class="mobile-link">Health Tracker</a>
</nav>
```

**Hamburger Button:**
```html
<button class="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
</button>
```

### Pages Updated
- nutrition.html, fitness.html, mindfulness.html
- resources.html, blog.html, contact.html
- best-blood-sugar-supplements.html, joint-health-products.html
- weight-loss-supplements.html, brain-health-supplements.html
- anti-aging-supplements.html, energy-supplements.html
- privacy.html, terms.html, affiliate-disclaimer.html

---

## Newsletter Configuration

### IMPORTANT: Always Monthly, Never Weekly
All newsletter copy must say "Monthly" not "Weekly":
- Heading: "Get Monthly Wellness Tips"
- Description: "Subscribe for expert health insights and exclusive supplement deals delivered once a month."

### Serverless Endpoint
- API Route: `/api/newsletter`
- Serverless Function: `api/newsletter.js`
- SheetDB API: `https://sheetdb.io/api/v1/4oqn42m78ngca`

### Newsletter Form HTML
```html
<form class="newsletter-form" id="newsletter-form">
    <input type="email" class="newsletter-input" id="email-input" placeholder="Enter your email address" required>
    <button type="submit" class="btn btn-primary">Subscribe</button>
</form>
```

---

## Contact Form Configuration

### Serverless Endpoint
- API Route: `/api/contact`
- Serverless Function: `api/contact.js`
- SheetDB API: `https://sheetdb.io/api/v1/0nqaanv4rcrgy`

---

## Forms Troubleshooting

### Common Issues
1. **Form not submitting**: Check browser console (F12) for errors
2. **Server terminal shows GET only**: Forms use POST, check browser network tab
3. **Cache issues**: Disable cache or hard refresh (Ctrl+Shift+R) after JS changes

### Form Handler Code (script.js)
```javascript
// Newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email-input').value;
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            // Handle response...
        });
    }
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            // Handle response...
        });
    }
}
```

---

## Affiliate Products (ClickBank)

### Product Categories & Links
- **Blood Sugar Support**: https://d3d536z1yngq0pc9ls2f1dak93.hop.clickbank.net
- **Brain Health (CogniCare Pro)**: Various ClickBank links
- **Weight Loss (Mitolyn, Java Burn)**: ClickBank links in blog articles
- **Joint Health (JointVive)**: ClickBank links

### Product Images
Located in `/images/` folder with subdirectories:
- `/images/blood-sugar-support/cellucare.jpg`
- etc.

---

## SEO Blog Articles

### Structure for High Intent Conversion
Each blog article is designed to:
1. Target specific search intent (e.g., "best blood sugar supplement")
2. Introduce problems users want to solve
3. Recommend affiliate products naturally within content
4. Include CTA boxes linking to ClickBank products
5. End with newsletter signup option

### 6 Blog Articles
1. `best-blood-sugar-supplements.html` - "best blood sugar supplement"
2. `joint-health-products.html` - "joint pain relief"
3. `weight-loss-supplements.html` - "weight loss supplements"
4. `brain-health-supplements.html` - "improve memory"
5. `anti-aging-supplements.html` - "best anti-aging supplements for longevity"
6. `energy-supplements.html` - "natural energy supplements"

### Article Template Structure
```html
<main class="article-container">
    <article>
        <header class="article-header">
            <span class="section-tag">Category</span>
            <h1>Article Title</h1>
        </header>
        <div class="article-content">
            <p>Intro paragraph targeting search intent</p>
            <h2>Section headings</h2>
            <div class="product-highlight">Product reviews with affiliate links</div>
            <div class="cta-box">Call-to-action with product link</div>
        </div>
    </article>
</main>
<section class="newsletter">Newsletter signup at bottom</section>
```

---

## Vercel Deployment

### Deployment Process
1. Changes pushed to GitHub main branch
2. Vercel automatically deploys from GitHub
3. URL: https://vitalityhub.vercel.app

### Serverless Routing (vercel.json)
```json
{
    "rewrites": [
        { "source": "/api/(.*)", "destination": "/api/$1" }
    ]
}
```

### Local Development Server
- Run `node server.js` for local testing
- Server forwards API requests to SheetDB
- Not needed for Vercel deployment

---

## Google Analytics

### Tracking ID
- GA4: G-R4DFEJF47E
- Added to all HTML pages in `<head>`

---

## Database Integration (SheetDB)

### How It Works
1. Forms submit to serverless functions (`/api/contact`, `/api/newsletter`)
2. Serverless functions forward data to SheetDB APIs
3. Data appears in Google Sheets (maintained by Michelle)

### Sheet URLs
- Contact submissions: Google Sheet connected to `0nqaanv4rcrgy`
- Newsletter subscriptions: Google Sheet connected to `4oqn42m78ngca`

---

## Known Issues / Notes

1. **Timestamp in contact form**: May not show correctly in Google Sheets - minor issue, using separate newsletter sheet
2. **Blog nav missing Blog link**: Fixed - now includes Blog and Health Tracker in mobile menu
3. **Mobile menu issue**: Ensure mobile menu has all 8 links including Health Tracker
4. **Newsletter frequency**: MUST be "Monthly" - NEVER "Weekly"

---

## Coding Conventions

### HTML
- Use semantic HTML5 elements
- Include `aria-label` for accessibility
- Use consistent class naming: `.nav-link`, `.mobile-link`
- Always use `rel="noopener noreferrer"` for external links

### CSS
- Uses CSS variables for theming (defined in `:root`)
- Mobile-first responsive design
- Hamburger menu shows at 768px breakpoint

### JavaScript
- Functions are initialized on `DOMContentLoaded`
- Forms use `fetch()` for API calls
- Mobile menu initialized via `initMobileMenu()`

### Git Workflow
1. Make changes locally
2. Test in browser
3. `git add .` and `git commit -m "description"`
4. `git push` to deploy to Vercel

---

## Useful Commands

```bash
# Start local server
node server.js

# Push changes to GitHub
git add .
git commit -m "Your message"
git push

# Check git status
git status

# Check recent commits
git log --oneline -5
```

---

## Resources for Next Developer

### Vercel Docs
- https://vercel.com/docs
- Serverless functions: place in `api/` directory

### SheetDB Docs
- https://sheetdb.io/documentation

### ClickBank Affiliate Program
- Contact Michelle for affiliate links
- All affiliate links must include `rel="noopener noreferrer"`

### Google Analytics
- https://analytics.google.com
- Property ID: G-R4DFEJF47E

---

## File Checklist for Adding New Pages

When creating new pages, ensure:
- [ ] Copy `nav-desktop` structure from existing pages
- [ ] Copy `mobile-menu` structure with all 8 links
- [ ] Use `hamburger` class (not `menu-toggle`)
- [ ] Add to `sitemap.xml` with correct URL and priority
- [ ] Include Google Analytics tag
- [ ] Use consistent class names
- [ ] Add active class to correct nav-link
- [ ] Test mobile responsive behavior
- [ ] Commit and push to GitHub

---

## Contact Information

- **GitHub Owner**: Michelle Grafia (michellegrafia16)
- **Current Developer**: Gerry Grafia (grafiager@gmail.com)