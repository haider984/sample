import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  img: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  payment:{
    type:Number,
    default:0,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  otp:{
    type: String,
    required: false,
  },
  isVerified:{
    type: Boolean,
    default:false
  },
  isSeller: {
    type: Boolean,
    default:false,
    required:true,
  },
  connectedAccount: {
    type: String,
    default:"",
    required:false,
  },
  refferdEmail: {
    type: String,
    default: "",
    required: false,
  }

},{
  timestamps:true
});

export default mongoose.model("User", userSchema)