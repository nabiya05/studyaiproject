import "./chat.css";
import { useContext } from "react";
import { Mycontext } from "./mycontext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"

export default  function Chat(){
    const {prevchat, newchat,reply} = useContext(Mycontext);

    return (
        <>
       {newchat && <h3>how can i help you?</h3>}
       <div className="chats">
        {
            prevchat?.map((chat, idx)=>
            <div className={chat.role === "user" ? "userdiv" : "gptdiv" } key={idx}>
                {
                    chat.role === "user" ? 
                    <p className="usermsg">{chat.content}</p> :
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown> 
                }
            </div>
            )
        }
       </div>
        </>
    )
}