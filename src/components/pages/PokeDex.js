import "../../App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import ChatBox from "../chat/ChatBox";
import DetailCard from "../layout/DetailCard";
import ThumbnailCard from "../layout/ThumbnailCard";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
 // const [originalPokemons, setOriginalPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen,setIsOpen] = useState (false);
  const [nextLink, setNextLink] = useState("");
  const [prevLink, setPrevLink] = useState("");
  const [search, setSearch] = useState("");
  const [notfound, setNotfound] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [pokemonApi, setPokemonApi] = useState(
    "https://pokeapi.co/api/v2/pokemon"
 
  );
  const [currentPage, setCurrentPage] = useState(1);


  const [searchApiFetch, setSearchApiFetch] = useState([]);

  const searchApi = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5000";

  useEffect(() => {
    axios.get(pokemonApi, {
      timeout: 5000
    }).then((response) => {
      console.log(response);
      setPokemons(response.data.results);
      setCurrentPokemonList(response.data.results);
      setNextLink(response.data.next);
      setPrevLink(response.data.previous);
      localStorage.setItem('OriginalPokemon',JSON.stringify(response.data.results));      
      setIsLoading(false);
    }).catch(error => {
      if (error.code === 'ECONNABORTED') {
        console.log('Request timed out');
        setIsLoading(true)
      } else {
        console.log('Other error:', error);
        setIsLoading(true)
      }
    });
    
  }, [pokemonApi]);
  
  
  

  useEffect(() => {
    axios.get(searchApi).then((response) => {
      setSearchApiFetch(response.data.results);
    });
    if (search === "") {
      setPokemons(currentPokemonList);
      setNotfound(false);
    } else {
      const searchedPokemon = searchApiFetch.filter((value) => {
        return value.name.toLowerCase().includes(search.toLowerCase());
      });
      if (searchedPokemon.length > 0) {
        setNotfound(false);
        setPokemons(searchedPokemon);
      } else {
        setNotfound(true);
      }
    }
  }, [search, searchApiFetch, currentPokemonList, pokemons]); // add pokemons to the dependency array
  


  const handleChange = (e) => setSearch(e.target.value);

  
  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
    const sortedPokemons = pokemons.sort((a, b) => {
      if (sortAscending) {
        return a.name > b.name ? 1 : -1;
      } else {
        return a.name < b.name ? 1 : -1;
      }
    });
    setPokemons(sortedPokemons);
  };
  
    

    const resetButton = () => {
      const pokereset = JSON.parse(localStorage.getItem('OriginalPokemon'));
      setCurrentPokemonList(pokereset)
      setPokemons(pokereset); // reset pokemons to originalPokemons
      console.log(pokereset); // add this line
    };
    
    
    const refresh = () => {
      setIsLoading(true);
      axios.get(pokemonApi, {
        timeout: 5000
      }).then((response) => {
        console.log(response);
        setPokemons(response.data.results);
        setCurrentPokemonList(response.data.results);
        setNextLink(response.data.next);
        setPrevLink(response.data.previous);
        localStorage.setItem('OriginalPokemon',JSON.stringify(response.data.results));      
        setIsLoading(false);
      }).catch(error => {
        if (error.code === 'ECONNABORTED') {
          console.log('Request timed out');
          setIsLoading(true)
        } else {
          console.log('Other error:', error);
          setIsLoading(true)
        }
      });
    };
    

  

  const onClickPokemon = (url) => {
    axios.get(url).then((response) => {
      console.log(response.data);
      setPokemonDetail(response.data);
      setIsOpen(true)
    });
  };

  

  const onClickNext = () => {
    setCurrentPage(currentPage + 1)
    setPokemonApi(nextLink)
    console.log(currentPage)};

  const onClickPrev = () => {
    setCurrentPage(currentPage - 1)
    setPokemonApi(prevLink)
   console.log(currentPage)};

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
                <button onClick={refresh}>Refresh</button>
              </header>
            </div>
          </>
        ) : (
          <>
          
            <h1 className="h1-title">Welcome to pokedex !</h1>
            <h2 className="h2-page">PAGE:{currentPage}</h2>
            <div className="search-box">
              <MdNavigateBefore
                style={{ cursor: prevLink ? "pointer" : "default" }}
                color={prevLink ? "yellow" : "grey"}
                size={40}
                onClick={onClickPrev}
              />
              <button onClick={handleSortToggle}>Sort A-Z/Z-A</button>
              <input
                className="search-input"
                type="text"
                name="search"
                placeholder="Find Pokemon"
                onKeyUp={handleChange}
              />
              <button onClick={resetButton}>Reset</button>
              <MdNavigateNext
                style={{ cursor: nextLink ? "pointer" : "default" }}
                color={nextLink ? "yellow" : "grey"}
                size={40}
                onClick={onClickNext}
              />
            </div>
            
            
            {notfound && (
              <p className="couldnt-find">
                Couldn't find the pokemon!
              </p>
            )}
            {pokemons && (
              <div className="list-container">
                {pokemons.map((pokemon, index) => (
                  <ThumbnailCard
                    key={index}
                    onClick={() => onClickPokemon(pokemon.url)}
                    name={pokemon.name}
                  />
                ))}
              </div>
            )}
          </>
        )}
      <div className="Chat">
      <ChatBox openButtonLabel="Lets Chat" />
      </div>
    
      </header>
      {pokemonDetail && (
        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
            setIsOpen(false)

          }}
          style={customStyles}
        >
          <DetailCard detail={pokemonDetail} />
          {/* <div>
						Requirement:
						<ul>
							<li>show the sprites front_default as the pokemon image</li>
							<li>Show the stats details - only stat.name and base_stat is required in tabular format</li>
							<li>Create a bar chart based on the stats above</li>
							<li>
								Create a buttton to download the information generated in this modal as pdf. (images and chart must be
								included)
							</li>
						</ul>
					</div> */}
        </Modal>
      )}
      
    </div>
  );
}

export default PokeDex;
