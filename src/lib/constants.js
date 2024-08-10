
const isDevelopment = import.meta.env.MODE === 'development';

// Use localhost if in development and it's explicitly set, otherwise use the Render URL
export const API_URL = isDevelopment && import.meta.env.VITE_USE_LOCALHOST === 'true'
  ? 'http://localhost:3000'
  : import.meta.env.VITE_API_URL || 'https://sweatdiary-server.onrender.com';

console.log('Current API_URL:', API_URL);