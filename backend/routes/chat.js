import express from "express";
import Thread from "../models/threadschema.js"
import getopenaiapi from "../utilis/openai.js"
const router = express.Router();

//test
router.post("/test",async(req,res)=>{
    try{
    const thread = new Thread({
        threadid: "a123",
        title: "testing"
    })
     let result = await thread.save();
     res.send(result);
}catch(err){
    console.log("error")
}
})


//thread route
router.get("/thread", async(req,res)=>{
    try{
       const thread = await Thread.find({}).sort({updatedat : -1});
       res.json(thread);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "failed to fetch"});
    }
});

//theardid

router.get("/thread/:threadid", async(req,res)=>{
    const {threadid} = req.params;
    try{
        let thread = await Thread.findOne({threadid})

        if(!thread){
            res.status(500).json({error: "not found"});
        }
        res.json(thread.messages);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to fetch"});
    }
});

//delete
router.delete("/thread/:threadid", async(req,res)=>{
    const {threadid} = req.params;
    try{
       let deletedthread = await Thread.findOneAndDelete({threadid});

       if(!deletedthread){
         res.status(500).json({error: "not found"});
       }
       
       res.json(deletedthread);
    }catch(err){
         console.log(err);
        res.status(500).json({error: "failed to fetch"});
    }
})

//chat routes

router.post("/chat", async(req,res)=>{
    const {threadid, message} = req.body;
    if(!threadid || !message){
        return res.status(400).json({error: "valid message"});
    }

    try{
        let thread = await Thread.findOne({threadid}); //find by threadid

        if(!thread){
                thread = new Thread({
                threadid,
                title: message,
                messages: [{role: "user", content: message}]
            })
        }else{
            thread.messages.push({role: "user", content: message});
        }
        const assistantreply = await getopenaiapi(message);
            thread.messages.push({role: "assistant", content: assistantreply});

            thread.updatedat = new Date();

            await thread.save();

            return res.json({reply: assistantreply});
        
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "failed to fetch"});
    }
})

export default router;