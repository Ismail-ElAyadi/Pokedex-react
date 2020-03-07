import React, { Component } from "react";

export default class Body extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    current:null,
    next: null,
    previous: null,
    Langue: "fr",
    NamePokemon: [],
    numbr: 10,
    offset:0,
  };


  componentDidMount() {
    this.fetchPokemon()
  }
  langPokemon = (e) => {
    this.setState({
      isLoaded: false,
      Langue: e.currentTarget.value
    }, () => this.fetchPokemon())


  }
  numbrPokemon = e => {
    if (e.currentTarget.value != null) {
      this.setState({
        isLoaded: false,
        numbr: e.currentTarget.value,
      }, () => this.fetchPokemon())
    }
  };

  fetchPokemon = (link) => {
    let AllPokemon = [];
    let fetcher;
    if (link) {
      fetcher = link
    } else {
      fetcher = `https://pokeapi.co/api/v2/pokemon-species/?offset=${this.state.offset}&limit=${this.state.numbr}`
    }
    fetch(fetcher)
      .then(res => res.json())
      .then(
        infos => {
          let infosPokemon = infos.results;
          this.setState({
            ready: false,
            items: infos.results,
            next: infos.next,
            previous: infos.previous
          });
          infosPokemon.map(el => {
            fetch(el.url)
              .then(res => res.json())
              .then(infos => {
                infos.names.forEach(langue => {
                  if (langue.language.name === this.state.Langue) {
                    AllPokemon.push(langue.name);
                  }
                  this.setState({
                    NamePokemon: AllPokemon,
                    isLoaded: true
                  });
                });
              });
          });
        },
        error => {
          this.setState({
            error:error
          })
          console.log(error);
        }
      );
  }
  nextPokemon = () => {
    this.setState({
      isLoaded: false
    }, () => this.fetchPokemon(this.state.next))

  };

  previousPokemon = () => {
    this.setState({
      isLoaded: false
    }, () => this.fetchPokemon(this.state.previous))
  };




  render() {
    const { error, isLoaded, NamePokemon } = this.state;
    if (this.state.error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <img src="https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif" alt="image loading salamèche" />;
    } else {
      return (
        <div>
          <h1>Pokémon</h1>
          <ul>
            {NamePokemon.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
          <button
            onClick={this.previousPokemon}
            disabled={!this.state.previous}
          >
            Previous
          </button>
          <button onClick={this.nextPokemon} disabled={!this.state.next}>
            Next
          </button>
          <select value={this.state.numbr} onChange={this.numbrPokemon}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <select onChange={this.langPokemon}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="ja">JA</option>
          </select>
        </div>


      );
    }
  }
}
