# Place Snap

“PlaceSnap – Share moments where you are, with the people you care about.”

## ✨ **Vision**

In an era where social media is overwhelmed by irrelevant content, **PlaceSnap** aims to connect you with the people **who truly matter** through **moments close to you** – at **real locations**, **in real time**, and in **the simplest way possible**.

## 🌟 **Product Direction**

- **As minimalist as a locket**, no cluttered newsfeed, no unnecessary content.
- **Map-centric** experience.
- Photos + locations → preserve moments that mean more than just photos.
- Privacy & close friends → core focus.

## 🔑 **Core features (MVP)**

### 1. ✅ **Photo check-in (core)**

- Open the app → camera appears immediately (like Locket).
- Take a photo + automatic GPS location.
- Send with 3 modes: **Public / Share with friends / Private (only you can view)**.
- Each photo is tagged with coordinates, timestamp, and user.

> 🎯 Maintain a "zero friction" experience: open and check in instantly.

---

### 2. 🗺️ **Map displaying check-ins**

- Interactive map display:
  - Thumbnail photos of friends near your current location.
  - Tap on a marker → open the full-size photo + see who has checked in.
  - Cluster markers when zooming out.

> 🎯 Make the map the center of your experience – see your friends' photos near you right away.

---

### 3. 📁 **Friends' albums & your own**

- View albums by user or by location.
- Simple interface: photo + location name (optional).
- Keep a "spatial diary."

---

### 4. 🔍 **Search for locations and see who has checked in**

- Search bar: location.
- Select a location → display public photos + photos of friends who have checked in there.

> 🎯 Create a light exploration feature, but not too social media-focused.

---

### 5. 👫 **Create an event at a location**

- At a specific point on the map:
  - Invite friends (select time).
  - Each person who arrives on time and at the correct location → check-in.
  - If enough people arrive → event "successful" → open event album.

> 🎯 Motivation to meet in person.

---

## 🛠️ **Additional features (Nice-to-have after MVP)**

- Notifications to remind friends who are missing from the event.
- Check-in streak: one photo per day → create a personal log.
- Badge for locations you've checked in at multiple times.
- Comments/Reactions (emojis) in your close friends' albums.

---

## 🔐 **Privacy & Control**

- All photos have a privacy level:
  - **Only me**
  - **Share with friends**
  - **Public**
- Friends must **accept a two-way connection** to view "friends only" photos.

---

## 💡 **Minimalist experience – “Snap first”**

- Open the app and go straight to the camera → take a photo → post → done.
- No newsfeed, no public comments.
- Prioritize showing photos of **people you know and are close to**, not strangers spamming.
- Map = a place to tell stories, not a news feed.

---

## 🔗 **Feature suggestion architecture**

```css
Splash/Login
 └── (tabs) (Tab Navigation)
      ├── 🗺️ Map (with pins)
      ├── 📸 Snap (default screen - camera)
      └── 🔔 User profile (user profile)
 └── (auth) (auth routes)
      ├── Login
      ├── Signup
      └── Resetpassword

```

---

## 📱 **What should the interface look like?**

- **Snap first**: camera opens first.
- **Map as story**: the map functions like an Instagram story — tap to view photos.
- Bright colors, a "friendly" and "fun" feel rather than professional.

---

## 🔋 **Performance & Optimization**

- Only load thumbnail images within X meters of the user's location.
- Load full-size images only when tapped.
- Save images offline temporarily if offline (sync later).

---

## 🧲 **Engagement (Retention Hooks)**

| Hook                | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| 📍 Check-in streak  | Post one photo daily – maintain your streak and earn achievements |
| 👀 Who's been here? | Spark curiosity about others at the location                      |
| 👥 Meet offline     | Small events to motivate meetups                                  |
| 🗺️ Location diary   | Review places you've been to, like a mini timeline                |

---

## ✅ Conclusion

**PlaceSnap** isn’t trying to replace big social networks – it’s simply:

> “A gentle way to save and share the places you’ve been – with the people who truly matter.”

## 🔧 Scripts

```bash
"start": "expo start",
"reset-project": "node ./scripts/reset-project.js",
"android": "expo start --android",
"ios": "expo start --ios",
"web": "expo start --web",
"lint": "expo lint"
"ios:device": "npx expo run:ios --device"
```

## 📦 Tech Stack

**Core:** React Native 0.80, TypeScript 5.0, React 19.1, Expo
**Navigation:** React Navigation 7 (Stack + Tabs)
**Styling:** NativeWind 4, Tailwind CSS, Class Variance Authority
**UI:** Lucide Icons, React Native SVG, Reanimated 3
**i18n:** react-i18next, react-native-localize
**Tools:** ESLint, Babel, Metro
**Backend and Auth:** Supabase

## Database and Migration

- New migrations should be added to the supabase/migrations folder.
- Use the supabase CLI to apply migrations locally to the database.
- supabase client should refer to lib/supabase.ts
- database model should be in folder `types`

## Themes and Styling

- Primary color: #fab300 (Yellow)
- Secondary color: #005248 (Green)
- Use NativeWind for styling, with custom themes defined in tailwind.config.js.

## Icons

- use lucide icons for UI components `lucide-react-native`

## Multi languege

- support English and Vietnamese
- organize follow locales/{lang}/{screen}. For example `locales/en/snap.json`, `locales/vi/snap.json`

---

**Ready to build something amazing? Start customizing this boilerplate for your next project!**
