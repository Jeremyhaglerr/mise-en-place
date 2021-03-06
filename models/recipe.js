import mongoose from 'mongoose'

const Schema = mongoose.Schema

const notesSchema = new Schema({
  content: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  servings: String,
  prep: String,
  cook: String,
  ingredients: Array,
  description: Array,
  notes: [notesSchema],
  owner: {type: Schema.Types.ObjectId, 'ref': "Profile"}
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}