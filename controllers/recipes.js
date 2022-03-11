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
    title: 'New Recipe'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.ingredients = req.body.ingredients.split(', ')
  req.body.description = req.body.description.split('/ ')
  Recipe.create(req.body)
  res.redirect('/profile')
}

function show(req, res) {
  Recipe.findById(req.params.id)
    .exec(function (err, recipe) {
      res.render('recipes/show', {
        title: 'Recipe Details',
        recipe,
      })
    })
}

function createNote(req, res) {
  Recipe.findById(req.params.id)
    .exec(function (err, recipe) {
      recipe.notes.push(req.body)
      recipe.save(function (err) {
        res.redirect(`/recipes/${recipe._id}`)
      })
    })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
  // req.body.ingredients = req.body.ingredients.forEach(ingredient => {ingredient.split(', ')})
  // req.body.description = req.body.description.forEach(step => {step.split('/ ')})
    .exec(function (err, recipe) {
      res.render('recipes/edit', {
        recipe,
        err,
        title: "Edit Recipe"
      })
    })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  if ( (typeof req.body.ingredients) === 'object') {
  req.body.ingredients = req.body.ingredients.forEach(ingredient => {ingredient.split(', ')})
} else {req.body.ingredients = req.body.ingredients.split(', ')}

  if ((typeof req.body.description) === 'object') {
  req.body.description = req.body.description.forEach(step => {step.split('/ ')})
} else {req.body.description = req.body.description.split('/ ')}
  console.log(typeof req.body.ingredients)
  console.log(req.body.ingredients);
  Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, recipe) {
    res.redirect(`/recipes/${recipe._id}`)
  })
}

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.id, function (err, recipe) {
    res.redirect('/profile')
  })
}

function deleteNote(req, res) {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      recipe.notes.remove({ _id: req.params.noteId })
      recipe.save()
        .then(() => {
          res.redirect(`/recipes/${recipe._id}`)
        })
    })
}

function updateNote(req, res) {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      recipe.notes.forEach(note => {
        if (note._id == (req.params.noteId)) {
          note.content = (req.body.content)
          recipe.save()
          .then(() => {
            res.redirect(`/recipes/${recipe._id}`)
          })

        }
      })
    })
  }



export {
  index,
  newRecipe as new,
  create,
  show,
  createNote,
  edit,
  update,
  deleteRecipe as delete,
  deleteNote,
  updateNote
}