import { Profile } from '../models/profile.js'
import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Recipe.find({owner: `${req.user.profile._id}`})
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