import React, { useEffect, useState } from 'react';

export default function Keypad({ usedKeys, handleKeyup }){
  const [letters, setLetters] = useState(null)
  //const { handleKeyup } = useWordle(solution);

  useEffect(() => {
    fetch('db.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
      .then(res => res.json())
      .then(json => {
        setLetters(json.letters)
      })
  }, [])

  return(
    <div className='keypad'>
      {letters && letters.map((letter) => {
        const color = usedKeys[letter.key]
        const handleKeyupLetter = () => handleKeyup(letter)
        
        if(letter.otherButton) {
          return(
            <div 
              key={letter.key} 
              className={letter.otherButton}
              onClick={handleKeyupLetter}
            >
              {letter.sign}
            </div>
          )
        }
        
        return(
          <div 
            key={letter.key} 
            className={color}
            onClick={handleKeyupLetter}
          >
            {letter.key}
          </div>
        )
        
      })}
    </div>
  )
}