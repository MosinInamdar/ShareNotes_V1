import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    allDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Documents" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;