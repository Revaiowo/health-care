import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    patientName: {
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

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    }
},
    { timestamps: true},
);

const Patient = mongoose.model("patient", patientSchema);

export default Patient;