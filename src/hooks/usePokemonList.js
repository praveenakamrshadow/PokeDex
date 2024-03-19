import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList() {
    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon/';

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

    async function downloadPokemons() {
        const response = await axios.get(
            pokemonListState.PokedexUrl
                ? pokemonListState.PokedexUrl
                : 'DEFAULT_URL'
        );

        const pokemonResults = response.data.results;
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);

        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
        }));

        const pokemonPromise = pokemonResults.map((pokemon) =>
            axios.get(pokemon.url)
        );

        const pokemonListData = await axios.all(pokemonPromise);

        const pokemonFinalList = pokemonListData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
            };
        });
        // setPokemonList(pokemonFinalList);
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokemonFinalList,
        }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.PokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
