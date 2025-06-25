# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mkworld (マリオカートワールド カスタムビルダー) is a Next.js 15.3.4 application that allows users to build custom driver and machine combinations for Mario Kart World. Users can select from 60 drivers and 52 machines, with the combined stats displayed graphically using charts.

The application features three main pages:
1. **性能一覧** (Performance List) - Browse all drivers and machines with their stats
2. **カスタムビルダー** (Custom Builder) - Build custom combinations and view combined stats
3. **パレート最適** (Pareto Optimization) - Find optimal combinations based on specific criteria

The primary color theme is blue throughout the application.

## Common Commands

```bash
# Development (uses Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Architecture & Key Patterns

### Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **UI**: shadcn/ui components (40+ pre-built components in src/components/ui/)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Forms**: react-hook-form + zod for validation
- **State**: React 19 built-in features

### Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/ui/` - shadcn/ui component library (New York style)
- `src/components/` - Application-specific components:
  - `driver-selector.tsx` - Driver selection interface
  - `machine-selector.tsx` - Machine selection interface
  - `stats-display.tsx` - Graphical stats visualization
- `src/lib/stats.ts` - Mario Kart driver/machine data structures
- `public/course/` - 30 course thumbnail images

### Key Development Patterns

1. **Component Creation**: Use existing shadcn/ui components from `src/components/ui/`. These follow the New York style with CSS variables for theming.

2. **Styling**: Use Tailwind CSS v4 classes. The `cn()` utility in `src/lib/utils.ts` handles class name merging.

3. **Path Imports**: Use `@/` alias for src directory imports (e.g., `import { Button } from "@/components/ui/button"`).

4. **Data Structure**: Mario Kart stats are defined in `src/lib/stats.ts` with interfaces for drivers and machines, each containing speed attributes (smooth/rough/water), acceleration (かそく), weight (おもさ), and handling (まがり).

5. **Type Safety**: TypeScript strict mode is enabled. Always provide proper types for components and functions.

## Application-Specific Guidelines

### Core Features

1. **Driver Selection**: Display all 60 drivers with their individual stats
2. **Machine Selection**: Display all 52 machines (karts and bikes) with their stats
3. **Stats Calculation**: Sum driver + machine stats for:
   - Speed (smooth/rough/water surfaces)
   - Acceleration (かそく)
   - Weight (おもさ)
   - Handling (まがり)
4. **Visual Display**: Use Recharts for graphical representation of combined stats

### UI/UX Considerations

- Use Select or ComboBox components for driver/machine selection
- Display driver/machine images if available
- Show individual stats and combined totals
- Use Card components for organized layout
- Implement responsive design for mobile/tablet/desktop

### State Management

- Use React state for selected driver/machine
- Calculate combined stats on selection change
- Consider using a custom hook for stats calculation logic

## Important Notes

- The project uses pnpm as package manager (pnpm-workspace.yaml exists)
- Dark mode support is built into the UI components
- When building features, leverage the extensive pre-built component library rather than creating new components from scratch
- Stats data is already defined in `src/lib/stats.ts` with proper TypeScript interfaces
