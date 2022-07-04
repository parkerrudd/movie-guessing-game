import React, { useEffect } from "react";
import '../App.css'; 
import { useState } from "react";
import { FaQuestionCircle, FaCog, FaToggleOn, FaToggleOff, FaWindowClose } from 'react-icons/fa'; 
import Instructions from "./Instructions";

const API_BASE = "http://localhost:3004"


export default function Navbar(props) {

    const [questionMark, setQuestionMark] = useState(false)
    const [settings, setSettings] = useState(false)
    const [superToggle, setSuperToggle] = useState(false)
    const [scifiToggle, setScifiToggle] = useState(false)
    const [bestPicture, setBestPicture] = useState(false)
    const [comedies, setComedies] = useState(false)
    const [switches, setSwitches] = useState([])

    useEffect(() => {
        GetSettings()

        console.log(switches)
    }, [])

    const GetSettings = () => {
        fetch(API_BASE + "/settings")
        .then(res => res.json())
        .then(data => setSwitches(data))
        .catch(err => console.error('Error:', err))
    }

    const toggleSwitch = async (id) => {
        const data = await fetch(API_BASE + "/settings/toggle/" + id, {
            method: "PUT"
        }).then(res => res.json())

        setSwitches(switches => switches.map(x => {
            if (x._id === data._id) {
                x.toggled = data.toggled
            }

            return x
        }))
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
                </ul>
            </nav>

        { questionMark ? <Instructions toggleQuestionMark={questionMark => setQuestionMark(questionMark)}/> : null }
        
           { settings ? 

                <div className="settings-container">
                    <a id="settings-exit" href="#" onClick={() => setSettings(!settings)}>
                        <FaWindowClose />
                    </a>
                    <h1>Settings</h1>
                    <div className="switches">
                    {switches.map(toggle => (
                        <div className="toggles" key={toggle._id}>
                            <h3>{toggle.text} Only</h3>
                            <a id="toggle-off" className="toggle-super" href="#" onClick={() => {toggleSwitch(toggle._id); props.updateStartingMovie(toggle.text)}}>
                                { toggle.toggled ? <FaToggleOn /> : <FaToggleOff /> }
                            </a>
                        </div>
                    ))}
                    </div>
                    
                    {/*<div className="supers">
                        <h3>Super Hero Movies Only</h3>
                        <a id="toggle-off" className="toggle-super" href="#" onClick={() => {setSuperToggle(!superToggle); props.updateStartingMovie('superHeroMovies')}}>
                            { superToggle ? <FaToggleOn /> : <FaToggleOff /> }
                        </a>
                    </div>

                   <div className="scifi-container">
                        <h3>SciFi Movies Only</h3>
                        <a id="scifi-toggle" className="scifi" href="#" onClick={() => {setScifiToggle(!scifiToggle); props.updateStartingMovie('scifiMovies')}}>
                            { scifiToggle ? <FaToggleOn /> : <FaToggleOff /> }
                        </a>
                    </div>
                    <div className="best-pic-container">
                        <h3>Best Pictures (Oscars) Only</h3>
                        <a id="best-pic-toggle" className="best-pic" href="#" onClick={() => {setBestPicture(!bestPicture); props.updateStartingMovie('bestPicture')}}>
                            { bestPicture ? <FaToggleOn /> : <FaToggleOff /> }
                        </a>
                    </div>
                    <div className="comedies-container">
                        <h3>Comedies Only</h3>
                        <a id="comedies-toggle" className="comedies" href="#" onClick={() => {setComedies(!comedies); props.updateStartingMovie('comedies')}}>
                            { comedies ? <FaToggleOn /> : <FaToggleOff /> }
                        </a>
                    </div>*/}
                </div>
            : null
           } 

        </div>
    )
}
