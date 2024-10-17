import crypto from 'crypto';

import Conversation from '../models/conversation.js';

export const createRoom = async (req, res) => {

    try {

        const { userId } = req;

        const length = 20;
        const roomId = crypto.randomBytes(length).toString('base64').slice(0, length);

        await Conversation.create({
            roomId,
            participants: [userId],
            messages: []
        });

        res.status(201).json({
            success: true,
            data: roomId
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const joinRoom = async (req, res) => {

    try {
        
        const { roomId } = req.body;
        const { userId } = req;

        const room = await Conversation.findOne({ roomId });

        if (!room) return res.status(500).json({
            success: false,
            message: "This room does not exist."
        });

        if (room.participants.includes(userId)) return res.status(500).json({
            success: false,
            message: "You have already joined this room."
        })

        if (room.participants.length === 2) return res.status(500).json({
            success: false,
            message: "This room is already full."
        })

        room.participants.push(userId);
        await room.save();

        res.status(201).json({
            success: true,
            message: "Joined you to the room!"
        })
        
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};