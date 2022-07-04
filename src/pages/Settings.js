import React from "react";
import './App.css'; 
import { FaToggleOff, FaToggleOn, FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Settings(props) {

    const [superToggle, setSuperToggle] = useState(false)

    return (
        // <div className="settings-container">
        //     <a id="settings-exit" href="#" onClick={() => {props.toggleSettings(props.settings)}}>
        //         <FaWindowClose />
        //     </a>
        //     <h1>Settings</h1>
        //     <div className="supers">
        //         <h3>Super Hero Movies Only</h3>
        //         <a id="toggle-off" className="toggle-super" href="#" onClick={() => setSuperToggle(!superToggle)}>
        //             { superToggle ? <FaToggleOn /> : <FaToggleOff /> }
        //         </a>
        //     </div>
        // </div>
        <div></div>
    )
}