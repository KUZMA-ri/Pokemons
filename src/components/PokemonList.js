import styles from './styles/pokemonList.module.css';
import PokemonItem from './PokemonItem';

const PokemonList = (props) => {
    const { pokemons, getMore } = props;

    const allPokemons = pokemons.map(pokemon => {
        return <PokemonItem key={pokemon.name}{...pokemon} getMore = {getMore}/>
    })

    return (
        <div className={styles.list}>
            <h1 className={styles.title}>POKEMONS</h1>
            <div className={styles.allPokemons}>
                {allPokemons}
            </div>
        </div>
    )
}

export default PokemonList;