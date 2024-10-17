import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({

    roomId: {
        type: String,
        required: true
    },
    
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true
        }
    ]
    
},
    { timestamps: true }
);


const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;