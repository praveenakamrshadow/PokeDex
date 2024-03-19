import axios from 'axios';

async function downloadPokemons(
    pokemonListState,
    setPokemonListState,
    defaultUrl,
    limit = 20
) {
    const response = await axios.get(
        pokemonListState.PokedexUrl ? pokemonListState.PokedexUrl : defaultUrl
    );

    let pokemonResults = response.data.results
        ? response.data.results.slice(0, limit)
        : response.data.pokemon.slice(0, limit);

    setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
    }));

    const pokemonPromise = pokemonResults.map((p) => {
        if (p.url) {
            return axios.get(p.url);
        } else if (p.pokemon.url) {
            return axios.get(p.pokemon.url);
        }
    });

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

    setPokemonListState((state) => ({
        ...state,
        pokemonList: pokemonFinalList,
    }));
}

export default downloadPokemons;
