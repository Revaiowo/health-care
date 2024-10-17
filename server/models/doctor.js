import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    doctorName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    speciality: {
        type: String,
        default: " "
    },
},
    { timestamps: true},
);

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;