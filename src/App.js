import React, { useState } from 'react';
import './App.css';
import { horoscopeApi } from './services/horoscopeApi';

function App() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    latitude: '',
    longitude: ''
  });

  const [results, setResults] = useState({
    position: null,
    aspects: null,
    moonPhase: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePosition = async () => {
    if (!formData.date || !formData.time || !formData.latitude || !formData.longitude) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse date and time
      const dateObj = new Date(formData.date);
      const [hours, minutes] = formData.time.split(':');
      
      const timeData = {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0
      };

      const data = await horoscopeApi.calculateHoroscope(
        dateObj,
        timeData,
        formData.latitude,
        formData.longitude,
        1.0 // Default timezone offset
      );

      setResults(prev => ({
        ...prev,
        position: data
      }));
    } catch (err) {
      setError(`Error calculating position: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateAspects = () => {
    if (!formData.date || !formData.time || !formData.latitude || !formData.longitude) {
      alert('Please fill in all fields');
      return;
    }
    
    setResults(prev => ({
      ...prev,
      aspects: `Aspects calculated for ${formData.date} at ${formData.time} at coordinates ${formData.latitude}°N, ${formData.longitude}°E`
    }));
  };

  const calculateMoonPhase = () => {
    if (!formData.date || !formData.time || !formData.latitude || !formData.longitude) {
      alert('Please fill in all fields');
      return;
    }
    
    setResults(prev => ({
      ...prev,
      moonPhase: `Moon phase calculated for ${formData.date} at ${formData.time} at coordinates ${formData.latitude}°N, ${formData.longitude}°E`
    }));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Horoscope Calculator</h1>
        
        <div className="form-section">
          <h2>Input Data</h2>
          
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="coordinates-group">
            <div className="form-group">
              <label htmlFor="latitude">Latitude:</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="e.g., 40.7128"
                step="0.0001"
                min="-90"
                max="90"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude:</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="e.g., -74.0060"
                step="0.0001"
                min="-180"
                max="180"
                required
              />
            </div>
          </div>
        </div>

        <div className="buttons-section">
          <h2>Calculations</h2>
          <div className="button-group">
            <button onClick={calculatePosition} className="calc-button" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Position'}
            </button>
            <button onClick={calculateAspects} className="calc-button">
              Calculate Aspects
            </button>
            <button onClick={calculateMoonPhase} className="calc-button">
              Calculate Moon Phase
            </button>
          </div>
        </div>

        <div className="results-section">
          <h2>Results</h2>
          {error && (
            <div className="error-message">
              <h3>Error:</h3>
              <p>{error}</p>
            </div>
          )}
          <div className="results">
            {results.position && results.position.success && (
              <div className="result-item">
                <h3>Horoscope Data:</h3>
                <div className="horoscope-data">
                  <div className="birth-info">
                    <h4>Birth Information:</h4>
                    <p><strong>Date:</strong> {results.position.birth_data.date.day}/{results.position.birth_data.date.month}/{results.position.birth_data.date.year}</p>
                    <p><strong>Time:</strong> {results.position.birth_data.time.hour}:{results.position.birth_data.time.minute.toString().padStart(2, '0')}:{results.position.birth_data.time.second.toString().padStart(2, '0')}</p>
                    <p><strong>Location:</strong> {results.position.birth_data.location.latitude}°N, {results.position.birth_data.location.longitude}°E</p>
                  </div>
                  
                  <div className="planets-section">
                    <h4>Planets:</h4>
                    <div className="planets-grid">
                      {Object.entries(results.position.horoscope.planets).map(([planet, data]) => (
                        <div key={planet} className="planet-item">
                          <strong>{planet}:</strong> {data.sign} ({data.degree_in_sign.toFixed(2)}°)
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="houses-section">
                    <h4>Houses:</h4>
                    <div className="houses-grid">
                      {Object.entries(results.position.horoscope.houses).map(([house, data]) => (
                        <div key={house} className="house-item">
                          <strong>{house}:</strong> {data.sign} ({data.degree_in_sign.toFixed(2)}°)
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {results.aspects && (
              <div className="result-item">
                <h3>Aspects:</h3>
                <p>{results.aspects}</p>
              </div>
            )}
            {results.moonPhase && (
              <div className="result-item">
                <h3>Moon Phase:</h3>
                <p>{results.moonPhase}</p>
              </div>
            )}
            {!results.position && !results.aspects && !results.moonPhase && !error && (
              <p className="no-results">No calculations performed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
