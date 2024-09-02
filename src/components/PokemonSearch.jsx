import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PokemonContext from '../context/PokemonContext';
import PokemonCard from './PokemonCard';
import Modal from './Modal';

function PokemonSearch() {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alias, setAlias] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const { savePokemon } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonList = response.data.results;

        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );

        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching the Pokémon data', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = () => {
    setFilteredPokemons(
      pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setVisibleCount(20); 
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20); 
  };

  const handleSaveClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setAlias('');
    setIsModalOpen(true);
  };

  const handleSaveAlias = () => {
    if (selectedPokemon && alias) {
      savePokemon(selectedPokemon, alias);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex mb-4 justify-center space-x-0">
        <input 
          type="text"
          maxLength={20}
          placeholder="Search Pokémon by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 px-11 rounded-l-md placeholder:italic placeholder:text-slate-400"
        />
        <button 
          onClick={handleSearch} 
          className="bg-sky-400 py-2 px-3 font-medium rounded-md hover:bg-sky-500 rounded-l-none text-white"
        > 
          Go!
        </button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
        {filteredPokemons.slice(0, visibleCount).map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onSaveClick={handleSaveClick} />
        ))}
      </section>
      {visibleCount < filteredPokemons.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-sky-400 py-2 px-4 text-white font-medium rounded-md hover:bg-sky-500"
          >
            Load More
          </button>
        </div>
      )}
      {isModalOpen && (
        <Modal 
          alias={alias}
          setAlias={setAlias}
          handleSaveAlias={handleSaveAlias}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default PokemonSearch;
