# Styling Layer Documentation

## Overview

The Styling Layer manages all visual design aspects using Tailwind CSS and custom design systems.

## Tailwind CSS Configuration

### Configuration File
- **File**: `tailwind.config.ts`
- **Purpose**: Customizes Tailwind's default behavior
- **Key Sections**:
  - Content paths
  - Theme extensions
  - Plugin configurations

### Custom Theme Extensions
```typescript
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        muted: "#f1f5f9",
        foreground: "#0f172a",
        background: "#ffffff",
      },
      fontSize: {
        'section': ['3rem', { lineHeight: '1.2' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.4' }],
      },
      animation: {
        'shine': 'shine 5s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
    },
  },
  plugins: [],
}
```

## Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Main brand color
- **Secondary**: Slate (#64748b) - Supporting elements
- **Muted**: Light gray (#f1f5f9) - Background sections
- **Foreground**: Dark blue (#0f172a) - Text
- **Background**: White (#ffffff) - Main background

### Typography Scale
- **Section**: 3rem - Main headings
- **Body**: 1.125rem - Regular text
- **Small**: 0.875rem - Secondary text

### Spacing System
- Consistent padding and margins
- Based on Tailwind's default spacing scale
- Custom components use standard spacing

## Custom Components

### Card Components
- **card-surface**: Elevated surface with shadow
- **card-metric**: Statistics display cards
- **card-feature**: Feature highlight cards

### Animation Classes
- **animate-shine**: Shiny text effect
- **hover:scale-105**: Subtle hover scaling
- **transition-transform**: Smooth transitions

## Responsive Design

### Breakpoints
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Flexible grid systems

## Styling Guidelines

### Component Styling
- Use Tailwind utility classes
- Avoid custom CSS where possible
- Leverage design tokens
- Maintain consistency

### Custom CSS
- **File**: `src/App.css`
- **Purpose**: Global styles and resets
- **Contents**:
  - CSS resets
  - Global font settings
  - Custom animations
  - Utility classes

### Performance Considerations
- Purge unused CSS in production
- Optimize font loading
- Minimize custom CSS
- Use efficient selectors

### Accessibility
- High contrast ratios
- Focus indicators
- Scalable text
- Color-blind friendly palettes
