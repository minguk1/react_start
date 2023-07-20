// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const SimpleButton = styled.button`
  color : white;
  background-color : green;
`
const LargeButton = styled(SimpleButton)`
  font-size : 50px;
`

const ReactButton = props => {
  console.log(props)
  return <button className={props.className}>{props.children}</button>
}
const ReactLargeButton = styled(ReactButton)`
  font-size : 50px;
`
const PrimaryButton = styled.button`
  color : ${function(props) {
    if (props.primary) {
      return 'white'
    }
    else {
      return 'black'
    }
  }};
  background-color : ${ 
    props => props.primary ? 'blue' : 'gray'
  };
`
function App() {
  return (
    <div className="App">
      <SimpleButton>Simple</SimpleButton>
      <LargeButton>Large</LargeButton>
      <ReactButton>React</ReactButton>
      <ReactLargeButton>React Large</ReactLargeButton>
      <PrimaryButton>Primary</PrimaryButton>
      <PrimaryButton primary>Primary</PrimaryButton>
    </div>
  );
}

export default App;
