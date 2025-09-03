const API_BASE_URL = 'http://127.0.0.1:5001/horoscope-25aa9/us-central1';

export const horoscopeApi = {
  calculateHoroscope: async (date, time, latitude, longitude, timezoneOffset = 1.0) => {
    try {
      const requestData = {
        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
        time: [time.hours, time.minutes, time.seconds],
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone_offset_hours: timezoneOffset
      };

      const response = await fetch(`${API_BASE_URL}/calculate_horoscope`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      return data;
    } catch (error) {
      console.error('Horoscope API Error:', error);
      throw error;
    }
  },

  calculateAspects: async (date, time, latitude, longitude, timezoneOffset = 1.0) => {
    try {
      const requestData = {
        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
        time: [time.hours, time.minutes, time.seconds],
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone_offset_hours: timezoneOffset
      };

      const response = await fetch(`${API_BASE_URL}/calculate_aspects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      return data;
    } catch (error) {
      console.error('Aspects API Error:', error);
      throw error;
    }
  }
};
