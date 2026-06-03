---
name: Secure Migrant SuperApp
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a42'
  on-tertiary-container: '#3980f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1.5rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is engineered to provide a sense of absolute security, institutional reliability, and effortless utility for Indonesian migrant workers. The brand personality is **Protective**, **Empathetic**, and **Official**. It bridges the gap between high-stakes fintech and essential government services.

The visual style is **Corporate / Modern** with a focus on high legibility and clear affordances. By combining deep, authoritative navies with vibrant, energetic teals, the UI communicates both stability and modern efficiency. Layouts are spacious and organized to reduce cognitive load for users who may be navigating complex legal or financial workflows under stress.

## Colors

The palette is anchored by **Dark Navy (#0F172A)**, used for primary actions, headers, and text to establish a foundation of trust. **Teal (#14B8A6)** acts as a functional accent for success states, progress indicators, and primary brand moments, reflecting growth and safety. **Blue Accent (#3B82F6)** is reserved for interactive elements like links and informational callouts.

A strict semantic color system is applied:
- **Primary:** Dark Navy for critical UI housing and main buttons.
- **Secondary:** Teal for affirmative actions and health/status indicators.
- **Surface:** A very light cool gray (#F8FAFC) to keep the app feeling airy and clean.
- **Emergency:** A high-visibility Red (#EF4444) strictly for SOS and urgent alerts.

## Typography

This design system utilizes a dual-font approach. **Plus Jakarta Sans** is used for headlines to provide a friendly yet professional Indonesian-centric aesthetic. **Inter** is used for all body text and UI labels to ensure maximum legibility at small sizes, especially in data-heavy screens like JobLink lists or ID verification.

- **Headlines:** Use Bold or SemiBold weights to create a clear visual anchor on every screen.
- **Body:** Stick to Regular weight for long-form reading, switching to Medium for emphasis within text blocks.
- **Mobile Scaling:** Large headlines scale down by 20% on mobile devices to prevent awkward line breaks while maintaining hierarchy.

## Layout & Spacing

The system follows a **Fluid Grid** model optimized for mobile-first usage. A standard 4-column grid is used for mobile, expanding to 12 columns for tablet and desktop views. 

- **Safe Zones:** A 24px (1.5rem) horizontal margin is maintained on all screens to prevent content from hitting the edges of the device.
- **Vertical Rhythm:** Components are spaced using an 8px base unit. Stacked elements within a card use 8px or 12px, while major sections use 32px.
- **Touch Targets:** All interactive elements maintain a minimum hit area of 44x44px to accommodate users in various environments.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layers** supplemented by **Ambient Shadows**. 

- **Base Layer:** The background is the neutral surface (#F8FAFC).
- **Cards & Modals:** Use white (#FFFFFF) with a soft, diffused shadow (Blur: 16px, Y: 4, Opacity: 0.05, Color: Navy) to appear lifted and tappable.
- **Active States:** Subtle inner shadows or a 1px border in a lighter tint of the primary color indicate a "pressed" or "active" state.
- **Navigation:** The bottom navigation bar uses a high-blur backdrop to separate it from the scrolling content beneath, creating a persistent anchor.

## Shapes

The design system adopts a **Rounded** (level 2) language, utilizing a `1rem` (16px) base radius for cards and major containers, and a `2rem` (32px) radius for "2xl" elements like main action buttons or the prominent bottom sheet handles.

- **Primary Cards:** 16px rounded corners.
- **Buttons & Inputs:** 12px rounded corners to maintain a professional look.
- **SOS Button:** A perfect circle to ensure it stands out as a unique, high-priority object.
- **Status Badges:** Fully pill-shaped (rounded-full) for immediate recognition.

## Components

### Navigation Bars
- **Header:** Simple, centered title with a Dark Navy background or white with navy text. Left-aligned back button and right-aligned profile icon.
- **Bottom Nav:** Dark Navy background. Icons use Teal for the active state and a muted gray for inactive states. The SOS button is centered and occupies a slightly larger, circular visual footprint.

### Cards (JobLink)
- **Structure:** White background, 16px radius, soft shadow.
- **Elements:** Large circular flag icon (48px) on the left. Title in `headline-sm`, subtitle for location. Secondary text for requirements.
- **Action:** A "Lamar" (Apply) button on the right, using an outline style or small contained primary button.

### Status Badges
- **Style:** Small, pill-shaped containers.
- **Color Logic:** Teal background with white text for "Verified", Amber for "Pending", and Navy for "General Information".

### Input Fields
- **Style:** 12px rounded corners, 1px border (#E2E8F0).
- **Focus State:** Border changes to Blue Accent (#3B82F6) with a subtle outer glow.
- **Labels:** Always visible above the input field in `label-sm` Navy.

### SOS Button
- **Style:** Large, floating or centered circular button.
- **Color:** Solid Red (#EF4444).
- **Interaction:** Requires a "Long Press" or "Double Tap" to prevent accidental triggers, accompanied by haptic feedback.