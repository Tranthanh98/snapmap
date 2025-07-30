# PlaceSnap Copilot Instructions

## Project Overview

PlaceSnap is a location-based photo sharing app built with React Native and Expo. The core concept is "Share moments where you are" with a map-centric, minimalist experience focused on close friends rather than public social media.

## Architecture & Navigation

- **Expo Router** file-based routing with Stack + Tabs navigation
- **Tab Structure**: Three main tabs - `index` (Map), `snap` (Camera), and `profile` (Profile)
- **Auth Routes**: Separate `(auth)` group with login, signup, and resetpassword screens
- **Root Layout**: `app/_layout.tsx` handles theming and font loading
- **Tab Layout**: `app/(tabs)/_layout.tsx` configures bottom tabs with haptic feedback and blur effects

## Styling System

- **NativeWind 4** for Tailwind CSS in React Native
- **Global CSS**: Import `../global.css` in root layout for Tailwind base/components/utilities
- **Theme Colors**: Primary #fab300 (Yellow), Secondary #005248 (Green) - update `constants/Colors.ts`
- **Dual Theming**: Use `ThemedText`/`ThemedView` components OR NativeWind dark: classes
- **Pattern**: Prefer `className="bg-white dark:bg-gray-900"` for simple theming

## Component Patterns

- **Themed Components**: `ThemedText`, `ThemedView` with light/dark color props
- **UI Icons**: Use Lucide React Native icons directly (e.g., `import { Lock, Settings } from 'lucide-react-native'`)
- **Haptic Feedback**: `HapticTab` for tab interactions
- **File Structure**: UI components in `components/ui/`, general components in `components/`

## Backend Integration

- **Supabase**: Client configured in `lib/supabase.ts` with AsyncStorage persistence
- **Environment**: Use `process.env.PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
- **Auth**: Auto-refresh tokens, session persistence, AppState listeners already configured
- **Database Models**: Define types in `types/` folder (currently empty)
- **Migrations**: Add to `supabase/migrations/` folder

## Development Workflow

```bash
pnpm start              # Start Expo dev server
pnpm run android        # Launch Android
pnpm run ios           # Launch iOS
pnpm run web           # Launch web
pnpm run lint          # ESLint check
pnpm run reset-project # Reset to boilerplate (via scripts/reset-project.js)
```

## Internationalization (Implemented)

- **Structure**: `locales/{lang}/common.json` (e.g., `locales/en/common.json`, `locales/vi/common.json`)
- **Languages**: English (en) and Vietnamese (vi) support
- **Usage**: `const { t } = useTranslation(); t('key.path')`
- **Language Switching**: Click language option in Profile screen to toggle between en/vi
- **Auto-detection**: Detects device language on first launch

## Key Conventions

- **Import Aliases**: Use `@/` for root-relative imports (configured in metro/babel)
- **Screen Names**: Match the product vision - `snap` for camera, `index` for map
- **Platform Differences**: Use `Platform.select()` for iOS-specific styling (see tab bar)
- **File Extensions**: `.tsx` for components, `.ts` for utilities/types

## Critical Implementation Notes

- **Camera First**: Snap screen should open camera immediately (core UX principle)
- **Map Centric**: Map is the primary navigation, not a traditional feed
- **Privacy Levels**: All photos need "Only me"/"Friends"/"Public" privacy settings
- **Location Required**: Every photo must have GPS coordinates and timestamp
- **Offline Support**: Plan for temporary offline storage with sync later

## Missing Implementation Areas

1. Camera functionality in `snap.tsx` (UI completed, needs expo-camera integration)
2. Map with photo markers in `map.tsx` (UI completed, needs react-native-maps)
3. Supabase database schema and types for check-ins and profiles
4. Authentication logic in auth screens (UI completed, needs Supabase auth)
5. Photo upload and storage logic with Supabase Storage

When implementing new features, prioritize the "zero friction" camera experience and map-based photo discovery over traditional social media patterns.
