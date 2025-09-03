// Using OpenStreetMap Nominatim API for geocoding (free, no API key required)
const GEOCODING_BASE_URL = 'https://nominatim.openstreetmap.org';

export const geocodingApi = {
  searchCity: async (cityName) => {
    try {
      const response = await fetch(
        `${GEOCODING_BASE_URL}/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'HoroscopeCalculator/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || data.length === 0) {
        throw new Error('City not found');
      }

      const result = data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        displayName: result.display_name,
        city: result.address?.city || result.address?.town || result.address?.village || cityName,
        country: result.address?.country || ''
      };
    } catch (error) {
      console.error('Geocoding API Error:', error);
      throw error;
    }
  }
};
