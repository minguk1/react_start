// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  
  return (
    <header>
        <h1>
          <a href="/" onClick={(event=>{
            event.preventDefault()
            props.onChangeMode()
          })}>{props.title}</a>
        </h1>
      </header>
  )
}
function Nav(props) {
  const lis = [
        
  ]
  
  props.topics.forEach(li => {
    
    lis.push(<li key={li.id}><a href={'/read/'+li.id} onClick={event=>{
      event.preventDefault()
      props.onChangeMode(li.id)
    }}>{li.title}</a></li>)
  })
  return (
    <nav>
        <ol>
          {lis}
        </ol>
      </nav>
  )
}
function Article(props) {
  return (
    <article>
        <h2>{props.title}</h2>
        {props.body}
      </article>
  )
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault()
        console.log(event.target)
        const title = event.target.title.value
        const body = event.target.body.value
        props.onCreate(title,body)
      }}>
        <p>
          <input type="text" name="title" placeholder='title'/>
        </p>
        <p>
          <textarea name="body" placeholder='body'></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>


    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=>{
        event.preventDefault()
        console.log(event.target)
        const title = event.target.title.value
        const body = event.target.body.value
        props.onUpdate(title,body)
      }}>
        <p>
          <input type="text" name="title" placeholder='title' value={title} onChange={event=>{
            setTitle(event.target.value)
          }}/>
        </p>
        <p>
          <textarea name="body" placeholder='body' value={body} onChange={event=>{
            setBody(event.target.value)
          }}></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>


    </article>
  )
}

function App() {
  // const _mode = useState('WELCOME')
  // const mode = _mode[0]
  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const [nextid, setNextId] = useState(4)
  // console.log('-mode', _mode)
  const [topics, setTopics] = useState([
    {id : 1, title:'html', body : 'html is ...'},
    {id : 2, title:'css', body : 'css is ...'},
    {id : 3, title:'javascript', body : 'js is ...'},
  ])
  let content = null
  let contextControl = null
  if (mode === 'WELCOME') {
      content = <Article title="WELCOME" body="Hello, Web"></Article>
  }
  else if (mode === 'READ') {
    let title, body = null
    for (let i=0; i<topics.length; i++) {
      
      if (topics[i].id === id) {
        title = topics[i].title
        body = topics[i].body

      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={"/update/"+id} onClick={event=>{
      event.preventDefault()
      setMode('UPDATE')
    }}>Update</a></li>
  }
  else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id : nextid, title : _title, body : _body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode("READ")
      setId(nextid)
      setNextId(nextid + 1)
    }}></Create>
  }
  else if (mode === "UPDATE") {
    
    let title, body = null
    for (let i=0; i<topics.length; i++) {
      
      if (topics[i].id === id) {
        title = topics[i].title
        body = topics[i].body

      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body) => {
      const updatedTopic = {id:id, title:title, body:body}
      const newTopics = [...topics]
      for(let i=0; i<newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic
          break
        }
      }
      setTopics(newTopics)
      setMode("READ")
    }}></Update>
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        alert(_id)
        setMode('READ')
        setId(_id)
      }}></Nav>
      {/* <Article title="Welcome" body="Hello, Web"></Article> */}
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event=> {
            event.preventDefault()
            setMode('CREATE')
          }}>Create</a>
          {contextControl}
        </li>
        
      
      </ul>
    </div>
  );
}

export default App;
