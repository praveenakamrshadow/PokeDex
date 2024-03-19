import { useParams, Link } from 'react-router-dom';
import './PokemonDetails.css';
import usePokemon from '../../hooks/usePokemon';
import Pokemon from '../Pokemon/Pokemon';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, pokemonListState] = usePokemon(id);

    return (
        <>
            <h1 className="pokedex-redirect">
                <Link className="pokedex-redirect-link" to="/">
                    Pokedex
                </Link>
            </h1>
            {pokemon && (
                <div className="pokemon-details-wrapper">
                    <div className="pokemon-detail-name">{pokemon.name}</div>
                    <div>
                        <img className="pokemon-image" src={pokemon.image} />
                    </div>
                    <div className="pokemon-attr">
                        <div>height: {pokemon.height}</div>
                        <div>weight: {pokemon.weight}</div>
                    </div>
                    <div className="pokemon-type">
                        <h1>Type:</h1>
                        {pokemon.types.map((t) => (
                            <span className="type" key={t.type.name}>
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="similar-pokemons">
                <h2>similar pokemons</h2>
                <div className="pokemon-similar-boxes">
                    {pokemonListState.pokemonList.length > 0 &&
                        pokemonListState.pokemonList.map((pokemon) => (
                            <Pokemon
                                name={pokemon.name}
                                key={pokemon.id}
                                url={pokemon.image}
                                id={pokemon.id}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default PokemonDetails;
