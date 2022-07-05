import React, { useEffect } from "react";
import '../App.css'; 
import { useState } from "react";
import { FaQuestionCircle, FaCog, FaToggleOn, FaToggleOff, FaWindowClose, FaChartBar } from 'react-icons/fa'; 
import Instructions from "./Instructions";
import Statistics from "./Statistics";

const API_BASE = "http://localhost:3004"


export default function Navbar(props) {

    const [questionMark, setQuestionMark] = useState(false)
    const [settings, setSettings] = useState(false)
    const [chart, setChart] = useState(false)
    const [superHero, setSuperHero] = useState(false)
    const [scifi, setScifi] = useState(false)
    const [comedies, setComedies] = useState(false)
    const [bestPictures, setBestPictures] = useState(false)

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const req = await fetch(API_BASE + '/statistics', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            if (data.superHero === true) {
                setSuperHero(true)
                props.updateStartingMovie('Super Hero Movies')
            } else {
                setSuperHero(false)
            }
            if (data.scifi === true) {
                setScifi(true)
                props.updateStartingMovie('Scifi Movies')
            } else {
                setScifi(false)
            }
            if (data.comedies === true) {
                setComedies(true)
                props.updateStartingMovie('Comedies')
            } else {
                setComedies(false)
            } 
            if (data.bestPictures === true) {
                setBestPictures(true)
                props.updateStartingMovie('Best Pictures (Oscars)')
            } else {
                setBestPictures(false)
            }
        } else {
            alert(data.error)
        }
    }

    const toggleSuperHero = async () => {
        const req = await fetch(API_BASE + '/settings/superHero', {
            method: 'POST', 
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            getUserInfo()
        } else {
            alert(data.error)
        }
        return data
    }

    const toggleScifi = async () => {
        const req = await fetch(API_BASE + '/settings/scifi', {
            method: 'POST', 
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            getUserInfo()
        } else {
            alert(data.error)
        }
    }

    const toggleComedies = async () => {
        const req = await fetch(API_BASE + '/settings/comedies', {
            method: 'POST', 
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            getUserInfo()
        } else {
            alert(data.error)
        }
    }

    const toggleBestPictures = async () => {
        const req = await fetch(API_BASE + '/settings/best-pictures', {
            method: 'POST', 
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            getUserInfo()
        } else {
            alert(data.error)
        }
    }

    return (
        <div className="navbar-container">
            <nav className="nav">
                <ul className="nav-list">
                    <li id="question-mark">
                        <a className="anchors" onClick={() => setQuestionMark(!questionMark)} href="#">
                            <FaQuestionCircle /> 
                        </a>
                    </li>
                    <li id="cog">
                        <a className="anchors" href="#" onClick={() => setSettings(!settings)}>
                            <FaCog />
                        </a>
                    </li>
                    <li id="stats">
                        <a href="#" className="anchors" onClick={() => setChart(!chart)}>
                            <FaChartBar />
                        </a>
                    </li>
                </ul>
            </nav>
        
        { chart ? <Statistics toggleStatistics={chart => setChart(chart)} /> : null }

        { questionMark ? <Instructions toggleQuestionMark={questionMark => setQuestionMark(questionMark)}/> : null }
        
           { settings ? 

            <div className="settings-container"> 
            <a id="settings-exit" href="#" onClick={() => setSettings(!settings)}>
                <FaWindowClose />
            </a>
                <h1>Settings</h1>
                <div className="toggles">
                    <h3>Super Hero Movies Only</h3>
                    <a className="switches" href="#" onClick={() => {toggleSuperHero()}}>
                        { superHero ? <FaToggleOn /> : <FaToggleOff />}
                    </a>
                </div>
                <div className="toggles">
                    <h3>Scifi Movies Only</h3>
                    <a className="switches" href="#" onClick={() => {toggleScifi()}}>
                        {scifi ? <FaToggleOn /> : <FaToggleOff />}
                    </a>
                </div>
                <div className="toggles">
                    <h3>Comedies Only</h3>
                    <a className="switches" href="#" onClick={() => {toggleComedies()}}>
                        {comedies ? <FaToggleOn /> : <FaToggleOff />}
                    </a>
                </div>
                <div className="toggles">
                    <h3>Best Pictures (Oscars) Only</h3>
                    <a className="switches" href="#" onClick={() => {toggleBestPictures()}}>
                        {bestPictures ? <FaToggleOn /> : <FaToggleOff />}
                    </a>
                </div>
            </div>

            : null
           } 
           

        </div>
    )
}
