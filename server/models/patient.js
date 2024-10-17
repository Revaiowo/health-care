import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true,
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

    confirmPassword: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    dob: {
        type: String,
        required: true,
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Doctor"
    }
},
    { timestamps: true},
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;