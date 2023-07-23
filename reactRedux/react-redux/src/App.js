// import logo from './logo.svg';
import './App.css';
import { createStore} from 'redux';
import { Provider, useSelector, useDispatch} from 'react-redux';

function Left(props) {
  function f(state) {
    console.log(state)
    return state.number
  }
  const number = useSelector(f)
  
  console.log(number)
  return (
    <div>
      <h1>Left</h1>
      <h3>number : {number}</h3>
    </div>
  )
}
function Right(props) {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Right</h1>
      <input type="button" value="+" onClick={() => {
          dispatch({type : 'plus'})
      }}></input>
    </div>
  )
}



function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number : 1
    }
  }
  const newState = {...currentState}
  if (action.type === 'plus') {
    newState.number++
  }
  return newState
}
const store = createStore(reducer)

function App() {
  return (
    <div className="App">
      <h1>Root</h1>
      <Provider store={store}>
        <Left />
        <Right />
        
      </Provider>
    </div>
  );
}

export default App;
