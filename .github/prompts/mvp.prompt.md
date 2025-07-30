---
mode: agent
---

# 📸 Checkin App – MVP Phase

## 🎯 Goals

Build a React Native app (like Locket) with photo check-ins, location-based check-ins. The app focuses on simplicity and quick social interactions.

## 🧩 MVP Features to Implement

1. **Auth & Profile**

   - Login/Signup with email/password
   - User profile with basic info (name, avatar, language, etc.)
   - Store user data in Supabase Auth and `profiles` table
   - Create user profile (`profiles`)

2. **Bottom Tab Navigation** (`Map`, `Snap`, `Profile`)

   - `Map`: View thumbnails of friends' photos & public photos by location
   - `Snap`: View check-in photos near current location
   - `Profile`: User profile with settings (language, etc.)

3. **Check-in logic**

   - Save photos to Supabase Storage
   - Save metadata: location (lat/lng), description, privacy mode, Spotify track ID
   - Upload to table `checkins`
   - Privacy modes: Public, Friends, Private
   - check-in should include:
     - GPS coordinates
     - Timestamp
     - User ID
     - Privacy level (Only me/Friends/Public)
     - description (optional)
   - Friends can see each other's check-ins based on privacy settings
   - Users can edit/delete their own check-ins
   - Friend can like or comment on check-ins

4. **Map Display**

   - Markers at check-in locations
   - Display thumbnails of photos on map
   - Tap marker → open full-size photo + metadata
   - Search location (Mapbox Places API)

5. **UI**
   - Use NativeWind for styling
   - Custom components: `ThemedText`, `ThemedView`, `IconSymbol`
   - Haptic feedback for interactions
   - Use Lucide icons for UI components
   - Refer to `locket` and `instagram` app for UI inspiration
   - Icons should be used from `lucide-react-native` package

## ✅ Start with these above requirements
