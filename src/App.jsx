import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { Outlet } from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import ThemeProvider from './components/ThemeContext';
import '@fontsource/inter';
import '@fontsource/pacifico';
import LayoutProvider from './components/LayoutContext';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <LayoutProvider>
            <Outlet />
          </LayoutProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
