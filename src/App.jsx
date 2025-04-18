import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Navbar from './components/Navbar';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, 
      cacheTime: 900000, 
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;