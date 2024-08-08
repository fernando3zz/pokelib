import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [savedPokemons, setSavedPokemons] = useState([]);

  const savePokemon = (pokemon, alias) => {
    const newSavedPokemon = {
      ...pokemon,
      alias,
    };
    setSavedPokemons((prevPokemons) => [...prevPokemons, newSavedPokemon]);
  };

  const removePokemon = (name) => {
    setSavedPokemons((prevPokemons) => prevPokemons.filter(pokemon => pokemon.name !== name));
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

