import { Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import Navbar from './components/Navbar';
import PokemonSearch from './components/PokemonSearch';
import SavedPokemonsPage from './pages/SavedPokemonsPage';


function App() {
  return (
    <PokemonProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PokemonSearch />} />
          <Route path="/saved" element={<SavedPokemonsPage />} />
        </Routes>
      </main>
    </PokemonProvider>
  );
}

export default App;
