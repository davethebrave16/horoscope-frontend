# Astrological Calculator Frontend

A modern React application for comprehensive astrological calculations built with TypeScript, Firebase, and Tailwind CSS.

## Features

- **Horoscope Calculations**: Calculate planetary positions, aspects, and moon phases
- **Planet Transit Analysis**: Calculate monthly planet transits for any celestial body
- **Geocoding Integration**: Search for cities and get coordinates automatically
- **Internationalization**: Full support for English and Italian languages with easy language switching
- **Modern UI**: Built with Tailwind CSS and responsive design with tab-based navigation
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and validation
- **Firebase Ready**: Configured for Firebase integration

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React i18next** for internationalization
- **Zod** for validation
- **React Hook Form** for form management
- **Firebase** for backend services
- **Zustand** for state management

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal, LocationInput, LanguageSwitcher)
│   ├── layout/          # Layout components (Header, Footer)
│   └── features/        # Feature-specific components (HoroscopeForm, TransitForm, etc.)
├── pages/               # Application pages/routes
│   └── Home/           # Home page with tab-based navigation
├── hooks/              # Custom React hooks (useForm, useHoroscope, useTransit, etc.)
├── services/           # API and Firebase service layers
│   ├── firebase/       # Firebase configuration and services
│   └── api/            # External API calls (horoscope-api, transit-api, geocoding-api)
├── contexts/           # React context providers
├── i18n/               # Internationalization configuration and translations
│   └── locales/        # Translation files (en.json, it.json)
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── styles/             # Global styles and themes
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Firebase project (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment configuration:
   ```bash
   cp env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```env
   # API Configuration
   REACT_APP_API_KEY=your_api_key_here
   REACT_APP_API_POSITION=https://your-api-endpoint.com/position
   REACT_APP_API_ASPECTS=https://your-api-endpoint.com/aspects
   REACT_APP_API_PHASE=https://your-api-endpoint.com/phase
   REACT_APP_API_TRANSIT=https://your-api-endpoint.com/planetary_transits

   # Firebase Configuration (optional)
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the application:
```bash
npm run build
```

### Linting and Type Checking

Run ESLint:
```bash
npm run lint
```

Run TypeScript type checking:
```bash
npm run type-check
```

## Usage

The application features a tab-based interface with two main sections:

### 🌟 Horoscope Tab
1. **Enter Birth Information**: Fill in the date and time of birth
2. **Choose Location Input**: Either enter a city name or coordinates directly
3. **Search City** (if using city mode): Click search to find coordinates
4. **Calculate**: Choose from three calculation types:
   - **Calculate Position**: Get planetary positions and houses
   - **Calculate Aspects**: Get planetary aspects
   - **Calculate Moon Phase**: Get moon phase information

### 🪐 Planet Transits Tab
1. **Select Time Period**: Choose year and month from dropdown menus
2. **Choose Planet**: Select from Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, or Pluto
3. **Enter Location**: Use the same location input system as horoscope calculations
4. **Calculate Transits**: Get detailed monthly transit events showing when the planet crosses major astrological angles

### 📍 Location Input Features
- **City Search**: Enter city name and search for coordinates automatically
- **Direct Coordinates**: Input latitude and longitude directly
- **Visual Feedback**: See found coordinates with confirmation message
- **Validation**: Comprehensive input validation for all fields

### 🌍 Internationalization
The application supports multiple languages with easy switching:
- **English**: Default language with complete translations
- **Italian**: Full Italian translation for all interface elements
- **Language Switcher**: Toggle between languages using the EN/IT buttons in the header
- **Persistent Selection**: Language choice is saved in localStorage
- **Comprehensive Coverage**: All text, labels, buttons, and messages are translated

## Architecture

### Component Structure

- **Common Components**: Reusable UI components like Button, Input, Modal, LocationInput
- **Feature Components**: Business logic components like HoroscopeForm, HoroscopeResults, TransitForm, TransitResults
- **Layout Components**: Page structure components like Header, Footer

### State Management

- **Local State**: Component-level state with useState and useReducer
- **Context API**: Global state for app-wide data (theme, notifications, errors)
- **Custom Hooks**: Encapsulated business logic and side effects

### Error Handling

- **Error Boundaries**: Catch JavaScript errors in component tree
- **Validation**: Form validation with Zod schemas
- **API Error Handling**: Centralized error handling for API calls

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Component Styling**: Scoped component styles

## API Integration

### Endpoints

The application integrates with the following API endpoints:

- **Position Calculation**: `POST /position` - Calculate planetary positions and houses
- **Aspects Calculation**: `POST /aspects` - Calculate planetary aspects
- **Moon Phase**: `POST /phase` - Calculate moon phase information
- **Planet Transits**: `POST /planetary_transits` - Calculate monthly planet transits

### Data Structures

#### Transit Request
```typescript
{
  year: number,
  month: number,
  latitude: number,
  longitude: number,
  timezone_offset_hours: number,
  planet: string,
  step_minutes: number
}
```

#### Transit Response
```typescript
{
  success: boolean,
  transits: TransitData[],
  parameters: TransitParameters,
  total_transits: number
}
```

### Supported Planets
- Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto

## Recent Updates

### v2.0.0 - Planet Transit Analysis
- **New Feature**: Added comprehensive planet transit calculations
- **UI Enhancement**: Implemented tab-based navigation for better organization
- **Component Refactoring**: Centralized location input into reusable `LocationInput` component
- **UX Improvements**: 
  - Month selection with dropdown instead of number input
  - Enhanced transit results display with color-coded zodiac signs
  - Improved form validation and error handling
- **Code Quality**: 
  - Eliminated code duplication between forms
  - Better TypeScript type definitions
  - Improved maintainability and consistency

### Key Features Added
- **Monthly Transit Analysis**: Calculate transits for any planet over any month
- **Visual Transit Display**: Beautiful results showing transit events with timestamps, angles, and zodiac signs
- **Unified Location Input**: Consistent location handling across all features
- **Enhanced Validation**: Comprehensive form validation with user-friendly error messages

## Contributing

1. Follow the established code style and patterns
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is licensed under the MIT License.