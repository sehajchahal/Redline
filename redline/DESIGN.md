---
name: Redline
description: A dark performance-car dashboard with clear controls and traceable figures.
colors:
  primary: "#ff784a"
  torque-blue: "#8cacf1"
  status-green: "#a6cdb2"
  background: "#121416"
  sidebar: "#17191c"
  panel: "#1b1e21"
  panel-hover: "#222629"
  border: "#303439"
  muted: "#a1a8ae"
  text: "#f2f3f4"
  primary-ink: "#21130e"
  primary-hover: "#ff976e"
  selected-nav: "#30241f"
  selected-nav-text: "#ff9c7c"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "58px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-.02em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 650
    letterSpacing: "-.03em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "-.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
  metric:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "43px"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  tag: "4px"
  tab: "6px"
  control: "7px"
  panel: "12px"
spacing:
  compact: "8px"
  control: "12px"
  mobile: "18px"
  panel: "23px"
  desktop: "36px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  field:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "11px 12px"
  navigation:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "12px 10px"
  tag:
    rounded: "{rounded.tag}"
    padding: "4px 7px"
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "23px"
---

# Design System: Redline

## Overview

**Creative North Star: "The Performance Garage"**

The Performance Garage is a conventional dark dashboard: calm charcoal surfaces, clear controls and compact data groups let the car and its figures lead. Warm orange marks action and power; a cooler blue identifies torque. The visual language is practical, dense and restrained.

DM Sans carries navigation and explanatory copy. Barlow Condensed gives car names and headline numbers their automotive character without turning the dashboard into a promotional page. Borders and small tonal steps separate information; source notes and missing-data states remain visible parts of the interface.

**Key Characteristics:**

- Charcoal surfaces with thin structural borders.
- Condensed car names and figures beside neutral UI text.
- Warm power and cool torque series with visible legends.
- Responsive stacks with intentional local scrolling.

## Colors

Warm orange and pale blue provide precise accents against cool charcoal neutrals. The frontmatter records canonical values extracted from the implemented stylesheet.

### Primary
- **Warm Power Orange** (`primary`): primary actions, the power curve, selected range controls, focus outlines and the brand mark.
- **Soft Orange Hover** (`primary-hover`): the primary button's brighter hover state.
- **Deep Warm Ink** (`primary-ink`): text on the primary action.
- **Burnt Charcoal / Soft Orange** (`selected-nav`, `selected-nav-text`): active dashboard navigation.

### Secondary
- **Cool Torque Blue** (`torque-blue`): torque series and its legend marker; comparison series also use the chart palette.

### Tertiary
- **Muted Status Green** (`status-green`): snapshot indicator and connected or refreshed data status.

### Neutral
- **Deep Charcoal** (`background`): page canvas and segmented-control tracks.
- **Sidebar Charcoal** (`sidebar`): persistent navigation surface.
- **Panel Charcoal** (`panel`): data panels and fields.
- **Lifted Charcoal** (`panel-hover`): interactive surface hover.
- **Structural Gray** (`border`): dividers and container edges.
- **Cool Gray** (`muted`): labels, explanations and secondary information.
- **Soft White** (`text`): principal content.

**The Series Identity Rule.** Power stays orange and torque stays blue; preserve their visible text legends.

## Typography

**Display Font:** Barlow Condensed, with sans-serif fallback.  
**Body Font:** DM Sans, with sans-serif fallback.

**Character:** Condensed headings and numbers give the car an identifiable voice. Regular-width UI text keeps dense controls and methodology readable. Fonts are loaded remotely through a Google Fonts CSS import with `display=swap`; they are not bundled locally. Requested weights are Barlow Condensed 500/600/700 and DM Sans 400/450/500/550/600/650/700.

### Hierarchy
- **Display:** the frontmatter's display role describes the standard desktop car name. Its manufacturer prefix uses medium weight (500) and muted color. Responsive sizes are 68px above 1650px, 50px at or below 1200px, 45px at or below 950px, and 49px at or below 680px.
- **Headline:** the page heading uses the headline role, shrinking to 26px on mobile.
- **Title:** section headings use the title role; panel titles are 16px and tertiary headings are 15px.
- **Body:** introductory copy uses the body role. Supporting panel copy uses 13px; notes and chart annotations use 12px. General root sizing is 16px.
- **Label:** field labels and desktop metric labels use the label role. Mobile metric labels and specification rows are 13px.
- **Metric:** primary figures use the metric role and tabular numerals; values change to 38px, 34px and 42px across the 1200px, 950px and 680px breakpoints. Units use DM Sans at 13px. Mini metrics use 32px; scenario results use 48px.

**The Two Voices Rule.** Use Barlow Condensed for car identity and key figures; keep controls and explanatory copy in DM Sans.

## Layout

The desktop shell places a sticky, full-height sidebar (224px) beside a flexible workspace. The topbar is 75px high; main content has a maximum width of 1640px and desktop side padding from the spacing tokens. The main chart/specification grid uses a 1.7-to-1 ratio with a 280px minimum specification column and 23px gaps. Four metrics form one bordered group. Model, trim and year controls appear immediately above the car identity, in columns of 1fr, 1fr and .55fr.

At 1200px the sidebar narrows to 190px, content padding becomes 25px, filters stack, panel padding becomes 19px and the main ratio becomes 1.3-to-1. At 950px the sidebar is 170px, chart/specification and valuation content stack, source panels stack, and the trim control occupies the full second row while model and year share the first. At 680px the sidebar becomes normal-flow top navigation, the four view buttons form a row, manufacturer buttons become a horizontal scroller, metrics form a two-by-two group and lower panels stack. Mobile main padding is 18px horizontally; major gaps become 18px. Above 1650px, the main top padding becomes 40px.

Manufacturer navigation on mobile and wide data/comparison tables are intentional local scroll containers. Tables keep numeric columns intact instead of forcing page-wide overflow. The table wrapper is positioned so hidden accessibility captions remain within its scroll context.

Charts are responsive SVGs with a default viewBox width of 640 and height of 260. At or below 680px, generated width is `max(260, innerWidth - 78)` to preserve label scale. A `matchMedia('(max-width: 680px)')` change listener rerenders the populated view when crossing the mobile breakpoint. The SVG scales within its panel between rerenders. These are calculated illustrations with visible methodological notes, not measured dyno plots.

## Elevation & Depth

Panels are flat: differences in charcoal tone and thin borders establish grouping without drop shadows. The toast is the only shadowed floating surface. It uses a light background and dark text so transient feedback remains separate from persistent data.

### Shadow Vocabulary
- **Toast separation** (`0 10px 35px #0006`): reserved for the fixed bottom notification.

**The Flat Panel Rule.** Keep data panels flat and distinguish them with tone and borders.

## Shapes

Panels, metric groups and table wrappers share the largest corner token. Controls and navigation use the smaller control radius; segmented tabs and compact tags are tighter still. Borders are thin (1px). Manufacturer monograms are circular outlines, with a few squared monograms using 5px rounding. Data curves have round joins and caps with a 2.8px stroke; gridlines are dashed (`3 5`).

## Components

### Buttons
Clear, compact actions. Primary buttons use orange with dark ink; secondary buttons use a panel fill, border and soft-white text. Both have a minimum height of 40px, 13px semibold text and the control corner token. Hover brightens the primary or raises the secondary surface tone. Keyboard focus is a 2px orange outline offset by 4px. Disabled buttons have half opacity and a not-allowed cursor. The car's main action stretches across the mobile width.

### Chips
Compact bordered labels. Ordinary tags use soft gray text; accent tags use soft orange text, a dark warm fill and a warm brown border. Tags themselves do not imply interactive behavior. Category filter buttons use dark text on a near-white fill when selected; chart segments use a raised gray selected fill on a dark track.

### Cards / Containers
Flat bordered information groups. Panels use the panel corner and padding tokens, tightening to 19px at 1200px. Metric groups share one outer border and internal dividers. Empty states use dashed borders or centered in-panel explanatory copy instead of fabricated charts or figures.

### Inputs / Fields
Panel-colored native inputs and selects, with 1px structural borders, control rounding and a minimum height of 43px. Field text is 14px; mobile selects use 13px. Visible labels remain above the controls. Focus uses the shared orange outline. Range inputs use the orange accent and expose accessible labels. No bespoke error-state visual variant is implemented.

### Navigation
Muted text and thin inline SVG icons; active dashboard navigation has a warm tinted background, while the selected manufacturer has a neutral raised surface. Hover uses the panel-hover tone. Desktop navigation is vertical; mobile view buttons stack icons above labels and have a minimum height of 62px. Mobile maker choices remain horizontally scrollable.

### Performance Graph
Orange and blue paths sit on dashed gray grids with text legends, descriptive SVG labels, and an RPM range control where supported. Unsupported or hybrid engine curves receive an explanatory empty state. Notes distinguish assumptions and sourced endpoints from measured data. Hover is not required to understand the chart.

### Feedback and Access
A polite live-region toast fades and moves into place over .2s. Views reveal over .24s ease-out; the loader rotates over 1s linearly. Reduced-motion preference disables all animations and transitions. The keyboard skip link becomes visible on focus; hidden captions and descriptive labels remain available to assistive technology.

## Do's and Don'ts

### Do:
- **Do** preserve the orange power and blue torque assignments alongside text legends.
- **Do** keep model, trim and model-year controls close to the selected car.
- **Do** retain visible keyboard focus, the skip link and reduced-motion behavior.
- **Do** distinguish calculated illustrations, source claims and unavailable values in visible copy.
- **Do** allow wide tables and mobile manufacturer navigation to scroll inside their own containers.

### Don't:
- **Don't** portray calculated curves as measured dyno runs or acceleration telemetry.
- **Don't** replace missing values with fabricated numbers or hide their explanatory states.
- **Don't** add decorative elevation to the flat data panels.
- **Don't** assume the remotely loaded fonts are bundled or available offline.
