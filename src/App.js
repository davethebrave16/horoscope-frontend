import React, { useState } from 'react';
import './App.css';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePosition = () => {
    if (!formData.date || !formData.time || !formData.latitude || !formData.longitude) {
      alert('Please fill in all fields');
      return;
    }
    
    setResults(prev => ({
      ...prev,
      position: `Position calculated for ${formData.date} at ${formData.time} at coordinates ${formData.latitude}°N, ${formData.longitude}°E`
    }));
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
            <button onClick={calculatePosition} className="calc-button">
              Calculate Position
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
          <div className="results">
            {results.position && (
              <div className="result-item">
                <h3>Position:</h3>
                <p>{results.position}</p>
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
            {!results.position && !results.aspects && !results.moonPhase && (
              <p className="no-results">No calculations performed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
