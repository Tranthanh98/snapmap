# Location Setup Instructions

## API Configuration

PlaceSnap supports both Google Maps and Mapbox for location services and address display. Choose your preferred provider:

### Google Maps (Recommended for Vietnamese addresses)

1. **Get a Google Maps API Key**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the "Geocoding API"
   - Create credentials (API Key)
   - Restrict the API key to "Geocoding API" for security

2. **Configure Google Maps**
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

### Mapbox (Alternative provider)

1. **Get a Mapbox Access Token**

   - Go to [Mapbox Account](https://account.mapbox.com/)
   - Sign up or log in to your account
   - Navigate to "Access tokens" section
   - Create a new token or copy your default public token

2. **Configure Mapbox**
   ```env
   EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.ey...your_mapbox_token_here
   ```

## Usage

### Default (Google Maps)

```tsx
<LocationDisplay />
// or explicitly
<LocationDisplay provider="google" />
```

### Mapbox Provider

```tsx
<LocationDisplay provider="mapbox" />
```

## Features by Provider

| Feature              | Google Maps        | Mapbox                 |
| -------------------- | ------------------ | ---------------------- |
| Vietnamese addresses | ✅ Full support    | ❌ Limited             |
| Global coverage      | ✅ Excellent       | ✅ Excellent           |
| Address formatting   | ✅ Localized       | ✅ English-focused     |
| API pricing          | 💰 Pay per request | 💰 Free tier available |

## Restart Development Server

After updating the `.env` file, restart your development server:

```bash
pnpm start
```

## Location Features

The location feature includes:

- **Automatic Location Detection**: Gets current GPS position
- **Address Resolution**: Uses Mapbox Geocoding API to convert coordinates to readable addresses
- **Manual Refresh**: Tap the refresh icon to update location
- **Error Handling**: Shows appropriate messages for permission denied or location errors
- **Internationalization**: Supports English and Vietnamese

## Permissions

The app will automatically request location permissions when needed. Make sure to:

- Allow location access when prompted
- Enable location services on your device
- For iOS simulator: Use "Simulate Location" feature
- For Android emulator: Enable location in extended controls

## Troubleshooting

- **"Mapbox access token not found"**: Check your `.env` file configuration
- **"Location permission denied"**: Check device location settings
- **"Failed to fetch address"**: Check internet connection and Mapbox token validity
- **"Unable to get location"**: Check device location services are enabled
