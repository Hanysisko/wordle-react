import { useState } from "react";


const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array
  const [history, setHistory] = useState([]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});


  //format guess into array of objects with proper color
  //for example: [{key: 'd', color: 'yellow'}]
  const formatGuess = () => {
    
    console.log('formatting the current guess -', currentGuess);

    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((letter) => {
      return {key: letter, color: 'grey'}
    })

    //find green letters
    formattedGuess.forEach((letterObject, index) => {
      if(solutionArray[index] === letterObject.key) {
        formattedGuess[index].color = 'green'
        solutionArray[index] = null
      }
    })

    //find yellow letters
    formattedGuess.forEach((letterObject, index) => {
      if(solutionArray.includes(letterObject.key) && letterObject.color !== 'green') {
        formattedGuess[index].color = 'yellow'
        solutionArray[solutionArray.indexOf(letterObject.key)] = null
      }
    })

    return formattedGuess;

  };

  //update isCorrect state if the guess is correct
  //add new guess to the 'guesses' and 'history' state
  //add one to the 'turn' state
  //reset currentGuess
  //NEW ONE: updating keys on the Keypad
  const addNewGuess = (formattedGuess) => {
    
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })

    setTurn((prevTurn) => {
      return prevTurn + 1;
    })

    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key]

        if(letter.color === 'green') {
          newKeys[letter.key] = 'green'
          return
        }

        if(letter.color === 'yellow' && currentColor !== 'green'){
          newKeys[letter.key] = 'yellow'
          return
        }

        if(letter.color === 'grey' && currentColor !== 'yellow' && currentColor !== 'green'){
          newKeys[letter.key] = 'grey'
          return
        }

      })

      return newKeys
    })

    setCurrentGuess('')

  };

  //keyupevent & track current guess
  //when enter pressed, add new guess
  const handleKeyup = ({ key }) => {

    console.log(key);
    
    if (key === 'Enter') {
      
      //only add guess when turn is < 5
      if (turn > 5) {
        console.log('no more guesses for you!');
        return
      }

      //don't duplicate guesses
      if(history.includes(currentGuess)) { // history.find(el => el === currentGuess) === currentGuess
        console.log('you already tried that one, sugar!');
        return
      }

      //currentGuess must be 5 letters
      if(currentGuess.length !== 5) {
        console.log("It's too short :c");
        return
      }

      const formatted = formatGuess();

      addNewGuess(formatted);

    };

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0,-1)
      })
      return
    };

    if (/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    };

  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }

}

export default useWordle;