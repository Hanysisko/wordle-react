import React from "react";

export default function Modal({ isCorrect, turn, solution }) {

  return(
    <div className="modal">
      
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">You found the solution in {turn} guesses!</p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>You Lost!</h1>
          <p className="solution">The solution was "{solution}"</p>
        </div>
      )}

    </div>
  )
}