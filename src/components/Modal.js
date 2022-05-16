import React from "react";

export default function Modal({ isCorrect, turn, solution }) {

  return(
    <div className="modal">
      
      {isCorrect && (
        <div>
          <h1>Wygrywasz!</h1>
          <p className="solution">Udało Ci się znaleźć rozwiązanie w turze numer {turn} !</p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Może następnym razem...</h1>
          <p className="solution">Rozwiązaniem było "{solution}"</p>
        </div>
      )}

    </div>
  )
}