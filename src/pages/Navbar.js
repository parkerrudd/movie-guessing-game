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
    const [switches, setSwitches] = useState([])
    const [chart, setChart] = useState(false)

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
                </div>
            : null
           } 

        </div>
    )
}
