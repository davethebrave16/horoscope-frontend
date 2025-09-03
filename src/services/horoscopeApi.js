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

      const response = await fetch(`${process.env.REACT_APP_API_POSITION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
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

      const response = await fetch(`${process.env.REACT_APP_API_ASPECTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
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
  },

  calculateMoonPhase: async (date, time, latitude, longitude, timezoneOffset = 1.0) => {
    try {
      const requestData = {
        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
        time: [time.hours, time.minutes, time.seconds],
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone_offset_hours: timezoneOffset
      };

      const response = await fetch(`${process.env.REACT_APP_API_PHASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
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
      console.error('Moon Phase API Error:', error);
      throw error;
    }
  }
};
