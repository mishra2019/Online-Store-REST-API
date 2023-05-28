import mongoose from "mongoose";
// Creating schema  for user
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  userName: {
    type: String,
    required: [true],
    unique: true,
  },
  password: {
    type: String,
    require: [true],
  },
});

const user = mongoose.model("user", userSchema);

export default user;
