import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["user","assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
});

const ThreadSchema = new mongoose.Schema({
    threadid:{
        type: String,
        required: true
    },
    title: {
        type: String,
        default: "new chat"
    },
    messages: [MessageSchema],
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Thread", ThreadSchema);