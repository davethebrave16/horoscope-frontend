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

  const calculateAspects = async () => {
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

      const data = await horoscopeApi.calculateAspects(
        dateObj,
        timeData,
        formData.latitude,
        formData.longitude,
        1.0 // Default timezone offset
      );

      setResults(prev => ({
        ...prev,
        aspects: data
      }));
    } catch (err) {
      setError(`Error calculating aspects: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateMoonPhase = async () => {
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

      const data = await horoscopeApi.calculateMoonPhase(
        dateObj,
        timeData,
        formData.latitude,
        formData.longitude,
        1.0 // Default timezone offset
      );

      setResults(prev => ({
        ...prev,
        moonPhase: data
      }));
    } catch (err) {
      setError(`Error calculating moon phase: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
            <button onClick={calculateAspects} className="calc-button" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Aspects'}
            </button>
            <button onClick={calculateMoonPhase} className="calc-button" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Moon Phase'}
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
            {results.aspects && results.aspects.success && (
              <div className="result-item">
                <h3>Aspects Data:</h3>
                <div className="aspects-data">
                  <div className="aspects-summary">
                    <h4>Summary:</h4>
                    <p><strong>Total Aspects:</strong> {results.aspects.aspect_count}</p>
                    <p><strong>Orb Used:</strong> {results.aspects.orb_used}°</p>
                  </div>
                  
                  <div className="aspects-list">
                    <h4>Aspects:</h4>
                    <div className="aspects-grid">
                      {results.aspects.aspects.map((aspect, index) => (
                        <div key={index} className="aspect-item">
                          <div className="aspect-planets">
                            <strong>{aspect.planet1}</strong> - <strong>{aspect.planet2}</strong>
                          </div>
                          <div className="aspect-details">
                            <span className={`aspect-type aspect-${aspect.aspect.toLowerCase()}`}>
                              {aspect.aspect}
                            </span>
                            <span className="aspect-degrees">{aspect.degrees.toFixed(2)}°</span>
                            <span className="aspect-orb">±{aspect.orb.toFixed(2)}°</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {results.moonPhase && results.moonPhase.success && (
              <div className="result-item">
                <h3>Moon Phase Data:</h3>
                <div className="moon-phase-data">
                  <div className="moon-phase-description">
                    <h4>Phase Description:</h4>
                    <p className="phase-text">{results.moonPhase.moon_phase}</p>
                  </div>
                  
                  <div className="moon-position">
                    <h4>Moon Position:</h4>
                    <div className="moon-details">
                      <div className="moon-sign">
                        <strong>Sign:</strong> {results.moonPhase.moon_position.sign}
                      </div>
                      <div className="moon-decan">
                        <strong>Decan:</strong> {results.moonPhase.moon_position.decan}
                      </div>
                      <div className="moon-degree">
                        <strong>Degree in Sign:</strong> {results.moonPhase.moon_position.degree_in_sign.toFixed(2)}°
                      </div>
                      <div className="moon-longitude">
                        <strong>Absolute Longitude:</strong> {results.moonPhase.moon_position.absolute_longitude.toFixed(2)}°
                      </div>
                    </div>
                  </div>

                  <div className="reference-points">
                    <h4>Reference Points:</h4>
                    <div className="reference-details">
                      <div className="ascendant-ref">
                        <strong>Ascendant Longitude:</strong> {results.moonPhase.reference_points.ascendant_longitude.toFixed(2)}°
                      </div>
                      <div className="descendant-ref">
                        <strong>Descendant Longitude:</strong> {results.moonPhase.reference_points.descendant_longitude.toFixed(2)}°
                      </div>
                    </div>
                  </div>
                </div>
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
