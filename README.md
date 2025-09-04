# Horoscope Frontend

A modern React application for astrological calculations built with TypeScript, Firebase, and Tailwind CSS.

## Features

- **Astrological Calculations**: Calculate horoscope positions, aspects, and moon phases
- **Geocoding Integration**: Search for cities and get coordinates automatically
- **Modern UI**: Built with Tailwind CSS and responsive design
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and validation
- **Firebase Ready**: Configured for Firebase integration

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zod** for validation
- **React Hook Form** for form management
- **Firebase** for backend services
- **Zustand** for state management

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal)
│   ├── layout/          # Layout components (Header, Footer)
│   └── features/        # Feature-specific components
├── pages/               # Application pages/routes
│   └── Home/           # Home page components
├── hooks/              # Custom React hooks
├── services/           # API and Firebase service layers
│   ├── firebase/       # Firebase configuration and services
│   └── api/            # External API calls
├── contexts/           # React context providers
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

1. **Enter Birth Information**: Fill in the date and time of birth
2. **Choose Location Input**: Either enter a city name or coordinates directly
3. **Search City** (if using city mode): Click search to find coordinates
4. **Calculate**: Choose from three calculation types:
   - Calculate Position: Get planetary positions and houses
   - Calculate Aspects: Get planetary aspects
   - Calculate Moon Phase: Get moon phase information

## Architecture

### Component Structure

- **Common Components**: Reusable UI components like Button, Input, Modal
- **Feature Components**: Business logic components like HoroscopeForm, HoroscopeResults
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

## Contributing

1. Follow the established code style and patterns
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is licensed under the MIT License.