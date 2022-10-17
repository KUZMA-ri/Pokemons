import React from 'react';
import styles from './styles/pokemonDetails.module.css';

const PokemonDetails = (props) => {
    const {pokemonDetails} = props;
    const { id, name, sprites, getMore} = pokemonDetails;


    // const imgPrev = `${sprites.front_default.slice(0, -5)}${id - 1}.png`
    // const imgNext = `${sprites.back_default.slice(0, -5)}${id + 1}.png`

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
                    <button 
                        className={styles.pokemon__prev}
                        onClick={() => {


                        }}>Previous</button>

                    <button 
                        className={styles.pokemon__next}
                        onClick={() => {

                        }}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails;