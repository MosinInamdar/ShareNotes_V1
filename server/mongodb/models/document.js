import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description: { type: String, required: true },
    documentType: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    // upload
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const documentModel = mongoose.model('Documents', DocumentSchema);

export default documentModel;