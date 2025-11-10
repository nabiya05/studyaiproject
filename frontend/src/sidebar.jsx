import "./sidebar.css"
import { useContext, useEffect } from "react";
import { Mycontext } from "./mycontext";
import {v1 as uuidv1} from "uuid";

export default  function Sidebar(){
    const {allthreads, setAllthreads, curthreadid, setCurthreadid, setPrompt, setReply, setPrevchat, setNewchat} = useContext(Mycontext);

    const getallthreads = async () =>{
        try{
           const response = await fetch("http://localhost:8080/api/thread");
           const res = await response.json();
           const data = res?.map(thread=> ({threadid: thread.threadid, title: thread.title}));
           //console.log(data);
           setAllthreads(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getallthreads();
    }, [curthreadid]);

    const getnewchat =()=>{
        setNewchat(true),
        setCurthreadid(uuidv1()),
        setPrevchat([]),
        setPrompt(""),
        setReply(null)
    }

    const getchats = async (newthreadid)=>{
        setCurthreadid(newthreadid);
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newthreadid}`);
            const res = await response.json();
            console.log(res);
            setPrevchat(res);
        }catch(err){
            console.log(err)
        }
    }

    const deletethread = async(deletethreadid)=>{
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${deletethreadid}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res)

            //rerender
            setAllthreads(prev => prev.filter(thread => thread.threadid !== deletethreadid ));
            if (deletethreadid === curthreadid){
                getnewchat();
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
        <button onClick={getnewchat}>
            <i className="fa-solid fa-comments"></i><p>StudyAi</p>
            <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <ul className="history">
            <h3>chats</h3>
                <div>
                    {allthreads?.map((thread,idx)=>
                    <li key={idx} onClick={()=> getchats(thread.threadid)}>{thread.title} <i className="fa-solid fa-trash" onClick={(e)=>{e.stopPropagation();
                    deletethread(thread.threadid);
                    }}></i></li>
                    )}
                </div>
        </ul>
        </section>
    )
}