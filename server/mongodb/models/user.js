import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    allDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Documents" }],
});

UserSchema.pre("save", async function (next) {
    const user = this;
    
    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
        process.env.JWT,
        {
            expiresIn: '1d',
        }
        );
    } catch (error) {
        console.error(error);
    }
};

const userModel = mongoose.model("User", UserSchema);

export default userModel;