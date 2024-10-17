import mongoose, { Mongoose } from "mongoose";

import Message from '../models/message.js';
import Conversation from '../models/conversation.js';


export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body;
        const { id: roomId } = req.params;
        const { userId: senderId } = req;

        let room = await Conversation.findOne({ roomId });

        if (!room) return res.status(500).json({
            success: false,
            message: "Room does not exist."
        });

        // finding the id from participants array which does not match the senderID hence receiverID
        const receiverId = room.participants.filter(memberId => memberId.toString() !== senderId);

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        room.messages.push(newMessage._id);
        await room.save();

        // // Creates a conversatino document b/w both the new sender and receiver
        // if (!conversation) {

        //     conversation = await Conversation.create({
        //         participants: [senderId, receiverId],
        //         messages: [newMessage._id]
        //     })
        // } else {

        //     // Directly pushes the message id in the conversation document
        //     conversation.messages.push(newMessage._id);
        //     await conversation.save();
        // }

        res.status(202).json({
            success: true,
            data: newMessage
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }


};

export const getMessages = async (req, res) => {

    try {

        const { id: roomId } = req.params;
        const { userId: senderId } = req;

        // populate give us the actual document of the ids
        const room = await Conversation.findOne({ roomId }).populate('messages'); 

        // const conversation = await Conversation.findOne({
        //     participants: { $all: [receiverId, senderId] }
        // }).populate('messages'); // populate give us the actual document of the ids

        if (!room) return res.status(200).json({
            success: true,
            data: []
        });

        res.status(200).json({
            success: true,
            data: room.messages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const editMessage = async (req, res) => {

    try {

        const { id: messageId } = req.params;
        const { userId } = req;
        const { message } = req.body;

        const userMessaage = await Message.findOne({ senderId: userId, _id: messageId });

        if (!userMessaage) return res.status(500).json({
            success: false,
            message: "You are not allowed to edit this message."
        });

        const newMessage = await Message.findOneAndUpdate({ _id: messageId }, { message }, { new: true });

        res.status(203).json({
            success: true,
            message: newMessage
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "There was some error editing your message!",
            error: error.message
        });
    }
};

export const deleteMessage = async (req, res) => {

    try {

        const { id: messageId } = req.params;
        const { userId } = req;

        const userMessaage = await Message.findOne({ senderId: userId, _id: messageId });

        if (!userMessaage) return res.status(500).json({
            success: false,
            message: "You are not allowed to delete this message."
        });

        await Message.deleteOne({ _id: messageId });

        console.log(1);

        res.status(201).json({
            success: true,
            message: "Message has been deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Could not delete that message!",
            error: error.message
        });
    }
};