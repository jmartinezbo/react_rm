

export default function Characters(props) {
    
    const { characters, setCharacters, reqApi , page, setPage} = props;

    const resetCharacters = () => {
        //console.log("Reseteado")
        setCharacters(null);
    }

    const changePage = async (val) => {
        console.log(val, page);
        var x = page;
        if (x === 1 && val === -1) {
            console.log('true');
            setPage(1);
        } else {
            console.log('false');
            x = x + val;            
        }
        console.log(characters.pages)
        

        const api = await fetch('https://rickandmortyapi.com/api/character/?page='+x);
        const characterApi = await api.json();
    
        //console.log(characterApi);
        setPage(x);
        setCharacters(characterApi.results);
    }

    const reqApiFilter = async (val) => {
        const api = await fetch('https://rickandmortyapi.com/api/character/?status='+val);
        const characterApi = await api.json();
    
        //console.log(characterApi);
        setPage(1)
        setCharacters(characterApi.results);
      };

    //console.log(props)
    //console.log(characters)
    return (
        <div className="characters">
            <h1>Characters</h1>
            <span className="back-home" onClick={resetCharacters}>Back</span>
            <div id="div_top_hypers">                
                <ul id="ul_top_hypers">
                    <span >Filter By:</span>
                    <span> </span>
                    <li className="back-home">&#8227; <span onClick={reqApi} >All</span></li>
                    <span> </span>
                    <li className="back-home">&#8227; <span onClick={() => reqApiFilter('alive')} >Alive</span></li>
                    <span> </span>
                    <li className="back-home">&#8227; <span onClick={() => reqApiFilter('dead')} >Dead</span></li>
                    <span> </span>
                    <li className="back-home">&#8227; <span onClick={() => reqApiFilter('unknown')} >Unknown</span></li>
                </ul>
            </div>
            <div className="main-pagination">
                <div className="pagination">
                    <button onClick={() => changePage(-1)}>Previous Page</button>
                    <button onClick={() => changePage(1)}>Next Page</button>
                </div>
            </div>
            <div className="container-characters">
                {characters.map((character, index) => (
                    <div className="character-container" key ={index}>
                        <div>
                            <img src={character.image} alt={character.name}/>
                        </div>
                        <div>
                            <h3>{character.name}</h3>
                            <h6>                                
                                {(() => {
                                    switch (character.status) {
                                    case "Alive":   return <><span className="alive"/>Alive</>;
                                    case "Dead":    return <><span className="dead"/>Dead</>;
                                    default:        return <><span className="unknown"/>Unknown</>;
                                    }
                                })()}
                            </h6>
                            <p>
                                <span className="text-grey">Episodes:</span>
                                <span>{character.episode.length}</span>
                            </p>
                            <p>
                                <span className="text-grey">Specie:</span>
                                <span>{character.species}</span>
                            </p>
                        </div>
                    </div>

                ))}
            </div>
            <div className="main-pagination">
                <div className="pagination">
                    <button onClick={reqApi}>Previous Page</button>
                        <button onClick={reqApi}>Next Page</button>
                </div>
            </div>
            <span className="back-home" onClick={resetCharacters}>Back</span>
        </div>
    );
}

