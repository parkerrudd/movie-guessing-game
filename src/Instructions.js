import React from "react";
import './App.css'; 
import { FaWindowClose } from "react-icons/fa";

export default function Instructions(props) {
    return (
        <div className="instructions-container">
            <a id="instructions-exit" href="#" onClick={() => {props.toggleQuestionMark(props.questionMark)}}>
                <FaWindowClose />
            </a>
            <h1>How To Play</h1>
            <p>The objective is to guess the movie in as few tries as possible</p>
            <p>Each guess will provide new clues by showing if your guess shares any similarities with the correct movie</p>
            <p>If the column is red, that category of your guess is incorrect</p>
            <p>If the year column is yellow, that means that your guess was released in the same decade</p>
            <p>If the column is green, that category is the same as the correct movie</p>
        </div> 
    )
}