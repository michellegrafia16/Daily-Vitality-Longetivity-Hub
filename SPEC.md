# Daily Vitality & Longevity Hub - Specification

## 1. Project Overview

**Project Name:** Daily Vitality & Longevity Hub
**Project Type:** Multi-section informational website
**Core Functionality:** A comprehensive health and wellness website providing articles, resources, and guidance on maintaining vitality and longevity through nutrition, exercise, mindfulness, and lifestyle choices.
**Target Users:** Health-conscious individuals seeking to improve their quality of life and lifespan through informed lifestyle decisions.

---

## 2. UI/UX Specification

### Layout Structure

**Pages:**
1. index.html - Main landing page with hero, features, and content sections
2. nutrition.html - Nutrition and diet guidance
3. fitness.html - Exercise and physical activity
4. mindfulness.html - Mental wellness and stress management
5. resources.html - Additional resources and tools
6. contact.html - Contact form

**Page Sections (index.html as primary):**
- Fixed navigation header
- Hero section with tagline and CTA
- Featured topics grid
- Daily tips section
- Testimonials carousel
- Newsletter signup
- Footer with links

**Responsive Breakpoints:**
- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full layout, 3-4 columns)

### Visual Design

**Color Palette:**
- Primary: #1B4D3E (Deep Forest Green)
- Secondary: #F7F3E9 (Warm Cream)
- Accent: #D4A574 (Warm Terracotta)
- Text Primary: #2C3E2D (Dark Green-Gray)
- Text Secondary: #6B7C6C (Muted Green)
- Highlight: #E8C547 (Golden Yellow)
- Background: #FDFBF7 (Off-White)
- Card Background: #FFFFFF
- Border: #E5DFD3 (Warm Gray)

**Typography:**
- Headings: 'Playfair Display', serif
  - H1: 3.5rem, weight 700
  - H2: 2.5rem, weight 600
  - H3: 1.75rem, weight 600
- Body: 'Source Sans 3', sans-serif
  - Body: 1rem, weight 400, line-height 1.7
  - Small: 0.875rem
- Accent/Labels: 'DM Sans', sans-serif, weight 500

**Spacing System:**
- Section padding: 80px vertical, 5% horizontal
- Card padding: 32px
- Element gaps: 24px standard, 16px compact
- Border radius: 12px cards, 8px buttons, 50% images

**Visual Effects:**
- Box shadows: 0 4px 24px rgba(27, 77, 62, 0.08)
- Hover shadows: 0 8px 32px rgba(27, 77, 62, 0.15)
- Subtle grain texture overlay on hero
- Smooth transitions: 0.3s ease-out

### Components

**Navigation:**
- Logo (text-based with leaf icon)
- Nav links: Home, Nutrition, Fitness, Mindfulness, Resources, Contact
- Mobile: Hamburger menu with slide-in drawer
- Active state: Golden underline accent

**Hero Section:**
- Full-width with layered background
- Animated text entrance
- Two CTA buttons (primary and secondary)
- Decorative floating leaf elements (CSS)

**Feature Cards:**
- Icon (emoji or SVG)
- Title
- Description
- Hover: lift effect with shadow

**Daily Tip Card:**
- Prominent display
- Icon accent
- Rotating tips (JS)

**Testimonial Carousel:**
- Quote text
- Author name and title
- Navigation dots
- Auto-rotate every 5 seconds

**Newsletter Form:**
- Email input field
- Submit button
- Privacy note

**Footer:**
- 4-column layout (About, Quick Links, Categories, Contact)
- Social media icons
- Copyright

---

## 3. Functionality Specification

### Core Features

1. **Navigation System**
   - Smooth scroll to sections
   - Active page highlighting
   - Mobile responsive hamburger menu

2. **Hero Animation**
   - Staggered text fade-in on load
   - Floating decorative elements

3. **Daily Tips Rotation**
   - JavaScript array of tips
   - Rotate every 8 seconds
   - Manual navigation option

4. **Testimonial Carousel**
   - Auto-advance every 5 seconds
   - Manual dot navigation
   - Pause on hover

5. **Newsletter Signup**
   - Email validation
   - Success message display
   - Form reset on submit

6. **Smooth Scrolling**
   - Anchor links scroll smoothly
   - Scroll-triggered animations for sections

### User Interactions

- Hover effects on all clickable elements
- Focus states for accessibility
- Button press feedback
- Card hover lift animations

### Edge Cases

- Long text truncation with ellipsis
- Image fallback colors
- Form validation feedback
- Mobile menu close on link click

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Color scheme matches specification exactly
- [ ] Typography uses specified font families
- [ ] Spacing is consistent throughout
- [ ] All hover effects are smooth and visible
- [ ] Mobile layout is fully functional

### Functional Checkpoints
- [ ] All navigation links work correctly
- [ ] Mobile menu opens and closes
- [ ] Daily tips rotate automatically
- [ ] Testimonial carousel advances
- [ ] Newsletter form validates and shows success
- [ ] Smooth scroll works on anchor links
- [ ] Page loads without console errors

### Content Requirements
- [ ] At least 6 sections on index page
- [ ] At least 4 navigation pages
- [ ] At least 5 daily tips in rotation
- [ ] At least 3 testimonials
- [ ] Complete footer with all columns