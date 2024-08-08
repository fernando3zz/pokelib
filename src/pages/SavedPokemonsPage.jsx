import { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';

const SavedPokemonsPage = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('useContext must be used within a PokemonProvider');
  }

  const { savedPokemons, removePokemon } = context;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Saved Pokemon</h1>
      {savedPokemons.length === 0 ? (
        <p className="text-center text-gray-500">No saved Pokemon</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedPokemons.map((pokemon) => (
            <article key={pokemon.id} className="rounded-md shadow-lg p-4 flex flex-col justify-between">
              <img 
                src={pokemon.sprites?.front_default || 'https://via.placeholder.com/150'}
                alt={pokemon.name} 
                className="w-32 h-32 mx-auto" 
              />
              <h1 className="text-xl font-medium text-center">{pokemon.alias || pokemon.name}</h1>
              <p className="">Weight: <span>{pokemon.weight / 10} kg</span></p>
              <p className="">Height: <span>{pokemon.height / 10} m</span></p>
              <p className="">Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
              <button 
                type="button" 
                className="py-2 px-3 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500 w-full mt-2"
                onClick={() => removePokemon(pokemon.name)}
              >Delete</button>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default SavedPokemonsPage;

