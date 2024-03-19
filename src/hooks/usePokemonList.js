import { useEffect, useState } from 'react';
import downloadPokemons from '../components/utils/downloadPokemons';

function usePokemonList(DEFAULT_URL) {
    // const [pokemonList, setPokemonList] = useState([]);
    // const [PokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
    // const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
    // const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        PokedexUrl: DEFAULT_URL,
        nextUrl: DEFAULT_URL,
        prevUrl: DEFAULT_URL,
    });

    useEffect(() => {
        downloadPokemons(pokemonListState, setPokemonListState, DEFAULT_URL);
    }, [pokemonListState.PokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
