import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  gender: String,
  toc: { type: Boolean, required: true },
  tags: Array,
})

export default mongoose.model('User', userSchema)
