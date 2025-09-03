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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showResultsModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle('');
  };

  const renderModalContent = () => {
    if (!modalContent) return null;

    if (modalTitle === 'Horoscope Data') {
      return (
        <div className="horoscope-data">
          <div className="birth-info">
            <h4>Birth Information:</h4>
            <p><strong>Date:</strong> {modalContent.birth_data.date.day}/{modalContent.birth_data.date.month}/{modalContent.birth_data.date.year}</p>
            <p><strong>Time:</strong> {modalContent.birth_data.time.hour}:{modalContent.birth_data.time.minute.toString().padStart(2, '0')}:{modalContent.birth_data.time.second.toString().padStart(2, '0')}</p>
            <p><strong>Location:</strong> {modalContent.birth_data.location.latitude}°N, {modalContent.birth_data.location.longitude}°E</p>
          </div>
          
          <div className="planets-section">
            <h4>Planets:</h4>
            <div className="planets-grid">
              {Object.entries(modalContent.horoscope.planets).map(([planet, data]) => (
                <div key={planet} className="planet-item">
                  <strong>{planet}:</strong> {data.sign} ({data.degree_in_sign.toFixed(2)}°)
                </div>
              ))}
            </div>
          </div>

          <div className="houses-section">
            <h4>Houses:</h4>
            <div className="houses-grid">
              {Object.entries(modalContent.horoscope.houses).map(([house, data]) => (
                <div key={house} className="house-item">
                  <strong>{house}:</strong> {data.sign} ({data.degree_in_sign.toFixed(2)}°)
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (modalTitle === 'Aspects Data') {
      return (
        <div className="aspects-data">
          <div className="aspects-summary">
            <h4>Summary:</h4>
            <p><strong>Total Aspects:</strong> {modalContent.aspect_count}</p>
            <p><strong>Orb Used:</strong> {modalContent.orb_used}°</p>
          </div>
          
          <div className="aspects-list">
            <h4>Aspects:</h4>
            <div className="aspects-grid">
              {modalContent.aspects.map((aspect, index) => (
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
      );
    }

    if (modalTitle === 'Moon Phase Data') {
      return (
        <div className="moon-phase-data">
          <div className="moon-phase-description">
            <h4>Phase Description:</h4>
            <p className="phase-text">{modalContent.moon_phase}</p>
          </div>
          
          <div className="moon-position">
            <h4>Moon Position:</h4>
            <div className="moon-details">
              <div className="moon-sign">
                <strong>Sign:</strong> {modalContent.moon_position.sign}
              </div>
              <div className="moon-decan">
                <strong>Decan:</strong> {modalContent.moon_position.decan}
              </div>
              <div className="moon-degree">
                <strong>Degree in Sign:</strong> {modalContent.moon_position.degree_in_sign.toFixed(2)}°
              </div>
              <div className="moon-longitude">
                <strong>Absolute Longitude:</strong> {modalContent.moon_position.absolute_longitude.toFixed(2)}°
              </div>
            </div>
          </div>

          <div className="reference-points">
            <h4>Reference Points:</h4>
            <div className="reference-details">
              <div className="ascendant-ref">
                <strong>Ascendant Longitude:</strong> {modalContent.reference_points.ascendant_longitude.toFixed(2)}°
              </div>
              <div className="descendant-ref">
                <strong>Descendant Longitude:</strong> {modalContent.reference_points.descendant_longitude.toFixed(2)}°
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
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

      showResultsModal('Horoscope Data', data);
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

      showResultsModal('Aspects Data', data);
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

      showResultsModal('Moon Phase Data', data);
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

        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{modalTitle}</h2>
                <button className="close-button" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                {renderModalContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
