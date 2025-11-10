import { useState } from "react"
import "./roadmap.css"
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"

export default  function Roadmap(){
    const [career, setCareer] = useState("");
    const [roadmap, setRoadmap] = useState("");

    const getroadmap =async()=>{
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                   role: "user",
                   content:`simple roadmap for becoming a only headings ${career}`
                }]
        })
    }

        try{
            const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            const data = await response.json();
            const reply = data.choices[0].message.content;
            console.log(reply);
            setRoadmap(reply);
        }catch(err){
            console.log(err);
        }

    }
    return (
        <div className="roadmap">
            <h4>ROADMAP</h4>
            <div className="input">
            <input placeholder="enter a career" value={career} onChange={(e)=> setCareer(e.target.value)}></input><br></br>
            <div onClick={getroadmap}>Generate roadmap</div>
            </div>
            <div className="roadmapbox">
                <ReactMarkdown rehypePlugins={rehypeHighlight}>{roadmap || "enter a career name to see roadmap"}</ReactMarkdown>
            </div>

        
        </div>
    )
}