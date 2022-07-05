import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'; 
import Letters from "./letters";
import GuessTable from "./GuessTable";
import WinPage from "./WinPage";
import Navbar from "./Navbar";
import SuperHeroMovies from '../json/SuperHeroMovies.json'; 
import SciFi from '../json/SciFi.json'; 
import BestPicture from '../json/BestPictures.json'; 
import Comedies from '../json/Comedies.json'; 
import { Jwt } from "jsonwebtoken";

const API_BASE = "http://localhost:3004"

function Homepage() {
  const [current, setCurrent] = useState();
  const [guessCount, setGuessCount] = useState(0); 
  const [beginningMovie, setBeginningMovie] = useState([])
  useEffect(() => {
    GetBeginningMovie()

  }, [])

  const GetBeginningMovie = () => {
    fetch(API_BASE + "/settings")
    .then(res => res.json())
    .then(data => setBeginningMovie(data))
    .catch(err => console.error('Error:', err))
  }

  useEffect(() => {
    beginningMovie.map(x => {
      if (x.toggled === true) {
        setStartingMovie(x.text)
      }
    })
  }, [beginningMovie]) 

  const [correctTitle, setCorrectTitle] = useState(""); 
  const [correctID, setCorrectID] = useState(""); 


  //GENERATE STARTING POINT
  const [startingMovie, setStartingMovie] = useState('')
  let firstMovie = ['Iron Man', 'Avatar', 'Titanic', 'Shawshank Redemption', 'Reservoir Dogs', 'Groundhog Day', 'Paddington 2', 'Amelie', 'Brokeback Mountain', 'Donnie Darko', 'Scott Pilgrim Vs. The World', 'Portrait Of A Lady On Fire', 'Léon', 'Logan', 'The Terminator', 'No Country For Old Men', 'The Exorcist', 'Black Panther', 'Shaun Of The Dead' ]
  let day = 0; 
  var today = new Date();
  var clock = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const [time, setTime] = useState(""); 

  localStorage.setItem('startingMovie', startingMovie)

  if (startingMovie === 'Super Hero Movies') {
    firstMovie = SuperHeroMovies.movies
  }
  if (startingMovie === 'Scifi Movies') {
    firstMovie = SciFi.movies
  }
  if (startingMovie === 'Best Pictures (Oscars)') {
    firstMovie = BestPicture.movies
  }

  if (startingMovie === 'Comedies') {
    firstMovie = Comedies.movies
  }

  useEffect(() => {
    day = (Math.floor(Math.random() * firstMovie.length))
    var axios = require('axios');
    var config = {
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false`,
      params: {query: firstMovie[day]}
    };
    
    axios(config)
    .then(function (response) {
      setCurrent(response.data.results[0].title);
      setCorrectTitle(response.data.results[0].title)
      setCorrectID(response.data.results[0].id)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [startingMovie]); 

    const [movie, setMovie] = useState(''); 
    const [guessMovieID, setGuessMovieID] = useState(''); 
    const [guess, setGuess] = useState(); 
    const [searchField, setSearchField] = useState(false); 
 
    //GET MOVIE GUESS AND SET ID
    const movieQuery = () => {
      const axios = require('axios');

      let config = {
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false`,
        params: {query: movie}, 
        
      };
      
      axios(config)
      .then((response) => {
        setGuessMovieID(response.data.results[0].id);
        setGuessCount(guessCount + 1)
      })
      .catch((error) => {
        console.log(error);
      }); 
      setMovie('')
    }; 

    const [correctYear, setCorrectYear] = useState(""); 
    const [correctCompany, setCorrectCompany] = useState(""); 
    const [correctGenre, setCorrectGenre] = useState(""); 
    const [moviePoster, setMoviePoster] = useState(""); 


    //GET CORRECT MOVIE DETAILS
    useEffect(() => {
      const axios = require('axios');

      let config = {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${correctID}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`,
      params: {}
      };

      axios(config)
      .then((response) => {
        setCorrectYear(response.data.release_date.slice(0, 4))
        setCorrectGenre(response.data.genres[0].name)
        setCorrectCompany(response.data.production_companies[0].name)
        setMoviePoster(response.data.poster_path)
      })
      .catch((error) => {
      // console.log(error);
      });

    }, [correctID])

    const [correctDirector, setCorrectDirector] = useState(""); 
    const [correctActors, setCorrectActors] = useState([]); 

    useEffect(() => {
      const axios = require('axios');

      let config = {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${correctID}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`,
      };

      axios(config)
      .then((response) => {
          const credits = response.data.crew
          let correctActorsArr = []; 
          const cast = response.data.cast
          for (let i = 0; i < cast.length; i++) {
            correctActorsArr.push(cast[i].name)
          }
          setCorrectActors(correctActorsArr)
          let director = ""; 
          for (let i = 0; i < credits.length; i++) {
              if (credits[i].job === "Director") {
                  let director = credits[i].name
                  setCorrectDirector(director)
                }      
          };
          
      })
      .catch((error) => {
    //   console.log(error);
      });

  }, [correctID]); 

  //RESET GAME
  const [winPage, setWinPage] = useState(false); 
  const [playAgain, setPlayAgain] = useState(false); 

  useEffect(() => {
    if (correctTitle != null) setWinPage(false)

  }, [correctTitle])

  useEffect(() => {
    setGuessMovieID('')
    setWinPage(false)
  
  }, [])

  const addWin = async () => {
    const req = await fetch(API_BASE + '/win', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'x-access-token': localStorage.getItem('token')
        }
    })
  }

  const addGame = async () => {
    const req = await fetch(API_BASE + '/game', {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
          'x-access-token': localStorage.getItem('token')
      }
    })
  }

  useEffect(() => {
    if (correctID === guessMovieID && guessCount > 0) {
    addGame()
    addWin()

    setWinPage(true);
  }
  }, [guessMovieID])

  useEffect(() => {
    if (playAgain === true) {
      window.location.reload()
      setWinPage(false);

    }
  }, [playAgain])

  useEffect(() => {
    if (guessCount === 8) {
      addGame()
      setWinPage(true)
    }
  }, [guessCount])

  return (
    <div className="App">
      <Navbar updateStartingMovie={startingMovie => setStartingMovie(startingMovie)} />
      <div className="guess-section">  
        <h1 id="the">The</h1>
        <Letters/>
        <h1 id="game">Game</h1>
  
          <h2 id="guess-count">Guess Count: {guessCount}/8</h2>
        
            <div>
                <div className="search-container">
                    <input id="search-input" onChange={(e) => setMovie(e.target.value)} className="actors-searchbar" autoComplete="list" type="text" list="search-suggestions" placeholder="Search Movies..." required/>
                    <button onClick={() => {movieQuery(); setSearchField(true)}} className="actor-search-btn">Guess</button>
                </div>

            </div>
      </div>   
      { winPage ? <WinPage updatePlayAgain={playAgain => setPlayAgain(playAgain)} time={clock} guessCount={guessCount} correctTitle={correctTitle} moviePoster={moviePoster}/> : null }

        <GuessTable  time={clock} movieID={guessMovieID} guessCount={guessCount} 
        correctActors={correctActors} correctCompany={correctCompany} correctDirector={correctDirector}
        correctGenre={correctGenre} correctTitle={correctTitle} correctYear={correctYear} moviePoster={moviePoster}/> 
    </div>
  );
}

export default Homepage;
