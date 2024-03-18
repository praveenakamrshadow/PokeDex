import './Pokemon.css';

const Pokemon = ({ name, url }) => {
    return (
        <div className="pokemon">
            <div className="pokemon-name">{name}</div>
            <div>
                <img className="pokemon-image" src={url} alt="" />
            </div>
        </div>
    );
};

export default Pokemon;
