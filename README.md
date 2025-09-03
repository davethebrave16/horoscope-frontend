# Horoscope Calculator

A simple React application for astrological calculations including position, aspects, and moon phase calculations.

## Features

- Date and time input
- Latitude and longitude coordinate input
- Three calculation buttons:
  - Calculate Position
  - Calculate Aspects
  - Calculate Moon Phase
- Modern, responsive UI design

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Enter a date using the date picker
2. Enter a time using the time picker
3. Enter latitude and longitude coordinates
4. Click any of the three calculation buttons to see results

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
├── index.js        # Application entry point
└── index.css       # Global styles

public/
└── index.html      # HTML template
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Notes

The current implementation includes placeholder functionality for the calculation buttons. To implement actual astrological calculations, you would need to integrate with appropriate astronomical libraries or APIs.
