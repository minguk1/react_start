// import logo from './logo.svg';
import './App.css';
import { useReducer, useState} from 'react';



function App() {
  const [count, countDispatch] = useReducer(countReducer, 0)

  function countReducer(oldCount, action) {
    if (action.type === 'Down') {
      return oldCount - action.number
    }
    else if (action.type === 'Reset') {
      return 0
    }
    else if (action.type === 'Up') {
      return oldCount + action.number
    }

  }

  function down() {
    countDispatch({type : 'Down', number: number})
  }
  function reset() {
    countDispatch({type : 'Reset', number: number})
  }
  function up() {
    countDispatch({type : 'Up', number: number})
  }

  const [number, setNumber] = useState(1)
  function changeNumber (event) {
    setNumber(Number(event.target.value))
}
  return (
    <div className="App">
      <input type="button" value='-' onClick={down} />
      <input type="button" value='0' onClick={reset} />
      <input type="button" value='+' onClick={up} />
      <input type="text" value={number} onChange={changeNumber} />
      <span>{count}</span>
    </div>
  );
}

export default App;
