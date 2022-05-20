import React, { useEffect, useState } from 'react';

export default function Keypad({ usedKeys }){
  const [letters, setLetters] = useState(null)

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
        
        if(letter.otherButton) {
          return(
            <div key={letter.key} className={letter.otherButton}>
              {letter.key}
            </div>
          )
        }
        
        return(
          <div key={letter.key} className={color}>
            {letter.key}
          </div>
        )
        
      })}
    </div>
  )
}