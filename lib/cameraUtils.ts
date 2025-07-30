import { Platform } from 'react-native';

export interface ZoomLevel {
  value: number; // The zoom value for Expo Camera (0-1)
  label: string; // Display label (e.g., "0.5x", "1x", "2x")
  description: string; // Description of the lens
}

export function getAvailableZoomLevels(): ZoomLevel[] {
  // For iOS devices with multiple lenses
  if (Platform.OS === 'ios') {
    return [
      {
        value: 0, // Ultra-wide lens (0.5x equivalent)
        label: '0.5x',
        description: 'Ultra-wide'
      },
      {
        value: 0.067, // Main lens (1x equivalent) - approximately 1/15 of max zoom
        label: '1x',
        description: 'Main'
      }
      // Note: For telephoto, we'd need a higher value like 0.133 for 2x, but
      // this depends on the specific device's zoom range
    ];
  }
  
  // For Android or devices without ultra-wide
  return [
    {
      value: 0, // Wide lens (1x equivalent)
      label: '1x', 
      description: 'Main'
    },
    {
      value: 0.133, // Digital zoom (2x equivalent)
      label: '2x',
      description: 'Digital zoom'
    }
  ];
}

export function getNextZoomLevel(currentZoom: number): ZoomLevel {
  const availableLevels = getAvailableZoomLevels();
  const currentIndex = availableLevels.findIndex(level => 
    Math.abs(level.value - currentZoom) < 0.01 // Small tolerance for floating point comparison
  );
  
  // If current zoom not found or is the last one, return the first
  if (currentIndex === -1 || currentIndex === availableLevels.length - 1) {
    return availableLevels[0];
  }
  
  // Return the next zoom level
  return availableLevels[currentIndex + 1];
}

export function getCurrentZoomLevel(currentZoom: number): ZoomLevel {
  const availableLevels = getAvailableZoomLevels();
  const found = availableLevels.find(level => 
    Math.abs(level.value - currentZoom) < 0.01
  );
  
  // Return found level or default to first
  return found || availableLevels[0];
}
