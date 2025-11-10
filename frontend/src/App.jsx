import './App.css'
import Chat from './chat'
import Chatwindow from './chatwindow'
import { Mycontext } from './mycontext'
import Sidebar from './sidebar'
import Roadmap from './roadmap'
import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid';


function App() {

  const [prompt, setPrompt]= useState("");
  const [reply, setReply] = useState(null);
  const [curthreadid, setCurthreadid] = useState(uuidv1());
  const [prevchat, setPrevchat] = useState([]) 
  const [newchat, setNewchat] = useState(true);
  const [allthreads, setAllthreads] = useState([])

  const providervalues = {
    prompt, setPrompt, 
    reply, setReply,
    curthreadid, setCurthreadid,
    prevchat, setPrevchat,
    newchat, setNewchat,
    allthreads, setAllthreads,
  }; 

  return (
    <div className='app'>
        <Mycontext.Provider value={providervalues}>
          <Sidebar />
          <Chatwindow />
          <Roadmap />
        </Mycontext.Provider>
    </div>
  )
}

export default App
