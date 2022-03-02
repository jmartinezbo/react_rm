import imageRickMorty from "./img/rick-morty.png"
import './App.css';
import { useState } from "react";
import Characters from "./components/Characters";

function App() {
  const [characters, setCharacters] = useState(null)
  const [page, setPage] = useState(1)

  const reqApi = async () => {
    const api = await fetch('https://rickandmortyapi.com/api/character/?page=1');
    const characterApi = await api.json();

    //console.log(characterApi);
    setCharacters(characterApi.results);
  };

  //console.log(characters)

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Rick & Morty</h1>
        {characters ? (
          <Characters characters={characters} setCharacters={setCharacters} reqApi={reqApi} page={page} setPage={setPage}/>
        ) : (
          <>
            <img src={imageRickMorty} alt="Rick & Morty" className="img-home"/>
            <button onClick={reqApi} className="btn-search">
              Characters
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
