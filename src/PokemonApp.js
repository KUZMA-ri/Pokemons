import React from 'react';
import axios from 'axios';
import styles from './PokemonApp.module.css';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

const urlList = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
let urlPokemonItem = ''; 
class PokemonApp extends React.Component {
  state = {
    pokemons: null,
    selectedPokemon: null, 
    pokemonDetails: null,
    urlPokemonItem: null,
    next: urlList,
    previous: null
  }

  componentDidMount() {
    axios.get(`${urlList}`)
      .then((response) => {
        const next = response.data.next
        const pokemons = response.data.results; 
        this.setState({ pokemons, next });
      })
  }

  getMore = (name) => {
    const selectedPokemon = this.state.pokemons.filter(pokemon => {

      if(pokemon.name === name) {
        urlPokemonItem = pokemon.url;
        return pokemon
      }
      return null
    });
    
    this.setState( {selectedPokemon: selectedPokemon[0].results, 
                    urlPokemonItem: urlPokemonItem})  
  }

  componentDidUpdate(prevProps, prevState) {          
    if(this.state.selectedPokemon !== prevState.selectedPokemon) {
      this.fetchData(this.state.selectedPokemon)
    }

    if(this.state.urlPokemonItem !== prevState.urlPokemonItem) {
      this.fetchData(this.state.urlPokemonItem)
    }
  }

  fetchData = () => {               
    axios.get(`${urlPokemonItem}`) 
      .then((response) => {
        const pokemonDetails = response.data;
        this.setState({ pokemonDetails });
      })
  }

  prevPage = () => {
    if(this.state.previous !== null) {
      axios.get(`${this.state.previous}`)
        .then((response) => {
          const next = response.data.next;
          const previous = response.data.previous;
          const pokemons = response.data.results;

          this.setState({ next, previous, pokemons });
        })
    }
  }

  nextPage = () => {
    axios.get(`${this.state.next}`)
      .then((response) => {
        const next = response.data.next;
        const previous = response.data.previous;
        const pokemons = response.data.results;

        this.setState({ next, previous, pokemons });
      })
  }

  render() {
    const { pokemons, pokemonDetails } = this.state;

    if(!pokemons) {
      return(
        <div className={styles.loader_container}>
        <div className={styles.loader}></div>
      </div>
      )
    }

    return(
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.main}>
            <PokemonList pokemons={ pokemons }  getMore={ this.getMore } />
            
            {pokemonDetails && (
            <PokemonDetails pokemonDetails={pokemonDetails} url={urlPokemonItem} getMore={this.getMore}/>
            )}
            
          </div>
          <div className={styles.pokemon__buttons}>
              <button 
                className={styles.pokemon__prev}
                onClick={() => this.prevPage()}>Previous
              </button>

              <button 
                className={styles.pokemon__next}
                onClick={() => this.nextPage()}>Next
              </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonApp;
