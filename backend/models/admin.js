import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  email: String,
  password: String,
  status2FA: Boolean,
  userType: String,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
/*
master
teachers
media
 */