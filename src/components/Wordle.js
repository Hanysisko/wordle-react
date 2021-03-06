import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const { currentGuess, guesses, isCorrect, turn, usedKeys, handleKeyup } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyup);
    
    if (isCorrect){
      setTimeout(() => setShowModal(true),2000);
      window.removeEventListener('keydown', handleKeyup);
    };
    if (turn > 5){
      setTimeout(() => setShowModal(true),2000);
      window.removeEventListener('keydown', handleKeyup);
    }

    return () => window.removeEventListener('keydown', handleKeyup);
  },[handleKeyup, isCorrect]);



  // useEffect(() => {
  //   console.log(guesses, isCorrect, turn)
  // }, [turn])
   
  return (
    <div>
      
      {/* <div>Wordle solution is {solution} and current guess is |{currentGuess}|</div> */}
      
      <Grid 
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
      />

      <Keypad 
        usedKeys={usedKeys}
        solution={solution}
        handleKeyup={handleKeyup}
      />

      {showModal 
        && 
      <Modal 
        isCorrect={isCorrect}
        turn={turn}
        solution={solution}
      />}

    </div>


  );
}