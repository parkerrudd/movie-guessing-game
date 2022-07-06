import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const API_BASE = "http://localhost:3004"

function Statistics(props) {

    const [gamesPlayed, setGamesPlayed] = useState(0)
    const [gamesWon, setGamesWon] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const navigate = useNavigate()

    const populateStats = async () => {
        const req = await fetch(API_BASE + '/statistics', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
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
        <div className="stats-container">
            <a id="settings-exit" href="#" onClick={() => props.toggleStatistics(props.chart)}>
                <FaWindowClose />
            </a>
            <div>
                <h1>Statistics</h1>
            </div>
            <div className="numbers">
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
        </div>
    )
}

export default Statistics;