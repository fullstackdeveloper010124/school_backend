"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["visitor", "student", "teacher", "parent", "admin"],
        default: "visitor"
    },
    agreeTerms: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map