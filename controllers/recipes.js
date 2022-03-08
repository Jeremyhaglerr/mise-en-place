import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: " Browse Recipes"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipes")
  })
}

function newRecipe(req, res) {
  res.render('recipes/new', {
  title: 'New Recipe'})
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
      res.render('recipes/show', {
        title: 'Recipe Details', 
        recipe,
      })
    })
  }

function createReview(req, res) {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
    recipe.reviews.push(req.body)
    recipe.save(function(err) {
      res.redirect(`/recipes/${recipe._id}`)
    })
  })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
  .exec(function(err, recipe) {
    res.render('recipes/edit', {
      recipe,
      err,
      title: "Edit Recipe"
    })
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  createReview,
  edit

}