import React, { Component } from "react";
import "./App.css";
//var Pokedex = require("pokedex-promise-v2");
//let P = new Pokedex();

export default class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [{color: {
      name:"red",
    }},{color: {
      name:"blue",
    }}]
  };
  componentDidMount() {
    let allPokemon = [];
    fetch("https://pokeapi.co/api/v2/pokemon-species/")
      .then(res => res.json())
      .then(
        infos => {
          let nbrPokemon = infos.count;
          console.log(nbrPokemon);

          for (let i = 1; i < nbrPokemon; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
              .then(res => res.json())
              .then(infos => {
                allPokemon.push(infos);

              });

          }


          this.setState({
            isLoaded: true,
            items: allPokemon ,

          });

          console.log(allPokemon.map(el => alert(el)),"here")
        },

        error => {
          console.log(error);
        }
      );
  }
  /*  const youpi = this.state.items.names;
 let getFr = () => {
   for (let i = 0; i < 10; i++) {
     if (youpi[i].language.name === "fr") {
       return youpi[i].name;
     }
   }

 }; */

  render() {
    const { error, isLoaded, items,} = this.state;
    if (this.state.error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          <h1>wesh khou</h1>
          <ul>
            {items.map((item, index) => (
             <li key = {index}> {item.color.name} </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
