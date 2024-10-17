import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { Outlet } from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import ThemeProvider from './components/ThemeContext';
import './styles/custom-scrollbar.css';
import '@fontsource/inter';
import '@fontsource/pacifico';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
