import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';

function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList();
    return (
        <div className="pokemon-list-wrapper">
            <h1>Pokemon List</h1>
            <div className="page-control">
                <button
                    onClick={() =>
                        setPokemonListState({
                            ...pokemonListState,
                            PokedexUrl: pokemonListState.prevUrl,
                        })
                    }
                >
                    Prev
                </button>
                <button
                    onClick={() =>
                        setPokemonListState({
                            ...pokemonListState,
                            PokedexUrl: pokemonListState.nextUrl,
                        })
                    }
                >
                    Next
                </button>
            </div>
            <div className="pokemon-list">
                {pokemonListState.pokemonList.map((pokemon) => (
                    <Pokemon
                        name={pokemon.name}
                        key={pokemon.id}
                        url={pokemon.image}
                        id={pokemon.id}
                    />
                ))}
            </div>
        </div>
    );
}
export default PokemonList;
