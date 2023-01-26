import './App.css';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import Modal from 'react-modal';

import DetailCard from './components/DetailCard';
import ThumbnailCard from './components/ThumbnailCard';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

function PokeDex() {
	const [pokemons, setPokemons] = useState([]);
	const [currentPokemonList, setCurrentPokemonList] = useState([]);
	const [pokemonDetail, setPokemonDetail] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [nextLink, setNextLink] = useState('');
	const [prevLink, setPrevLink] = useState('');
	const [search, setSearch] = useState('');
	const [notfound, setNotfound] = useState(false);
	const [pokemonApi, setPokemonApi] = useState('https://pokeapi.co/api/v2/pokemon');

	useEffect(() => {
		axios.get(pokemonApi).then((response) => {
			console.log(response);
			setPokemons(response.data.results);
			setCurrentPokemonList(response.data.results);
			setNextLink(response.data.next);
			setPrevLink(response.data.previous);
		});
		setIsLoading(false);
	}, [pokemonApi]);

	useEffect(() => {
		if (search === '') {
			setPokemons(currentPokemonList);
			setNotfound(false);
		} else {
			const searchedPokemon = currentPokemonList.filter((value) => {
				return value.name.toLowerCase().includes(search.toLowerCase());
			});
			if (searchedPokemon.length > 0) {
				setNotfound(false);
				setPokemons(searchedPokemon);
			} else {
				setNotfound(true);
			}
		}
	}, [search, currentPokemonList]);

  const handleChange = (e) => setSearch(e.target.value);

	

	const onClickNext = () => setPokemonApi(nextLink);

	const onClickPrev = () => setPokemonApi(prevLink);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <ReactLoading type="cylon" color="white" />
              </header>
            </div>
          </>
        ) : (
          <>
						<h1>Welcome to pokedex !</h1>
						<div className="search-box">
							<MdNavigateBefore
								style={{ cursor: prevLink ? 'pointer' : 'default' }}
								color={prevLink ? 'yellow' : 'grey'}
								size={30}
								onClick={onClickPrev}
							/>
							<input
								className="search-input"
								type="text"
								name="search"
								placeholder="Search Pokemon"
								onKeyUp={handleChange}
							/>
							<MdNavigateNext
								style={{ cursor: nextLink ? 'pointer' : 'default' }}
								color={nextLink ? 'yellow' : 'grey'}
								size={30}
								onClick={onClickNext}
							/>
						</div>
						{notfound && <p className="couldnt-find">Couldn't find the searched pokemon!</p>}
						{pokemons && (
							<div className="list-container">
								{pokemons.map((pokemon, index) => (
									<ThumbnailCard key={index}  name={pokemon.name} />
								))}
							</div>
						)}
					</>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
