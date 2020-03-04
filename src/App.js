import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    next: null,
    previous: null,
    idLangue: null,
    nameFr: []
  };

  nextPokemon = () => {
    this.setState({
      isLoaded: false
    })
    let nomFR = [];
    fetch(this.state.next)
    .then(res => res.json())
    .then(
      infos => {
        let infosPokemon = infos.results;
        this.setState({
          items: infos.results,
          next: infos.next,
          previous: infos.previous
        });
        infosPokemon.map(el => {
          fetch(el.url)
            .then(res => res.json())
            .then(infos => {
              let tableauLangue = infos.names;
              //console.log(infos,"here")
              infos.names.forEach(langue => {
                let idfr = ()=> {
                  if (langue.language.name === "fr") {
                    nomFR.push(langue.name);
                  }
                }
                this.setState({
                  idLangue: idfr(),
                  nameFr: nomFR,
                  isLoaded: true
                });
              });
            });
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  previousPokemon = () => {
    this.setState({
      isLoaded: false
    })
    let nomFR = [];
    fetch(this.state.previous)
    .then(res => res.json())
    .then(
      infos => {
        let infosPokemon = infos.results;
        this.setState({
          items: infos.results,
          next: infos.next,
          previous: infos.previous
        });
        infosPokemon.map(el => {
          fetch(el.url)
            .then(res => res.json())
            .then(infos => {
              let tableauLangue = infos.names;
              //console.log(infos,"here")
              infos.names.forEach(langue => {
                let idfr = ()=> {
                  if (langue.language.name === "fr") {
                    nomFR.push(langue.name);
                  }
                }
                this.setState({
                  idLangue: idfr(),
                  nameFr: nomFR,
                  isLoaded: true
                });
              });
            });
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    let nomFR = [];
    fetch("https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10")
      .then(res => res.json())
      .then(
        infos => {
          let infosPokemon = infos.results;
          this.setState({
            items: infos.results,
            next: infos.next,
            previous: infos.previous
          });
          infosPokemon.map(el => {
            fetch(el.url)
              .then(res => res.json())
              .then(infos => {
                let tableauLangue = infos.names;
                //console.log(infos,"here")
                infos.names.forEach(langue => {
                  let idfr = ()=> {
                    if (langue.language.name === "fr") {
                      nomFR.push(langue.name);
                    }
                  }
                  this.setState({
                    idLangue: idfr(),
                    nameFr: nomFR,
                    isLoaded: true
                  });
                });
              });
          });
        },
        error => {
          console.log(error);
        }
      );
  }
  numbrPokemon = e => {
    this.setState({
      isLoaded: false
    })

    let nomFR = [];
    fetch(
      `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${e.currentTarget.value}`
    )
    .then(res => res.json())
    .then(
      infos => {
        let infosPokemon = infos.results;
        this.setState({
          items: infos.results,
          next: infos.next,
          previous: infos.previous
        });
        infosPokemon.map(el => {
          fetch(el.url)
            .then(res => res.json())
            .then(infos => {
              let tableauLangue = infos.names;
              //console.log(infos,"here")
              infos.names.forEach(langue => {
                let idfr = ()=> {
                  if (langue.language.name === "fr") {
                    nomFR.push(langue.name);
                  }
                }
                this.setState({
                  idLangue: idfr(),
                  nameFr: nomFR,
                  isLoaded: true
                });
              });
            });
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    const { error, isLoaded, items, nameFr } = this.state;
    if (this.state.error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <img src="https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif" />;
    } else {
      return (
        <div>
          <h1>wesh khou</h1>
          <ul>
            {nameFr.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
          <button
            onClick={this.previousPokemon}
            disabled={!this.state.previous}
          >
            {" "}
            Previous{" "}
          </button>
          <button onClick={this.nextPokemon} disabled={!this.state.next}>
            {" "}
            Next{" "}
          </button>
          <select onChange={this.numbrPokemon}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      );
    }
  }
}
