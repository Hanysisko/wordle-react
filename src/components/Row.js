import React from 'react';

export default function Row({ currentGuess, guess }) {

  //produces row with past guess
  if(guess){
    return(
      <div className="row past">
        {guess.map((letter, index) => (
          
          <div 
            key={index} 
            className={letter.color}
          >
            {letter.key}
          </div>

        ))}
      </div>
    )
  }

  //produces row with current guess, letter after letter
  if(currentGuess){
    let letters = currentGuess.split('');
    return(
      <div className="row current">
        {letters.map((letter, index) => (
          
          <div key={index} className='filled'>{letter}</div>

        ))}
        {/* this one is for "dummy" boxes, at the end of currentGuess */}
        {[...Array(5 - letters.length)].map((_, index) => (
          <div key={index} className=''></div>         
        ))}
      </div>
    )
  }

  return(
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};