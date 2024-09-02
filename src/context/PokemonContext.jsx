import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [savedPokemons, setSavedPokemons] = useState([]);

  // Memuat Pokémon dari Local Storage saat halaman dirender
  useEffect(() => {
    const loadedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    setSavedPokemons(loadedPokemons);
  }, []); // [] memastikan efek ini hanya dijalankan sekali saat komponen dipasang

  const savePokemon = (pokemon) => {
    let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    savedPokemons.push(pokemon);
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    setSavedPokemons(savedPokemons);  // Update state in the context
  };

  const removePokemon = (pokemonName) => {
    let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    savedPokemons = savedPokemons.filter(pokemon => pokemon.name !== pokemonName);
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
    setSavedPokemons(savedPokemons);
  };

  return (
    <PokemonContext.Provider value={{ savedPokemons, savePokemon, removePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokemonContext;