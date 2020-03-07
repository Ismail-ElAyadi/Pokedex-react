import React, { Component } from "react";

export default class Body extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    current: null,
    next: null,
    previous: null,
    Langue: "fr",
    NamePokemon: [],
    api: "https://pokeapi.co/api/v2/pokemon-species/?offset=",
    numbr: 10,
    offset: 0,
    FullAPI: null,
    disbalePrevious: false,
    disableNext: true,
  };
  offSetApi;
  UpdateApi = (param) => {
    this.setState({
      FullAPI: this.state.api + this.state.offset + "&limit=" + this.state.numbr
    }, () => {
      if (param) {
        this.fetchPokemon(param)
      } else {
        this.fetchPokemon();
      }
    })
  }
  componentDidMount() {
    this.UpdateApi()
  }
  langPokemon = (e) => {
    this.setState({
      isLoaded: false,
      Langue: e.currentTarget.value
    }, () => this.UpdateApi())
  }
  numbrPokemon = e => {
    if (e.currentTarget.value != null) {
      this.setState({
        isLoaded: false,
        numbr: +e.currentTarget.value,
      }, () => this.UpdateApi())
    }
  };
  fetchPokemon = (paramOffSet) => {
    switch (paramOffSet) {
      case "previous":
        this.offSetApi = this.state.offset - this.state.numbr
        break;
      case "next":
        this.offSetApi = this.state.offset + this.state.numbr
        break;
      default: this.offSetApi = this.state.offset
        break;
    }
    let AllPokemon = [];
    this.setState({
      FullAPI: this.state.api + this.offSetApi + "&limit=" + this.state.numbr
    }, () => {
      console.log(this.state.FullAPI, "api");
      fetch(this.state.FullAPI
      )
        .then(res => res.json())
        .then(
          infos => {

            let infosPokemon = infos.results;
            this.setState({
              ready: false,
              items: infos.results,
              offset: this.offSetApi,
            }, () => {
              if (this.state.offset <= 0) {
                this.state.disbalePrevious = false
              }
              if (this.state.offset > 0) {
                this.state.disbalePrevious = true
              }
              if (infos.next) {
                this.state.disableNext = true
              } if (!infos.next) {
                this.state.disableNext = false
              };
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
              error: error
            })
            console.log(error);
          }
        );
    })

  }
  nextPokemon = () => {
    this.setState({
      isLoaded: false
    }, () => {
      this.UpdateApi("next")
    })

  };
  previousPokemon = () => {
    this.setState({
      isLoaded: false
    }, () => {
      this.UpdateApi("previous")
    })
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
            disabled={!this.state.disbalePrevious}
          >
            Previous
          </button>
          <button onClick={this.nextPokemon} disabled={!this.state.disableNext} >
            Next
          </button>
          <select value={this.state.numbr} onChange={this.numbrPokemon}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <select value={this.state.Langue} onChange={this.langPokemon}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="ja">JA</option>
          </select>
        </div>


      );
    }
  }
}
