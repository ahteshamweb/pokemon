import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        params: {
          limit: 16,
          offset: 0,
          q: searchTerm,
        },
      })
      .then((res) => {
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        const results = res.data.results.map((p) => {
          return {
            name: p.name,
            url: p.url
          }
        });
        setPokemon(results);
        // Fetch images for each pokemon
        results.forEach((p, index) => {
          axios
            .get(p.url)
            .then((res) => {
              const updatedPokemon = {
                name: p.name,
                image: res.data.sprites.front_default
              };
              setPokemon(prevState => {
                const newPokemon = [...prevState];
                newPokemon[index] = updatedPokemon;
                return newPokemon;
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
  
    return () => cancel();
  }, [currentPageUrl, searchTerm]);
  

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}`)
      .then((res) => {
        // setRandomPokemon({
        //   name: res.data.name,
        //   image: res.data.sprites.front_default,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchClick() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then((res) => {
        setSearchedPokemon({
          name: res.data.name,
          image: res.data.sprites.front_default,
        });
        setPokemon([]);
      })
      .catch((err) => {
        console.log(err);
        setSearchedPokemon(null);
      });
    setSearchTerm('');
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
      <TextField  value={searchTerm} onChange={handleSearchInputChange} placeholder="Search Pokemon..."  />
        <Button  onClick={handleSearchClick} variant="contained"  style={{marginLeft:'10px', marginTop:'10px' }} >Search</Button>
      </div>
      {searchedPokemon ? (
        <div>
          <h2>{searchedPokemon.name}</h2>
          <img src={searchedPokemon.image} alt={searchedPokemon.name} />
        </div>
      ) : (
        <div>
          <h2>{randomPokemon && randomPokemon.name}</h2>
          {randomPokemon && <img src={randomPokemon.image} alt={randomPokemon.name} />}
        </div>
      )}
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null} gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
    </>
  );
}

export default App;