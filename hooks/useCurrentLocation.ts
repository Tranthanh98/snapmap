import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface LocationData {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  loading: boolean;
  error: string | null;
}

interface UseCurrentLocationOptions {
  provider?: 'google' | 'mapbox';
}

export const useCurrentLocation = (options: UseCurrentLocationOptions = {}) => {
  const { provider = 'google' } = options;
  const [locationData, setLocationData] = useState<LocationData>({
    address: '',
    coordinates: null,
    loading: true,
    error: null,
  });

  const fetchAddressFromGoogle = async (latitude: number, longitude: number) => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google Maps API key not found');
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=vi`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address from Google');
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address || 'Unknown location';
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error('Error fetching address from Google:', error);
      return 'Unable to get address';
    }
  };

  const fetchAddressFromMapbox = async (latitude: number, longitude: number) => {
    try {
      const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
      
      if (!accessToken) {
        throw new Error('Mapbox access token not found');
      }

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&types=address,poi,place`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        return feature.place_name || feature.text || 'Unknown location';
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Unable to get address';
    }
  };

  const getCurrentLocation = async () => {
    console.log('Getting current location...');
    try {
      setLocationData(prev => ({ ...prev, loading: true, error: null }));

      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationData(prev => ({
          ...prev,
          loading: false,
          error: 'Location permission denied',
        }));
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      
      // Fetch address from selected provider
      const address = provider === 'google' 
        ? await fetchAddressFromGoogle(latitude, longitude)
        : await fetchAddressFromMapbox(latitude, longitude);

      setLocationData({
        address,
        coordinates: { latitude, longitude },
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get location',
      }));
    }
  };

  const refreshLocation = () => {
    getCurrentLocation();
  };

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...locationData,
    refreshLocation,
  };
};
