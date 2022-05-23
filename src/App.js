import { useEffect, useState } from 'react';
import Wordle from './components/Wordle'

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('db.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
      .then(res => res.json())
      .then(json => {
        const randomSolution = json.solutions[Math.floor((Math.random() * json.solutions.length))];
        // console.log(json);
        setSolution(randomSolution.word);
      })
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Łordle</h1>

      { solution && <Wordle solution={solution}/> }

    </div>
  );
}

export default App;