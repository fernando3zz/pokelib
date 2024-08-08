
import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon, onSaveClick }) => (
  <article className="rounded-md shadow-lg p-4 flex flex-col justify-between">
    <img 
      src={pokemon.sprites?.front_default || 'https://via.placeholder.com/150'}
      alt={pokemon.name} 
      className="w-32 h-32 mx-auto" 
    />
    <h1 className="text-xl font-medium text-center">{pokemon.name}</h1>
    <p className="">Weight: <span>{pokemon.weight / 10} kg</span></p>
    <p className="">Height: <span>{pokemon.height / 10} m</span></p>
    <p className="">Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    <button 
      type="button" 
      className="py-2 px-3 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500 w-full"
      onClick={() => onSaveClick(pokemon)}
    >
      Save
    </button>
  </article>
);

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default PokemonCard;
