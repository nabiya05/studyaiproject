import "./chatwindow.css"
import Chat from "./chat.jsx"
import { Mycontext } from "./mycontext.jsx"
import { useContext, useEffect, useState } from "react"
import { FadeLoader } from "react-spinners";

export default  function Chatwindow(){
    const {prompt, setPrompt, reply, setReply, curthreadid, prevchat, setPrevchat, setNewchat} = useContext(Mycontext);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const getreply = async() =>{
        setLoading(true);
        setNewchat(false);

        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: prompt,
                threadid: curthreadid
            }),
        }
      
        try{
            const response = await fetch(`http://localhost:8080/api/chat`, options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        }catch(err){
           console.log(err)
        }
        setLoading(false);
    }

    useEffect(()=>{
            if(prompt && reply){
               setPrevchat(prevchat =>(
                [...prevchat,
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "assistant",
                    content:reply
                }
            ]
               ))
        }
            setPrompt("");
        }, [reply])



    return (
        <div className="chatWindow">
       
            <div className="navbar">
            <h4>StudyAi</h4>
            </div>
            <Chat></Chat>

            <FadeLoader color={color} loading={loading}>

            </FadeLoader>
             <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getreply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getreply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}