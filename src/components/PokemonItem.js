import styles from './styles/pokemonItem.module.css';

const PokemonItem = (props) => {
    const {name, getMore} = props;

    function getUppercase (str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
    <div className={styles.pokemon}>
        <div className={styles.pokemon__container}>
            <h3 className={styles.pokemon__name} >{getUppercase(name)}</h3>
            <button
                className={styles.pokemon__btn}
                onClick={() => getMore(name)}
                >MORE...</button>
        </div>
    </div>
    )
}

export default PokemonItem;