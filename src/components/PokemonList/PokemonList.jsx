import './PokemonList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemonList, setPokemonList] = useState([]);
    const [PokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
    const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
    const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);

    async function downloadPokemons() {
        const response = await axios.get(
            PokedexUrl ? PokedexUrl : 'DEFAULT_URL'
        );

        const pokemonResults = response.data.results;
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

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
        setPokemonList(pokemonFinalList);
        console.log(pokemonFinalList);
    }

    useEffect(() => {
        downloadPokemons();
    }, [PokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <h1>Pokemon List</h1>
            <div className="page-control">
                <button onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
            <div className="pokemon-list">
                {pokemonList.map((pokemon) => (
                    <Pokemon
                        name={pokemon.name}
                        key={pokemon.id}
                        url={pokemon.image}
                    />
                ))}
            </div>
        </div>
    );
}
export default PokemonList;
