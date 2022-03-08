import { Profile } from '../models/profile.js'
import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: " My Recipes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipes")
  })
}

export {
  index
}