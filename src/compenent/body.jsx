import React, { Component } from "react";

export default class Body extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    Langue: "fr",
    NamePokemon: [],
    idPokemon: [],
    api: "https://pokeapi.co/api/v2/pokemon-species/?offset=",
    numbr: 10,
    offset: 0,
    FullAPI: null,
    disbalePrevious: false,
    disableNext: true
  };

  offSetApi;

  UpdateApi = param => {
    this.setState(
      {
        FullAPI:
          this.state.api + this.state.offset + "&limit=" + this.state.numbr
      },
      () => {
        if (param) {
          this.fetchPokemon(param);
        } else {
          this.fetchPokemon();
        }
      }
    );
  };

  componentDidMount() {
    this.UpdateApi();
  }

  langPokemon = e => {
    this.setState(
      {
        isLoaded: false,
        Langue: e.currentTarget.value
      },
      () => this.UpdateApi()
    );
  };

  numbrPokemon = e => {
    if (e.currentTarget.value != null) {
      this.setState(
        {
          isLoaded: false,
          numbr: +e.currentTarget.value
        },
        () => this.UpdateApi()
      );
    }
  };

  fetchPokemon = paramOffSet => {
    switch (paramOffSet) {
      case "PREVIOUS":
        this.offSetApi = this.state.offset - this.state.numbr;
        if (this.offSetApi < 0) {
          this.offSetApi = 0;
        }
        break;
      case "NEXT":
        this.offSetApi = this.state.offset + this.state.numbr;
        break;
      default:
        this.offSetApi = this.state.offset;
        break;
    }

    let AllPokemon = [];
    let idPokedex = [];

    this.setState(
      {
        FullAPI: this.state.api + this.offSetApi + "&limit=" + this.state.numbr
      },
      () => {
        console.log(this.state.FullAPI, "api");
        fetch(this.state.FullAPI)
          .then(res => res.json())
          .then(
            infos => {
              this.setState(
                {
                  items: infos.results,
                  offset: this.offSetApi
                },
                () => {
                  if (this.state.offset <= 0) {
                    this.state.disbalePrevious = false;
                  } else {
                    this.state.disbalePrevious = true;
                  }
                  if (infos.next) {
                    this.state.disableNext = true;
                  } else {
                    this.state.disableNext = false;
                  }
                }
              );

              infos.results.map(el => {
                fetch(el.url)
                  .then(res => res.json())
                  .then(infos => {
                    console.log(infos);
                    idPokedex.push(infos.id);

                    infos.names.forEach(langue => {
                      if (langue.language.name === this.state.Langue) {
                        AllPokemon.push(langue.name);
                      }

                      this.setState({
                        NamePokemon: AllPokemon,
                        idPokemon: idPokedex,
                        isLoaded: true
                      });
                    });
                  });
              });
            },
            error => {
              this.setState({
                error: error
              });
              console.log(error);
            }
          );
      }
    );
  };

  nextPokemon = () => {
    this.setState(
      {
        isLoaded: false
      },
      () => {
        this.UpdateApi("NEXT");
      }
    );
  };

  previousPokemon = () => {
    this.setState(
      {
        isLoaded: false
      },
      () => {
        this.UpdateApi("PREVIOUS");
      }
    );
  };

  render() {
    const { error, isLoaded, NamePokemon, idPokemon } = this.state;
    if (this.state.error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <img
          src="https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif"
          alt="image loading salamèche"
        />
      );
    } else {
      return (
        <div>
          <h1>Pokémon</h1>
          <button
            onClick={this.previousPokemon}
            disabled={!this.state.disbalePrevious}
          >
            Previous
          </button>
          <button onClick={this.nextPokemon} disabled={!this.state.disableNext}>
            Next
          </button>
          <select value={this.state.numbr} onChange={this.numbrPokemon}>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
            <option value="96">96</option>
            <option value="50">50</option>
          </select>
          <select value={this.state.Langue} onChange={this.langPokemon}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="ja">JA</option>
          </select>
          <ul className="listePokemon">
            {NamePokemon.map((item, index) => (
              <li className="cardPokemon col-3 bg-warning" key={index}>
                <img
                  className="imgPokemon"
                  src={`https://pokeres.bastionbot.org/images/pokemon/${idPokemon[index]}.png`}
                />
                <p className="nomPokemon">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
