import {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3004"

function WinPage(props) {
    const [gamesPlayed, setGamesPlayed] = useState()
    const [gamesWon, setGamesWon] = useState()
    const [percentage, setPercentage] = useState()
    const navigate = useNavigate()

    const posterUrl = `https://image.tmdb.org/t/p/original/${props.moviePoster}`; 

    const populateStats = async () => {
        const req = await fetch(API_BASE + '/statistics', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        console.log(data)
        if (data.status === 'ok') {
            setGamesPlayed(data.gamesPlayed)
            setGamesWon(data.gamesWon)
            setPercentage(Math.round((data.gamesWon / data.gamesPlayed) * 100))
        } else {
            alert(data.error)
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                populateStats()
            }
        }
    }, [])

    return (
           <div className="win-page">
                <div className="win-page-box">
                    <h3 id="guesses">Guesses: {props.guessCount}/8</h3>
                    {/* <h3>{props.time}</h3> */}
                </div>
                <div>
                    <h3 id="solution">Solution: {props.correctTitle}</h3>
                </div>
                <div >
                    <img className="movie-poster" src={posterUrl} alt="Movie Poster" />
                </div>
                <div className="win-page-stats">
                    <div className="games-won">
                        <h3>{gamesWon}</h3>
                        <h3>Won</h3>
                    </div>
                    <div className="games-played">
                        <h3>{gamesPlayed}</h3>
                        <h3>Played</h3>
                    </div>
                    <div className="percentage">
                        <h3>{percentage}</h3>
                        <h3>Win %</h3>
                    </div>
                </div>
                <div>
                    <button onClick={() => {props.updatePlayAgain(true)}} className="share-btn">Play Again</button>
            </div>
    </div> 
    )
}

export default WinPage; 