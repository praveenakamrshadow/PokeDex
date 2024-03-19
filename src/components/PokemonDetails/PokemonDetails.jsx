import { useParams, Link } from 'react-router-dom';

import './PokemonDetails.css';
import usePokemon from '../../hooks/usePokemon';

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon] = usePokemon(id);
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
        </>
    );
};

export default PokemonDetails;
