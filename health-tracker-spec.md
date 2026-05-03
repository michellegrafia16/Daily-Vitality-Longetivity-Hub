# Health Tracker Dashboard Specification

## 1. Project Overview

- **Project Name**: Daily Vitality Health Tracker
- **Type**: Single-page health tracking dashboard (HTML/CSS/JS)
- **Core Functionality**: Interactive dashboard for tracking daily health metrics including water intake, sleep, steps, mood, and vitals with data visualization and goal tracking
- **Target Users**: Health-conscious individuals who want to monitor their daily wellness metrics

## 2. UI/UX Specification

### Layout Structure

**Header**
- Fixed sidebar navigation (desktop) / bottom navigation bar (mobile)
- Logo/app name at top
- Quick stats summary

**Main Content Area**
- Dashboard grid layout with metric cards
- Weekly progress charts
- Today's log section for manual entries

**Metric Cards (6 types)**
1. Water Intake - glass count with visual fill indicator
2. Sleep Hours - duration display with quality indicator
3. Steps - count with daily goal progress ring
4. Mood - emoji selector with trend
5. Weight - input with weekly trend mini-chart
6. Vitals - blood pressure/pulse input

### Responsive Breakpoints
- Desktop: 1200px+ (sidebar + 3-column grid)
- Tablet: 768px-1199px (collapsed sidebar + 2-column grid)
- Mobile: <768px (bottom nav + single column)

### Visual Design

**Color Palette**
- Primary: `#2D4A3E` (Deep Forest Green)
- Secondary: `#C8956C` (Warm Terracotta)
- Accent: `#8FAE7D` (Sage Green)
- Background: `#F5F1EA` (Warm Beige)
- Card Background: `#FFFFFF` (White)
- Text Primary: `#1A1A1A`
- Text Secondary: `#6B6B6B`
- Success: `#4CAF50`
- Warning: `#FF9800`
- Error: `#E53935`

**Typography**
- Headings: "Playfair Display", serif (weights: 600, 700)
- Body: "Nunito", sans-serif (weights: 400, 600, 700)
- Numbers/Stats: "DM Mono", monospace
- H1: 32px, H2: 24px, H3: 18px
- Body: 15px, Small: 13px

**Spacing**
- Card padding: 24px
- Grid gap: 20px
- Section margin: 32px

**Visual Effects**
- Cards: subtle shadow `0 2px 12px rgba(45,74,62,0.06)`
- Hover: shadow intensifies, slight scale (1.02)
- Border radius: 16px for cards, 12px for buttons, 8px for inputs
- Progress rings: animated fill on load

### Components

**Metric Cards**
- Icon + title header
- Large number display
- Subtitle/unit label
- Progress indicator (circular or bar)
- Quick-add buttons for relevant metrics
- States: default, goal-met (celebration glow), behind (subtle warning)

**Water Tracker**
- Visual glass/bottle stack display
- Tap to add/remove glass (8 glasses = 2L)
- Animated fill effect
- Goal: 8 glasses/day

**Sleep Tracker**
- Moon icon with hours display
- Quality rating (1-5 stars)
- Goal: 7-9 hours

**Steps Tracker**
- Walking icon with count
- Circular progress ring (goal: 10,000)
- Animated ring fill

**Mood Selector**
- 5 emoji options in a row
- Selected state: scale up + color
- Options: 😫 😕 😐 🙂 😄
- Label changes based on selection

**Weight Input**
- Number input with unit toggle (kg/lbs)
- Mini sparkline showing 7-day trend
- Last recorded date display

**Blood Pressure Card**
- Two inputs: systolic/distolic
- Color-coded status (optimal/elevated/high)
- Heart rate input
- Range indicators

**Date Navigator**
- Left/right arrows for date
- Today button
- Current date displayed

**Add Entry Modal**
- Slide-up from bottom
- Quick-select for common entries
- Custom value input
- Save/Cancel buttons

### Animations

**Page Load**
- Cards fade in with stagger (0.1s delay each)
- Progress rings animate from 0 to current value
- Numbers count up animation

**Interactions**
- Card tap: subtle pulse
- Button press: scale down then up
- Goal achieved: confetti burst + glow pulse
- Modal: slide up with backdrop fade

**Data Updates**
- Smooth number transitions
- Chart updates with animated transitions

## 3. Functionality Specification

### Core Features

1. **Daily Metric Tracking**
   - Log water (glasses), sleep (hours), steps (count), mood (1-5), weight, blood pressure
   - Data persists in localStorage
   - Each day creates new entry

2. **Progress Visualization**
   - Circular progress for water, steps
   - Bar indicator for sleep
   - Sparkline for weight trend

3. **Goal System**
   - Default goals: Water 8 glasses, Sleep 8h, Steps 10k
   - Visual celebration when goal met
   - Streak counter for consecutive goal days

4. **Data Persistence**
   - localStorage for all data
   - JSON structure keyed by date
   - Auto-save on every change

5. **Date Navigation**
   - View any past date
   - Cannot log future dates
   - Quick "today" return button

6. **Summary Statistics**
   - Weekly average for each metric
   - Best streak display
   - Today's completion percentage

### User Interactions

- Click/tap to increment water glasses
- Direct input for steps, weight, BP
- Emoji tap for mood selection
- Swipe on date to navigate (mobile)
- All inputs auto-save on blur

### Edge Cases

- First-time user: show onboarding hints
- No data for selected date: show empty state with "Log Today" prompt
- Invalid input: show inline validation message
- localStorage full: show warning, offer export

## 4. Acceptance Criteria

- [ ] All 6 metric types display correctly
- [ ] Water tracker increments/decrements on tap
- [ ] Steps input accepts number and saves
- [ ] Sleep hours can be set with slider or input
- [ ] Mood selector updates and persists
- [ ] Weight input with kg/lbs toggle works
- [ ] Blood pressure inputs with color coding
- [ ] Date navigation changes displayed data
- [ ] Data persists after page refresh
- [ ] Progress indicators animate correctly
- [ ] Mobile responsive layout works
- [ ] Goal celebration triggers at 100%
- [ ] Weekly sparkline shows 7-day trend
- [ ] No console errors on load