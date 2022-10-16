import styles from './styles/pokemonDetails.module.css';

const PokemonDetails = (props) => {
    const {pokemonDetails} = props;
    const { id, name, sprites, getMore} = pokemonDetails;
    console.log();

    // "next": "https://pokeapi.co/api/v2/pokemon/${id + 1}"
    // "previous": null,     ("https://pokeapi.co/api/v2/pokemon/${id - 1}")   if (id > 0)

    return(
        <div className={styles.pokemon__details}>
            <div className={styles.pokemon__wrapper}>
                <h3 className={styles.pokemon__name}>{name}</h3>
                <div className={styles.pokemon__images}>
                    <img 
                        className={styles.pokemon__pic} 
                        src={sprites.front_default} 
                        alt='pic'>
                    </img>

                    <img 
                        className={styles.pokemon__pic} 
                        src={sprites.back_default} 
                        alt='pic'>
                    </img>
                </div>

                <div className={styles.pokemon__buttons}>
                    <button className={styles.pokemon__prev}>Previous</button>
                    <button className={styles.pokemon__next}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails;