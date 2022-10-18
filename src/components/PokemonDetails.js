import React from 'react';
import styles from './styles/pokemonDetails.module.css';

const PokemonDetails = (props) => {
    const {pokemonDetails} = props;
    const { id, name, sprites, getMore} = pokemonDetails;

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
            </div>
        </div>
    )
}

export default PokemonDetails;