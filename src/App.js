import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    next: null ,
    previous: null

  };

  nextPokemon = () => {
    fetch(this.state.next)
    .then(res => res.json())
    .then(
      infos => {        
        this.setState({
          isLoaded: true,
          items: infos.results,
          next : infos.next,
          previous: infos.previous
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  previousPokemon = () => {
    fetch(this.state.previous)
    .then(res => res.json())
    .then(
      infos => {        
        this.setState({
          isLoaded: true,
          items: infos.results,
          next : infos.next,
          previous: infos.previous
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20")
      .then(res => res.json())
      .then(
        infos => {
          console.log(infos)
          this.setState({
            isLoaded: true,
            items: infos.results,
            next : infos.next,
            previous: infos.previous
          });
        },

        error => {
          console.log(error);
        }
      );
  }
  numbrPokemon = (e) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${e.currentTarget.value}`)
    .then(res => res.json())
    .then(
      infos => {        
        this.setState({
          isLoaded: true,
          items: infos.results,
          next : infos.next,
          previous: infos.previous
        });
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
    const { error, isLoaded, items } = this.state;
    if (this.state.error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div>
          <h1>wesh khou</h1>
          <ul>
            {items && items.map((item, index) => (
              <li key = {index}> {item.name} </li>
            ))}
          </ul>
          <button onClick={this.previousPokemon} disabled={!this.state.previous}> Previous </button> 
          <button onClick={this.nextPokemon} disabled={!this.state.next}> Next </button> 
          <select  onChange = {this.numbrPokemon}>
          <option value = "50">50</option>
          <option value = "100">100</option>
          <option value = "150">150</option>
          </select>
        </div>

      );
    }
  }
}
