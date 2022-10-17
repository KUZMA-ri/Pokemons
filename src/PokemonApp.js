import React from 'react';
import axios from 'axios';
import styles from './PokemonApp.module.css';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

const urlList = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
let urlPokemonItem = ''; 


// const data = {
// 	"count": 1154,
// 	"next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
// 	"previous": null,
// 	"results": [
// 		{
// 			"name": "bulbasaur",
// 			"url": "https://pokeapi.co/api/v2/pokemon/1/"
// 		},
// 		{
// 			"name": "ivysaur",
// 			"url": "https://pokeapi.co/api/v2/pokemon/2/"
// 		},
// 		{
// 			"name": "venusaur",
// 			"url": "https://pokeapi.co/api/v2/pokemon/3/"
// 		},
// 		{
// 			"name": "charmander",
// 			"url": "https://pokeapi.co/api/v2/pokemon/4/"
// 		},
// 		{
// 			"name": "charmeleon",
// 			"url": "https://pokeapi.co/api/v2/pokemon/5/"
// 		},
// 		{
// 			"name": "charizard",
// 			"url": "https://pokeapi.co/api/v2/pokemon/6/"
// 		},
// 		{
// 			"name": "squirtle",
// 			"url": "https://pokeapi.co/api/v2/pokemon/7/"
// 		},
// 		{
// 			"name": "wartortle",
// 			"url": "https://pokeapi.co/api/v2/pokemon/8/"
// 		},
// 		{
// 			"name": "blastoise",
// 			"url": "https://pokeapi.co/api/v2/pokemon/9/"
// 		},
// 		{
// 			"name": "caterpie",
// 			"url": "https://pokeapi.co/api/v2/pokemon/10/"
// 		},
// 		{
// 			"name": "metapod",
// 			"url": "https://pokeapi.co/api/v2/pokemon/11/"
// 		},
// 		{
// 			"name": "butterfree",
// 			"url": "https://pokeapi.co/api/v2/pokemon/12/"
// 		},
// 		{
// 			"name": "weedle",
// 			"url": "https://pokeapi.co/api/v2/pokemon/13/"
// 		},
// 		{
// 			"name": "kakuna",
// 			"url": "https://pokeapi.co/api/v2/pokemon/14/"
// 		},
// 		{
// 			"name": "beedrill",
// 			"url": "https://pokeapi.co/api/v2/pokemon/15/"
// 		},
// 		{
// 			"name": "pidgey",
// 			"url": "https://pokeapi.co/api/v2/pokemon/16/"
// 		},
// 		{
// 			"name": "pidgeotto",
// 			"url": "https://pokeapi.co/api/v2/pokemon/17/"
// 		},
// 		{
// 			"name": "pidgeot",
// 			"url": "https://pokeapi.co/api/v2/pokemon/18/"
// 		},
// 		{
// 			"name": "rattata",
// 			"url": "https://pokeapi.co/api/v2/pokemon/19/"
// 		},
// 		{
// 			"name": "raticate",
// 			"url": "https://pokeapi.co/api/v2/pokemon/20/"
// 		}
// 	]
// }

class PokemonApp extends React.Component {
  state = {
    count: 0,               // счетчик для  записи в адрес (id)
    next: "https://pokeapi.co/api/v2/pokemon/",   // дописать ${count}/
    previous: null,
    pokemons: null,
    selectedPokemon: null, 
    pokemonDetails: null,
    urlPokemonItem: null
  }

  componentDidMount() {
    axios.get(`${urlList}`)
      .then((response) => {
        const pokemons = response.data.results; 
        this.setState({ pokemons });
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
        </div>
      </div>
    )
  }
}

export default PokemonApp;
