import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative z-10">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;